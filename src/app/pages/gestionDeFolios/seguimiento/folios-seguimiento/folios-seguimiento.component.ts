import { Component, OnInit } from '@angular/core'
import { Folio } from 'src/app/models/folio.models'
import { PaginadorService } from 'src/app/components/paginador/paginador.service'
import { FolioNewService } from 'src/app/services/folio/folio-new.service'
import {
  iPedidosConsulta,
  OrdenImpresion
} from '../../../../services/folio/folio-new.service'
import { Paginacion } from '../../../../utils/paginacion.util'
import { ImpresionService } from '../../../../services/impresion.service'
import { DepartamentoService } from '../../../../services/departamento/departamento.service'
import { ManejoDeMensajesService } from '../../../../services/utilidades/manejo-de-mensajes.service'
import { ReportesProduccionService } from '../../../../services/reportes/reportes-produccion.service'
import { ExcelService } from '../../../../services/excel.service'
import { DatePipe } from '@angular/common'
import { RouterState } from '@angular/router'
// import { FolioService } from 'src/app/services/folio/folio.service'
// import { 
//   OrdenesPorDepartamentoEnProcesosComponent
// } from 'src/app/components/ordenes-por-departamento-en-procesos/ordenes-por-departamento-en-procesos.component'

@Component({
  selector: 'app-folios-seguimiento',
  templateUrl: './folios-seguimiento.component.html',
  providers: [{ provide: 'paginadorFolios', useClass: PaginadorService }]
})
export class FoliosSeguimientoComponent implements OnInit {
  cargando = {}
  keys = Object.keys
  pedidos: iPedidosConsulta[] = []

  paginacion = new Paginacion(5000, 0, 1, 'fechaDeEntregaAProduccion')
  folioDetalle: Folio

  generandoReporteTiemposDeProceso = false

  constructor(
    public folioService: FolioNewService,
    private impresionService: ImpresionService,
    private departamentoService: DepartamentoService,
    private msjService: ManejoDeMensajesService,
    private reporteService: ReportesProduccionService,
    private excelService: ExcelService,
    private datePipe: DatePipe,
    // private ordnsPorDepa: OrdenesPorDepartamentoEnProcesosComponent
  ) {}

  ngOnInit() {
    this.cargarPedidos()
  }

  cargarPedidos() {
    this.cargando['cargando'] = 'Cargando pedidos en proceso'

    let filtros = [
      'folioLineas.ordenesGeneradas=true',
      'folioLineas.terminado=false'
      // 'terminado=false'
    ]

    this.folioService.findAll(this.paginacion, filtros.join('&')).subscribe(
      pedidos => {
        this.pedidos = pedidos

        this.mostrar = pedidos.map(x => x.pedido)
        this.pedidos = this.pedidos.map(x => {
          x.laserCliente = x.laserCliente ? x.laserCliente : x.laserSKU
          return x
        })

        delete this.cargando['cargando']
      },
      _ => delete this.cargando['cargando']
    )
  }

  mostrar = []

  filtrar(termino: string) {
    let t = termino.trim().toLowerCase()
    if (!t) {
      this.mostrar = this.pedidos.map(x => x.pedido)
    }

    this.mostrar = this.pedidos
      .map(x => {
        return (
          x.pedido +
          '@@@' +
          x.folio +
          '@@@' +
          x.cliente +
          '@@@' +
          x.idCliente +
          '@@@' +
          x.vendedor +
          '@@@' +
          x.cantidadProducidaFolio +
          '@@@' +
          x.cantidadProducidaPedido +
          '@@@' +
          x.sku +
          '@@@' +
          x.laserCliente
        ).toLowerCase()
      })
      .filter(x => x.includes(termino))
      .map(x => x.split('@@@')[0])
  }

  detalleFolio(id) {
    this.folioDetalle = null
    this.folioService.findById(id).subscribe(folio => {
      this.folioDetalle = folio
    })
  }

  imprimirFolio(folio: string, pedido: string) {
    this.folioService
      .findAllOrdenesDePedidos([{ folio, pedido }])
      .subscribe(ordenes => {
        this.impresionService.ordenesVariosPedidos(ordenes).imprimir()

        let datos = this.ordenesParaMarcarImpreso(ordenes)
        this.marcarPedidosComoImpresos(datos)
      })
  }

  imprimiendoVarios = false

  listaPorImprimir: {
    folio: string
    pedido: string
    iPedido: iPedidosConsulta
  }[] = []

  imprimirVarios() {
    this.imprimiendoVarios = !this.imprimiendoVarios
    this.listaPorImprimir = []
  }
  existeRegistroImprimir(folio, pedido): boolean {
    return !!this.listaPorImprimir.find(
      x => x.folio === folio && x.pedido === pedido
    )
  }

  agregarPedido(folio: string, iPedido: iPedidosConsulta) {
    let pedido = iPedido.idPedido
    let existeRegistro = this.existeRegistroImprimir(folio, pedido)
    if (!existeRegistro) {
      this.listaPorImprimir.push({ pedido, folio, iPedido })
    } else {
      this.listaPorImprimir = this.listaPorImprimir.filter(
        x => !(x.folio === folio && x.pedido === pedido)
      )
    }
  }

  datos: OrdenImpresion[]
  async imprimirSeleccionados() {
    if (this.listaPorImprimir.length === 0) {
      this.msjService.invalido('No has seleccionado pedidos para imprimir')

      return
    }

    this.folioService
      .findAllOrdenesDePedidos(
        this.listaPorImprimir.map(x => {
          return { folio: x.folio, pedido: x.pedido }
        })
      )
      .subscribe(ordenes => {
        this.datos = ordenes
        this.impresionService.ordenesVariosPedidos(ordenes).imprimir()

        let datosParaMarcar = this.ordenesParaMarcarImpreso(ordenes)
        this.marcarPedidosComoImpresos(datosParaMarcar)
      })
  }

