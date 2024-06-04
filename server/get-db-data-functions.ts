import connectMongoDB from '@/db/mongodb';
import Plan from '@/model/plan-model';
import Training from '@/model/training-model';
import { PlanDataType, TrainingDataType, UserPlanType } from '@/types/type';
import mongoose from 'mongoose';

export const fetchPlans = async () => {
  await connectMongoDB();
  const appPlans = await Plan.find({ isAppPlan: { $in: true } });
  return appPlans as PlanDataType[];
};

export const fetchPlanById = async (planId: string) => {
  await connectMongoDB();
  if (!mongoose.Types.ObjectId.isValid(planId)) {
    return null;
  }
  const plan = await Plan.findOne({ _id: planId });
  return plan as PlanDataType;
};
export async function fetchUserPlans(userId: string) {
  await connectMongoDB();
  const userPlans = await Plan.find({ creator: { $in: userId } });
  return userPlans as UserPlanType[];
}

export async function fetchTrainingDetails(trainingId: string, userId: string) {
  await connectMongoDB();
  if (!mongoose.Types.ObjectId.isValid(trainingId)) {
    return null;
  }
  const training = await Training.findOne({ _id: trainingId, userId: userId });
  return training as TrainingDataType;
}
// export const fetchTrainingsHistory = async (date: string) => {
//   const response = await fetch(`/api/training-history?date=${date}`, {
//     next: { tags: ['training'] },
//   });
//   if (!response.ok) {
//     throw new Error('Failed to fetch data');
//   }
//   return response.json();
// };
