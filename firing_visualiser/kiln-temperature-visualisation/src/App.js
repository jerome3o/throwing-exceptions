import logo from './logo.svg';
import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import Plot from 'react-plotly.js';

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
  const [steps, setSteps] = useState(JSON.stringify(defaultSteps, null, 2));
  const [plotData, setPlotData] = useState([]);

  const visualizeFiring = () => {
    try {
      const firingSteps = JSON.parse(steps);
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
    <div className="App">
      <h1>Kiln Temperature Visualization</h1>
      <div>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />
        <label>
          Firing Steps:
          <textarea value={steps} onChange={(e) => setSteps(e.target.value)} />
        </label>
        <br />
        <button onClick={visualizeFiring}>Visualize Firing</button>
      </div>
      <div>
        <Plot
          data={plotData}
          layout={{
            title: name,
            xaxis: { title: 'Time (hours)' },
            yaxis: { title: 'Temperature (°C)' },
            showlegend: true,
          }}
        />
      </div>
    </div>
  );
}

export default App;

