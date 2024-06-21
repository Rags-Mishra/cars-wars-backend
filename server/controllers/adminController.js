import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '../config/db.js'

export const registerAdmin = async (req, res) => {
  const { admin_id, password } = req.body;

  try {
    const db = await connectDB();
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await db.collection("admin").findOne({ admin_id });

    if (admin) return res.status(400).send('Admin exists!');

    const result = await db.collection('admin').insertOne({
      admin_id,
      password: hashedPassword,
    });

    res.status(201).send({ id: result.insertedId });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
};

export const loginAdmin = async (req, res) => {
  const { admin_id, password } = req.body;

  try {
    const db = await connectDB();
    const admin = await db.collection('admin').findOne({ admin_id });

    if (!admin) return res.status(404).send('Admin not found.');

    const validPassword = await bcrypt.compare(password, admin.password);

    if (!validPassword) return res.status(400).send('Invalid password.');

    const token = jwt.sign({ id: admin._id, role: 'admin' }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.send({ token });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
};
