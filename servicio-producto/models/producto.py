from sqlalchemy import Column, Integer, String, Float
from config.databse import Base

class Producto(Base):
    __tablename__ = "productos"

    codigo= Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(20))
    descripcion = Column(String(100))
    precio = Column(Float)
    stock = Column(Integer)

