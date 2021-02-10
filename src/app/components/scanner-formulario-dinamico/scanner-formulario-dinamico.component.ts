import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core'
import { QuestionControlService } from '../formulario-dinamico/question-control.service'
import { Observable, Subject, forkJoin } from 'rxjs'
import { QuestionBase } from '../formulario-dinamico/question-base'
import { QuestionService } from '../formulario-dinamico/question.service'
import { ManejoDeMensajesService } from '../../services/utilidades/manejo-de-mensajes.service'
import { ActivatedRoute } from '@angular/router'
import {
  ParametrosService,
  ScannerDepartamentoGestion
} from '../../services/parametros.service'
import {
  FolioNewService,
  OrdenLigera
} from '../../services/folio/folio-new.service'
import { timeout } from 'rxjs/operators'
import { FormGroup } from '@angular/forms'
@Component({
  selector: 'app-scanner-formulario-dinamico',
  templateUrl: './scanner-formulario-dinamico.component.html',
  styleUrls: ['./scanner-formulario-dinamico.component.css'],
  providers: [QuestionService]
})
export class ScannerFormularioDinamicoComponent implements OnInit {
  modoRecibir = false
  mostrandoFormulario = false

  enableScanner = true

  tituloDelDepartamento: string
  idDepartamento: string

  cargando = {}
  keys = Object.keys

  actualizarLista: Subject<void> = new Subject<void>()
  datos = new Subject<QuestionBase<string>[]>()
  ordenEscaneada: OrdenEscaneada
  estaEstacion: ScannerDepartamentoGestion

  mostrarFormularioMaquinas = false

  constructor(
    public msjService: ManejoDeMensajesService,
    private activatedRoute: ActivatedRoute,
    private folioService: FolioNewService,
    private parametrosService: ParametrosService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(this.cbRuta)
  }

  obtenerEstacion() {
    this.cargando['estaciones'] = 'Obteniendo estructura para registro'

    this.parametrosService
      .findAllEstacionesDeEscaneo()

      .subscribe(
        estaciones => {
          let estaEstacion = estaciones.find(
            x => x.departamento._id === this.idDepartamento
          )

          this.estaEstacion = estaEstacion
          delete this.cargando['estaciones']
        },
        _ => delete this.cargando['estaciones']
      )
  }

  cbRuta = p => {
    this.tituloDelDepartamento = p['departamento'].toUpperCase()
    this.idDepartamento = p['id']
    this.obtenerEstacion()
  }

  cancelarCB = () => {
    this.mostrandoFormulario = false
  }

  camerasNotFoundHandler(e: OrdenEscaneada) {
    this.msjService.invalido(
      'Al parecer no hay camaras disponibles',
      'No se puede usar el escaner',
      25000
    )
  }

  scanSuccessHandler(e) {
    if (Object.keys(this.cargando).length > 0) return

    let escaneo: OrdenEscaneada = null
    try {
      escaneo = JSON.parse(e) as OrdenEscaneada
    } catch (error) {
      this.msjService.invalido(
        'Para corregir esto imprime de nuevo la orden.',
        'Formato de orden invalido'
      )
      return
    }

    if (this.modoRecibir) {
      this.operacionesModoRecibir(escaneo)
    } else {
      this.operacionesFormulario(escaneo)
    }
  }

  operacionesModoRecibir(e: OrdenEscaneada) {
    this.cargando['recibir'] = 'Recibiendo orden'

    this.folioService.recibirOrden(e, this.idDepartamento).subscribe(
      _ => {
        this.actualizarLista.next()
        delete this.cargando['recibir']
      },
      _ => delete this.cargando['recibir']
    )
  }

