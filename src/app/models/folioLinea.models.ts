import { ModeloCompleto } from './modeloCompleto.modelo';
import { Laser } from './laser.models';
import { Orden } from './orden.models';

export class FolioLinea {
    constructor(
        public _id?: string,
        public modeloCompleto?: ModeloCompleto,
        public cantidad?: number,
        public nivelDeUrgencia?: string,
        public laserCliente?: Laser,
        public almacen: boolean = false,
        public createdAt?: Date,
        public updatedAt?: Date,
        public porcentajeAvance?: number,

        // Esta es solo para eliminar con animación.
        public eliminar: boolean = false,
        public ordenes: Orden[] = [] ,
        public ordenesGeneradas: boolean = false,

        // Para mostrar la info 
        public mostrandoInfo: boolean = false
    ) {}
}
