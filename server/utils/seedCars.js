import { MongoClient,ObjectId } from 'mongodb';
import { faker } from '@faker-js/faker';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI;

const generateCarData = () => ({
  name: faker.vehicle.manufacturer(),
  type: faker.vehicle.model(),
  year: faker.date.past({years:20}).getFullYear(),
  price: faker.commerce.price({min:10000, max:50000, dec:0, symbol:'$'}),
  dealershipId: new ObjectId(),  // Replace with actual dealership IDs if available
  ownerId: new ObjectId(), 
  image: 'https://images.unsplash.com/photo-1523983302122-73e869e1f850?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%20870w'    // Replace with actual user IDs if available
});

const seedCars = async () => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const carsCollection = db.collection('cars');

    const carData = [];
    for (let i = 0; i < 50; i++) {
      carData.push(generateCarData());
    }

    await carsCollection.insertMany(carData);

    console.log('Seed data inserted successfully');
  } catch (error) {
    console.error('Error inserting seed data:', error);
  } finally {
    await client.close();
  }
};

seedCars();