  private ordenesParaMarcarImpreso(
    ordenes: OrdenImpresion[]
  ): {
    folio: string
    pedidos: string[]
  }[] {
    let datosImpresos = ordenes.reduce((a, b) => {
      if (!a.hasOwnProperty(b.idFolio)) a[b.idFolio] = []
      a[b.idFolio].push(b.idPedido)
      return a
    }, {})

    let datosParaMarcar = Object.keys(datosImpresos).map(k => {
      return {
        folio: k,
        pedidos: datosImpresos[k]
      }
    })

    return datosParaMarcar
  }

  private marcarPedidosComoImpresos(datosParaMarcar) {
    window.onafterprint = () => {
      this.folioService
        .marcarPedidosComoImpresos(datosParaMarcar)
        .subscribe(() => {
          datosParaMarcar.forEach(x => {
            this.pedidos
              .filter(ped => x.pedidos.includes(ped.idPedido))
              .forEach(ped => (ped.impreso = true))
          })
        })
    }
  }

  limiteInferior: Date
  limiteSuperior: Date

  generarReporteTiemposDeProceso() {
    if (this.generandoReporteTiemposDeProceso) return
    if (!this.limiteInferior || !this.limiteSuperior) {
      this.msjService.toastErrorMensaje('Debes definir los limites del rango')
      return
    }
    this.generandoReporteTiemposDeProceso = true
    this.reporteService
      .tiemposDeProceso(this.limiteInferior, this.limiteSuperior)
      .subscribe(
        ordenes => {
          let arreglado = ordenes.map(x => {
            try {
              x.fechaFinalizacion = new Date(x.fechaFinalizacion)
              x.horaFinalizacion = this.datePipe.transform(
                x.fechaFinalizacion,
                'HH:MM:ss'
              )
              x.fechaFinalizacion = this.datePipe.transform(
                x.fechaFinalizacion,
                'yyyy-MM-dd'
              )
            } catch (error) {
              console.log(error)
            }

            return x
          })

          this.excelService.exportAsExcelFile(arreglado, 'TIEMPOS_DE_PROCESO')
          this.generandoReporteTiemposDeProceso = false
        },
        _ => (this.generandoReporteTiemposDeProceso = false)
      )
  }


  crearReporteOrdenesEnProceso() {

    // let paginacion: Paginacion = new Paginacion(5000, 0, 1, 'nombre')

    let ordenesParaVaciarEnExcel = []

    //Esto te puede generar un error tambien
    //let deps = this.departamentoService
    //deps.findAllPool()
    
    //Debemos asegurarnos que el usuario tiene todos los departamentos
    // cargados. Aunque hice un "pool" de departamentos, es mejor volver
    //a cargar todo
    

    this.departamentoService.findAll(new Paginacion(30, 0, 1, "nombre"))
      .subscribe(departamentos=>{

      //Ya con todos los departmentos, ahora obtenemos las operaciones

      const arregloDePromesas = departamentos
      .map(departamento=> this.folioService
        .findAllOrdenesPorDeparatmento(departamento._id) 
        //Vamos a convertir a una promesa. En este momento es obseravable
        .toPromise()
        )
        //Tenemos un arreglo de promesas pendientes de realizarse. 
        // Las voy a asignar a un arreglo


        // Para sincronizar todas las operaciones vamos a usar esta funcion
        //Esta operacion ejecuta todas las promesas, si una sola falla,
        //manda todo como un error. 
        Promise.all(arregloDePromesas)
        //Ahora ejectuamos. 
        .then(arregloDeRespuestas=>{

          //Cada promesa retorno un arreglo, [ [ordenes, ...], [ordenes, ...] ]
          // Las convierto
          ordenesParaVaciarEnExcel = arregloDeRespuestas
          //Vamos a transformar todo en un solo arreglo
          .reduce(
            
            ////previus es el valor que ya traimos []
            //Current es el valor actual del arregloDeRespuestas
            (previus, current)=>{
              //los ... se llaman spreed operator. Copia un arreglo
              // esto hace que quede [orden, ...]
              previus.push(...current)
              //Siempre se retorna previus(acumulador)
              return previus
            },
            //Este es previus inicializado
            [])

          //Terminado el reduce ya exportamos a excel
          this.excelService.exportAsExcelFile(
            ordenesParaVaciarEnExcel.map(x=>{
            
              let totalRuta = 0
              x.ruta.map(
                _ => {
                  totalRuta = totalRuta +1
                }
              )

              let recepcionCorr = x.ubicacionActual.recepcion
              let entradaCorr = x.ubicacionActual.entrada
              let salidaCorr = x.ubicacionActual.salida

              x.totalRuta = totalRuta
              x.recepcion = recepcionCorr
              x.entrada = entradaCorr
              x.salida = salidaCorr

              delete x.idSKU
              delete x.folio
              delete x.pedido
              delete x.orden
              delete x.idProcesoActual
              delete x.ruta
              delete x.recibida
              delete x.consecutivoOrden
              delete x.observacionesPedido
              delete x.ubicacionActual
              delete x.laserAlmacen

              return x
            }),
            'ORDENES_EN_PROCESO'
          )
          //Todo esto es   asincrono

        })
        //Por si hay algún problema
        .catch(error=> console.log("Error", error))
    })
  }

}
