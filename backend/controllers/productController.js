const products = require("../models/productModel");
const recordsPerPage = require("../config/pagination");
const imageValidation = require("../utils/imageValidate");
const getProducts = async (req, res, next) => {
  try {
    // pagination:
    const pageNum = Number(req.query.pageNum) || 1;
    // sort by price and name:
    let sort = {};
    if (req.query.sort) {
      const sortOption = req.query.sort;
      const sortOpt = sortOption.split("_");
      sort = { [sortOpt[0]]: Number(sortOpt[1]) };
    }
    // filter product by price:
    let query = {};
    queryCondition = false;
    let priceQueryCondition = {};
    if (req.query.price) {
      queryCondition = true;
      priceQueryCondition = { price: { $lte: Number(req.query.price) } };
    }
    // filter product by rating:
    let ratingQueryCondition = {};
    if (req.query.rating) {
      queryCondition = true;
      ratingQueryCondition = { rating: { $in: req.query.rating.split(",") } };
    }

    // search product by category name from search box:
    let categoryQueryCondition = {};
    const categoryName = req.params.categoryName || "";
    if (categoryName) {
      queryCondition = true;
      let a = categoryName.replaceAll(",", "/");
      var regEx = new RegExp("^" + a);
      categoryQueryCondition = { category: regEx };
    }
    // get product on the basis of category:
    if (req.query.category) {
      queryCondition = true;
      let a = req.query.category.split(",").map((item) => {
        if (item) {
          return RegExp("^" + item);
        }
      });
      categoryQueryCondition = { category: { $in: a } };
    }

    // find product by attribute:
    let attrsQueryCondition = [];
    if (req.query.attrs) {
      queryCondition = true;
      attrsQueryCondition = req.query.attrs.split(",").reduce((acc, item) => {
        if (item) {
          let a = item.split("-");
          let values = [...a];
          values.shift();
          let a1 = {
            attrs: { $elemMatch: { key: a[0], value: { $in: values } } },
          };
          acc.push(a1);
          return acc;
        } else {
          return acc;
        }
      }, []);
    }
    // search queries:
    let searchQuery = req.params.searchQuery;
    let searchQueryCondition = {};
    let select = {};
    if (searchQuery) {
      queryCondition = true;
      searchQueryCondition = { $text: { $search: searchQuery } };
      select = {
        score: { $meta: "textScore" },
      };
      sort = {
        score: { $meta: "textScore" },
      };
    }

    // filter product by  price,rating,category,attribute and also find product by category: search
    if (queryCondition) {
      query = {
        $and: [
          priceQueryCondition,
          ratingQueryCondition,
          categoryQueryCondition,
          searchQueryCondition,
          ...attrsQueryCondition,
        ],
      };
    }

    // number of page links:
    const totalProducts = await products.countDocuments(query);
    const pageLinksNumber = Math.ceil(totalProducts / recordsPerPage);

    // getting products:
    const product = await products
      .find(query)
      .select(select)
      .skip(recordsPerPage * (pageNum - 1))
      .sort(sort)
      .limit(recordsPerPage);
    res.status(200).json({ product, pageNum, pageLinksNumber });
  } catch (err) {
    next(err.message);
  }
};
// get particular product:
const getProductById = async (req, res, next) => {
  try {
    const product = await products
      .findById(req.params.id)
      .populate("review")
      .orFail();
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};
const getBestSellers = async (req, res, next) => {
  // aggregation mai hum  multiple methods ko ik sath use kr skte hai.like:
  // sort,project,match,limit,group,replaceWith etc..
  // here we use aggregation for bestSeller:
  // sbse pele humne product ko sort kiya by asc. category and desc. sales
  // sort krne ke baad hume unique category chaiye so that har ik category ka bestseller ho.thats why we group _id with category.
  // iss unique category ke acc. hum bestseller find kr lenge

  try {
    const product = await products.aggregate([
      { $sort: { category: 1, sales: -1 } },
      {
        $group: { _id: "$category", doc_with_max_sales: { $first: "$$ROOT" } },
      },
      { $replaceWith: "$doc_with_max_sales" },
      { $project: { _id: 1, name: 1, images: 1, category: 1, description: 1 } },
      // {$match:{sales:{$gt:0}}},
      { $limit: 3 },
    ]);
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

// admin:
const adminGetProduct = async (req, res, next) => {
  try {
    const product = await products
      .find({})
      .sort({ category: 1 })
      .select("name price category");
    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};
const adminDeleteProduct = async (req, res, next) => {
  try {
    const product = await products.findById({ _id: req.params.id }).orFail();
    await product.deleteOne({});
    res.send("product deleted");
  } catch (err) {
    next(err);
  }
};
const adminCreateProduct = async (req, res, next) => {
  try {
    const product = products();
    const { name, description, count, price, category, attributesTable } =
      req.body;
    product.name = name;
    product.description = description;
    product.count = count;
    product.price = price;
    product.category = category;
    if (attributesTable.length > 0) {
      attributesTable.map((item) => {
        product.attrs.push(item);
      });
    }
    await product.save();
    res.json({
      message: "product created",
      productId: product._id,
    });
  } catch (err) {
    next(err);
  }
};

const adminUpdateProduct = async (req, res, next) => {
  try {
    const product = await products.findById(req.params.id).orFail();
    const { name, description, count, price, category, attributesTable } =
      req.body;
    product.name = name || product.name;
    product.description = description || product.description;
    product.count = count || product.count;
    product.price = price || product.price;
    product.category = category || product.category;
    if (attributesTable.length > 0) {
      product.attrs = [];
      attributesTable.map((item) => {
        product.attrs.push(item);
      });
    } else {
      product.attrs = [];
    }
    await product.save();
    res.status(200).json({
      message: "product updated",
    });
  } catch (err) {
    next(err);
  }
};
const adminUpload = async (req, res, next) => {
  try {
    const images = req.files.images;
    if (!req.files || !!req.files.images === false) {
      return res.status(400).json({ message: "no files were uploaded" });
    }
    const validateResult = imageValidation(images);
    if (validateResult.error) {
      return res.status(400).json({ message: validateResult.error });
    }
    //  fetch extension of files that will be uploaded:
    const path = require("path");
    // generate random string using uuid package:
    const { v4: uuidv4 } = require("uuid");
    // path of directory in which we want to upload image:
    const uploadDirectory = path.resolve(
      __dirname,
      "../../frontend",
      "public",
      "images",
      "products"
    );
    let imageTable = [];
    if (Array.isArray(images)) {
      imageTable = images;
    } else {
      imageTable.push(images);
    }
    const product = await products.findById(req.query.productId).orFail();
    for (let image of imageTable) {
      const extname = path.extname(image.name);
      const fileName = uuidv4() + extname;
      const uploadPath = uploadDirectory + "/" + fileName;
      product.images.push({ path: "/images/products/" + fileName });
      image.mv(uploadPath, (err) => {
        if (err) {
          return res.status(500).send(err);
        }
      });
    }
    await product.save();
    return res.send("file uploaded succesfully");
  } catch (err) {
    next(err);
  }
};
const adminDeleteProductImage = async (req, res, next) => {
  try {
    const path = require("path");
    const imagePath = decodeURIComponent(req.params.imagePath);
    const finalPath = path.resolve("../frontend/public") + imagePath;
    const fs = require("fs");
    fs.unlink(finalPath, (err) => {
      if (err) {
        res.status(500).send(err);
      }
    });
    await products
      .findOneAndUpdate(
        { _id: req.params.productId },
        { $pull: { images: { path: imagePath } } }
      )
      .orFail();
    res.end();
  } catch (err) {
    next(err);
  }
};
module.exports = {
  getProducts,
  getProductById,
  getBestSellers,
  adminGetProduct,
  adminDeleteProduct,
  adminCreateProduct,
  adminUpdateProduct,
  adminUpload,
  adminDeleteProductImage,
};
