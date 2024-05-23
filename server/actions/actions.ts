'use server';
import connectMongoDB from '@/db/mongodb';
import Plan from '@/model/plan-model';
import { z } from 'zod';
import { formSchema } from '@/lib/form-schema';
import { revalidatePath } from 'next/cache';

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
