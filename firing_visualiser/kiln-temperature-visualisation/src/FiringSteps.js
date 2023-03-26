import React from 'react';

const FiringSteps = ({ steps, setSteps }) => {
  const addStep = () => {
    setSteps([...steps, { start_temperature: 0, end_temperature: 0, rate: 0, hold_time: 0 }]);
  };

  const removeStep = (index) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  const updateStep = (index, field, value) => {
    setSteps(steps.map((step, i) => (i === index ? { ...step, [field]: parseFloat(value) } : step)));
  };

  return (
    <div>
      {steps.map((step, index) => (
        <div key={index} style={{ border: '1px solid black', padding: '1rem', marginBottom: '1rem' }}>
          <h4>Step {index + 1}</h4>
          <label>
            Start Temperature:
            <input
              type="number"
              value={step.start_temperature}
              onChange={(e) => updateStep(index, 'start_temperature', e.target.value)}
            />
          </label>
          <br />
          <label>
            End Temperature:
            <input
              type="number"
              value={step.end_temperature}
              onChange={(e) => updateStep(index, 'end_temperature', e.target.value)}
            />
          </label>
          <br />
          <label>
            Rate:
            <input type="number" value={step.rate} onChange={(e) => updateStep(index, 'rate', e.target.value)} />
          </label>
          <br />
          <label>
            Hold Time:
            <input
              type="number"
              value={step.hold_time}
              onChange={(e) => updateStep(index, 'hold_time', e.target.value)}
            />
          </label>
          <br />
          <button onClick={() => removeStep(index)}>Remove Step</button>
        </div>
      ))}
      <button onClick={addStep}>Add Step</button>
    </div>
  );
};

export default FiringSteps;

