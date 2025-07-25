import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Player from '@/models/Players';

export async function GET() {
  try {
    await connectDB();

    // Count existing players to determine the next ID
    const count = await Player.countDocuments({});
    const nextId = count + 1;

    return NextResponse.json({ nextId });
  } catch (error) {
    console.error('Failed to fetch next player ID:', error);
    return NextResponse.json(
      { error: 'Server error fetching next ID.' },
      { status: 500 }
    );
  }
}