import express from "express";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signIn = async (req, res, next) => {
  const { email, password } = await req.body;

  if (!email || !password || (email === "") | (password === "")) {
    next(errorHandler(400, "all field are require"));
  }
  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, "User Not Found"));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(404, "invalid password"));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...rest } = validUser._doc;

    res
      .status(200)
      .cookie("access-token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  const { name, email, googlePhotoUrl } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .status(200)
        .cookie("access-token", token, {
          httpOnly: true,
        })
        .json(rest);
    } else {
      const generatePassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatePassword, 10);
      const newUser = User({
        username:
          name.toLowerCase().split(" ").join("") +
          Math.random().toString(36).slice(-4),
        email,
        password: hashedPassword,
        profilePicture: googlePhotoUrl,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .status(200)
        .cookie("access-token", token, {
          httpOnly: true,
        })
        .json(rest);
    }
  } catch (error) {
    console.log(error);
  }
};
