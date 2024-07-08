import slugify from "slugify";
import Product from "../Models/productModel.js";
import Category from "../Models/categoryModel.js";
import Order from "../Models/orderModel.js"
import fs from "fs";
import braintree from "braintree";
import dotenv from "dotenv";

dotenv.config();

//payment gate way
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT_ID,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

//create
export const createProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;

    const { photo } = req.files;

    //validation
    switch (true) {
      case !name:
        return res
          .status(500)
          .send({ error: "Name is Required", message: "Name is required" });
      case !description:
        return res.status(500).send({
          error: "Description is Required",
          message: "Description is required",
        });
      case !price:
        return res
          .status(500)
          .send({ error: "price is Required", message: "price is required" });
      case !category:
        return res.status(500).send({
          error: "category is Required",
          message: "category is required",
        });
      case !quantity:
        return res.status(500).send({
          error: "quantity is Required",
          message: "quantity is required",
        });
      case photo && photo.size > 10000000:
        return res.status(500).send({
          error: "photo is Required and should be less than 1mb",
          message: "photo is required and should be less than 1mb",
        });
    }

    const product = await new Product({ ...req.fields, slug: slugify(name) });

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.status(201).send({
      success: true,
      message: "Product Update Sucessfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Server",
      error,
    });
  }
};

//delete
export const deleteProductController = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id).select("-photo");
    res.status(200).send({
      sucess: true,
      message: "Product Delete SucessFull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Server",
      error,
    });
  }
};

//update
export const updateProductController = async (req, res) => {
  try {
    const { name, slug, description, price, category, quantity, shipping } =
      req.fields;

    const { photo } = req.files;

    //validation
    switch (true) {
      case !name:
        return res
          .status(500)
          .send({ error: "Name is Required", message: "Name is required" });
      case !description:
        return res.status(500).send({
          error: "Description is Required",
          message: "Description is required",
        });
      case !price:
        return res
          .status(500)
          .send({ error: "price is Required", message: "price is required" });
      case !category:
        return res.status(500).send({
          error: "category is Required",
          message: "category is required",
        });
      case !quantity:
        return res.status(500).send({
          error: "quantity is Required",
          message: "quantity is required",
        });
      case photo && photo.size > 10000000:
        return res.status(500).send({
          error: "photo is Required and should be less than 1mb",
          message: "photo is required and should be less than 1mb",
        });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.status(201).send({
      success: true,
      message: "Product Update Sucessfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Server",
      error,
    });
  }
};

//get
export const getProductController = async (req, res) => {
  try {
    const product = await Product.find({})
      .select("-photo")
      .populate("category") //to display data present in category model
      .limit(12)
      .sort({ createdAt: -1 });
    res.status(200).send({
      success: true,
      countTotal: product.length, //to check how many product present
      message: "All Products",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      sucess: false,
      message: "Error in Server",
      error,
    });
  }
};

//get single
export const singleProductController = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category"); //to display data present in category model;
    res.status(200).send({
      success: true,
      message: "Single Product Fetched",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Server",
      error,
    });
  }
};

//get photo controller
export const getPhotoController = async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid).select("photo");

    if (product.photo.data) {
      //setting data
      res.set("Content-type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Server",
      error,
    });
  }
};

//product filter conrotller
export const filterProductsController = async (req, res) => {
  try {
    const { checked, radio } = req.body;

    let args = {};

    if (checked.length > 0) {
      args.category = checked;
    }
    if (radio.length) {
      //greter than  //smaller than
      args.price = { $gte: radio[0], $lte: radio[1] };
    }

    const products = await Product.find(args);

    console.log(products);

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Server While filtering Products",
      error,
    });
  }
};

//similar products
export const similarProducts = async (req, res) => {
  try {
    const { pid, cid } = req.params;

    const products = await Product.find({
      category: cid,
      _id: { $ne: pid }, //not include $ne function
    })
      .select("-photo")
      .limit(3)
      .populate("category");

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Server While finding similar products",
      error,
    });
  }
};

//product count
export const productCountController = async (req, res) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount();

    console.log(total);
    res.status(200).send({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Server While Counting Products",
      error,
    });
  }
};

//product list based on pages
export const paginationProductListController = async (req, res) => {
  try {
    const perPage = 2;
    const page = req.params.page ? req.params.page : 1;
    const products = await Product.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Server While paginatioon",
      error,
    });
  }
};

//categories wise products
export const categoryProducts = async (req, res) => {
  try {
    const category = await Category.find({ slug: req.params.slug });
    const products = await Product.find({ category }).populate("category");

    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Server While fetching product based on cetegory",
      error,
    });
  }
};

//search product
export const productSearch = async (req, res) => {
  try {
    const { keyword } = req.params;

    console.log(keyword);

    const result = await Product.find({
      $or: [
        {
          name: { $regex: keyword, $options: "i" },
          description: { $regex: keyword, $options: "i" },
        },
      ],
    }).select("-photo");

    console.log(result);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      message: "Error in Server While seraching",
      error,
    });
  }
};

//payment gateway api
//token
export const braintreeTokenController = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (error, response) {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(response);
      }
    });
  } catch (error) {
    console.log(error);
  }
};

//payment
export const braintreePaymentController = async (req, res) => {
  try {
    const { cart, nonce } = req.body;

    let total = 0;

    cart.map((data) => (total += data.price));

    let newTransection = gateway.transaction.sale({
      amount:total,
      paymentMethodNonce:nonce,
      options:{
        submitForSettlement:true
      },
    },
    function(error,result){
      if(result){
        const order = new Order({
          products:cart,
          payment:result,
          buyers:req.user._id
        }).save()

      res.status(200).json({ok:true})  
      }
      else{
        res.status(500).send(error)
      }
    }
    )

  } catch (error) {
    console.log(error);
  }
};
