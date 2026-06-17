import mongoose from 'mongoose';
import Product from './models/productModel.js';
import data from './data.js';

mongoose.connect('mongodb://mongodb:27017/ecommerce');

const seed = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(data.products);

    console.log('Products inserted');
  } catch (err) {
    console.error(err);
  }

  process.exit();
};

seed();
