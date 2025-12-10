# backend/db_models/prediction.py
from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func

from backend.core.database import Base


class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    model_name = Column(String, index=True)
    input_text = Column(String)
    predicted_label = Column(Integer)       # 0 o 1
    score = Column(Float, nullable=True)    # probabilidad o margin
    created_at = Column(DateTime(timezone=True), server_default=func.now())
