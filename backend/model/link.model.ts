import { model, Schema, Document } from "mongoose";
import { StatisticsModel } from "@model/statistics.model";

export interface LinkDocument extends Document {
  alias: { type: string; required: true; unique: boolean };
  longurl: { type: string; required: boolean };
  shorturl: { type: string };
  clicks: { type: number };
  password: { type: string };
  statistics: { type: Schema.Types.ObjectId; ref: string };
  created: { type: Date; required: boolean };
}

const LinkSchema = new Schema({
  alias: { type: String, required: true, unique: true },
  longurl: { type: String, required: true },
  shorturl: { type: String },
  clicks: { type: Number, default: 0 },
  password: { type: String },
  statistics: [{ type: Schema.Types.ObjectId, ref: StatisticsModel }],
  created: { type: Date, default: Date.now, required: true },
});

LinkSchema.index({ alias: 1 }, { unique: true });

export const LinkModel = model<LinkDocument>("link", LinkSchema);
