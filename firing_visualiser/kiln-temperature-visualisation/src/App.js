import React, { useState } from 'react';
import Plot from 'react-plotly.js';
import FiringSteps from './FiringSteps';
import './App.css';

const defaultSteps = [
  {
    start_temperature: 0,
    end_temperature: 400,
    rate: 150,
    hold_time: 0,
  },
  {
    start_temperature: 400,
    end_temperature: 1000,
    rate: 150,
    hold_time: 0,
  },
  {
    start_temperature: 1000,
    end_temperature: 1200,
    rate: 80,
    hold_time: 30,
  },
  {
    start_temperature: 1200,
    end_temperature: 900,
    rate: 80,
    hold_time: 51,
  },
];

function App() {
  const [name, setName] = useState('P4');
  const [steps, setSteps] = useState(defaultSteps);
  const [plotData, setPlotData] = useState([]);

  const visualizeFiring = () => {
    try {
      const firingSteps = steps;
      const timestamps = [0];
      const temperatures = [firingSteps[0].start_temperature];

      firingSteps.forEach((step) => {
        const time_to_end = Math.abs(step.end_temperature - temperatures.slice(-1)[0]) / step.rate;
        timestamps.push(time_to_end + timestamps.slice(-1)[0]);
        temperatures.push(step.end_temperature);

        if (step.hold_time > 0) {
          timestamps.push(step.hold_time / 60 + timestamps.slice(-1)[0]);
          temperatures.push(step.end_temperature);
        }
      });

      setPlotData([
        {
          x: timestamps,
          y: temperatures,
          type: 'scatter',
          mode: 'lines',
          name: 'Firing',
        },
      ]);
    } catch (error) {
      console.error(error);
      setPlotData([]);
      alert('Invalid input! Please check the firing steps JSON format.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center ">
      <div className="relative py-3 mx-auto text-center w-screen px-4">
        <h1 className="text-2xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Kiln Temperature Visualization
        </h1>
        <div className="container mt-6 mx-auto grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-screen px-4">

          <div className="input-panel">
            <label className="block">
              <span className="text-gray-700">Name:</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              />
            </label>
            <h3 className="text-xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-2xl mt-4">
              Firing Steps:
            </h3>
            <FiringSteps steps={steps} setSteps={setSteps} />
            <button
              onClick={visualizeFiring}
              className="mt-3 inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Visualize Firing
            </button>
          </div>
          <div className="plot-panel">
            <Plot
              data={plotData}
              layout={{
                title: name,
                xaxis: { title: 'Time (hours)' },
                yaxis: { title: 'Temperature (°C)' },
                showlegend: true,
                autosize: true,
              }}
              useResizeHandler={true}
              style={{ width: '100%', minHeight: '600px' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

