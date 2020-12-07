import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface LinkDocument extends mongoose.Document {
  alias: { type: string; required: true; unique: boolean };
  longurl: { type: string; required: boolean };
  shorturl: { type: string };
  clicks: { type: number };
  stats: [{ type: Date }];
  created: { type: Date; required: boolean };
}

const LinkSchema = new Schema({
  alias: { type: String, required: true, unique: true },
  longurl: { type: String, required: true },
  shorturl: { type: String },
  clicks: { type: Number, default: 0 },
  stats: [{ type: Date }],
  created: { type: Date, default: Date.now, required: true },
});

LinkSchema.index({ alias: 1 }, { unique: true });

export const LinkModel = mongoose.model<LinkDocument>("link", LinkSchema);