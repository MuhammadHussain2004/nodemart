const Product = require("../models/Product");
const uploadImage = require('../utils/uploadImage');
exports.getProducts = async (req, res) => {
  try {
    const page = Math.max(Number.parseInt(req.query.page) || 1, 1);

    const limit = Math.min(Number.parseInt(req.query.limit) || 10, 100);

    const skip = (page - 1) * limit;

    const filters={};

    if(req.query.search){
        filters.title={
            $regex: req.query.search,
            $options: "i"
        }
    }

    if(req.query.minPrice !== undefined || req.query.maxPrice !== undefined){
        filters.price= {};
       
        if(req.query.minPrice !== undefined){
            filters.price.$gte= Number(req.query.minPrice);
        }

        if(req.query.maxPrice !== undefined){
            filters.price.$lte = Number(req.query.maxPrice);
        }
    }
 
    const sort= {};

    if(req.query.sort === 'price_asc'){
        sort.price = 1;
    }
    else if(req.query.sort === 'price_desc'){
        sort.price = -1;
    }
    else{
        sort.createdAt = -1;
    }

    const [products, totalProducts] = await Promise.all([
      Product.find(filters).populate("owner", "name email").sort(sort).skip(skip).limit(limit),
      Product.countDocuments(filters),
    ]);

    res.json({
      page,
      limit,
      totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      products,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: "Invalid product id" });
  }
};

exports.getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({
      owner: req.user.id,
    }).populate("owner", "name email");

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const { title, price } = req.body;
    const image = req.file ? await uploadImage(req.file.buffer) : '';
    const newProduct = await Product.create({
      title,
      price,
      image, 
      owner: req.user.id,
    });
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (!product.owner || product.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You can update only your own product" });
    }

    if (req.body.title !== undefined) {
      product.title = req.body.title;
    }
    if (req.body.price !== undefined) {
      product.price = req.body.price;
    }

    await product.save();
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    if (!product.owner || product.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "You can delete only your own product" });
    }

    await product.deleteOne();

    res.json({
      message: "Product delete successfully",
    });
  } catch (error) {
    res.status(400).json({ message: "Invalid product id" });
  }
};
