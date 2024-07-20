const Category = require("../models/categoryModel");
const getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({}).sort({ name: "asc" }).orFail();
    res.json(categories);
  } catch (error) {
    next(error);
  }
};

const newCategory = async (req, res, next) => {
  try {
    // await res.send(!!req.body);
    const { category } = await req.body;
    if (!category) {
      return res.status(400).send("category input is required");
    }
    const categoryExists = await Category.findOne({ name: category });
    if (categoryExists) {
      return res.status(400).send("category already exist");
    } else {
      const categoryCreated = await Category.create({ name: category });
      res.status(201).json(categoryCreated);
    }
  } catch (err) {
    next(err);
  }
};
const deleteCategory = async (req, res, next) => {
  //  res.send(req.params.category)
  try {
    if (req.params.category !== "choose category") {
      const categoryExist = await Category.findOne({
        name: decodeURIComponent(req.params.category),
      }).orFail();
      await categoryExist.deleteOne();
      res.json({ categoryDeleted: true });
    }
  } catch (err) {
    next(err);
  }
};

const saveAttr = async (req, res, next) => {
  // res.status(200).json(req.body)
  const { key, val, categoryChoosen } = req.body;
  if (!key || !val || !categoryChoosen) {
    return res.status(400).send("All inputs are required");
  }
  try {
    const category = categoryChoosen.split("/")[0];
    const categoryExist = await Category.findOne({ name: category }).orFail();
    if (categoryExist.attrs.length > 0) {
      var keyDoesNotExist = true;
      categoryExist.attrs.map((item, idx) => {
        if (item.key === key) {
          keyDoesNotExist = false;
          var copyAttributeValues = [...categoryExist.attrs[idx].value];
          copyAttributeValues.push(val);
          var newAttributeValues = [...new Set(copyAttributeValues)];
          categoryExist.attrs[idx].value = newAttributeValues;
        }
      });
      if (keyDoesNotExist) {
        categoryExist.attrs.push({ key: key, value: [val] });
      }
    } else {
      categoryExist.attrs.push({ key: key, value: [val] });
    }
    await categoryExist.save();
    let cat = await Category.find({}).sort({ name: "asc" }).orFail();
    res.status(201).json({ categoriesUpdated: cat });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getCategories,
  newCategory,
  deleteCategory,
  saveAttr,
};
