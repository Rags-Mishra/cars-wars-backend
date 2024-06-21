import { ObjectId } from 'mongodb';
import connectDB from '../config/db.js';

export const getAllSoldVehicles = async (req, res) => {
  try {
    const db = await connectDB();
    const soldVehicles = await db.collection('sold_vehicles').find().toArray();
    res.send(soldVehicles);
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
};

export const addSoldVehicle = async (req, res) => {
  const { vehicle_id, car_id, vehicle_info } = req.body;

  try {
    const db = await connectDB();
    const result = await db.collection('sold_vehicles').insertOne({
      vehicle_id,
      car_id,
      vehicle_info,
    });

    res.status(201).send({ id: result.insertedId });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
};
