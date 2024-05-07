import connectMongoDB from '@/db/mongodb';
import Plan from '@/model/plan-model';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async () => {
  try {
    await connectMongoDB();
    const plans = await Plan.find();
    return NextResponse.json({ plans });
  } catch (error) {
    console.error('Error processing the request:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};
export async function POST(req: NextRequest) {
 
  try {
    const planData = await req.json();
    await connectMongoDB();
    await Plan.create(planData);
    return NextResponse.json(
      { message: 'Plan Added Successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing the request:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
export const DELETE = async (req: NextRequest) => {
  const planId = req.nextUrl.searchParams.get('planId');
  const creatorId = req.nextUrl.searchParams.get('creatorId');
  try {
    await connectMongoDB();
    const plan = await Plan.findById(planId);
    if (!plan) {
      return NextResponse.json(
        { title: 'Ups...', message: 'Plan not found' },
        { status: 404 }
      );
    }
    if (plan.creator !== creatorId) {
      return NextResponse.json(
        {
          title: 'Unauthorized!',
          message: 'No permission to delete the plan',
          status: 403,
        },
        { status: 403 }
      );
    }
    await Plan.findByIdAndDelete(planId);
    return NextResponse.json(
      { title: 'Success!', message: 'Plan has been deleted', status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing the request:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};
