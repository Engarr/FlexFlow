import * as z from 'zod';

const seriesDataSchema = z.object({
  seriesId: z.number().int(),
  series: z.number().int().positive(),
  weight: z.number().nonnegative(),
  repetitions: z.number().int().positive(),
});

const exerciseSchema = z.object({
  exercisesName: z.string().min(1, 'Exercise name cannot be empty'),
  id: z.number().int(),
  seriesData: z.array(seriesDataSchema).nonempty('Series data cannot be empty'),
});
export const formSchema = z.object({
  planName: z.string().min(1, 'Plan name cannot be empty'),
  exercisesArr: z
    .array(exerciseSchema)
    .nonempty('Exercises array cannot be empty'),
});

export type formSchemaType = z.infer<typeof formSchema>;
