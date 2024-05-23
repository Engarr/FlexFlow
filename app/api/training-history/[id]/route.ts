import connectMongoDB from '@/db/mongodb';
import Training from '@/model/training-model';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: Params) => {
  const { id } = params;
  const userId = req.nextUrl.searchParams.get('userId')?.toString();
  await connectMongoDB();
  const training = await Training.find({ _id: id, userId: userId });
  return NextResponse.json(training[0]);
};
