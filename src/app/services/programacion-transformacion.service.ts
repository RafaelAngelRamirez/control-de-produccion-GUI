import { Injectable } from '@angular/core'
import { ManejoDeMensajesService } from './utilidades/manejo-de-mensajes.service'
import { UtilidadesService } from './utilidades/utilidades.service'
import { PreLoaderService } from '../components/pre-loader/pre-loader.service'
import { PaginadorService } from '../components/paginador/paginador.service'
import { throwError, Observable } from 'rxjs'
import { URL_BASE } from '../config/config'
import { DefaultsService } from './configDefualts/defaults.service'
import { HttpClient } from '@angular/common/http'
import { catchError, map } from 'rxjs/operators'
import { Maquina } from '../models/maquina.model'
import { Departamento } from '../models/departamento.models'
import { OrdenLigera } from './folio/folio-new.service'

@Injectable({
  providedIn: 'root'
})
export class ProgramacionTransformacionService {
  base = URL_BASE('programacionTransformacion')
  constructor(
    private http: HttpClient,
    private msjService: ManejoDeMensajesService
  ) {}

  errFun(err) {
    this.msjService.err(err)
    return throwError(err)
  }

  ordenesPorAsignar(idTransformacion: string): Observable<OrdenLigera[]> {
    const url = this.base.concat('/ordenesPorAsignar')

    return this.http.get(url).pipe(
      map((res: any) => {
        return res.ordenes as OrdenLigera[]
      }),
      catchError(err => this.errFun(err))
    )
  }
  asignarOrdenes(maquina: Maquina): Observable<Maquina> {
    const url = this.base.concat('/asignar')

    return this.http
      .post<Maquina>(url, { idMaquina: maquina._id, ordenes: maquina.pila })
      .pipe(
        map((res: any) => {
          this.msjService.toastCorrecto(res.mensaje, maquina.clave)
          return res.ordenes as Maquina
        }),
        catchError(err => this.errFun(err))
      )
  }

  /**
   *Verifoca si esta orden esta disponible para transformacion.
   *
   * @param {string} idOrden El id de la orde
   * @param {string} idPedido El id del pedido
   * @param {string} idFolio El id del folio
   * @param {string} idTransformacion El id del departamento de transformacion
   * @returns {Observable<boolean>}
   * @memberof ProgramacionTransformacionService
   */
  estaDisponible(
    idOrden: string,
    idPedido: string,
    idFolio: string,
    idTransformacion: string
  ): Observable<iEstaDisponible> {
    const url = this.base
      .concat(`/estaDisponible`)
      .concat(`/${idTransformacion}`)
      .concat(`/${idFolio}`)
      .concat(`/${idPedido}`)
      .concat(`/${idOrden}`)

    return this.http.get(url).pipe(
      map((x: iEstaDisponible) => {
        return x
      }),
      catchError(err => {
        this.msjService.toastError(err)
        return throwError(err)
      })
    )
  }

  actualizarUbicacion(): Observable<null> {
    const url = this.base.concat('/actualizarUbicacion/')
    return this.http.put(url, null).pipe(
      map((resp: any) => {
        this.msjService.toastCorrecto('Ubicacion de ordenes actualizada')
        return null
      }),
      catchError(err => this.errFun(err))
    )
  }

  findAllMaquinas(): Observable<Maquina[]> {
    let url = this.base.concat('/maquinas')
    return this.http.get<Maquina[]>(url).pipe(
      map((resp: any) => {
        return resp.maquinas as Maquina[]
      }),
      catchError(err => this.errFun(err))
    )
  }
}

export interface iEstaDisponible {
  disponible: boolean
  ubicacion: Departamento
  folio: string
  pedido: string
  orden: string
}
