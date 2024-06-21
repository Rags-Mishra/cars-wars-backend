import { ObjectId } from 'mongodb';
import connectDB from '../config/db.js';

export const getAllCars = async (req, res) => {
  try {
    const db = await connectDB();
    const cars = await db.collection('cars').find().toArray();
    res.send(cars);
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
};

export const addCar = async (req, res) => {
  const { car_id, type, name, model, car_info } = req.body;

  try {
    const db = await connectDB();
    const result = await db.collection('cars').insertOne({
      car_id,
      type,
      name,
      model,
      car_info,
    });

    res.status(201).send({ id: result.insertedId });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
};

export const getCarsByDealership=async(req,res)=>{
    const{dealershipId}=req.params;
    console.log(dealershipId)
    try {
        const db=await connectDB();
        const cars=await db.collection('cars').find({dealershipId: ObjectId.createFromHexString(dealershipId)}).toArray();
        res.send(cars);
    } catch (error) {
        res.status(500).send({message:error.message});
    }
};
