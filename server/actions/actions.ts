'use server';

import connectMongoDB from '@/db/mongodb';
import Plan from '@/model/plan-model';
import { z } from 'zod';
import { formSchema } from '@/lib/form-schema';
import { revalidatePath } from 'next/cache';
import { TrainingDataType } from '@/types/type';
import Training from '@/model/training-model';
import { formatDateTime } from '@/utils/date-transform';
import User from '@/model/user-schema';

export async function addNewPlan(
  values: z.infer<typeof formSchema> & { creator: string }
) {
  await connectMongoDB();
  const newPlan = await Plan.create(values);
  if (!newPlan) {
    return { error: 'Could not create plan, something went wrong.' };
  }
  if (newPlan) {
    revalidatePath('/plans/yours-training-plans');
    return { success: 'Plan created' };
  }
}

export async function editUserPlan(
  values: z.infer<typeof formSchema> & { creator: string },
  userId: string,
  planId: string
) {
  await connectMongoDB();
  const plan = await Plan.findOne({ _id: planId });
  if (plan.creator !== userId) {
    return { error: 'Authorization error' };
  } else {
    await Plan.findByIdAndUpdate(planId, values);
    revalidatePath('/plans/yours-training-plans');
    return { success: 'Plan has been updated' };
  }
}
export async function deletePlan(userId: string, planId: string) {
  await connectMongoDB();
  const plan = await Plan.findOne({ _id: planId });
  if (plan.creator !== userId) {
    return { error: 'Authorization error' };
  } else {
    await Plan.findByIdAndDelete(planId);
    revalidatePath('/plans/yours-training-plans');
    return { success: 'Plan has been deleted' };
  }
}
export async function deleteTrainingHistory(
  userId: string,
  trainingId: string
) {
  await connectMongoDB();
  const training = await Training.findOne({ _id: trainingId });

  if (training.userId !== userId) {
    return { error: 'Authorization error' };
  } else {
    await Training.findByIdAndDelete(trainingId);

    return { success: 'Training has been deleted' };
  }
}
export async function addNewTrainingToHistory(formData: TrainingDataType) {
  await connectMongoDB();
  const training = await Training.create(formData);
  if (!training) {
    return { error: 'Failed to finish training' };
  } else {
    return { success: 'Training has been finished successfully' };
  }
}

export async function editTraining(
  newTrainingData: TrainingDataType,
  userId: string,
  trainingId: string
) {
  await connectMongoDB();
  const training = await Training.findOne({ _id: trainingId });

  if (training.userId !== userId) {
    return { error: 'Authorization error' };
  } else {
    await Training.findByIdAndUpdate(trainingId, newTrainingData);

    return { success: 'Training has been updated' };
  }
}

export async function toggleExerciseToFavorites(
  exerciseId: string,
  userId: string
) {
  await connectMongoDB();
  let user = await User.findOne({ userId });

  try {
    if (!user) {
      user = await User.create({ userId, favorites: [exerciseId] });
      return { success: 'Exercises Has Been Added To Favorites' };
    } else {
      const index = user.favorites.indexOf(exerciseId);

      if (index !== -1) {
        user.favorites.splice(index, 1);
        await user.save();
        return { success: 'Exercises Has Been Removed From Favorites' };
      } else {
        user.favorites.push(exerciseId);
        await user.save();
        return { success: 'Exercises Has Been Added To Favorites' };
      }
    }
  } catch (error) {
    return { error: `${error}` };
  }
}
