import { Component, OnInit } from '@angular/core'
import { EmpleadoService } from '../../../services/recursosHumanos/empleado.service'
import { DataListComponent } from 'src/app/shared/data-list/data-list.component'
import { ArticuloService } from '../../../services/articulo/articulo.service'
import { Articulo } from 'src/app/models/almacenDeMateriaPrimaYHerramientas/articulo.modelo'
import { Dato } from 'src/app/shared/data-list/dato.model'
import * as $ from 'jquery'
import { Paginacion } from 'src/app/utils/paginacion.util'
@Component({
  selector: 'app-almacen-es',
  templateUrl: './almacen-es.component.html',
  styleUrls: ['./almacen-es.component.css']
})
export class AlmacenESComponent implements OnInit {
  constructor(private articulosService: ArticuloService) {}
  ngOnInit() {}

  articulo: Articulo = null

  se: boolean = false

  dataList: DataListComponent

  ejecutarOperacionesDeBusquedaArticulos(evento) {
    let termino = <string>evento.termino
    this.dataList = <DataListComponent>evento.dataList
    this.articulosService
      .findByTerm(termino, new Paginacion(30, 0, 1, 'nombre'))
      .subscribe(articulos => {
        let datos: Dato[] = []
        articulos.forEach((art: Articulo) => {
          let d = new Dato()
          d.leyendaPrincipal = art.nombre
          d.leyendaSecundaria = `Existencia: ${art.existencia}`
          d.descripcionPrincipal = art.descripcion
          d.descripcionSecundaria =
            'Unidades de almacenamiento en: ' + art.unidad
          d.objeto = art

          datos.push(d)
        })

        this.dataList.terminoBusqueda(datos)
      })
  }

  seleccionar(dato: Dato) {
    this.articulo = dato ? <Articulo>dato.objeto : null
  }

  entradaSalidaGuardada() {
    this.limpiar()
  }
  entradaSalidaCancelada() {
    this.limpiar()
  }

  private limpiar() {
    this.articulo = null
    this.dataList.reiniciar()
  }
}
