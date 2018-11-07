import { Component, OnInit } from '@angular/core';
import { ModeloService } from '../../services/service.index';
import { ModeloCompleto } from '../../models/modeloCompleto.modelo';

@Component({
  selector: 'app-modelos',
  templateUrl: './modelos.component.html',
  styles: []
})
export class ModelosComponent implements OnInit {

  modeloCompleto: ModeloCompleto = new ModeloCompleto();
  modelos: ModeloCompleto [] = [];
  modeloLigero = {
    modelo: '',
    tamano: '',
    color: '',
    terminado: '',
    laserAlmacen: '',
  };

  constructor(
    public _modeloService: ModeloService
  ) {

    _modeloService.cagarModelosCompletos().subscribe( modelos => { this.modelos = modelos; });

   }


  ngOnInit() {
    
  }

  guardar() {
    
  }

}
