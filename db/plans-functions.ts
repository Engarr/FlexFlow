import { TrainingDataType } from '@/types/type';

export const QUERY_KEY_PLANS = 'PLANS';

const url = process.env.NEXT_PUBLIC_APP_API_URL || '/api';
type PropsTypeFetchPlan = {
  userId: string | undefined;
};

export async function fetchTrainingDetails({
  trainingId,
  userId,
}: {
  trainingId: string;
  userId: string;
}) {
  try {
    const response = await fetch(
      `${url}/training-history/${trainingId}?userId=${userId}`
    );
    if (!response.ok) {
      throw new Error('Failed to fetch ');
    }
    const training = await response.json();
    return training;
  } catch (error) {
    console.log(error);
  }
}
export async function fetchTrainingsHistoryByDate({ date }: { date: string }) {
  try {
    const res = await fetch(`${url}/training-history?date=${date}`);

    if (!res.ok) {
      throw new Error('Failed to fetch topics');
    }

    return res.json();
  } catch (error) {
    console.log('Error loading topics: ', error);
  }
  const response = await fetch(`${url}/training-history?date=${date}`);
  const training = await response.json();
  return training;
}

export async function addNewPlanToHistory(formData: TrainingDataType) {
  console.log(`${url}/history`);
  await fetch(`${url}/training-history`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
}
