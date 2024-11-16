import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("mongodb is connected");
  })
  .catch((error) => {
    console.log(error);
  });
const app = express();

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
//ankitkkt78
//HsZDtJLWTMJwDg4c
//mongodb+srv://ankitkkt78:<db_password>@ankit-s-blog.x01nb.mongodb.net/?retryWrites=true&w=majority&appName=Ankit-s-blog
