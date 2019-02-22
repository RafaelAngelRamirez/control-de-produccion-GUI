import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { ManejoDeMensajesService } from '../utilidades/manejo-de-mensajes.service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { Maquina } from 'src/app/models/maquina.model';
import { CRUD } from '../crud';

import { PaginadorService } from 'src/app/components/paginador/paginador.service';
import { UtilidadesService } from '../utilidades/utilidades.service';
import { PreLoaderService } from 'src/app/components/pre-loader/pre-loader.service';
import { UsuarioService } from '../usuario/usuario.service';



@Injectable({
  providedIn: 'root'
})
export class MaquinaService extends CRUD <Maquina> {
  
  
  constructor(
    public http: HttpClient,
    public _msjService: ManejoDeMensajesService,
    public _utiliadesService: UtilidadesService,
    public _preLoaderService: PreLoaderService,
    public _paginadorService: PaginadorService,
    public _usuarioService: UsuarioService
  ) { 

    super(http, _msjService, _utiliadesService, _preLoaderService, _paginadorService);
    this.base =  URL_SERVICIOS + `/maquina`;
    this.nombreDeDatos.plural = 'maquinas';
    this.nombreDeDatos.singular = 'maquina';
    this.urlBusqueda = '/buscar';
  }
  
  buscarMaquinasPorDepartamento(NOMBRE_DEPTO: string): any {
    const url = URL_SERVICIOS + `/maquina`    ;
    return this.http.get( url ).pipe(
      map( ( resp: any ) => {
        return resp.maquinas;
      }), 
      catchError( err => {
        this._msjService.err(err);
        return throwError(err);
      })
    );
  }

}
