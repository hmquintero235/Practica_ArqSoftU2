import {Cliente} from '../models/cliente.model';
 
export const obtenerClientes = async () => {
    return Cliente.findAll();
    
 }
 // funcion de flecha 
 export const obtenerClientePorId = async (id:number) => {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
        throw new Error('Cliente no encontrado');
    }
    return cliente;
 }
 //any es cualquiera
  export const crearCliente = async (data : any) => {
    if (data==null!) {
        throw new Error('Datos incorrectos');
    }

    // Validaciones
    if (!data.nombre || data.nombre.trim() === '') {
        throw new Error('El nombre es obligatorio');
    }
    if (!data.direccion || data.direccion.trim() === '') {
        throw new Error('La dirección es obligatoria');
    }
    if (!data.telefono || data.telefono.trim() === '') {
        throw new Error('El teléfono es obligatorio');
    }
    if (!/^\d{10}$/.test(data.telefono)) {
        throw new Error('El teléfono debe tener 10 dígitos');
    }

    return await Cliente.create(data);

  }

   export const actualizarCliente = async (id : number,data : any) => {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
        throw new Error('Cliente no encontrado');
    }

    // Validaciones
    if (!data.nombre || data.nombre.trim() === '') {
        throw new Error('El nombre es obligatorio');
    }
    if (!data.direccion || data.direccion.trim() === '') {
        throw new Error('La dirección es obligatoria');
    }
    if (!data.telefono || data.telefono.trim() === '') {
        throw new Error('El teléfono es obligatorio');
    }
    if (!/^\d{10}$/.test(data.telefono)) {
        throw new Error('El teléfono debe tener 10 dígitos');
    }

    await cliente.update(data);
    return cliente;

  } 
  // eliminar cliente
  export const eliminarCliente = async (id : number) => {
    const cliente = await Cliente.findByPk(id);
    if (!cliente) {
        throw new Error('Cliente no encontrado');
    }
    await cliente.destroy();
    return {mensaje: 'Cliente eliminado correctamente'};
  }