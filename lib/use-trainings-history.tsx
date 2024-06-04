import useSWR from 'swr';

const fetchTrainingsHistory = async (date: string) => {
  const response = await fetch(`/api/training-history?date=${date}`);
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  return response.json();
};

export function useTrainingsHistory(day: string) {
  const {
    data: trainingsData,
    error,
    isLoading,
  } = useSWR(day, () => fetchTrainingsHistory(day));

  return {
    trainingsData,
    isLoading,
    error,
  };
}
