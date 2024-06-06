import connectMongoDB from '@/db/mongodb';
import Training from '@/model/training-model';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const searchingDate = req.nextUrl.searchParams.get('date')?.toString();
  await connectMongoDB();
  const trainings = await Training.find({ date: searchingDate });
  return NextResponse.json(trainings);
}
