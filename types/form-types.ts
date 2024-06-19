export type seriesDataType = {
  seriesId: number;
  series: number;
  weight: number;
  repetitions: number;
};

export type exerciseType = {
  exercisesName: string;
  id: number;
  seriesData: seriesDataType[];
};

export type FormType = {
  planName?: string;
  creator?: string;
  exercisesArr?: exerciseType[];
  planId?: string;
  trainingId?: string;
  initialDate?: Date;
};
type TrainingDatatype = {
  date: string;
  time: string;
  dayOfTheWeek: string;
};
export type FormTrainingType = {
  planName?: string;
  exercisesArr?: exerciseType[];
  planId?: string;
  trainingTime: TrainingDatatype;
};
