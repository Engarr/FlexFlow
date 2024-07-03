import connectMongoDB from '@/db/mongodb';
import User from '@/model/user-schema';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId')?.toString();
  await connectMongoDB();
  const user = await User.findOne({ userId: userId });
  return NextResponse.json(user);
}
