import { Component, OnInit } from "@angular/core"
import { QrScannerService } from "../../../components/qr-scanner/qr-scanner.service"
import { ListaDeOrdenesService } from "../../../components/lista-de-ordenes/lista-de-ordenes.service"
import { Pastilla, CantidadesPastilla } from "../../../models/pastilla.model"
import { Usuario } from "../../../models/usuario.model"

import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl,
  FormArray
} from "@angular/forms"
import { ValidacionesService } from "../../../services/utilidades/validaciones.service"
import { GeneralesComponents } from "../../utilidadesPages/generalesComponents"
import { DefaultsService } from "src/app/services/configDefualts/defaults.service"
import { DepartamentosConfig } from "src/app/config/departamentosConfig"
import { FolioService } from "src/app/services/folio/folio.service";
import { DepartamentoService } from "src/app/services/departamento/departamento.service";
import { UsuarioService } from "src/app/services/usuario/usuario.service";

@Component({
  selector: "app-pastilla",
  templateUrl: "./pastilla.component.html",
  styles: []
})
export class PastillaComponent extends GeneralesComponents<Pastilla>
  implements OnInit {
  empleados: Usuario[]
  cantidadesPastilla: CantidadesPastilla[] = [new CantidadesPastilla()]

  // Instanciamos un grupo de formulario de reactiveForms
  //  y que tiene que coincidir con [formGroup]. Este elemento
  //  se pasa como instancia a [formGruop] = "pastillaForm"
  formulario: FormGroup

  constructor(
    public _qrScannerService: QrScannerService<Pastilla>,
    public _listaDeOrdenesService: ListaDeOrdenesService,
    public formBuilder: FormBuilder,
    public _folioService: FolioService,
    public _defaultService: DefaultsService,
    public _departamentoService: DepartamentoService,
    public _validacionesService: ValidacionesService,
    // Propios del departamento.
    public _usuarioService: UsuarioService
  ) {
    super(
      _qrScannerService,
      _listaDeOrdenesService,
      formBuilder,
      _folioService,
      _defaultService,
      _departamentoService
    )
    this.tareasDeConfiguracion(new DepartamentosConfig().PASTILLA)
    this._usuarioService.cargarMateriales().subscribe((usuarios: Usuario[]) => {
      this.empleados = usuarios
    })
  }

  ngOnInit() {
    this.inicialFormulario()
  }

  inicialFormulario() {
    const grupo = {
      // El nombre del objeto tiene que coincidir con
      // el [formControlName] del input en el html.
      // cantidadPastilla: ['', valCantidadDePastilla],
      // espesorPastilla: ['', valEspesor],
      conto: ["", [Validators.required]],
      cantidades: this.formBuilder.array([
        // Inicializamos por lo menos con un valor.
        this.getCantidades()
      ])
    }

    this.formulario = this.formBuilder.group(grupo)
  }

  getCantidades() {
    // Este es la plantilla para crear
    // de manera dinamica los validadores para
    // el arreglo.
    const valPeso10Botones = [
      "",
      [
        Validators.required,
        Validators.min(1),
        Validators.max(1000),
        this._validacionesService.numberValidator
      ]
    ]

    const valPesoTotalBoton = [
      "",
      [
        Validators.required,
        Validators.min(1),
        Validators.max(99),
        this._validacionesService.numberValidator
      ]
    ]

    const valEspesor = [
      "",
      [
        Validators.required,
        Validators.min(0.1),
        Validators.max(99.99),
        this._validacionesService.numberValidator
      ]
    ]
    return this.formBuilder.group({
      espesorPastilla: valPesoTotalBoton,
      peso10Botones: valPeso10Botones,
      pesoTotalBoton: valEspesor
    })
  }

  agregarCantidades() {
    // Obtenemos el control al cual le vamos a agregar
    // la nueva hilera.
    const control = <FormArray>this.formulario.controls["cantidades"]
    control.push(this.getCantidades())
  }

  eliminarCantidades(i: number) {
    // this.cantidadesPastilla.splice(i, 1);
    // this.construirForm() ;
    const control = <FormArray>this.formulario.controls["cantidades"]
    control.removeAt(i)
  }

  public get conto(): AbstractControl {
    return this.formulario.get("conto")
  }

  public get cantidades(): FormArray {
    return <FormArray>this.formulario.get("cantidades")
  }

  trackByFn(index: any) {
    return index
  }

  public _paso(a: any) {
    return a
  }

  totalBoton(): number {
    let t = 0

    this.cantidades.controls.forEach((controles) => {
      let pesoTotalBoton: AbstractControl = controles.get("pesoTotalBoton")
      let peso10Botones: AbstractControl = controles.get("peso10Botones")

      let ptb: number = pesoTotalBoton.value > 0 ? pesoTotalBoton.value : 0
      let p10b: number = peso10Botones.value > 0 ? peso10Botones.value : 0

      if (ptb && p10b) {
        t += (ptb * 1000) / (p10b / 10)
      }
    })

    return t
  }
}
