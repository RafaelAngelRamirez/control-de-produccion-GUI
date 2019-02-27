import { Component, OnInit, Input } from '@angular/core';

/**
 *Este componente se encarga de los generales para 
 listar los elementos y mandarlos a crear, modificar, eliminar y ver detalles. 
 *
 * @export
 * @class GeneralComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styles: []
})
export class GeneralComponent implements OnInit {

  /**
   *El callback para crear un nuevo elemento. 
   *
   * @type {*}
   * @memberof GeneralComponent
   */
  @Input() cbCrear;

  

  /**
   *Muestra el contenedor para empezar a animarlo.
   *
   * @type {boolean}
   * @memberof GeneralComponent
   */
  @Input() mostrarLista: boolean = true;
  /**
   *Cambia las clases para empezar a animar el contenedor. 
   *
   * @type {boolean}
   * @memberof CrearModificarComponent
   */
  @Input() crearModificar: boolean;

  /**
   *El callback que contiene las acciones para la busqueda. 
   *
   * @type {*}
   * @memberof GeneralComponent
   */
  @Input( ) cbBuscar: any;




  constructor() { }

  ngOnInit() {
  }

  /**
   *Ejecuta el callback cbcrear
   *
   * @memberof GeneralComponent
   */
  crear(){
    this.cbCrear();
  }

  /**
   *Ejecuta el callback cbBuscar
   *
   * @param {string} termino El termindo escrito. 
   * @memberof GeneralComponent
   */
  buscar( termino: string ) {
    this.cbBuscar(termino)
  }

  

}