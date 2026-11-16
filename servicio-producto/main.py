from fastapi import FastAPI

from config.databse import Base, engine
from router.producto_router import router as producto_router

app = FastAPI(
    title="Servicio de Productos",
    description="Servicio desarrollado en clases de arquitectura de software",
    version ="1.0"
)
Base.metadata.create_all(bind=engine)
app.include_router(producto_router, prefix="/api")

@app.get("/")
def inicio():
    return {"message": "servicio factura ejecutandose"}