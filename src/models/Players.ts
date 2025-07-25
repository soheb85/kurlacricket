import mongoose, { Document, Schema } from "mongoose";

export interface IPlayer extends Document {
  playerId: number; // Add this
  name: string;
  phone: string;
  role: string;
  jerseyName: string;
  jerseyNumber: string;
  jerseySize: string;
  area: string;
  screenshot: string;
}

const PlayerSchema: Schema = new mongoose.Schema({
  // Add playerId field, making it unique and required
  playerId: { type: Number, required: true, unique: true }, 
  name: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, required: true },
  jerseyName: { type: String, required: true },
  jerseyNumber: { type: String, required: true },
  jerseySize: { type: String, required: true },
  area: { type: String, required: true },
  screenshot: { type: String, required: true }, 
}, { timestamps: true });

export default mongoose.models.Player || mongoose.model<IPlayer>('Player', PlayerSchema);