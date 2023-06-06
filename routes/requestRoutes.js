import express from "express";
import {
  createrequest,
  deleterequest,
  getSingleRequest,
  getallrequest,
  getcategoryname,
  postProduct,
} from "../controllers/requestController.js";

const router = express.Router();

//create request
router.post("/requests", createrequest);
//get all requests
router.get("/requests", getallrequest);
//get single request
router.get("/requests/:id", getSingleRequest);
//post product to collection products
router.post("/users-request", postProduct);
//delete request
router.delete("/requests/:id", deleterequest);
// Route to get category name by ID
router.get("/requests/category/:id", getcategoryname);

export default router;
