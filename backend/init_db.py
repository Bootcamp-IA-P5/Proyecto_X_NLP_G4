# backend/init_db.py
from backend.core.database import engine
from backend.db_models import Prediction  # noqa: F401
from backend.core.database import Base

if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
    print("Tablas creadas")
