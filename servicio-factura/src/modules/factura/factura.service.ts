import{Injectable, NotFoundException, ConflictException, BadRequestException} from '@nestjs/common';   
import {db} from '../../prisma/db.js';
import {Factura} from '../factura.models.js';
import {DetalleFactura} from '../detalle-factura.models.js';


@Injectable()
export class FacturaService {
    // esto es solo de factura
    //Crear
    async crear (data: Factura){
        const factura = await db.orm.facturas.where({codigo: data.codigo}).first();
        if (factura) {
            throw new ConflictException('La factura con ese código ya existe');
        }
        
        return db.orm.facturas.create({...data, fecha: new Date(data.fecha)});
    }
    //listar
    async listar(){
        return db.orm.facturas.all();
    }
    //CONSULTAR
    async consultar(codigo: string){
        const factura = await db.orm.facturas.where({codigo:codigo}).first();
        if (!factura) {
            throw new NotFoundException('Factura no encontrada');

        }
        return factura;
    }
    //actualizar (PATCH: solo los campos que lleguen)
    async actualizar(codigo: string,data: Partial<Factura>) {
      const cambios: Record<string, unknown> = {...data};
      if (data.fecha) {
        cambios.fecha = new Date(data.fecha);
      }
      
      const factura = await db.orm.facturas.where({ codigo: codigo }).update(cambios);
      if (factura){
        throw new NotFoundException('Factura no encontrada');
      }
      return factura;
    }
    //eliminar
     async eliminar(codigo: string) {
    await this.consultar(codigo);
    await db.orm.facturas.where({ codigo }).delete();
    return { mensaje: `Factura eliminada correctamente` };
  }
  // detalle de factura
  async agregarDetalleFactura(codigo:string, data: DetalleFactura) {
       
    }
    // Path actulizar detalle 
    async actulizarDetalleFactura
    
    // elimnar detalle 

}
public class calcularSubtotal (){

}

