import express from "express";
import { requireSignIn, isAdmin } from "../Middleware/authMiddleware.js";
import {
  braintreePaymentController,
  braintreeTokenController,
  categoryProducts,
  createProductController,
  deleteProductController,
  filterProductsController,
  getPhotoController,
  getProductController,
  paginationProductListController,
  productCountController,
  productSearch,
  similarProducts,
  singleProductController,
  updateProductController,
} from "../Controllers/productController.js";
import formidable from "express-formidable";
import braintree from "braintree";

const router = express.Router();

router
  .route("/create-product")
  .post(requireSignIn, isAdmin, formidable(), createProductController);

router
  .route("/update-product/:id")
  .put(requireSignIn, formidable(),isAdmin, updateProductController);

router
.route("/get-product")
.get(getProductController);

router
.route("/single-product/:slug")
.get(singleProductController);

router
.route("/product-photo/:pid")
.get(getPhotoController)

router
  .route("/delete-product/:id")
  .delete(deleteProductController);

  router
  .route("/product-filter")
  .post( filterProductsController);

  router
  .route("/product-count")
  .get( productCountController);

  router
  .route("/product-list/:page")
  .get(paginationProductListController);

  router
  .route("/search/:keyword")
  .get(productSearch);

  router
  .route("/similar-products/:pid/:cid")
  .get(similarProducts);

  router
  .route("/categories-products/:slug")
  .get(categoryProducts);


  //payments routes
  //token
  router
  .route('/braintreepayment/token')
  .get(braintreeTokenController);

  //payment
  router
  .route("/braintreepayment/payment")
  .post(requireSignIn,braintreePaymentController)

export default router;
 