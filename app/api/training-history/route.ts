import connectMongoDB from '@/db/mongodb';
import Training from '@/model/training-model';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const trainingData = await req.json();
    await connectMongoDB();
    await Training.create(trainingData);
    return NextResponse.json(
      { message: 'Training Added Successfully' },
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
