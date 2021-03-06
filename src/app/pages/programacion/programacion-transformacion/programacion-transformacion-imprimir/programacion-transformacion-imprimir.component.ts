import { Component, OnInit, Input } from '@angular/core'
import { Maquina } from 'src/app/models/maquina.model'
import { ProgramacionTransformacionService } from '../../../../services/programacion-transformacion.service'
import { DefaultsService } from '../../../../services/configDefualts/defaults.service'
import { FolioService } from '../../../../services/folio/folio.service'
import { Folio } from '../../../../models/folio.models'
import { FolioLinea } from 'src/app/models/folioLinea.models'
import {
  FolioNewService,
  OrdenLigera
} from '../../../../services/folio/folio-new.service'
import { Orden } from '../../../../models/orden.models'
import { forkJoin } from 'rxjs'

@Component({
  selector: 'app-programacion-transformacion-imprimir',
  templateUrl: './programacion-transformacion-imprimir.component.html',
  styleUrls: ['./programacion-transformacion-imprimir.component.css']
})
export class ProgramacionTransformacionImprimirComponent implements OnInit {
  transformacion: string

  @Input() maquinas: Maquina[] = []

  ordenDetalle: Orden = null
  folioDetalle: Folio = null
  pedidoDetalle: FolioLinea = null
  ordenDetalleGeneral: Orden = null
  termino = {
    1: 'er',
    2: 'do',
    3: 'er',
    4: 'to',
    5: 'to'
  }

  constructor(
    public ps: ProgramacionTransformacionService,
    public dfs: DefaultsService,
    public folioService: FolioNewService
  ) {}

  ngOnInit(): void {}

  cargarFolio(id: string) {
    this.folioDetalle = null
    this.folioService.detalleFolio(id).subscribe(
      fol => {
        this.folioDetalle = fol
      },
      err => {
        throw err
      }
    )
  }

  obtenerDetalleDeFolio(idFolio: string) {
    this.folioService.findById(idFolio).subscribe(folio => {
      this.folioDetalle = folio
    })
  }
}
