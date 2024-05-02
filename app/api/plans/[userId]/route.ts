import connectMongoDB from '@/db/mongodb';
import Plan from '@/model/plan-model';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, { params }: Params) => {
  const { userId } = params;
  try {
    await connectMongoDB();
    const plans = await Plan.find({ creator: { $in: userId } });
    return NextResponse.json( plans );
  } catch (error) {
    console.error('Error processing the request:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
};
