import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Folio } from '../../models/folio.models'
import { map, catchError } from 'rxjs/operators'
import swal from 'sweetalert2'
import { throwError } from 'rxjs/internal/observable/throwError'
import { Router } from '@angular/router'
import { FolioLinea } from '../../models/folioLinea.models'
import { Orden } from '../../models/orden.models'
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service'
import { UsuarioService } from '../usuario/usuario.service'
import { URL_SERVICIOS } from 'src/app/config/config'
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service'
import { VariablesDeptos } from 'src/app/config/departamentosConfig'
import { PaginadorService } from 'src/app/components/paginador/paginador.service'
import { CRUD } from '../crud'
import { UtilidadesService } from '../utilidades/utilidades.service'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class FolioService {
  totalFolios: number = 0

  constructor(
    public http: HttpClient,
    public router: Router,
    public _msjService: ManejoDeMensajesService,
    public _u: UsuarioService,
    public _preLoaderService: PreLoaderService,
    public _paginadorService: PaginadorService,
    public _utilidadesService: UtilidadesService
  ) {
    // super(
    //   http,
    //   _msjService,
    //   _utilidadesService,
    //   _preLoaderService,
    //   _paginadorService,
    // )
    // this.base =  URL_SERVICIOS + `/folio`;
    // this.nombreDeDatos.plural = 'folios';
    // this.nombreDeDatos.singular = 'folio';
    // this.urlBusqueda = '/buscar';
  }

  guardarFolio(folio: Folio) {
    const a: number = this._preLoaderService.loading('Guardando folio nuevo.')
    let url = `${URL_SERVICIOS}/folio`
    if (folio._id) {
      url += `/${folio._id}`
      // Si tiene un id queiere decir que hay que modificar.
      return this.http.put(url, folio).pipe(
        map((resp: any) => {
          this._msjService.ok_(resp, null, a)
          return
        }),
        catchError(err => {
          this._msjService.err(err)
          return throwError(err)
        })
      )
    } else {
      // Si no tiene id creamos un objeto nuevo.
      return this.http.post(url, folio).pipe(
        map((resp: any) => {
          this._msjService.ok_(resp, null, a)
          return resp.folio
        }),
        catchError(err => {
          this._msjService.err(err)
          return throwError(err)
        })
      )
    }
  }

  cargarFolio(id: string) {
    const a: number = this._preLoaderService.loading('Cargando folios')

    // Carga todos los datos del folio y sus lineas
    const url = `${URL_SERVICIOS}/folio/${id}`

    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalFolios = resp.total
        this._msjService.ok_(resp, null, a)
        return resp.folio
      }),
      catchError(err => {
        this._msjService.err(err)
        this.router.navigate(['/folios'])
        return throwError(err)
      })
    )
  }

  /**
   *Busca los folios que coincidan con el id del cliente.
   *
   * @param {string} id
   * @returns {*}
   * @memberof FolioService
   */
  buscarPorCliente(
    id: string,
    paginador: PaginadorService = null,
    campoSort: string = null
  ): Observable<Folio[]> {
    const a: number = this._preLoaderService.loading(
      'Cargando folios del cliente'
    )

    if (!paginador) {
      paginador = this._paginadorService
    }

    // Carga todos los datos del folio y sus lineas
    const url = `${URL_SERVICIOS}/folio/cliente/${id}?${this._paginadorService.generarQueryDePaginador(
      paginador,
      campoSort
    )}`

    return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalFolios = resp.total
        this._paginadorService.totalDeElementos = resp.total
        this._msjService.ok_(resp, null, a)
        return <Folio[]>resp.folios
      }),
      catchError(err => {
        this._msjService.err(err)
        return throwError(err)
      })
    )
  }

  cargarFolios(desde: number = 0, limite: number = 5) {
    // Es necesario siempre el signo al final para
    // que no haya problemas con los otros parametros.
    const a: number = this._preLoaderService.loading('Cargando folios.')

    const url = `${URL_SERVICIOS}/folio?`
    return this.cargaDeFolios(url, a)
  }

  cargarFoliosConOrdenesSinTerminar(desde: number = 0, limite: number = 5) {
    const a: number = this._preLoaderService.loading('Cargando ordenes.')

    // Carga los folios que ya tienen órdenes generadas.
    const url = `${URL_SERVICIOS}/folio?conOrdenes=true`
    return this.cargaDeFolios(url, a)
  }

  cargarFoliosConOrdenesTerminados(desde: number = 0, limite: number = 5) {
    const a: number = this._preLoaderService.loading(
      'Buscando folios terminados.'
    )

    // Carga los folios que ya tienen órdenes generadas.
    const url = `${URL_SERVICIOS}/folio?conOrdenes=true&terminados=true`
    return this.cargaDeFolios(url, a)
  }

  cargarFoliosSinOrdenes(desde: number = 0, limite: number = 5) {
    const a: number = this._preLoaderService.loading('Cargando folios.')

    // Carga los folios de los cuales aún no se generan órdenes.
    // Esto aunque un solo pedido no se haya genera órdenes.
    // Los pedidos que ya se generón del folio no aparecen aqui.
    const url = `${URL_SERVICIOS}/folio?sinOrdenes=true`
    return this.cargaDeFolios(url, a)
  }

  cargarFolioPorPrioridad(prioridad: string) {
    const a: number = this._preLoaderService.loading(
      'Cargando folios por prioridad'
    )
    const url = `${URL_SERVICIOS}/folio?prioridad=${prioridad}&terminados=false&conOrdenes=true`
    return this.cargaDeFolios(url, a)
  }

  private cargaDeFolios(url: string, a: number) {
    url += `&limite=${this._paginadorService.limite}`
    url += `&desde=${this._paginadorService.desde}`

    return this.http.get(url).pipe(
      map((resp: any) => {
        this._msjService.ok_(resp, null, a)
        this.totalFolios = resp.total
        return resp.folios
      }),
      catchError(err => {
        this._msjService.err(err)
        return throwError(err)
      })
    )
  }

  /**
   *Guarda una linea. o la modifica.
   *
   * @param {string} idFolio El id del folio que se va a modificar.
   * @param {FolioLinea} linea La linea que vamos a guardar o modificar.
   * @returns
   * @memberof FolioService
   */
  guardarLinea(idFolio: string, linea: FolioLinea) {
    const a: number = this._preLoaderService.loading('Guardando linea')
    // Si la linea tiene un id entonces es para modificar.

    if (linea._id) {
      // Modificamos.
      const url = `${URL_SERVICIOS}/folioLinea/${idFolio}/${linea._id}`
      return this.http.put(url, linea).pipe(
        map((resp: any) => {
          // swal('Pedido modificado.', `Se modifico el pedido correctamente.`, 'success');
          this._msjService.ok_(resp, null, a)
          return
        }),
        catchError(err => {
          this._msjService.err(err)
          return throwError(err)
        })
      )
    } else {
      const url = `${URL_SERVICIOS}/folioLinea/${idFolio}`
      return this.http.post(url, linea).pipe(
        map((resp: any) => {
          this._msjService.ok_(resp, null, a)
          return resp.folioLinea
        }),
        catchError(err => {
          this._msjService.err(err)

          return throwError(err)
        })
      )
    }
  }

  eliminarLinea(idFolio: string, idLinea: string) {
    const a: number = this._preLoaderService.loading('Eliminando linea')
    const url = `${URL_SERVICIOS}/folioLinea/${idFolio}/${idLinea}`
    return this.http.delete(url).pipe(
      map((resp: any) => {
        this._msjService.ok_(resp, null, a)

        return
      }),
      catchError(err => {
        this._msjService.err(err)
        return throwError(err)
      })
    )
  }

  eliminarFolio(idFolio: string) {
    const a: number = this._preLoaderService.loading('Eliminando folio.')
    const url = `${URL_SERVICIOS}/folio/${idFolio}`

    return this.http.delete(url).pipe(
      map((resp: any) => {
        this.reiniciarPaginador()
        this._msjService.ok_(resp, null, a)
        return
      }),
      catchError(err => {
        this._msjService.err(err)
        return throwError(err)
      })
    )
  }

  guardarOrdenes(folio: Folio) {
    const a: number = this._preLoaderService.loading('Guardando ordenes.')

    // QUITAMOS TODA LA BASURA.
    const limpio = this.limpiarParaOrdenes(folio)
    const url = `${URL_SERVICIOS}/orden`
    return this.http.post(url, limpio).pipe(
      map(resp => {
        this.reiniciarPaginador()
        this._msjService.ok_(resp, null, a)

        return
      }),
      catchError(err => {
        this._msjService.err(err)

        return throwError(err)
      })
    )
  }

  limpiarParaOrdenes(folio: Folio) {
    folio.folioLineas.forEach(linea => {
      delete linea.modeloCompleto
      delete linea.cantidad
      delete linea.nivelDeUrgencia
      delete linea.laserCliente
      delete linea.almacen
      delete linea.createdAt
      delete linea.updatedAt
      delete linea.eliminar
      delete linea.ordenesGeneradas

      linea.ordenes.forEach(orden => {
        delete orden.piezasFinales
        delete orden.trayectoNormal
        delete orden.trayectoRecorrido
        delete orden.ubicacionActual
        delete orden.editando
      })
    })

    const limpio = {
      folioLineas: folio.folioLineas,
      idFolio: folio._id
    }

    folio = new Folio()
    return limpio
  }

  // Recive una nueva órden.
  recivirUnaOrden(id: string, depto: string, callbackError: any = null) {
    const a: number = this._preLoaderService.loading('Recibiendo la orden.')

    const url = `${URL_SERVICIOS}/orden`
    return this.http.put(url, { _id: id, departamento: depto }).pipe(
      map((resp: any) => {
        this._msjService.ok_(resp, null, a)
        return resp
      }),
      catchError(err => {
        this._msjService.err(err, callbackError)
        return throwError(err)
      })
    )
  }

  /**
   * Inicia el trabajo de una órden.
   *
   * @param {Orden} orden La orden que se va a senalar como iniciada.
   * @param {*} depto El departamento.
   * @param {*} [callbackError=null] El callback en caso de error.
   * @returns
   * @memberof FolioService
   */
  iniciarTrabajoDeOrden(
    orden: Orden,
    idDepto: string,
    depto: VariablesDeptos,
    callbackError: any = null
  ) {
    const a: number = this._preLoaderService.loading(
      'Iniciando trabajdo de orden.'
    )
    const url = URL_SERVICIOS + `/orden?empezarATrabajar=true`
    return this.http
      .put(url, {
        _id: orden._id,
        departamento: idDepto,
        deptoTrabajado: orden.ubicacionActual[depto._v.toLowerCase()]
      })
      .pipe(
        map((resp: any) => {
          this._msjService.ok_(resp, null, a)
          return resp
        }),
        catchError(err => {
          this._msjService.err(err, callbackError)
          return throwError(err)
        })
      )
  }

  buscarOrden(id: string, depto: string, callbackError: any = null) {
    const a: number = this._preLoaderService.loading('Buscando orden.')

    const url = `${URL_SERVICIOS}/orden/${id}/${depto}`
    return this.http.get(url).pipe(
      map((resp: any) => {
        // Se retorna un objeto Orden y
        // un objeto ModeloCompleto
        this._msjService.ok_(resp, null, a)

        return resp
      }),
      catchError(err => {
        this._msjService.err(err, callbackError)

        return throwError(err)
      })
    )
  }

  // Este dato solo lo vamos a acceder desde el servicio de lista
  // de ordenes
  cargarOrdenesDepartamento(depto: string, opciones = {}) {
    const a: number = this._preLoaderService.loading(
      'Cargando ordenes del departamento'
    )

    const url = `${URL_SERVICIOS}/orden/${depto}`
    return this.http.get(url).pipe(
      map((resp: any) => {
        this._msjService.ok_(resp, null, a)

        return resp.ordenes
      }),
      catchError(err => {
        this._msjService.err(err)

        return throwError(err)
      })
    )
  }

  // Guardamos los cambios de la órden.
  /**
   *Guarda los cambios de la orden que se le pase como paramentro.
   *
   * @param {*} dato El modelo que se va a pasar para guardar.
   * @param {string} idOrden El id de la orden que se va a modificar.
   * @param {string} idDepto El id del departamento que se va a modificar.
   * @returns {*}
   * @memberof FolioService
   */
  modificarOrden(dato: any, idOrden: string, idDepto: string): any {
    const a: number = this._preLoaderService.loading(
      'Guardando cambios de orden.'
    )
    const url = `${URL_SERVICIOS}/orden/${idOrden}?depto=${idDepto}`
    return this.http.put(url, dato).pipe(
      map((resp: any) => {
        this._msjService.ok_(resp, null, a)
        return resp
      }),
      catchError(err => {
        this._msjService.err(err)
        return throwError(err)
      })
    )
  }

  controlDeProduccion_RecivirYEntregar(idOrdenes: String[]): any {
    const a: number = this._preLoaderService.loading('Entregando ordenes.')
    const url = `${URL_SERVICIOS}/orden/controlDeProduccionRecibirYEntregar`
    return this.http.put(url, idOrdenes).pipe(
      map((resp: any) => {
        this._msjService.ok_(resp, null, a)
        return resp
      }),
      catchError(err => {
        this._msjService.err(err)
        return throwError(err)
      })
    )
  }

  ordenesImpresas(_id: string): any {
    // const a: number = this._preLoaderService.loading('Entregando ordenes.');

    const url = `${URL_SERVICIOS}/folio/ordenesImpresas`
    return this.http.post(url, { _id: _id }).pipe(
      map((resp: any) => {
        this._msjService.correcto('Se imprimio el folio.', '', 4000)
        this._msjService.ok_(resp, null)
        return resp
      }),
      catchError(err => {
        this._msjService.err(err)
        return throwError(err)
      })
    )
  }

  /**
   *Este es un parche para reiniciar el paginador
   *
   * @memberof FolioService
   */
  reiniciarPaginador() {
    this._paginadorService.limite = 5
    this._paginadorService.desde = 0
    this._paginadorService.activarPaginador(this.totalFolios)
  }
}
