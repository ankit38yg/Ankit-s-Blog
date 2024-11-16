import express from "express";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    next(errorHandler(500, "all field are require"));
  }
  const hashpassword = bcryptjs.hashSync(password, 10);
  const newUser = new User({
    username,
    email,
    password: hashpassword,
  });
  try {
    await newUser.save();
    res.status(200).json("signup successfull");
  } catch (error) {
    next(error);
  }
};
