/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongoose';
import Player from '@/models/Players';
import { uploadFileToS3 } from '@/lib/s3Client';
// 1. Import Rekognition Client and Command
import { RekognitionClient, DetectTextCommand } from "@aws-sdk/client-rekognition";

// Initialize the Rekognition client
const rekognitionClient = new RekognitionClient({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export async function POST(request: NextRequest) {
  try {
    // --- Step 1: Get all form data ---
    await connectDB();
    const formData = await request.formData();
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

    const buffer = Buffer.from(await screenshotFile.arrayBuffer());

    // --- Step 2: Validate screenshot content with Amazon Rekognition ---
    const detectTextCommand = new DetectTextCommand({
      Image: { Bytes: buffer },
    });
    const { TextDetections } = await rekognitionClient.send(detectTextCommand);

    const detectedText = (TextDetections || [])
      .map(d => d.DetectedText || '')
      .join(' ')
      .toLowerCase();

    const keywords = ['soheb','sohebkhan3145@okaxis',];
    const isValidScreenshot = keywords.some(k => detectedText.includes(k.toLowerCase()));

    if (!isValidScreenshot) {
      return NextResponse.json(
        { error: 'Invalid Screenshot. Please upload a clear Google Pay or PhonePe payment confirmation.' },
        { status: 400 }
      );
    }
    
    // --- Step 3: Check for duplicate Player ID in the database ---
    const existingPlayer = await Player.findOne({ playerId: Number(playerId) });
    if (existingPlayer) {
        return NextResponse.json(
            { error: 'This Player ID has just been taken. Please refresh the page to get a new ID.' },
            { status: 409 } // 409 Conflict
        );
    }

    // --- Step 4: If all checks pass, upload image to S3 ---
    const sanitizedName = name.replace(/\s+/g, '');
    const timestamp = Date.now();
    const fileExtension = screenshotFile.name.split('.').pop();
    const fileName = `${sanitizedName}-${timestamp}.${fileExtension}`;
    const screenshotUrl = await uploadFileToS3(buffer, fileName, screenshotFile.type);

    // --- Step 5: Save player data to MongoDB ---
    const newPlayer = new Player({
      playerId: Number(playerId),
      name, phone, role, jerseyName, jerseyNumber, jerseySize, area,
      screenshot: screenshotUrl,
    });
    await newPlayer.save();

    return NextResponse.json(
      { message: 'Player registered successfully!' },
      { status: 201 }
    );

  } catch (error: any) {
    console.error('Registration Error:', error);
    // This will now primarily act as a fallback for race conditions
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'This Player ID has just been taken. Please refresh the page.' },
        { status: 409 }
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