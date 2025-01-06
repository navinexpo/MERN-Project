const { imageUploadUtil } = require("../../helpers/Cloudinary");
const Product = require("../../models/Product");

const handleImageUpload = async (req, res) => {
  try {
    // Validate file existence
    if (!req.file || !req.file.buffer) {
      return res.status(400).json({
        success: false,
        message: "No file provided or invalid file format.",
      });
    }

    // Convert file buffer to Base64
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64; // Added a comma after "base64"

    // Upload to Cloudinary or other service
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Error in handleImageUpload:", error);
    res.status(500).json({
      success: false,
      message: "Error occurred during image upload.",
    });
  }
};

//add a new product
const addProduct = async (req, res) => {
  try {
    const {
      title,
      price,
      description,
      image,
      category,
      brand,
      salePrice,
      totalStock,
    } = req.body;

    const newlyCreatedProduct = new Product({
      title,
      price,
      description,
      image,
      category,
      brand,
      salePrice,
      totalStock,
    });
    await newlyCreatedProduct.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred during product creation.",
    });
  }
};

//fetch all products
const fetchAllProducts = async (req, res) => {
  try {
    const listOfProducts = await Product.find({});
    res.status(200).json({
      success: true,
      data: listOfProducts,
    });
  } catch (error) {
    console.log(error);
    res.status().json({
      success: false,
      message: "Error occurred during product fetching.",
    });
  }
};

//edit products
const editProduct = async (req, res) => {
  try {
    //edit by the product id. pass id as param.
    const { id } = req.params;
    const {
      title,
      price,
      description,
      image,
      category,
      brand,
      salePrice,
      totalStock,
    } = req.body;

    //first we need to find the product.
    const findProduct = await Product.findById(id);
    //we check if the product is present. if not, return 404.
    if (!findProduct)
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    //update the product information
    findProduct.title = title || findProduct.title;
    findProduct.description = description || findProduct.description;
    findProduct.category = category || findProduct.category;
    findProduct.brand = brand || findProduct.brand;
    findProduct.price = price || findProduct.price;
    findProduct.salePrice = salePrice || findProduct.salePrice;
    findProduct.totalStock = totalStock || findProduct.totalStock;
    findProduct.image = image || findProduct.image;

    await findProduct.save();
    res.status(200).json({
      success: true,
      data: findProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred during product update.",
    });
  }
};

//delete a product
const deleteProduct = async (req, res) => {
  try {
    //edit by the user id. pass id as param.
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product)
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
      //if product is deleted, return success message.
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
      })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error occurred during product deletion.",
    });
  }
};

module.exports = {
  handleImageUpload,
  addProduct,
  fetchAllProducts,
  editProduct,
  deleteProduct,
};
