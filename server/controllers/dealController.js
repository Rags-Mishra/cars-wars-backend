import { ObjectId } from 'mongodb';
import connectDB from '../config/db.js';

export const getAllDeals = async (req, res) => {
  try {
    const db = await connectDB();
    const deals = await db.collection('deal').find().toArray();
    res.send(deals);
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
};

export const addDeal = async (req, res) => {
  const { deal_id, car_id, deal_info } = req.body;

  try {
    const db = await connectDB();
    const result = await db.collection('deal').insertOne({
      deal_id,
      car_id,
      deal_info,
    });

    res.status(201).send({ id: result.insertedId });
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
};
