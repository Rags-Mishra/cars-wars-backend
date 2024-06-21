import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import connectDB from '../config/db.js';

export const registerDealership = async (req, res) => {
  const { dealership_email, dealership_id, dealership_name, dealership_location, password, dealership_info, cars, deals, sold_vehicles } = req.body;

  try {
    const db = await connectDB();
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await db.collection('dealership').insertOne({
      dealership_email,
      dealership_id,
      dealership_name,
      dealership_location,
      password: hashedPassword,
      dealership_info,
      cars,
      deals,
      sold_vehicles,
    });

    res.status(201).send({ id: result.insertedId });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
};

export const loginDealership = async (req, res) => {
  const { dealership_email, password } = req.body;

  try {
    const db = await connectDB();
    const dealership = await db.collection('dealership').findOne({ dealership_email });

    if (!dealership) return res.status(404).send('Dealership not found.');

    const validPassword = await bcrypt.compare(password, dealership.password);

    if (!validPassword) return res.status(400).send('Invalid password.');

    const token = jwt.sign({ id: dealership._id, role: 'dealership' }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.send({ token });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
};
