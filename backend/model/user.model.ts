import mongoose from "mongoose";
import { LinkModel } from "./link.model";
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
  
    userLinks: {
      type: mongoose.Schema.Types.ObjectId;
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
  
  export const UserModel = mongoose.model<UserDocument>("user", UserSchema);
  