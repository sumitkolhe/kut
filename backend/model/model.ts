import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface UserDocument extends mongoose.Document {
  email: {
    type: string;
    unique: boolean;
    required: boolean;
    lowercase: boolean;
  };

  password: {
    type: string;
    required: boolean;
    minlength: number;
  };
}

export interface LinkDocument extends mongoose.Document {
  alias: { type: string; required: true; unique: boolean };
  longurl: { type: string; required: boolean };
  shorturl: { type: string };
  clicks: { type: number };
  stats: [{ type: Date }];
  created: { type: Date; required: boolean };
}

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  links: [{ type: Schema.Types.ObjectId, ref: "LinkModel" }],
});

const LinkSchema = new Schema({
  alias: { type: String, required: true, unique: true },
  longurl: { type: String, required: true },
  shorturl: { type: String },
  clicks: { type: Number, default: 0 },
  stats: [{ type: Date }],
  created: { type: Date, default: Date.now, required: true },
});

LinkSchema.index({ alias: 1 }, { unique: true });

export const UserModel = mongoose.model<UserDocument>("user", UserSchema);
export const LinkModel = mongoose.model<LinkDocument>("link", LinkSchema);
