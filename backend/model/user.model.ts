import { model, Schema, Document } from "mongoose";
import { LinkModel } from "./link.model";
interface UserDocument extends Document {
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
  userLinks: {
    type: Schema.Types.ObjectId;
    ref: string;
  };
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
  userLinks: [{ type: Schema.Types.ObjectId, ref: LinkModel }],
});

export const UserModel = model<UserDocument>("user", UserSchema);
