import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose'; // Adjust path if necessary
import Player from '@/models/Players'; // Adjust path if necessary
import { uploadFileToS3 } from '@/lib/s3Client'; // Adjust path if necessary

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();
    // Get the new playerId from the form data
    const playerId = formData.get('playerId') as string; 
    const name = formData.get('name') as string;
    const phone = formData.get('phone') as string;
    const role = formData.get('role') as string;
    const jerseyName = formData.get('jerseyName') as string;
    const jerseyNumber = formData.get('jerseyNumber') as string;
    const jerseySize = formData.get('jerseySize') as string;
    const area = formData.get('area') as string;
    const screenshotFile = formData.get('screenshot') as File | null;

    if (!screenshotFile || !name || !playerId) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    const sanitizedName = name.replace(/\s+/g, '');
    const timestamp = Date.now();
    const fileExtension = screenshotFile.name.split('.').pop();
    const fileName = `${sanitizedName}-${timestamp}.${fileExtension}`;

    const buffer = Buffer.from(await screenshotFile.arrayBuffer());
    const screenshotUrl = await uploadFileToS3(buffer, fileName, screenshotFile.type);

    const newPlayer = new Player({
      playerId: Number(playerId), // Save the playerId
      name,
      phone,
      role,
      jerseyName,
      jerseyNumber,
      jerseySize,
      area,
      screenshot: screenshotUrl,
    });

    await newPlayer.save();

    return NextResponse.json(
      { message: 'Player registered successfully!' },
      { status: 201 }
    );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error('Registration Error:', error);
    // Handle potential duplicate key error for playerId
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'This Player ID has just been taken. Please refresh the page to get a new ID.' },
        { status: 409 } // 409 Conflict
      );
    }
    return NextResponse.json(
      { error: 'An error occurred during registration.' },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    await connectDB();
    const players = await Player.find({}).lean();
    return NextResponse.json({ players });
  } catch (error) {
    console.error('Failed to fetch players:', error);
    return NextResponse.json(
      { error: 'Server error fetching players.' },
      { status: 500 }
    );
  }
}