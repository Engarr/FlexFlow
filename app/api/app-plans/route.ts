import connectMongoDB from '@/db/mongodb';
import Plan from '@/model/plan-model';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    await connectMongoDB();
    const appPlans = await Plan.find({ isAppPlan: { $in: true } });

    return NextResponse.json(appPlans);
  } catch (error) {
    console.error('Error processing the request:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};