  operacionesFormulario(e: OrdenEscaneada) {
    this.cargando['registrar'] = 'Procesando orden para registro'

    this.folioService
      .estatusDeLaOrdenParaRegistro(e, this.idDepartamento)
      .subscribe(
        estatus => {
          this.ordenEscaneada = e
          if (estatus.ponerATrabajar || estatus.ponerATrabajarConMaquina) {
            if (estatus.yaEstaTrabajando) {
              this.cargarFormulario()
            } else {
              if (estatus.ponerATrabajarConMaquina) {
                this.mostrarFormularioMaquinas = true
              } else {
                this.ponerATrabajar(e)
              }
            }
          } else {
            this.cargarFormulario()
          }

          delete this.cargando['registrar']
        },
        _ => delete this.cargando['registrar']
      )
  }

  cargarFormulario() {
    if (this.estaEstacion.inputsFormulario.length === 0) {
      if (!this.estaEstacion.registrarTodo) {
        this.msjService.invalido(
          'No se ha definido el formulario de captura. Por favor reportalo con el administrador',
          'Esto es un error administrativo'
        )

        return
      }
    }

    this.mostrandoFormulario = true
    setTimeout(() => {
      this.datos.next(this.estaEstacion.inputsFormulario)
    }, 100)
  }

  scanErrorHandler(e: OrdenEscaneada) {
    console.error('scanErrorHandler', e)
  }

  scanFailureHandler(e: OrdenEscaneada) {
    console.error('scanFailureHandler', e)
  }

  private ponerATrabajar(e: OrdenEscaneada) {
    this.cargando['trabajar'] = 'Asignando trabajo de orden'

    return this.folioService.ponerATrabajar(e, this.idDepartamento).subscribe(
      _ => {
        this.actualizarLista.next()
        delete this.cargando['trabajar']
      },
      _ => delete this.cargando['trabajar']
    )
  }

  submit(datos: FormGroup) {
    if(this.cargando['registrando']) return
    this.cargando['registrando'] = 'Registrando datos de proceso.'
    this.folioService
      .registrar(this.ordenEscaneada, this.idDepartamento, datos.value)
      .subscribe(
        _ => {
          this.actualizarLista.next()
          this.mostrandoFormulario = false
          delete this.cargando['registrando']
        },
        _ => delete this.cargando['registrando']
      )
  }

  recibirTodo() {
    this.cargando['reTodo'] = 'Recibiendo ordenes'

    this.folioService
      .findAllOrdenesPorDeparatmento(this.idDepartamento)
      .subscribe(ordenes => {
        forkJoin(
          ordenes
            .filter(x => !x.ubicacionActual.recibida)
            .map(x => {
              let escaneada: OrdenEscaneada = {
                idFolio: x.folio,
                idPedido: x.pedido,
                idOrden: x.orden,
                cliente: null
              }

              return this.folioService.recibirOrden(
                escaneada,
                this.idDepartamento
              )
            })
        ).subscribe(
          _ => {
            this.actualizarLista.next()
            delete this.cargando['reTodo']
          },
          _ => delete this.cargando['reTodo'],
          () => delete this.cargando['reTodo']
        )
      })
  }

  registrarTodo() {
    this.cargando['registrarTodo'] = 'Registrando ordenes'

    this.folioService
      .findAllOrdenesPorDeparatmento(this.idDepartamento)
      .subscribe(ordenes => {
        forkJoin(
          ordenes
            .filter(x => x.ubicacionActual.recibida)
            .map(x => {
              let escaneada: OrdenEscaneada = {
                idFolio: x.folio,
                idPedido: x.pedido,
                idOrden: x.orden,
                cliente: null
              }

              return this.folioService.registrar(
                escaneada,
                this.idDepartamento,
                {}
              )
            })
        ).subscribe(
          _ => {
            this.actualizarLista.next()
            delete this.cargando['registrarTodo']
          },
          _ => delete this.cargando['registrarTodo'],
          () => delete this.cargando['registrarTodo']
        )
      })
  }
}

export interface OrdenEscaneada {
  idFolio: string
  idPedido: string
  idOrden: string
  cliente: string
}
