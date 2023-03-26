from pydantic import BaseModel


class Firing(BaseModel):
    steps: List[FiringStep]
