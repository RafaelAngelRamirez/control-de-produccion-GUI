import { NgModule } from '@angular/core'
import { DashboardComponent } from './dashboard/dashboard.component'
import { SharedModule } from '../shared/shared.module'
import { PAGES_ROUTES } from './pages.routes'

import { AccountsSettingsComponent } from './accounts-settings/accounts-settings.component'
import { ProfileComponent } from './profile/profile.component'

// Sistema
import { SeguimientoDeFoliosComponent } from './seguimiento-de-folios/seguimiento-de-folios.component'
import { MaterialesComponent } from './departamentos/materiales/materiales.component'
import { TransformacionComponent } from './departamentos/transformacion/transformacion.component'
import { PulidoComponent } from './departamentos/pulido/pulido.component'
import { SeleccionComponent } from './departamentos/seleccion/seleccion.component'
import { PastillaComponent } from './departamentos/pastilla/pastilla.component'
import { EmpaqueComponent } from './departamentos/empaque/empaque.component'
import { GestionDepartamentoComponent } from './departamentos/gestion-departamento/gestion-departamento.component'
import { IndicadorDeChecadasComponent } from './reportes/indicador-de-checadas/indicador-de-checadas.component'
import { ClientesComponent } from './clientes/clientes.component'
import { ControlDeProduccionComponent } from './departamentos/control-de-produccion/control-de-produccion.component'
import { ProductoTerminadoComponent } from './departamentos/producto-terminado/producto-terminado.component'
import { MetalizadoComponent } from './departamentos/metalizado/metalizado.component'
import { BuratoComponent } from './departamentos/burato/burato.component'
import { BarnizadoComponent } from './departamentos/barnizado/barnizado.component'
import { LaserComponent } from './departamentos/laser/laser.component'
import { AlmacenDeBotonComponent } from './departamentos/almacen-de-boton/almacen-de-boton.component'
import { FamiliaDeProcesosComponent } from './gestionDeProcesos/familia-de-procesos/familia-de-procesos.component'
import { ProcesosComponent } from './gestionDeProcesos/procesos/procesos.component'
import { MaquinasComponent } from './gestionDeProcesos/maquinas/maquinas.component'
import { FamiliaDeProcesosDetalleComponent } from './gestionDeProcesos/familia-de-procesos/familia-de-procesos-detalle.component'
import { ProcesosDetalleComponent } from './gestionDeProcesos/procesos/procesos-detalle.component'
import { MaquinasDetalleComponent } from './gestionDeProcesos/maquinas/maquinas-detalle.component'
import { MaquinasCrearModificarComponent } from './gestionDeProcesos/maquinas/maquinas-crear-modificar.component'
import { ModalComponent } from './utilidadesPages/utilidades-tipo-crud-para-GUI/plantillas/modal.component'
import { CrearModificarComponent } from './utilidadesPages/utilidades-tipo-crud-para-GUI/plantillas/crear-modificar.component'
import { GeneralComponent } from './utilidadesPages/utilidades-tipo-crud-para-GUI/plantillas/general.component'
import { ProcesosCrearModificarComponent } from './gestionDeProcesos/procesos/procesos-crear-modificar.component'
import { ModelosCrearModificarComponent } from './gestionDeProcesos/modelos/modelos-crear-modificar.component'
import { ModelosDetalleComponent } from './gestionDeProcesos/modelos/modelos-detalle.component'
import { TamanosCrearModificarComponent } from './gestionDeProcesos/tamanos/tamanos-crear-modificar.component'
import { TamanosDetalleComponent } from './gestionDeProcesos/tamanos/tamanos-detalle.component'
import { TamanosComponent } from './gestionDeProcesos/tamanos/tamanos.component'
import { ColoresCrearModificarComponent } from './gestionDeProcesos/colores/colores-crear-modificar.component'
import { ColoresDetalleComponent } from './gestionDeProcesos/colores/colores-detalle.component'
import { ColoresComponent } from './gestionDeProcesos/colores/colores.component'
import { TerminadosDetalleComponent } from './gestionDeProcesos/terminados/terminados-detalle.component'
import { TerminadosComponent } from './gestionDeProcesos/terminados/terminados.component'
import { TerminadosCrearModificarComponent } from './gestionDeProcesos/terminados/terminados-crear-modificar.component'
import { ModelosCompletosCrearModificarComponent } from './gestionDeProcesos/modelos-completos/modelos-completos-crear-modificar.component'
import { ModelosCompletosDetalleComponent } from './gestionDeProcesos/modelos-completos/modelos-completos-detalle.component'
import { ModelosCompletosComponent } from './gestionDeProcesos/modelos-completos/modelos-completos.component'
import { ModelosComponent } from './gestionDeProcesos/modelos/modelos.component'
import { FamiliaDeProcesosCrearModificarComponent } from './gestionDeProcesos/familiaDeProcesos/familia-de-procesos-crear-modificar.component'
import { LaserReporteComponent } from './reportes/produccion/laser-reporte/laser-reporte.component'
import { TransformacionReporteComponent } from './reportes/produccion/transformacion-reporte/transformacion-reporte.component'
import { QuimicaReporteComponent } from './reportes/produccion/quimica-reporte/quimica-reporte.component'
import { TransformacionReporteSimplificadoComponent } from './reportes/produccion/transformacion-reporte/transformacion-reporte-simplificado.component'
import { SortableColumnComponent } from '../directives/sortableComponent/sortable-column/sortable-column.component'
import { SortableTableDirective } from '../directives/sortableComponent/sortable-table.directive'
import { PruebaParaDetallesComponent } from './prueba-para-detalles/prueba-para-detalles.component'
import { FoliosCrearModificarComponent } from './gestionDeFolios/folios/folios-crear-modificar.component'
import { FoliosDetalleComponent } from './gestionDeFolios/folios/folios-detalle.component'
import { FoliosComponent } from './gestionDeFolios/folios/folios.component'
import { PedidosCrearModificarComponent } from './gestionDeFolios/pedidos/pedidos-crear-modificar.component'
import { OrdenesCrearModificarComponent } from './gestionDeFolios/ordenes/ordenes-crear-modificar.component'
import { OrdenesComponent } from './gestionDeFolios/ordenes/ordenes.component'
import { RevisionDeFoliosComponent } from './gestionDeFolios/revision/revision-de-folios/revision-de-folios.component'
import { FoliosCrearModificarAbstractoComponent } from './gestionDeFolios/folios/abstractos/folios-crear-modificar-abstracto.component'
import { RevisionDeOrdenesAbstractoComponent } from './gestionDeFolios/revision/revision-de-ordenes-abstracto/revision-de-ordenes-abstracto.component'
import { FoliosSeguimientoComponent } from './gestionDeFolios/seguimiento/folios-seguimiento/folios-seguimiento.component'
import { ClientesCrearModificarComponent } from './clientes/clientes-crear-modificar.component'
import { ClientesDetalleComponent } from './clientes/clientes-detalle.component'
import { AlmacenDeProductoTerminadoCrearModificarComponent } from './almacenes/almacenDeProductoTerminado/almacen-de-producto-terminado-crear-modificar.component'
import { AlmacenDeProductoTerminadoDetalleComponent } from './almacenes/almacenDeProductoTerminado/almacen-de-producto-terminado-detalle.component'
import { AlmacenDeProductoTerminadoComponent } from './almacenes/almacenDeProductoTerminado/almacen-de-producto-terminado.component'
import { AlmacenDeProductoTerminadoCrearModificarEntradaComponent } from './almacenes/almacenDeProductoTerminado/es/almacen-de-producto-terminado-crear-modificar-entrada/almacen-de-producto-terminado-crear-modificar-entrada.component'
import { AlmacenDeProductoTerminadoCrearModificarSalidaComponent } from './almacenes/almacenDeProductoTerminado/es/almacen-de-producto-terminado-crear-modificar-salida/almacen-de-producto-terminado-crear-modificar-salida.component'
import { AlmacenDeProductoTerminadoCrearModificarDevolucionComponent } from './almacenes/almacenDeProductoTerminado/es/almacen-de-producto-terminado-crear-modificar-devolucion/almacen-de-producto-terminado-crear-modificar-devolucion.component'
import { LoteDetalleComponent } from './gestionDeProcesos/modelos-completos/lotes/lote-detalle/lote-detalle.component'
import { StockAlmacenProductoTerminadoComponent } from './almacenes/almacenDeProductoTerminado/stock/stock-almacen-producto-terminado.component'
import { AlmacenDeMateriaPrimaYHerramientasCrearModificarSalidaComponent } from './almacenes/almacenDeMateriaPrimaYHerramientas/almacen-de-materia-prima-yherramientas-crear-modificar-salida.component'
import { AlmacenDeMateriaPrimaYHerramientasCrearModificarEntradaComponent } from './almacenes/almacenDeMateriaPrimaYHerramientas/almacen-de-materia-prima-yherramientas-crear-modificar-entrada.component'
import { AlamacenProduccion } from './almacenes/almacenDeMateriaPrimaYHerramientas/almacen-produccion.component'
import { AlmacenDescripcionCrearModificarComponent } from './almacenes/almacenDescripcion/almacen-descripcion-crear-modificar.component'
import { AlmacenDescripcionDetalleComponent } from './almacenes/almacenDescripcion/almacen-descripcion-detalle.component'
import { AlmacenDescripcionComponent } from './almacenes/almacenDescripcion/almacen-descripcion.component'
import { ArticuloCrearModificarComponent } from './almacenes/articulo/articulo-crear-modificar.component'
import { ArticuloDetalleComponent } from './almacenes/articulo/articulo-detalle.component'
import { ArticuloComponent } from './almacenes/articulo/articulo.component'
import { ProveedorCrearModificarComponent } from './proveedor/proveedor-crear-modificar.component'
import { ProveedorDetalleComponent } from './proveedor/proveedor-detalle.component'
import { ProveedorComponent } from './proveedor/proveedor.component'
import { DivisaCrearModificarComponent } from './divisa/divisa-crear-modificar.component'
import { DivisaDetalleComponent } from './divisa/divisa-detalle.component'
import { DivisaComponent } from './divisa/divisa.component'
import { TenidoComponent } from './departamentos/tenido/tenido/tenido.component'
import { RequisicionCrearModificarComponent } from './almacenes/requisicion/requisicion-crear-modificar.component'
import { RequisicionDetalleComponent } from './almacenes/requisicion/requisicion-detalle.component'
import { RequisicionComponent } from './almacenes/requisicion/requisicion.component'
import { RequisicionEstatusGeneralComponent } from './almacenes/requisicion/estatus/requisicion-estatus-general/requisicion-estatus-general.component'
import { RequisicionEstatusEsRequisicionComponent } from './almacenes/requisicion/estatus/requisicion-estatus-es-requisicion/requisicion-estatus-es-requisicion.component'
import { RequisicionEstatusEsOrdenDeCompraComponent } from './almacenes/requisicion/estatus/requisicion-estatus-es-orden-de-compra/requisicion-estatus-es-orden-de-compra.component'
import { RequisicionEstatusEsEntregaParcialComponent } from './almacenes/requisicion/estatus/requisicion-estatus-es-entrega-parcial/requisicion-estatus-es-entrega-parcial.component'
import { RequisicionEstatusEsTerminadaComponent } from './almacenes/requisicion/estatus/requisicion-estatus-es-terminada/requisicion-estatus-es-terminada.component'
import { RequisicionEstatusEsCanceladaComponent } from './almacenes/requisicion/estatus/requisicion-estatus-es-cancelada/requisicion-estatus-es-cancelada.component'
import { RecibirParcialidadComponent } from './almacenes/requisicion/estatus/requisicion-estatus-es-entrega-parcial/recibirParcialidad/recibir-parcialidad.component'
import { RecibirTerminacionComponent } from './almacenes/requisicion/estatus/requisicion-estatus-es-terminada/recibir-terminacion/recibir-terminacion.component'
import { RecibirCancelacionComponent } from './almacenes/requisicion/estatus/requisicion-estatus-es-cancelada/recibir-cancelacion/recibir-cancelacion.component'
import { RequisicionFiltrosComponent } from './almacenes/requisicion/requisicion-filtros/requisicion-filtros.component'
import { EmpleadoCrearModificarComponent } from './recursosHumanos/empleado/empleado-crear-modificar.component'
import { EmpleadoDetalleComponent } from './recursosHumanos/empleado/empleado-detalle.component'
import { EmpleadoComponent } from './recursosHumanos/empleado/empleado.component'
import { CursosCrearModificarComponent } from './recursosHumanos/cursos/cursos-crear-modificar.component'
import { CursosDetalleComponent } from './recursosHumanos/cursos/cursos-detalle.component'
import { CursosComponent } from './recursosHumanos/cursos/cursos.component'
import { AreasCrearModificarComponent } from './recursosHumanos/areas/areas-crear-modificar.component'
import { AreasDetalleComponent } from './recursosHumanos/areas/areas-detalle.component'
import { AreasComponent } from './recursosHumanos/areas/areas.component'
import { PuestosCrearModificarComponent } from './recursosHumanos/puestos/puestos-crear-modificar.component'
import { PuestosDetalleComponent } from './recursosHumanos/puestos/puestos-detalle.component'
import { PuestosComponent } from './recursosHumanos/puestos/puestos.component'
import { DepartamentoCrearModificarComponent } from './departamento/departamento-crear-modificar.component'
import { DepartamentoDetalleComponent } from './departamento/departamento-detalle.component'
import { DepartamentoComponent } from './departamento/departamento.component'
import { EmpleadoFiltrosComponent } from './recursosHumanos/empleado/empleado-filtros/empleado-filtros.component'
import { EmpleadoEventoCursoComponent } from './recursosHumanos/empleado/empleado-eventos/empleado-evento-curso.component'
import { EmpleadoEventoVacacionesComponent } from './recursosHumanos/empleado/empleado-eventos/empleado-evento-vacaciones.component'
import { EmpleadoEventoCambioDeSueldoComponent } from './recursosHumanos/empleado/empleado-eventos/empleado-evento-cambio-de-sueldo.component'
import { EmpleadoEventoPuestoComponent } from './recursosHumanos/empleado/empleado-eventos/empleado-evento-puesto.component'
import { EmpleadoEventoFelicitacionesPorEscritoComponent } from './recursosHumanos/empleado/empleado-eventos/empleado-evento-felicitaciones-por-escrito.component'
import { EmpleadoEventoAmonestacionesPorEscritoComponent } from './recursosHumanos/empleado/empleado-eventos/empleado-evento-amonestaciones-por-escrito.component'
import { EmpleadoEventoCastigoComponent } from './recursosHumanos/empleado/empleado-eventos/empleado-evento-castigo.component'
import { EmpleadoEventoPermisoComponent } from './recursosHumanos/empleado/empleado-eventos/empleado-evento-permiso.component'
import { EmpleadoEventoBonoComponent } from './recursosHumanos/empleado/empleado-eventos/empleado-evento-bono.component'
import { EmpleadoEventoEstatusLaboralComponent } from './recursosHumanos/empleado/empleado-eventos/empleado-evento-estatus-laboral.component'
import { EmpleadoEventoManejadorComponent } from './recursosHumanos/empleado/empleado-eventos/empleado-evento-manejador.component'
import { EmpleadoEventoPlantillaComponent } from './recursosHumanos/empleado/empleado-eventos/empleado-evento-plantilla/empleado-evento-plantilla.component'
import { EmpleadoEventoAgregarCursoComponent } from './recursosHumanos/empleado/empleado-eventos-crear/empleado-evento-agregar-curso.component'
import { EmpleadoEventosCrearModalComponent } from './recursosHumanos/empleado/empleado-eventos-crear/empleado-eventos-crear-modal/empleado-eventos-crear-modal.component'
import { EmpleadoAgregarVacacionesComponent } from './recursosHumanos/empleado/empleado-eventos-crear/empleado-agregar-vacaciones.component'
import { EmpleadoAgregarCambiosDeSueldoComponent } from './recursosHumanos/empleado/empleado-eventos-crear/empleado-agregar-cambios-de-sueldo.component'
import { EmpleadoAgregarPuestoComponent } from './recursosHumanos/empleado/empleado-eventos-crear/empleado-agregar-puesto.component'
import { EmpleadoAgregarFelicitacionPorEscritoComponent } from './recursosHumanos/empleado/empleado-eventos-crear/empleado-agregar-felicitacion-por-escrito.component'
import { EmpleadoAgregarAmonestacionPorEscritoComponent } from './recursosHumanos/empleado/empleado-eventos-crear/empleado-agregar-amonestacion-por-escrito.component'
import { EmpleadoAgregarCastigoComponent } from './recursosHumanos/empleado/empleado-eventos-crear/empleado-agregar-castigo.component'
import { EmpleadoAgregarPermisoComponent } from './recursosHumanos/empleado/empleado-eventos-crear/empleado-agregar-permiso.component'
import { EmpleadoAgregarBonoComponent } from './recursosHumanos/empleado/empleado-eventos-crear/empleado-agregar-bono.component'
import { EmpleadoAgregarEstatusLaboralComponent } from './recursosHumanos/empleado/empleado-eventos-crear/empleado-agregar-estatus-laboral.component'
import { AlmacenESComponent } from './alamacenes/almacen-es/almacen-es.component'
import { ReporteDeFaltantesProductoTerminadoComponent } from './reportes/reporte-de-faltantes-producto-terminado/reporte-de-faltantes-producto-terminado.component'
import { ReporteDeFaltantesAlmacenDeProduccionComponent } from './reportes/reporte-de-faltantes-almacen-de-produccion/reporte-de-faltantes-almacen-de-produccion.component'
import { ReportePersonalizadoAlmacenProduccionCrearModificarComponent } from './almacenes/reportePersonalizadoAlmacenProduccion/reporte-personalizado-almacen-produccion-crear-modificar.component'
import { ReportePersonalizadoAlmacenProduccionDetalleComponent } from './almacenes/reportePersonalizadoAlmacenProduccion/reporte-personalizado-almacen-produccion-detalle.component'
import { RPersonalizadoAlmacenProduccionComponent } from './reportes/r-personalizado-almacen-produccion/r-personalizado-almacen-produccion.component'
import { ReportePersonalizadoAlmacenProduccionComponent } from './almacenes/reportePersonalizadoAlmacenProduccion/reporte-personalizado-almacen-produccion.component'
import { ProgramacionTransformacionComponent } from './programacion/programacion-transformacion/programacion-transformacion.component'
import { CommonModule } from '@angular/common'
import { ProgramacionTransformacionReporteComponent } from './programacion/programacion-transformacion/programacion-transformacion-reporte/programacion-transformacion-reporte.component'
import { UsuarioCrearComponent } from './usuarios/usuario-crear/usuario-crear.component'
import { UsuarioDetalleComponent } from './usuarios/usuario-detalle/usuario-detalle.component'
import { UsuarioLeerComponent } from './usuarios/usuario-leer/usuario-leer.component'
import { ProcesosInicialesYFinalesComponent } from './parametros/procesos-iniciales-yfinales/procesos-iniciales-yfinales.component';
import { ProcesosEspecialesComponent } from './parametros/procesos-especiales/procesos-especiales.component';
import { AdministradorComponent } from './parametros/administrador/administrador.component';
import { EstacionesDeEscaneoComponent } from './parametros/estaciones-de-escaneo/estaciones-de-escaneo.component';
import { CreadorDeFormulariosComponent } from './parametros/estaciones-de-escaneo/creador-de-formularios/creador-de-formularios.component';

