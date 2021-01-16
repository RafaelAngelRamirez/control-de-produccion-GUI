import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { ReportesProduccionService } from '../../../services/reportes/reportes-produccion.service'
import { Articulo } from 'src/app/models/almacenDeMateriaPrimaYHerramientas/articulo.modelo'
import { SalidaArticulo } from '../../../models/almacenDeMateriaPrimaYHerramientas/salidaArticulo.model'
import { ImpresionService } from '../../../services/impresion.service'
import { ReportesPersonalizadosAlmacenProduccionService } from '../../../services/reportes-personalizados-almacen-produccion.service'
import { ReportePersonalizadoAlmacenProduccion } from '../../../models/reportePersonalizadoAlmacenProduccion/reportePersonalizadoAlmacenProduccion.model'
import { ExcelService } from '../../../services/excel.service'

@Component({
  selector: 'app-r-personalizado-almacen-produccion',
  templateUrl: './r-personalizado-almacen-produccion.component.html',
  styleUrls: ['./r-personalizado-almacen-produccion.component.css']
})
export class RPersonalizadoAlmacenProduccionComponent implements OnInit {
  reportes: Articulo[]
  cargando: boolean = false
  actualizacion: Date
  detalleSalida

  reporte: ReportePersonalizadoAlmacenProduccion

  constructor(
    private activatedRoute: ActivatedRoute,
    private reportesService: ReportesProduccionService,
    private router: Router,
    private impresionService: ImpresionService,
    private repoPersoService: ReportesPersonalizadosAlmacenProduccionService,
    private excelService: ExcelService
  ) {}
  ngOnInit() {
    this.cargarReporte()
  }

  cargarReporte() {
    this.cargando = true
    this.activatedRoute.paramMap.subscribe(parametros => {
      this.reportesService
        .almacenProduccionPersonalizado(parametros.get('id'))
        .subscribe(
          articulos => {
            this.reportes = articulos
            this.cargando = false
            this.actualizacion = new Date()

            this.repoPersoService
              .findById(parametros.get('id'))
              .subscribe(reporte => (this.reporte = reporte))
          },
          err => {
            this.cargando = false
            this.router.navigate([
              '/reportes/almacenDeProduccion/personalizado/'
            ])
          }
        )
    })
  }

  exportarAExcel() {
    this.excelService.exportAsExcelFile(this.reporte.articulos, "ReportePersonalizado")
  }


  imprimir(articulos: Articulo[]) {
    this.impresionService
      .almacenProduccionPersonalizado(articulos, this.reporte.nombre)
      .imprimir()
  }
}
