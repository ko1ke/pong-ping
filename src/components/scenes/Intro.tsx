import React from 'react';
import { Form, Field } from 'react-final-form';

type Props = {
  onClickStart: () => void;
  setDrawSpeed: (speed: number) => void;
};

type InputValues = {
  drawSpeed?: number;
};

const Intro: React.FC<Props> = ({ onClickStart, setDrawSpeed }) => {
  const onSubmit = (values: InputValues) => {
    setDrawSpeed(values.drawSpeed || 100);
    onClickStart();
  };

  return (
    <>
      <h1 className="text-5xl font-bold p-8">Pong-Ping</h1>
      <div>
        <Form
          onSubmit={onSubmit}
          initialValues={{ drawSpeed: 100 }}
          render={({ handleSubmit, form, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Ball Speed
                  </label>
                </div>
                <div className="md:w-2/3">
                  <Field
                    className="appearance-none border-2 border-gray-200 rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                    name="drawSpeed"
                    component="input"
                    type="number"
                    placeholder="Ball Speed"
                  />
                </div>
              </div>
              <div className="flex justify-center space-x-6 > *">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700
                   text-white font-bold py-2 px-4 rounded"
                  disabled={submitting}
                >
                  Start
                </button>
                <button
                  type="button"
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => form.reset()}
                  disabled={submitting || pristine}
                >
                  Reset
                </button>
              </div>
            </form>
          )}
        />
      </div>
    </>
  );
};

export default Intro;
