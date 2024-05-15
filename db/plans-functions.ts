import { PlanDataType, TrainingDataType } from '@/types/type';

export const QUERY_KEY_PLANS = 'PLANS';

const url = process.env.NEXT_PUBLIC_APP_API_URL || '/api';
type PropsTypeFetchPlan = {
  userId: string | undefined;
};

export async function fetchAppPlans() {
  const response = await fetch(`${url}/app-plans`);
  const appPlans = await response.json();

  return appPlans;
}

export async function fetchUserPlans({ userId }: PropsTypeFetchPlan) {
  const response = await fetch(`${url}/plans/${userId}`);
  const userPlans = await response.json();
  return userPlans;
}

export async function fetchPlan({ planId }: { planId: string }) {
  const response = await fetch(`${url}/plan?planId=${planId}`);
  const plan = await response.json();
  return plan;
}

export async function fetchTrainingsHistoryByDate({ date }: { date: string }) {
  const response = await fetch(`${url}/training-history?date=${date}`);
  const training = await response.json();
  return training;
}
//Funkcja pobieraia detali treningu //dodać Route do funkcji
export async function fetchTrainingDetails({
  trainingId,
  userId,
}: {
  trainingId: string;
  userId: string;
}) {
  const response = await fetch(
    `${url}/training-history/${trainingId}?userId=${userId}`
  );
  const training = await response.json();
  return training;
}

export async function addNewPlan(formData: PlanDataType) {
  await fetch(`${url}/plans`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
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
export async function editUserPlan({
  userId,
  planId,
  newFormData,
}: {
  userId: string;
  planId: string;
  newFormData: PlanDataType;
}) {
  await fetch(`${url}/plan?userId=${userId}&planId=${planId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newFormData),
  });
}
export async function deletePlan({
  planId,
  userId,
}: {
  planId: string;
  userId: string;
}) {
  const response = await fetch(
    `${url}/plans?planId=${planId}&creatorId=${userId}`,
    {
      method: 'DELETE',
    }
  );
  const res = await response.json();
  return res;
}
