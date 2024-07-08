import slugify from "slugify";
import Category from "../Models/categoryModel.js"

export const createCategoryController = async (req, res) => {
  try {
    const {name} = req.body;

    if(!name){
        return res.status(401).send({message:"Name is Required"})
    }

    const existCategory = await Category.findOne({name})

    if(existCategory){
        return res.status(200).send({
            success:true,
            message:'This category already exists'
        })
    }

    const category = await new Category({name,slug:slugify(name)}).save();

    res.status(201).send({
        success:true,
        message:"New Category Created",
        category
    })

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
export const updateCategoryController = async (req,res) => {
    try {
        const { name } = req.body;
        const {id} = req.params;

        const category = await Category.findByIdAndUpdate(id,{name,slug : slugify(name)},{new:true})

        res.status(200).send({
            success:true,
            message:"Category Update Sucessfully",
            category
        })
    } catch (error) { 
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Server",
      error,
    });
    }
}

//delete
export const deleteCategoryController = async (req,res) => {
    try {
        const {id} = req.params;

        const category = await Category.findByIdAndDelete(id,{new:true})

        res.status(200).send({
            success:true,
            message:"Category Update Sucessfully",
            category
        })
    } catch (error) { 
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Server",
      error,
    });
    }
}


//fetching category
export  const getAllCategoriesController = async (req,res)=>{ 
    try {
        const category = await Category.find({});
        
        res.status(200).send({
            success:true,
            message:"All Categories List",
            category
        })
        
    } catch (error) { 
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Server",
      error,
    });
    }
}

export const singleCategoryController = async(req,res) => {
    try {
        const {slug} = req.params.slug;

        const category = await Category.findOne(slug)

        res.status(200).send({
            success : true ,
            message:"Get Single Category",
            category
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error in Server",
          error,
        });
    }
}