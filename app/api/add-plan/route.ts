import connectMongoDB from '@/db/mongodb';
import planModel from '@/model/plan-model';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const planData = await request.json();
    await connectMongoDB();
    await planModel.create(planData);
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
