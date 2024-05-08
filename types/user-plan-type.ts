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
export type ErrorsType = {
  planName: string;
  exercisesArr: string;
  exercises: {
    exercisesName: string;
    series: string;
  }[];
};
