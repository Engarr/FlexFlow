export type UserPlanType = {
  _id?: string;
  planName: string;
  creator: string;
  isAppPlan?: string;
  exercisesArr: {
    exercisesName: string;
    id: number;
    seriesData: {
      seriesId: number;
      series: number;
      weight: number;
      repetitions: number;
    }[];
  }[];
};
export type TrainingDataType = {
  _id?: string;
  planName: string;
  exercisesArr: {
    exercisesName: string;
    id: number;
    seriesData: {
      seriesId: number;
      series: number;
      weight: number;
      repetitions: number;
    }[];
  }[];
  date: string;
  userId: string;
};
export type PlanDataType = {
  _id?: string;
  planName: string;
  creator: string;
  isAppPlan?: string;
  exercisesArr: {
    exercisesName: string;
    id: number;
    seriesData: {
      seriesId: number;
      series: number;
      weight: number;
      repetitions: number;
    }[];
  }[];
};

export type FormDataType = {
  planName: string;
  exercisesArr: {
    exercisesName: string;
    id: number;
    seriesData: {
      seriesId: number;
      series: number;
      weight: number;
      repetitions: number;
    }[];
  }[];
};
export type ExerciseCategorieType = {
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  name: string;
  alt: string;
  src: string;
  link: string;
 
};
export type ExerciseType = {
  exerciseName: string;
  category: string;
  muscle1: string[];
  muscle2?: string[];
  imageUrl: string;
  videoUrl: string[];
  link: string;
  
};
