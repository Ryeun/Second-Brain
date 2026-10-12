import mongoose, {model, Schema} from "mongoose";
import "dotenv/config";
mongoose.connect(process.env.MONGO_URL!);

const UserSchema = new Schema({
    username: {type: String, unique: true},
    password: String
})
export const UserModel = model("User", UserSchema);

const contentSchema = new Schema({
    title: String,
    link: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true}
})
export const contentModel = model("content", contentSchema);

const linkSchema = new Schema({
    hash: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true, unique: true}
})
export const linkModel = model("link", linkSchema);
