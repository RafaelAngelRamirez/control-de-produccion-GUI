import { HistorialDePuesto } from "./historialDePuesto.model"
import { Departamento } from "../../departamento.models"
import { Empleado } from "../empleados/empleado.model"
import { PerfilDelPuesto } from "./perfilDelPuesto.model"
import { FuncionesEspecificasDelPuesto } from "./funcionesEspecificasDelPuesto.model"
import { Curso } from "../cursos/curso.model"
import { PuestoAprobaciones } from "./puestoAprobaciones.model"
import { Deserializable } from "../../deserealizable.model"
import { Puesto_RelacionClienteProveedor } from "./puesto_relacionClienteProveedor.model"
import { Puesto_MotivoDeCambio } from "./puesto_motivoDeCambio.model"
export class Puesto implements Deserializable {
  constructor(
    public _id?: string,
    public motivoDeCambio: Puesto_MotivoDeCambio[] = [],
    public fechaDeCreacionDePuesto?: Date,
    public vigenciaEnAnios?: number,
    // public historial: HistorialDePuesto[] = [],
    public cursosRequeridos: Curso[] = [],
    public puesto?: string,
    public departamento?: Departamento,
    public reportaA: Puesto = null,
    //Se genera desde la GUI.
    public organigrama?: string,
    public misionDelPuesto?: string,
    public personalACargo: Puesto[] = [],
    public perfilDelPuesto: PerfilDelPuesto = new PerfilDelPuesto(),
    public funcionesEspecificasDelPuesto: FuncionesEspecificasDelPuesto[] = [],
    public relacionClienteProveedor: Puesto_RelacionClienteProveedor = new Puesto_RelacionClienteProveedor(),
    public indicesDeEfectividad: string[] = [],
    public elPuestoPuedeDesarrollarseEnLasSiguientesAreas: Puesto[] = [],
    public quien: PuestoAprobaciones = new PuestoAprobaciones(),
    public sueldoBase?: number,
    public sueldoMaximo?: number,
    public numeroDeExtencion?: number
  ) {}

  deserialize(input: this): this {
    if (!input) return this
    Object.assign(this, input)
    this.deserialize1(input)
    this.deserialize2(input)
    this.deserialize3(input)
    return this
  }

  private deserialize1(input: this) {
    this.fechaDeCreacionDePuesto = new Date(input.fechaDeCreacionDePuesto)

    this.motivoDeCambio = input.motivoDeCambio.map((motivo) =>
      new Puesto_MotivoDeCambio().deserialize(motivo)
    )

    if (input.hasOwnProperty("cursosRequeridos")) {
      this.cursosRequeridos = input.cursosRequeridos.map((x) => {
        return new Curso().deserialize(x)
      })
    }
  }
  private deserialize2(input) {
    this.departamento = new Departamento().deserialize(input.departamento)
    this.reportaA = input.reportaA
      ? new Puesto().deserialize(input.reportaA)
      : null
    if (input.hasOwnProperty("personalACargo")) {
      this.personalACargo = input.personalACargo.map((x) => {
        return new Puesto().deserialize(x)
      })
    }
  }
  private deserialize3(input) {
    this.perfilDelPuesto = new PerfilDelPuesto().deserialize(
      this.perfilDelPuesto
    )
    if (input.hasOwnProperty("funcionesEspecificasDelPuesto")) {
      this.funcionesEspecificasDelPuesto = input.funcionesEspecificasDelPuesto.map(
        (x) => {
          return new FuncionesEspecificasDelPuesto().deserialize(x)
        }
      )
    }
    this.relacionClienteProveedor = new Puesto_RelacionClienteProveedor().deserialize(
      input.relacionClienteProveedor
    )

    if (
      input.hasOwnProperty("elPuestoPuedeDesarrollarseEnLasSiguientesAreas")
    ) {
      this.elPuestoPuedeDesarrollarseEnLasSiguientesAreas = input.elPuestoPuedeDesarrollarseEnLasSiguientesAreas.map(
        (x) => {
          return new Departamento().deserialize(x)
        }
      )
    }
    this.quien = new PuestoAprobaciones().deserialize(input.quien)
  }
}
