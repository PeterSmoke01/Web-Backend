import RequestModel from "../models/RequestModel.js";
import productModel from "../models/productModel.js";

//create request product from user
export const createrequest = async (req, res) => {
  console.log(req.body);
  try {
    const { product, user, status } = req.body;
    const newRequest = await RequestModel.create({
      product,
      user,
      status,
    });
    res.status(200).json(newRequest);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//get request product from user
export const getallrequest = async (req, res) => {
  let id = req.query.id;
  let search = {};
  if (id) {
    search = { _id: id };
  }
  console.log(search);
  try {
    const request = await RequestModel.find(search);
    res.status(200).json(request);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//admin get single request product from user
export const getSingleRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const request = await RequestModel.findById(id);
    request.status = "pending";
    await request.save();
    res.status(201).send({
      success: true,
      message: "Product sent to admin successfully!",
      products,
    });
    res.status(200).json(request);
  } catch {
    res.status(500).json({ message: error.message });
  }
};

//Product post to collection products
export const postProduct = async (req, res) => {
  try {
    const { name, category } = req.body;
    const newProduct = await productModel.create({
      name,
      category,
    });
    await newProduct.save();
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//delete request product from user
export const deleterequest = async (req, res) => {
  try {
    const { id } = req.params;
    await RequestModel.findByIdAndDelete(id);
    res.status(200).json({ message: "Request deleted successfully" });
  } catch {
    res.status(500).json({ message: error.message });
  }
};

//get categoryname by id
export const getcategoryname = async (req, res) => {
  try {
    const response = await axios.get("/api/v1/category/categories");
    setCategories(response.data);
  } catch (error) {
    console.log(error);
  }
};
