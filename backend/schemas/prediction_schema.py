# backend/schemas/prediction.py
from datetime import datetime
from pydantic import BaseModel


class PredictionRequest(BaseModel):
    text: str


class PredictionResponse(BaseModel):
    model_name: str
    input_text: str
    predicted_label: int
    score: float | None = None
    created_at: datetime | None = None

    class Config:
        orm_mode = True
