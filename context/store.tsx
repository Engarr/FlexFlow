import { ErrorsType, FormDataType } from '@/types/type';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type StoreType = {
  actualTrainingPlanId: string;
  temporaryTrainingData: FormDataType;
  updateTemporaryTrainingData: (newData: FormDataType) => void;
  changeActualTrainingPlanId: (planId: string) => void;
  onChangePlanName: (planName: string) => void;
  onChangeSeriesWeight: (
    value: string,
    planId: number,
    seriesId: number
  ) => void;
  handleAddSeries: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => void;
  handleRemoveSeries: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    exerciseId: number,
    seriesId: number
  ) => void;
  onChangeSeriesRepetitions: (
    value: string,
    planId: number,
    seriesId: number
  ) => void;
  onChangeExerciseName: (name: string, planId: number) => void;
  handleRemoveExersise: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    exerciseId: number,
    setErrors: React.Dispatch<React.SetStateAction<ErrorsType>>
  ) => void;
  handlerAddExercise: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    index: number
  ) => void;
};

export const useStore = create<StoreType>()(
  persist(
    (set) => ({
      actualTrainingPlanId: '',
      temporaryTrainingData: {
        planName: '',
        exercisesArr: [
          {
            exercisesName: '',
            id: 1,
            seriesData: [
              { seriesId: 1, series: 1, weight: 0, repetitions: 10 },
            ],
          },
        ],
      },
      changeActualTrainingPlanId: (planId: string) =>
        set({ actualTrainingPlanId: planId }),
      updateTemporaryTrainingData: (newData: FormDataType) =>
        set({ temporaryTrainingData: newData }),

      onChangePlanName: (planName: string) => {
        set((state) => ({
          temporaryTrainingData: {
            ...state.temporaryTrainingData,
            planName: planName,
          },
        }));
      },
      onChangeExerciseName: (name: string, planId: number) => {
        set((state) => ({
          temporaryTrainingData: {
            ...state.temporaryTrainingData,
            exercisesArr: state.temporaryTrainingData.exercisesArr.map(
              (exercise) => {
                if (exercise.id === planId) {
                  return {
                    ...exercise,
                    exercisesName: name,
                  };
                }
                return exercise;
              }
            ),
          },
        }));
      },
      onChangeSeriesWeight: (
        value: string,
        planId: number,
        seriesId: number
      ) => {
        set((state) => ({
          temporaryTrainingData: {
            ...state.temporaryTrainingData,
            exercisesArr: state.temporaryTrainingData.exercisesArr.map(
              (exercise) => {
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
              }
            ),
          },
        }));
      },
      handleAddSeries: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        index: number
      ) => {
        e.preventDefault();
        set((state) => ({
          temporaryTrainingData: {
            ...state.temporaryTrainingData,
            exercisesArr: state.temporaryTrainingData.exercisesArr.map(
              (exercise, idx) => {
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
              }
            ),
          },
        }));
      },
      handleRemoveSeries: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        exerciseId: number,
        seriesId: number
      ) => {
        e.preventDefault();
        set((state) => ({
          temporaryTrainingData: {
            ...state.temporaryTrainingData,
            exercisesArr: state.temporaryTrainingData.exercisesArr.map(
              (exercise) => {
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
              }
            ),
          },
        }));
      },
      onChangeSeriesRepetitions: (
        value: string,
        planId: number,
        seriesId: number
      ) => {
        set((state) => ({
          temporaryTrainingData: {
            ...state.temporaryTrainingData,
            exercisesArr: state.temporaryTrainingData.exercisesArr.map(
              (exercise) => {
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
              }
            ),
          },
        }));
      },

      handleRemoveExersise: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        exerciseId: number,
        setErrors: React.Dispatch<React.SetStateAction<ErrorsType>>
      ) => {
        e.preventDefault();
        set((state) => ({
          temporaryTrainingData: {
            ...state.temporaryTrainingData,
            exercisesArr: state.temporaryTrainingData.exercisesArr
              .filter((exercise) => exercise.id !== exerciseId)
              .map((exercises, idx) => ({
                ...exercises,
                id: idx + 1,
              })),
          },
        }));

        setErrors((prevData) => ({
          ...prevData,
          exercises: prevData.exercises.filter(
            (_, idx) => idx + 1 !== exerciseId
          ),
        }));
      },
      handlerAddExercise: (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        index: number
      ) => {
        e.preventDefault();
        set((state) => ({
          temporaryTrainingData: {
            ...state.temporaryTrainingData,
            exercisesArr: [
              ...state.temporaryTrainingData.exercisesArr,
              {
                exercisesName: '',
                id: index + 1,
                seriesData: [
                  { seriesId: 1, series: 1, weight: 0, repetitions: 10 },
                ],
              },
            ],
          },
        }));
      },
    }),
    {
      name: 'training-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);

// export const useStore = create<StoreType>((set) => ({
//   actualTrainingPlanId: '',
//   temporaryTrainingData: {
//     planName: '',
//     exercisesArr: [
//       {
//         exercisesName: '',
//         id: 1,
//         seriesData: [{ seriesId: 1, series: 1, weight: 0, repetitions: 10 }],
//       },
//     ],
//   },
//   changeActualTrainingPlanId: (planId: string) =>
//     set({ actualTrainingPlanId: planId }),
//   updateTemporaryTrainingData: (newData: FormDataType) =>
//     set({ temporaryTrainingData: newData }),

//   onChangePlanName: (planName: string) => {
//     set((state) => ({
//       temporaryTrainingData: {
//         ...state.temporaryTrainingData,
//         planName: planName,
//       },
//     }));
//   },
//   onChangeExerciseName: (name: string, planId: number) => {
//     set((state) => ({
//       temporaryTrainingData: {
//         ...state.temporaryTrainingData,
//         exercisesArr: state.temporaryTrainingData.exercisesArr.map(
//           (exercise) => {
//             if (exercise.id === planId) {
//               return {
//                 ...exercise,
//                 exercisesName: name,
//               };
//             }
//             return exercise;
//           }
//         ),
//       },
//     }));
//   },
//   onChangeSeriesWeight: (value: string, planId: number, seriesId: number) => {
//     set((state) => ({
//       temporaryTrainingData: {
//         ...state.temporaryTrainingData,
//         exercisesArr: state.temporaryTrainingData.exercisesArr.map(
//           (exercise) => {
//             if (exercise.id === planId) {
//               return {
//                 ...exercise,
//                 seriesData: exercise.seriesData.map((s) => {
//                   if (s.seriesId === seriesId) {
//                     return {
//                       ...s,
//                       weight: Number(value),
//                     };
//                   }
//                   return s;
//                 }),
//               };
//             }
//             return exercise;
//           }
//         ),
//       },
//     }));
//   },
//   handleAddSeries: (
//     e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
//     index: number
//   ) => {
//     e.preventDefault();
//     set((state) => ({
//       temporaryTrainingData: {
//         ...state.temporaryTrainingData,
//         exercisesArr: state.temporaryTrainingData.exercisesArr.map(
//           (exercise, idx) => {
//             if (idx === index) {
//               return {
//                 ...exercise,
//                 seriesData: [
//                   ...exercise.seriesData,
//                   {
//                     seriesId: exercise.seriesData.length + 1,
//                     series: exercise.seriesData.length + 1,
//                     weight: 0,
//                     repetitions: 10,
//                   },
//                 ],
//               };
//             }
//             return exercise;
//           }
//         ),
//       },
//     }));
//   },
//   handleRemoveSeries: (
//     e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
//     exerciseId: number,
//     seriesId: number
//   ) => {
//     e.preventDefault();
//     set((state) => ({
//       temporaryTrainingData: {
//         ...state.temporaryTrainingData,
//         exercisesArr: state.temporaryTrainingData.exercisesArr.map(
//           (exercise) => {
//             if (exercise.id === exerciseId) {
//               return {
//                 ...exercise,
//                 seriesData: exercise.seriesData
//                   .filter((serise) => serise.seriesId !== seriesId)
//                   .map((series, sIdx) => ({
//                     series: sIdx + 1,
//                     seriesId: sIdx + 1,
//                     weight: series.weight,
//                     repetitions: series.repetitions,
//                   })),
//               };
//             }
//             return exercise;
//           }
//         ),
//       },
//     }));
//   },
//   onChangeSeriesRepetitions: (
//     value: string,
//     planId: number,
//     seriesId: number
//   ) => {
//     set((state) => ({
//       temporaryTrainingData: {
//         ...state.temporaryTrainingData,
//         exercisesArr: state.temporaryTrainingData.exercisesArr.map(
//           (exercise) => {
//             if (exercise.id === planId) {
//               return {
//                 ...exercise,
//                 seriesData: exercise.seriesData.map((s) => {
//                   if (s.seriesId === seriesId) {
//                     return {
//                       ...s,
//                       repetitions: Number(value),
//                     };
//                   }
//                   return s;
//                 }),
//               };
//             }
//             return exercise;
//           }
//         ),
//       },
//     }));
//   },

//   handleRemoveExersise: (
//     e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
//     exerciseId: number,
//     setErrors: React.Dispatch<React.SetStateAction<ErrorsType>>
//   ) => {
//     e.preventDefault();
//     set((state) => ({
//       temporaryTrainingData: {
//         ...state.temporaryTrainingData,
//         exercisesArr: state.temporaryTrainingData.exercisesArr
//           .filter((exercise) => exercise.id !== exerciseId)
//           .map((exercises, idx) => ({
//             ...exercises,
//             id: idx + 1,
//           })),
//       },
//     }));

//     setErrors((prevData) => ({
//       ...prevData,
//       exercises: prevData.exercises.filter((_, idx) => idx + 1 !== exerciseId),
//     }));
//   },
//   handlerAddExercise: (
//     e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
//     index: number
//   ) => {
//     e.preventDefault();
//     set((state) => ({
//       temporaryTrainingData: {
//         ...state.temporaryTrainingData,
//         exercisesArr: [
//           ...state.temporaryTrainingData.exercisesArr,
//           {
//             exercisesName: '',
//             id: index + 1,
//             seriesData: [
//               { seriesId: 1, series: 1, weight: 0, repetitions: 10 },
//             ],
//           },
//         ],
//       },
//     }));
//   },
// }));
