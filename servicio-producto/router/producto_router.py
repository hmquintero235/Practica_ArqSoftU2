from fastapi import  APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from config.databse import obtener_db
from schemas.producto import ProductoCreate, ProductoResponse
from controllers import producto_controllers as producto_controller

router = APIRouter(
    prefix="/productos",
    tags=["productos"]
)
@router.get("/", response_model=list[ProductoResponse])
def listar_productos(db: Session = Depends(obtener_db)):
   return producto_controller.obtener_productos(db)

#obtener el producto por id 
@router.get("/{codigo}", response_model=ProductoResponse)
def buscar_producto(codigo: int, db: Session = Depends(obtener_db)):
    producto = producto_controller.obtener_productos_id(db, codigo)
    if not producto:
        raise HTTPException(400,"Producto no encontrado")
    return producto 

#registrar producto
@router.post("/", response_model=ProductoResponse)
def registrar_producto(producto: ProductoCreate, db: Session = Depends(obtener_db)):
    producto_existente = producto_controller.obtener_productos_id(db, producto.codigo)
    if producto_existente:
        raise HTTPException(400, "Producto ya existe")
    return producto_creado
#modificar producto
@router.put("/{codigo}", response_model=ProductoResponse)
def modificar_producto(codigo: int, producto: ProductoCreate, db: Session = Depends(obtener_db)):
    producto_actualizado = producto_controller.obtener_productos_id(db, codigo)
    if not producto_actualizado:
        raise HTTPException(400, "Producto no encontrado")
    return producto_actualizado

#eliminar producto 
@router.delete("/{codigo}")
def eliminar_producto(codigo: int, db: Session = Depends(obtener_db)):
    producto_eliminado = producto_controller.obtener_productos_id(db, codigo)
    if not producto_eliminado:
        raise HTTPException(400, "Producto no encontrado")
    return {"message": "Producto eliminado"}