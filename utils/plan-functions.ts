type PlanDataType = {
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

export const handleAddSeries = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  index: number,
  setPlanData: React.Dispatch<React.SetStateAction<PlanDataType>>
) => {
  e.preventDefault();

  setPlanData((prevData) => ({
    ...prevData,
    exercisesArr: prevData.exercisesArr.map((exercise, idx) => {
      if (idx === index) {
        return {
          ...exercise,
          seriesData: [
            ...exercise.seriesData,
            {
              seriesId: exercise.seriesData.length + 1,
              series: exercise.seriesData.length + 1,
              weight: 0,
              repetitions: 10,
            },
          ],
        };
      }
      return exercise;
    }),
  }));
};
export const handleRemoveSeries = (
  exerciseId: number,
  seriesId: number,
  setPlanData: React.Dispatch<React.SetStateAction<PlanDataType>>
) => {
  setPlanData((prevData) => ({
    ...prevData,
    exercisesArr: prevData.exercisesArr.map((exercise) => {
      if (exercise.id === exerciseId) {
        return {
          ...exercise,
          seriesData: exercise.seriesData
            .filter((serise) => serise.seriesId !== seriesId)
            .map((series, sIdx) => ({
              series: sIdx + 1,
              seriesId: sIdx + 1,
              weight: series.weight,
              repetitions: series.repetitions,
            })),
        };
      }
      return exercise;
    }),
  }));
};
export const handleAddNewExersise = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  index: number,
  setPlanData: React.Dispatch<React.SetStateAction<PlanDataType>>
) => {
  e.preventDefault();

  setPlanData((prevData) => ({
    ...prevData,
    exercisesArr: [
      ...prevData.exercisesArr,
      {
        exercisesName: '',
        id: index + 1,
        seriesData: [{ seriesId: 1, series: 1, weight: 0, repetitions: 10 }],
      },
    ],
  }));
};
export const onChangePlanName = (
  planName: string,
  setPlanData: React.Dispatch<React.SetStateAction<PlanDataType>>
) => {
  setPlanData((prevData) => ({
    ...prevData,
    planName: planName,
  }));
};
export const onChangeSeriesWeight = (
  value: string,
  planId: number,
  seriesId: number,
  setPlanData: React.Dispatch<React.SetStateAction<PlanDataType>>
) => {
  setPlanData((prevData) => ({
    ...prevData,
    exercisesArr: prevData.exercisesArr.map((exercise) => {
      if (exercise.id === planId) {
        return {
          ...exercise,
          seriesData: exercise.seriesData.map((s) => {
            if (s.seriesId === seriesId) {
              return {
                ...s,
                weight: Number(value),
              };
            }
            return s;
          }),
        };
      }
      return exercise;
    }),
  }));
};
export const onChangeSeriesRepetitions = (
  value: string,
  planId: number,
  seriesId: number,
  setPlanData: React.Dispatch<React.SetStateAction<PlanDataType>>
) => {
  setPlanData((prevData) => ({
    ...prevData,
    exercisesArr: prevData.exercisesArr.map((exercise) => {
      if (exercise.id === planId) {
        return {
          ...exercise,
          seriesData: exercise.seriesData.map((s) => {
            if (s.seriesId === seriesId) {
              return {
                ...s,
                repetitions: Number(value),
              };
            }
            return s;
          }),
        };
      }
      return exercise;
    }),
  }));
};
export const onChangeExerciseName = (
  name: string,
  planId: number,
  setPlanData: React.Dispatch<React.SetStateAction<PlanDataType>>
) => {
  setPlanData((prevData) => ({
    ...prevData,
    exercisesArr: prevData.exercisesArr.map((exercise) => {
      if (exercise.id === planId) {
        return {
          ...exercise,
          exercisesName: name,
        };
      }
      return exercise;
    }),
  }));
};
export const handleRemoveExersise = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  exerciseId: number,
  setPlanData: React.Dispatch<React.SetStateAction<PlanDataType>>
) => {
  e.preventDefault();
  setPlanData((prevData) => ({
    ...prevData,
    exercisesArr: prevData.exercisesArr
      .filter((exercise) => exercise.id !== exerciseId)
      .map((exercises, idx) => ({
        ...exercises,
        id: idx + 1,
      })),
  }));
};
