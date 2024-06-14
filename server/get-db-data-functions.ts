import connectMongoDB from '@/db/mongodb';
import Categorie from '@/model/exercise-category';
import Exercise from '@/model/exercise-model';

import Plan from '@/model/plan-model';
import Training from '@/model/training-model';
import {
  ExerciseCategorieType,
  ExerciseType,
  PlanDataType,
  TrainingDataType,
  UserPlanType,
} from '@/types/type';
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

export async function getExerciseCategory() {
  await connectMongoDB();
  const exerciseCategories = await Categorie.find();
  return exerciseCategories as ExerciseCategorieType[];
}

export async function getCategoryByName(name: string) {
  await connectMongoDB();
  const exerciseCategories = await Categorie.findOne({ category: name });
  return exerciseCategories as ExerciseCategorieType;
}

export async function getCategoryExerciseList(slug: string) {
  await connectMongoDB();
  const exercises = await Exercise.find({ category: { $in: slug } });
  return exercises as ExerciseType[];
}
