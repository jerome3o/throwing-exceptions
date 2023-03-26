from typing import List
from pydantic import BaseModel

import matplotlib
import matplotlib.pyplot as plt

matplotlib.use("TkAgg")


class FiringStep(BaseModel):
    start_temperature: int
    end_temperature: int
    rate: int
    hold_time: int


class Firing(BaseModel):
    name: str
    steps: List[FiringStep]


def visualise_firing(firing: Firing, ax: plt.Axes = None) -> plt.Axes:
    if ax is None:
        _, ax = plt.subplots()

    # Calculate timestamps and temperatures
    timestamps = [0]
    temperatures = [firing.steps[0].start_temperature]

    for step in firing.steps:
        # Calculate the time taken to reach the end temperature
        time_to_end = abs(step.end_temperature - temperatures[-1]) / step.rate
        # Add the time taken to reach the end temperature to the last timestamp
        timestamps.append(time_to_end + timestamps[-1])
        # Add the end temperature to the temperatures
        temperatures.append(step.end_temperature)

        # If there is a hold time, add it to the timestamps and temperatures
        if step.hold_time > 0:
            timestamps.append(step.hold_time/60 + timestamps[-1])
            temperatures.append(step.end_temperature)

    # Plot the firing
    ax.plot(timestamps, temperatures, label=firing.name)

    # set x and y labels
    ax.set_xlabel("Time (hours)")
    ax.set_ylabel("Temperature (°C)")

    # # set title
    # ax.set_title(firing.name)

    ax.grid(True, which="both", axis="both", linestyle="--", alpha=0.5)
    ax.legend()

    return ax


P5 = Firing(
    name="P5",
    steps=[
        FiringStep(
            start_temperature=0,
            end_temperature=120,
            rate=200,
            hold_time=0,
        ),
        FiringStep(
            start_temperature=120,
            end_temperature=1050,
            rate=200,
            hold_time=0,
        ),
        FiringStep(
            start_temperature=1050,
            end_temperature=1200,
            rate=60,
            hold_time=15,
        ),
    ]
)

P4 = Firing(
    name="P4",
    steps=[
        FiringStep(
            start_temperature=0,
            end_temperature=400,
            rate=150,
            hold_time=0,
        ),
        # 150 per hour to 1000, no hold
        FiringStep(
            start_temperature=400,
            end_temperature=1000,
            rate=150,
            hold_time=0,
        ),
        # 80 per hour to 1200, hold 30mins
        FiringStep(
            start_temperature=1000,
            end_temperature=1200,
            rate=80,
            hold_time=30,
        ),
        # -80 per hour to 900, hold 51mins
        FiringStep(
            start_temperature=1200,
            end_temperature=900,
            rate=80,
            hold_time=51,
        ),
    ]
)

def main():
    fig, ax = plt.subplots()
    visualise_firing(P5, ax=ax)
    visualise_firing(P4, ax=ax)
    ax.set_title("P5 and P4 firing")
    plt.show()


if __name__ == "__main__":
    import logging
    logging.basicConfig(level=logging.INFO)
    main()
