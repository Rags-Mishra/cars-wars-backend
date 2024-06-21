import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// import { ObjectId } from "mongodb";
import connectDB from "../config/db.js";
export const registerUser = async (req, res) => {
  const {  user_email, user_location, user_info, password } = req.body;
  try {
    const db = await connectDB();
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.collection("users").findOne({ user_email });

    if (user) return res.status(400).send('User exists!');

    const result = await db.collection("users").insertOne({
      user_email,
      user_location,
      user_info,
      password: hashedPassword,
    });
    res.status(201).send({ id: result.insertedId });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
export const loginUser = async (req, res) => {
  const { user_email, password } = req.body;
  try {
    const db = await connectDB();

    const user = await db.collection("users").findOne({ user_email });
    if (!user) return res.status(404).send("User not found");
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(404).send("Invalid Password");
    const token = jwt.sign(
      { id: user._id, role: "user" },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.send({"Token":token});
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
