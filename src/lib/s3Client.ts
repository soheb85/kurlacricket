import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

export async function uploadFileToS3(file: Buffer, fileName: string, contentType: string) {
  const bucketName = process.env.AWS_S3_BUCKET_NAME;

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: file,
    ContentType: contentType,
    ACL: 'public-read' as const, // Makes the file publicly accessible
  };

  const command = new PutObjectCommand(params);

  try {
    await s3Client.send(command);
    // Construct the public URL
    const url = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
    return url;
  } catch (error) {
    console.error("Error uploading to S3:", error);
    throw error;
  }
}