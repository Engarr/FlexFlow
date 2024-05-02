import { PlanDataType } from '@/utils/plan-functions';
export const QUERY_KEY_PLANS = 'PLANS';

const url = 'http://localhost:3000/api/';
type PropsTypeFetchPlan = {
  userId: string | undefined;
};

export async function fetchUserPlans({ userId }: PropsTypeFetchPlan) {
  const response = await fetch(`${url}/plans/${userId}`);
  const userPlans = await response.json();
  return userPlans;
}

export async function addNewPlan(formData: PlanDataType) {
  await fetch(`${url}/plans'`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
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
    `http://localhost:3000/api/plans?planId=${planId}&creatorId=${userId}`,
    {
      method: 'DELETE',
    }
  );
  const res = await response.json();
  return res;
}
