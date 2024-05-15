import connectMongoDB from '@/db/mongodb';
import Training from '@/model/training-model';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: Params) => {
  const { id } = params;
  const userId = req.nextUrl.searchParams.get('userId')?.toString();

  try {
    // console.log(id);
    // console.log(userId);
    await connectMongoDB();
    const training = await Training.find({ _id: id });

    if (training[0].userId === userId) {
      return NextResponse.json(training[0]);
    } else {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  } catch (error) {
    console.error('Error processing the request:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};
