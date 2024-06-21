import mongoose from "mongoose";
import dotenv from "dotenv";
import config from "config";
import { MongoClient } from "mongodb";
dotenv.config();

const uri = process.env.MONGO_URI;
let db;
const connectDB = async () => {
  if (db) return db;
  try {
    const client = new MongoClient(uri);

    await client.connect();
    db = client.db(process.env.DB_NAME);
    console.log("MongoDB connected");

    return db;
  } catch (error) {
    console.log("MONGODB ERROR ", error);
  }
};


// const db = process.env.MONGO_URI;

// const connectDB = async () => {
//   try {
//     await mongoose.connect(db, {
//       useNewUrlParser: true,
//       // useCreateIndex: true,
//       // useFindAndModify: false,
//       useUnifiedTopology: true,
//     });

//     console.log("MongoDB Connected...");
//   } catch (err) {
//     console.error(err.message);
//     process.exit(1);
//   }
// };

export default connectDB;