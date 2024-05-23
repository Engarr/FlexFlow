import FormElement from './form-element'; 
import { Button } from '../ui/button';
import { formSchemaType } from '@/lib/form-schema';
import { UseFormReturn, useFieldArray } from 'react-hook-form';

const SeriesFieldArray = ({
  form,
  exerciseIndex,
}: {
  form: UseFormReturn<formSchemaType>;
  exerciseIndex: number;
}) => {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `exercisesArr.${exerciseIndex}.seriesData`,
  });

  const addNewSeries = () => {
    const currentSeries = form.getValues(
      `exercisesArr.${exerciseIndex}.seriesData`
    );
    const maxSeries = currentSeries.reduce(
      (max, series) => Math.max(max, series.series),
      0
    );
    append({
      seriesId: fields.length + 1,
      series: maxSeries + 1,
      weight: 0,
      repetitions: 10,
    });
  };

  const removeSeries = (index: number) => {
    remove(index);
    const updatedSeries = form.getValues(
      `exercisesArr.${exerciseIndex}.seriesData`
    );
    updatedSeries.forEach((series, idx) => {
      series.series = idx + 1;
    });

    form.setValue(`exercisesArr.${exerciseIndex}.seriesData`, updatedSeries);
  };

  return (
    <div className='flex flex-col gap-2  px-1  mb-3'>
      {fields.map((field, index) => (
        <div
          key={field.id}
          className='flex gap-2 items-start justify-center odd:bg-gray-200/50  dark:odd:bg-gray-700/40 p-2 rounded-md'>
          <div className='flex max-lg:flex-col w-full gap-2'>
            <FormElement
              form={form}
              name={`exercisesArr.${exerciseIndex}.seriesData.${index}.series`}
              title='Series:'
            />
            <FormElement
              form={form}
              name={`exercisesArr.${exerciseIndex}.seriesData.${index}.weight`}
              title='Weight:'
            />
            <FormElement
              form={form}
              name={`exercisesArr.${exerciseIndex}.seriesData.${index}.repetitions`}
              title='Repetitions:'
            />
          </div>

          <Button
            type='button'
            size='sm'
            variant='danger'
            className='mt-6 '
            onClick={() => removeSeries(index)}>
            <div>X</div>
          </Button>
        </div>
      ))}
      <Button type='button' variant='primaryOutline' onClick={addNewSeries}>
        Add Series
      </Button>
    </div>
  );
};

export default SeriesFieldArray;
