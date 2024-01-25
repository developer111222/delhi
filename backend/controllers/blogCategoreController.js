const catchAsyncError = require("../middleware/catchAsyncError");
const blogCategoreModel = require("../models/blogCategoreModel");
const mongoose = require("mongoose");
const ErrorHandler = require("../utils/errorhandler");
const seoModel = require("../models/seoModel");

exports.createBlogCategore = catchAsyncError(async (req, res, next) => {
  console.log(req.body);
  try {
    const { name, slug, title, description, metadec, keyword, seotitle } =
      req.body;
    let metaLink = slug.split(" ").join("-").toLowerCase();
    const user = req.user._id;

    const existingSlug = await blogCategoreModel.findOne({ slug: metaLink });

    if (existingSlug) {
      return next(
        new ErrorHandler(
          `Slug already exists. Please choose a different one.`,
          404
        )
      );
    }

    const newCategorie = await blogCategoreModel.create({
      name,
      slug: metaLink,
      title,
      description,
      user,
    });

    const existingSeoUrl = await seoModel.findOne({ metaLink });

    if (existingSeoUrl) {
      return next(
        new ErrorHandler(
          `Slug already exists. Please choose a different one.`,
          404
        )
      );
    }
    const type = "post category";
    const seo = await seoModel.create({
      metatitle: seotitle,
      keyword,
      metadec,
      metalink: metaLink,
      type,
      postcategoryid: newCategorie._id,
    });

    newCategorie.seo = seo._id;
    await newCategorie.save({ validateBeforeSave: false });

    res.status(201).json({
      success: true,
      message: "Categore created successfully",
      newCategorie,
    });
  } catch (err) {
    console.log(err);
    return next(new ErrorHandler(`Internal server error: ${err}`, 500));
  }
});

exports.getAllBlogCategores = catchAsyncError(async (req, res, next) => {
  try {
    const allCategores = await blogCategoreModel.find();
    res.status(200).json({
      success: true,
      allCategores,
    });
  } catch (err) {
    return next(new ErrorHandler(`Internal server error: ${err}`, 500));
  }
});

exports.getSingleBlogCategores = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;

    const isExist = await blogCategoreModel.findById(id).populate([
      
      { path: "user", model: "User" },
      { path: "seo", model: "SEO" },
    ]);

    if (!isExist) {
      return next(new ErrorHandler("Id not found", 404));
    }
    res.status(200).json({
      success: true,
      Category: isExist,

    });
  } catch (err) {
    return next(new ErrorHandler(`Internal server error: ${err}`, 500));
  }
});

exports.deleteBlogCategore = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ErrorHandler("Invalid ID format", 400));
    }

    const existingPost = await blogCategoreModel.findById(id);

    if (!existingPost) {
      return next(new ErrorHandler("Post not found", 404));
    }

    await existingPost.deleteOne();
    res.status(200).json({
      success: true,
      message: "post has been deleted",
    });
  } catch (err) {
    return next(new ErrorHandler(`Internal server error: ${err}`, 500));
  }
});

exports.updateBlogCategore = catchAsyncError(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, slug, title, description, seotitle, keyword, metadec } =
      req.body;
    let metaLink = slug.split(" ").join("-").toLowerCase();
    const user = req.user._id;

    const data = {
      name,
      slug: metaLink,
      title,
      description,
    };
    const seoData = {
      seotitle,
      keyword,
      metadec,
      metaLink,
    };
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return next(new ErrorHandler("Invalid ID format", 400));
    // }

    const updatedCategory = await blogCategoreModel.findByIdAndUpdate(
      id,
      data,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    const seo = await seoModel.findById(updatedCategory.seo);

    if (!seo) {
      return next(new ErrorHandler("Post not found", 404));
    }

    const updatedPostSeo = await seoModel.findOneAndUpdate(
      { _id: seo._id },
      seoData,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
      updatedCategory,
    });
  } catch (err) {

console.log(err)  
  return next(new ErrorHandler(`Internal server error: ${err}`, 500));
  }
});
