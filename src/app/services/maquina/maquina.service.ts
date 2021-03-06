import { Injectable } from '@angular/core'
import { URL_SERVICIOS } from '../../config/config'
import { HttpClient } from '@angular/common/http'
import { map, catchError } from 'rxjs/operators'
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service'
import { Router } from '@angular/router'
import { throwError, Observable } from 'rxjs'
import { Maquina } from 'src/app/models/maquina.model'
import { CRUD } from '../crud'

import { PaginadorService } from 'src/app/components/paginador/paginador.service'
import { UtilidadesService } from '../utilidades/utilidades.service'
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service'
import { UsuarioService } from '../usuario/usuario.service'

@Injectable({
  providedIn: 'root'
})
export class MaquinaService extends CRUD<Maquina> {
  constructor(
    public http: HttpClient,
    public msjService: ManejoDeMensajesService,
    public _utiliadesService: UtilidadesService,
    public _preLoaderService: PreLoaderService,
    public _paginadorService: PaginadorService,
    public _usuarioService: UsuarioService
  ) {
    super(
      http,
      msjService,
      _utiliadesService,
      _preLoaderService,
      _paginadorService
    )
    this.base = URL_SERVICIOS + `/maquina`
    this.nombreDeDatos.plural = 'maquinas'
    this.nombreDeDatos.singular = 'maquina'
    this.urlBusqueda = '/buscar/termino'
  }

  buscarMaquinasPorDepartamento(id: string): Observable<Maquina[]> {
    const url = URL_SERVICIOS + `/maquina/departamento/${id}`
    return this.http.get(url).pipe(
      map((resp: any) => {
        let ordenadoPorNombre = resp.maquinas as Maquina[]

        ordenadoPorNombre = ordenadoPorNombre.sort((a, b) => {
          return a.nombre < b.nombre ? 1 : -1
        })
        return ordenadoPorNombre
      }),
      catchError(err => {
        this.msjService.err(err)
        return throwError(err)
      })
    )
  }

  findAllLigero() {
    let url = this.base.concat('/buscar/ligero')
    return this.http.get(url).pipe(
      map((x: any) => {
        return x.maquinas as MaquinaLigera[]
      }),
      catchError(err => {
        this.msjService.err(err)
        return throwError(err)
      })
    )
  }
  
}

export interface MaquinaLigera {
  _id: string
  nombre: string
  clave: string
}