@NgModule({
  declarations: [
    // PagesComponent,
    DashboardComponent,

    AccountsSettingsComponent,
    ProfileComponent,
    // sistema
    SeguimientoDeFoliosComponent,
    MaterialesComponent,
    TransformacionComponent,
    PulidoComponent,
    SeleccionComponent,
    PastillaComponent,
    EmpaqueComponent,
    GestionDepartamentoComponent,
    IndicadorDeChecadasComponent,
    ClientesComponent,
    ControlDeProduccionComponent,
    ProductoTerminadoComponent,
    MetalizadoComponent,
    BuratoComponent,
    BarnizadoComponent,
    LaserComponent,
    AlmacenDeBotonComponent,
    FamiliaDeProcesosComponent,
    ProcesosComponent,
    ProcesosDetalleComponent,
    MaquinasComponent,
    FamiliaDeProcesosDetalleComponent,
    MaquinasDetalleComponent,
    MaquinasCrearModificarComponent,
    ModalComponent,
    CrearModificarComponent,
    GeneralComponent,
    ProcesosCrearModificarComponent,
    ModelosCrearModificarComponent,
    ModelosDetalleComponent,
    ModelosComponent,
    TamanosCrearModificarComponent,
    TamanosDetalleComponent,
    TamanosComponent,
    ColoresCrearModificarComponent,
    ColoresDetalleComponent,
    ColoresComponent,
    TerminadosDetalleComponent,
    TerminadosComponent,
    TerminadosCrearModificarComponent,
    ModelosCompletosCrearModificarComponent,
    ModelosCompletosDetalleComponent,
    ModelosCompletosComponent,
    FamiliaDeProcesosCrearModificarComponent,
    LaserReporteComponent,
    TransformacionReporteComponent,
    QuimicaReporteComponent,
    TransformacionReporteSimplificadoComponent,
    SortableColumnComponent,
    SortableTableDirective,
    PruebaParaDetallesComponent,
    FoliosCrearModificarComponent,
    FoliosDetalleComponent,
    FoliosComponent,
    PedidosCrearModificarComponent,
    OrdenesCrearModificarComponent,
    OrdenesComponent,
    RevisionDeFoliosComponent,
    FoliosCrearModificarAbstractoComponent,
    RevisionDeOrdenesAbstractoComponent,
    FoliosSeguimientoComponent,
    ClientesCrearModificarComponent,
    ClientesDetalleComponent,
    AlmacenDeProductoTerminadoCrearModificarComponent,
    AlmacenDeProductoTerminadoDetalleComponent,
    AlmacenDeProductoTerminadoComponent,
    AlmacenDeProductoTerminadoCrearModificarEntradaComponent,
    AlmacenDeProductoTerminadoCrearModificarSalidaComponent,
    AlmacenDeProductoTerminadoCrearModificarDevolucionComponent,
    LoteDetalleComponent,
    StockAlmacenProductoTerminadoComponent,
    AlmacenDeMateriaPrimaYHerramientasCrearModificarSalidaComponent,
    AlmacenDeMateriaPrimaYHerramientasCrearModificarEntradaComponent,
    AlamacenProduccion,
    AlmacenDescripcionCrearModificarComponent,
    AlmacenDescripcionDetalleComponent,
    AlmacenDescripcionComponent,
    ArticuloCrearModificarComponent,
    ArticuloDetalleComponent,
    ArticuloComponent,
    ProveedorCrearModificarComponent,
    ProveedorDetalleComponent,
    ProveedorComponent,
    DivisaCrearModificarComponent,
    DivisaDetalleComponent,
    DivisaComponent,
    TenidoComponent,
    RequisicionCrearModificarComponent,
    RequisicionDetalleComponent,
    RequisicionComponent,
    RequisicionEstatusGeneralComponent,
    RequisicionEstatusEsRequisicionComponent,
    RequisicionEstatusEsOrdenDeCompraComponent,
    RequisicionEstatusEsEntregaParcialComponent,
    RequisicionEstatusEsTerminadaComponent,
    RequisicionEstatusEsCanceladaComponent,
    RecibirParcialidadComponent,
    RecibirTerminacionComponent,
    RecibirCancelacionComponent,
    RequisicionFiltrosComponent,
    EmpleadoCrearModificarComponent,
    EmpleadoDetalleComponent,
    EmpleadoComponent,
    CursosCrearModificarComponent,
    CursosDetalleComponent,
    CursosComponent,
    AreasCrearModificarComponent,
    AreasDetalleComponent,
    AreasComponent,
    PuestosCrearModificarComponent,
    PuestosDetalleComponent,
    PuestosComponent,
    DepartamentoCrearModificarComponent,
    DepartamentoDetalleComponent,
    DepartamentoComponent,
    EmpleadoFiltrosComponent,
    EmpleadoEventoCursoComponent,
    EmpleadoEventoVacacionesComponent,
    EmpleadoEventoCambioDeSueldoComponent,
    EmpleadoEventoPuestoComponent,
    EmpleadoEventoFelicitacionesPorEscritoComponent,
    EmpleadoEventoAmonestacionesPorEscritoComponent,
    EmpleadoEventoCastigoComponent,
    EmpleadoEventoPermisoComponent,
    EmpleadoEventoBonoComponent,
    EmpleadoEventoEstatusLaboralComponent,
    EmpleadoEventoManejadorComponent,
    EmpleadoEventoPlantillaComponent,
    EmpleadoEventoAgregarCursoComponent,
    EmpleadoEventosCrearModalComponent,
    EmpleadoAgregarVacacionesComponent,
    EmpleadoAgregarCambiosDeSueldoComponent,
    EmpleadoAgregarPuestoComponent,
    EmpleadoAgregarFelicitacionPorEscritoComponent,
    EmpleadoAgregarAmonestacionPorEscritoComponent,
    EmpleadoAgregarCastigoComponent,
    EmpleadoAgregarPermisoComponent,
    EmpleadoAgregarBonoComponent,
    EmpleadoAgregarEstatusLaboralComponent,
    AlmacenESComponent,
    ReporteDeFaltantesProductoTerminadoComponent,
    ReporteDeFaltantesAlmacenDeProduccionComponent,
    ReportePersonalizadoAlmacenProduccionCrearModificarComponent,
    ReportePersonalizadoAlmacenProduccionDetalleComponent,
    RPersonalizadoAlmacenProduccionComponent,
    ReportePersonalizadoAlmacenProduccionComponent,
    ProgramacionTransformacionComponent,
    ProgramacionTransformacionReporteComponent,
    UsuarioCrearComponent,
    UsuarioDetalleComponent,
    UsuarioLeerComponent,
    ProcesosInicialesYFinalesComponent,
    ProcesosEspecialesComponent,
    AdministradorComponent,
    EstacionesDeEscaneoComponent,
    CreadorDeFormulariosComponent
  ],
  exports: [],
  imports: [CommonModule, SharedModule.forRoot(), PAGES_ROUTES],
  providers: []
  // Para permitir la carga dinamica de componentes.
})
export class PagesModule {}
