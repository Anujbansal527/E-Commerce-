import express from "express";
import { isAdmin, requireSignIn } from "../Middleware/authMiddleware.js";
import { createCategoryController, deleteCategoryController, getAllCategoriesController, singleCategoryController, updateCategoryController } from "../Controllers/categoryController.js";

const router = express.Router();

router.route("/create-category").post(requireSignIn,isAdmin,createCategoryController)

router.route("/update-category/:id").put(requireSignIn,isAdmin,updateCategoryController)

router.route("/delete-category/:id").delete(requireSignIn,isAdmin,deleteCategoryController)

router.route("/get-category").get(getAllCategoriesController)

router.route("/single-category/:slug").get(singleCategoryController)


export default router;

