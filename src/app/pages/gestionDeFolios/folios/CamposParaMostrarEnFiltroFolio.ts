/**
 *Esta clase se encarga de gestionar la visivilidad de los campos de filtracion
 de el grupo de filtro component. 
 *
 * @export
 * @class CamposParaMostrarEnFiltrosFolio
 */
export class CamposParaMostrarEnFiltrosFolio {


    constructor(
        
        private _folio?: boolean,
        private _pedido?: boolean,
        private _cliente?: boolean,
        private _vendedor?: boolean,
        private _modelo?: boolean,
        private _tamano?: boolean,
        private _color?: boolean,
        private _terminado?: boolean,
        private _fechaDeCreacionDesdeEl?: boolean,
        private _fechaDeCreacionHasta?: boolean,
        private _fechaDeEntregaEstimadaDesdeEl?: boolean,
        private _fechaDeEntregaEstimadaHasta?: boolean,
        private _fechaFinalizacionDelFolioDesdeEl?: boolean,
        private _fechaFinalizacionDelFolioHasta?: boolean,
        
     ) {
        
    }


    
    /**
     *Muestra todos los campos de input remplazando el valor de 
     configuracion existente por true. 
     *
     * @returns {CamposParaMostrarEnFiltrosFolio}
     * @memberof CamposParaMostrarEnFiltrosFolio
     */
    mostrarTodo(): CamposParaMostrarEnFiltrosFolio {
        Object.getOwnPropertyNames(this).forEach( (nombre)=>{
            this[nombre] = true
        })
        return this
    }
        
    /**
     *Oculta todos los campos de input remplanzando el valor
     de configuracion existente por false. 
     *
     * @returns {CamposParaMostrarEnFiltrosFolio}
     * @memberof CamposParaMostrarEnFiltrosFolio
     */
    ocultarTodo( ): CamposParaMostrarEnFiltrosFolio{
        Object.getOwnPropertyNames(this).forEach( (nombre)=>{
            this[nombre] = false
        })
        return this

    }
    
    public get fechaFinalizacionDelFolioHasta(): boolean {
        return this._fechaFinalizacionDelFolioHasta;
    }

    public setFechaFinalizacionDelFolioHasta(value: boolean): CamposParaMostrarEnFiltrosFolio {
        this._fechaFinalizacionDelFolioHasta = value;
        return this
    }
    public get fechaFinalizacionDelFolioDesdeEl(): boolean {
        return this._fechaFinalizacionDelFolioDesdeEl;
    }
    public setFechaFinalizacionDelFolioDesdeEl(value: boolean): CamposParaMostrarEnFiltrosFolio {
        this._fechaFinalizacionDelFolioDesdeEl = value;
        return this
    }
    public get fechaDeEntregaEstimadaHasta(): boolean {
        return this._fechaDeEntregaEstimadaHasta;
    }
    public setFechaDeEntregaEstimadaHasta(value: boolean): CamposParaMostrarEnFiltrosFolio {
        this._fechaDeEntregaEstimadaHasta = value;
        return this
    }
    public get fechaDeEntregaEstimadaDesdeEl(): boolean {
        return this._fechaDeEntregaEstimadaDesdeEl;
    }
    public setFechaDeEntregaEstimadaDesdeEl(value: boolean): CamposParaMostrarEnFiltrosFolio {
        this._fechaDeEntregaEstimadaDesdeEl = value;
        return this
    }
    public get fechaDeCreacionHasta(): boolean {
        return this._fechaDeCreacionHasta;
    }
    public setFechaDeCreacionHasta(value: boolean): CamposParaMostrarEnFiltrosFolio {
        this._fechaDeCreacionHasta = value;
        return this
    }
    public get fechaDeCreacionDesdeEl(): boolean {
        return this._fechaDeCreacionDesdeEl;
    }
    public setFechaDeCreacionDesdeEl(value: boolean): CamposParaMostrarEnFiltrosFolio {
        this._fechaDeCreacionDesdeEl = value;
        return this
    }
    public get terminado(): boolean {
        return this._terminado;
    }
    public setTerminado(value: boolean): CamposParaMostrarEnFiltrosFolio {
        this._terminado = value;
        return this
    }
    public get color(): boolean {
        return this._color;
    }
    public setColor(value: boolean): CamposParaMostrarEnFiltrosFolio {
        this._color = value;
        return this
    }
    public get tamano(): boolean {
        return this._tamano;
    }
    public setTamano(value: boolean): CamposParaMostrarEnFiltrosFolio {
        this._tamano = value;
        return this
    }
    public get modelo(): boolean {
        return this._modelo;
    }
    public setModelo(value: boolean): CamposParaMostrarEnFiltrosFolio {
        this._modelo = value;
        return this
    }
    public get vendedor(): boolean {
        return this._vendedor;
    }
    public setVendedor(value: boolean): CamposParaMostrarEnFiltrosFolio {
        this._vendedor = value;
        return this
    }
    public get cliente(): boolean {
        return this._cliente;
    }
    public setCliente(value: boolean): CamposParaMostrarEnFiltrosFolio {
        this._cliente = value;
        return this
    }
    public get pedido(): boolean {
        return this._pedido;
    }
    public setPedido(value: boolean): CamposParaMostrarEnFiltrosFolio {
        this._pedido = value;
        return this
    }
    public get folio(): boolean {
        return this._folio;
    }
    public setFolio(value: boolean): CamposParaMostrarEnFiltrosFolio {
        this._folio = value;
        return this
    }


   









}