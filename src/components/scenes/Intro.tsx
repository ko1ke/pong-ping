import React from 'react';
import { Form, Field } from 'react-final-form';
import {
  minValue,
  maxValue,
  required,
  composeValidators,
} from '../../functions/validations';
type Props = {
  onClickStart: () => void;
  setBrickLife: (life: number) => void;
  setDrawSpeed: (speed: number) => void;
};
type BrickLife = 1 | 2 | 3;

type InputValues = {
  drawSpeed?: number;
  brickLife?: number;
};

const Intro: React.FC<Props> = ({
  onClickStart,
  setDrawSpeed,
  setBrickLife,
}) => {
  const onSubmit = (values: InputValues) => {
    setDrawSpeed(Number(values.drawSpeed) || 100);
    setBrickLife(Number(values.brickLife) || 3);
    onClickStart();
  };

  return (
    <>
      <h1 className="text-5xl font-bold p-11">Pong-Ping</h1>
      <div className="">
        <Form
          onSubmit={onSubmit}
          initialValues={{ drawSpeed: 100, brickLife: 3 }}
          render={({ handleSubmit, form, submitting, pristine }) => (
            <form onSubmit={handleSubmit}>
              <div className="md:flex  mb-6">
                <div className="md:w-1/3 pt-1">
                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Ball Speed
                  </label>
                </div>
                <div className="md:w-2/3 ">
                  <Field
                    name="drawSpeed"
                    validate={composeValidators(required, minValue(50))}
                  >
                    {({ input, meta }) => (
                      <>
                        <input
                          {...input}
                          type="number"
                          placeholder="Ball Speed"
                          className="appearance-none border-2 border-gray-200 rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        />
                        <div className="ml-1">
                          <p className="h-3 text-red-400 whitespace-nowrap">
                            {meta.error && meta.touched ? meta.error : ''}
                          </p>
                        </div>
                      </>
                    )}
                  </Field>
                </div>
              </div>
              <div className="md:flex mb-6">
                <div className="md:w-1/3 pt-1">
                  <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                    Brick Life
                  </label>
                </div>
                <div className="md:w-2/3 ">
                  <Field
                    name="brickLife"
                    validate={composeValidators(
                      required,
                      minValue(1),
                      maxValue(3)
                    )}
                  >
                    {({ input, meta }) => (
                      <>
                        <input
                          {...input}
                          type="number"
                          placeholder="Brick Life"
                          className="appearance-none border-2 border-gray-200 rounded w-full p-2 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                        />
                        <div className="ml-1">
                          <p className="h-3 text-red-400 whitespace-nowrap">
                            {meta.error && meta.touched ? meta.error : ''}
                          </p>
                        </div>
                      </>
                    )}
                  </Field>
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
