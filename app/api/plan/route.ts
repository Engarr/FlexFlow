import connectMongoDB from '@/db/mongodb';
import Plan from '@/model/plan-model';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {

  const planId = req.nextUrl.searchParams.get('planId');

  try {
    await connectMongoDB();
    const plan = await Plan.findOne({ _id: planId });
    return NextResponse.json(plan);
  } catch (error) {
    console.error('Error processing the request:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};
export const PUT = async (req: NextRequest) => {
  const userId = req.nextUrl.searchParams.get('userId');
  const planId = req.nextUrl.searchParams.get('planId');
  try {
    await connectMongoDB();
    const plan = await Plan.findOne({ _id: planId });
    if (plan.creator !== userId) {
      return NextResponse.json(
        { message: 'Authorization Error' },
        { status: 401 }
      );
    } else {
      const planData = await req.json();
      await Plan.findByIdAndUpdate(planId, planData);
      return NextResponse.json(
        { message: 'Plan has been updated' },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error('Error processing the request:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};


