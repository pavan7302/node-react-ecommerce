import express from 'express';
import Product from '../models/productModel.js';
import data from '../data.js';
import { isAuth, isAdmin } from '../util.js';

const router = express.Router();

/* =====================================================
   SEED PRODUCTS INTO DATABASE
   Run once:
   GET /api/products/seed
===================================================== */

router.get('/seed', async (req, res) => {
  try {
    // delete old products
    await Product.deleteMany({});

    // insert products from data.js
    const createdProducts = await Product.insertMany(data.products);

    res.send(createdProducts);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

/* =====================================================
   GET ALL PRODUCTS
===================================================== */

router.get('/', async (req, res) => {
  try {
    console.log('GET /api/products called');

    const products = await Product.find({});

    console.log('Products found:', products.length);

    res.send(products);
  } catch (err) {
    console.log('ERROR:', err);
    res.status(500).send(err);
  }
});

/* =====================================================
   GET PRODUCT BY ID
===================================================== */

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      res.send(product);
    } else {
      res.status(404).send({ message: 'Product Not Found.' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

/* =====================================================
   SAVE REVIEW
===================================================== */

router.post('/:id/reviews', isAuth, async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    const review = {
      name: req.body.name,
      rating: Number(req.body.rating),
      comment: req.body.comment,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((a, c) => a + c.rating, 0) /
      product.reviews.length;

    const updatedProduct = await product.save();

    res.status(201).send({
      data: updatedProduct.reviews[updatedProduct.reviews.length - 1],
      message: 'Review saved successfully',
    });
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

/* =====================================================
   UPDATE PRODUCT
===================================================== */

router.put('/:id', isAuth, isAdmin, async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = req.body.name;
    product.price = req.body.price;
    product.image = req.body.image;
    product.brand = req.body.brand;
    product.category = req.body.category;
    product.countInStock = req.body.countInStock;
    product.description = req.body.description;

    const updatedProduct = await product.save();

    res.status(200).send({
      message: 'Product Updated',
      data: updatedProduct,
    });
  } else {
    res.status(404).send({ message: 'Product Not Found' });
  }
});

/* =====================================================
   DELETE PRODUCT
===================================================== */

router.delete('/:id', isAuth, isAdmin, async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await product.deleteOne();

    res.send({
      message: 'Product Deleted',
    });
  } else {
    res.status(404).send({
      message: 'Product Not Found',
    });
  }
});

/* =====================================================
   CREATE PRODUCT
===================================================== */

router.post('/', isAuth, isAdmin, async (req, res) => {
  const product = new Product({
    name: req.body.name,
    price: req.body.price,
    image: req.body.image,
    brand: req.body.brand,
    category: req.body.category,
    countInStock: req.body.countInStock,
    description: req.body.description,
    rating: req.body.rating || 0,
    numReviews: req.body.numReviews || 0,
  });

  const newProduct = await product.save();

  if (newProduct) {
    res.status(201).send({
      message: 'New Product Created',
      data: newProduct,
    });
  } else {
    res.status(500).send({
      message: 'Error Creating Product',
    });
  }
});

export default router;
