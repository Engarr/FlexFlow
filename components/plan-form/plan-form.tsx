import React from 'react';
import { Button } from '../ui/button';
import InputItem from '@/components/plan-form/_components/input-item';
import ErrorMessage from '../error-message';
import ExerciseInput from '@/components/plan-form/_components/exercise-input';
import { Trash2 } from 'lucide-react';
import { ErrorsType, FormDataType } from '@/types/type';

type PlanFormType = {
  onSubmit: (e: React.FormEvent) => Promise<void>;
  data: FormDataType;
  trainingTime?: string;
  errors: ErrorsType;
  setErrors: React.Dispatch<React.SetStateAction<ErrorsType>>;
  onChangePlanName: (planName: string) => void;
  onChangeExerciseSeriesWeight: (
    value: string,
    planId: number,
    seriesId: number
  ) => void;
  onChangeExerciseName: (name: string, planId: number) => void;
  onAddSeries: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => void;
  onRemoveSeries: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    exerciseId: number,
    seriesId: number
  ) => void;
  onChangeSeriesRepetitions: (
    value: string,
    planId: number,
    seriesId: number
  ) => void;
  addNewExersiseHandler: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => void;
  removeExerciseHandler: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    exerciseId: number,
    setErrors: React.Dispatch<React.SetStateAction<ErrorsType>>
  ) => void;
};

const PlanForm = ({
  onSubmit,
  data,
  errors,
  setErrors,
  trainingTime,
  onChangePlanName,
  onChangeExerciseName,
  onChangeExerciseSeriesWeight,
  onAddSeries,
  onRemoveSeries,
  onChangeSeriesRepetitions,
  addNewExersiseHandler,
  removeExerciseHandler,
}: PlanFormType) => {
  return (
    <form
      className='lg:w-3/4 flex flex-col gap-3 pb-10 px-2 lg:px-0 '
      onSubmit={onSubmit}>
      {trainingTime && (
        <div className='flex gap-2 underline underline-offset-2 decoration-text-secondary decoration-2'>
          <p className='text-lg'>
            Training data: <span className='font-semibold'>{trainingTime}</span>
          </p>
        </div>
      )}
      <InputItem
        id='planName'
        label='Plan Name:'
        type='text'
        value={data.planName || ''}
        onChange={(e) => onChangePlanName(e.target.value)}
        style='mb-1 lg:mb-2'
        error={errors.planName}
      />

      {errors.exercisesArr && (
        <ErrorMessage
          message={errors.exercisesArr}
          style='text-base lg:text-xl'
        />
      )}
      {data.exercisesArr &&
        data.exercisesArr.map((plan, i) => (
          <div
            key={i}
            className='my-1 lg:my-2 border-2 dark:border-slate-100/10 p-2 lg:p-4 rounded-md relative '>
            <p className='absolute top-[-20px] left-[5px] bg-[var(--main-background)] border border-slate-100/10 p-1 rounded-md text-base'>
              Exercise No.{' '}
              <span className='dark:text-lime-400 text-lime-600 font-bold'>
                {i + 1}
              </span>
            </p>
            <div className='flex items-start justify-between gap-2  '>
              <div className='w-full my-2 '>
                <ExerciseInput
                  error={errors.exercises[i]?.exercisesName}
                  planId={plan.id}
                  onChangeExerciseName={onChangeExerciseName}
                  value={data.exercisesArr[i].exercisesName || ''}
                  searchExercise={data.exercisesArr[i].exercisesName}
                />
              </div>
              <Button
                size='sm'
                variant='ghost'
                className='mt-6'
                onClick={(e) => removeExerciseHandler(e, plan.id, setErrors)}>
                <div>
                  <Trash2 />
                </div>
              </Button>
            </div>
            <div className='flex flex-col gap-2  px-1  mb-3 '>
              {errors.exercises[i]?.series && (
                <ErrorMessage message={errors.exercises[i].series} />
              )}
              {data.exercisesArr[i].seriesData.map((exercisesSeries, index) => (
                <div
                  className='flex gap-2 items-start justify-center odd:bg-gray-200/50  dark:odd:bg-gray-700/40 p-2 rounded-md'
                  key={index}>
                  <div className='flex max-lg:flex-col w-full gap-2'>
                    <InputItem
                      id='series'
                      label='Series:'
                      value={exercisesSeries.series || ''}
                      type='number'
                      style='disabled:cursor-default disabled:opacity-100'
                      disabled
                    />
                    <InputItem
                      id='weight'
                      label='Weight (kg):'
                      value={exercisesSeries.weight || ''}
                      type='number'
                      onChange={(e) =>
                        onChangeExerciseSeriesWeight(
                          e.target.value,
                          plan.id,
                          exercisesSeries.seriesId
                        )
                      }
                    />
                    <InputItem
                      id='repetitions'
                      label='Repetitions:'
                      value={exercisesSeries.repetitions || ''}
                      type='number'
                      onChange={(e) =>
                        onChangeSeriesRepetitions(
                          e.target.value,
                          plan.id,
                          exercisesSeries.seriesId
                        )
                      }
                    />
                  </div>

                  <Button
                    size='sm'
                    variant='danger'
                    className='mt-6 '
                    onClick={(e) =>
                      onRemoveSeries(e, plan.id, exercisesSeries.seriesId)
                    }>
                    <div>X</div>
                  </Button>
                </div>
              ))}

              <Button
                onClick={(e) => onAddSeries(e, i)}
                className=''
                variant='primaryOutline'>
                Add Series
              </Button>
            </div>
          </div>
        ))}
      <Button
        onClick={(e) => addNewExersiseHandler(e, data.exercisesArr.length)}
        className=''>
        Add New Exercise
      </Button>
      <Button variant='primary' className='mt-2' type='submit'>
        {trainingTime ? 'Finish Training' : 'Save Plan'}
      </Button>
    </form>
  );
};

export default PlanForm;
