from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

engine = create_engine (  "sqlite:///./productos.db")

sessionLocal = sessionmaker (
    autoflush = False,
    autocommit = False,
    bind = engine
)
Base = declarative_base()

def obtener_db():
    db = sessionLocal()
    try:
        yield db
    except:
        print("Ocurrio un error en la captura de datos")
    finally:
        db.close()