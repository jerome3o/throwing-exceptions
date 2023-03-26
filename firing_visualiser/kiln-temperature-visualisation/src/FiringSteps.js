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
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow-md mb-4 border border-gray-200"
        >
          <h4 className="text-lg font-semibold">Step {index + 1}</h4>
          <div className="grid grid-cols-2 gap-4 mt-3">
            <label className="block">
              <span className="text-gray-700">Start Temperature:</span>
              <input
                type="number"
                value={step.start_temperature}
                onChange={(e) => updateStep(index, 'start_temperature', e.target.value)}
                className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">End Temperature:</span>
              <input
                type="number"
                value={step.end_temperature}
                onChange={(e) => updateStep(index, 'end_temperature', e.target.value)}
                className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Rate:</span>
              <input
                type="number"
                value={step.rate}
                onChange={(e) => updateStep(index, 'rate', e.target.value)}
                className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              />
            </label>
            <label className="block">
              <span className="text-gray-700">Hold Time:</span>
              <input
                type="number"
                value={step.hold_time}
                onChange={(e) => updateStep(index, 'hold_time', e.target.value)}
                className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"
              />
            </label>
          </div>
          <button
            onClick={() => removeStep(index)}
            className="mt-3 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring red-400"
          >
            Remove Step
          </button>
        </div>
      ))}
      <button
        onClick={addStep}
        className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
      >
        Add Step
      </button>
    </div>
  );
};

export default FiringSteps;
