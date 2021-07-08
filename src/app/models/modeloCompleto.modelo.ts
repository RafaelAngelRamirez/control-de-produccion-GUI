import { Modelo } from "./modelo.models"
import { Tamano } from "./tamano.models"
import { Color } from "./color.models"
import { Terminado } from "./terminado.models"
import { Laser } from "./laser.models"
import { FamiliaDeProcesos } from "./familiaDeProcesos.model"
import { Procesos } from "./procesos.model"
import { BasicosGUI } from "./basicosGUI.model"
import { Lotes } from "./almacenProductoTerminado/lotes.model"
import { ModeloCompletoService } from "../services/modelo/modelo-completo.service"
import { IBasicosModel } from "./interfaces/iBasicosModel"
import { Proceso } from './proceso.model'

export class ModeloCompleto
  implements BasicosGUI, IBasicosModel<ModeloCompletoService> {
  
  _servicio: ModeloCompletoService
  editado: boolean

  constructor(
    public _id?: string,
    public modelo: Modelo = new Modelo(),
    public tamano: Tamano = new Tamano(),
    public color: Color = new Color(),
    public terminado: Terminado = new Terminado(),
    public laserAlmacen: Laser = new Laser(),
    public versionModelo?: String,
    public medias: boolean = false,
    public nombreCompleto?: string,
    public familiaDeProcesos: FamiliaDeProcesos = new FamiliaDeProcesos(),
    public esBaston: boolean = false,

    public existencia: number = 0,
    public lotes: Lotes[] = [],
    public stockMinimo: number = 0,
    public stockMaximo: number = 0,
    
    public procesosEspeciales: Procesos[] = [],
    // Posiblemente es para los costos.
    public espesor?: number,
    public porcentajeDeMerma?: number,
    // Este es solo para modificaciones de las órdenes.
    public mediasGeneradas: boolean = false, // Para ordenamiento
    public parte: "A" | "B" | "C" | "N" | "DES " | "ESP" = "C"
  ) {}

  deserialize(input: this): this {
    
    Object.assign(this, input)

    this.modelo = new Modelo().deserialize(input.modelo)
    
    this.tamano = new Tamano().deserialize(input.tamano)
    
    this.color = new Color().deserialize(input.color)
    
    this.terminado = new Terminado().deserialize(input.terminado)
    
    this.laserAlmacen = new Laser().deserialize(input.laserAlmacen)
    
    this.familiaDeProcesos = new FamiliaDeProcesos().deserialize(
      input.familiaDeProcesos
    )
    
      if (input.procesosEspeciales) {
        this.procesosEspeciales = input.procesosEspeciales.map(proceso =>
          new Procesos().deserialize(proceso)
        )
      }
    

    return this
  }

  // Convierte un json a una clase de este tipo
  //  desde un arreglo.
  static fromJSON_Array(data: any[]) {
    return data.map((x) => (x = ModeloCompleto.fromJSON(x)))
  }

  // Convierte un JSON a esta claser.
  static fromJSON(data: any) {
    // Convertimos todos los objetos en clases.
    data.modelo = Modelo.fromJSON(data.modelo)
    data.tamano = Tamano.fromJSON(data.tamano)
    data.color = Color.fromJSON(data.color)
    data.terminado = Terminado.fromJSON(data.terminado)
    data.laserAlmacen = Laser.fromJSON(data.laserAlmacen)
    data.familiaDeProcesos = FamiliaDeProcesos.fromJSON(data.familiaDeProcesos)
    data.procesosEspeciales = Procesos.fromJSON_Array(data.procesosEspeciales)
    return Object.assign(new this(), data)
  }

  static nombreCom(x) {
    let nombreCompleto = ""
    nombreCompleto += x.modelo ? x.modelo.modelo : ""
    nombreCompleto += x.tamano ? "-" + x.tamano.tamano : ""
    nombreCompleto += x.color ? "-" + x.color.color : ""
    nombreCompleto += x.terminado ? "-" + x.terminado.terminado : ""
    nombreCompleto += x.laserAlmacen.laser ? "-" + x.laserAlmacen.laser : ""
    nombreCompleto += x.versionModelo ? "-" + x.versionModelo : ""
    return nombreCompleto
  }


  /**
   *Bandera que senala si se esta cargando la produccion en transito.
   *
   * @type {boolean}
   * @memberof ModeloCompleto
   */
  cargandoProduccionEnTransito: boolean = false

  /**
   *Obtiene la produccion en transito para este modelo en sus respectivos folios.
   *
   **/
  obtenerProduccionEnTransito() {
    this.cargandoProduccionEnTransito = true
    
    this.comprobarServicio(this._servicio)
    this._servicio.obtenerProduccionEnTransito(this._id).subscribe((total) => {
      this.cargandoProduccionEnTransito = false
      // this.produccionEnTransito = total
    })
  }

  comprobarServicio(servicio: ModeloCompletoService)
  {
    if( !servicio) throw 'No has instanciado el servcio.'
  }
 

 
}
