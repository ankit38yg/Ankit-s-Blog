import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="min-h-screen mt-20 ">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-orange-600 via-red-400 to-orange-300 rounded-lg text-teal-900">
              Ankit's
            </span>{" "}
            Blog
          </Link>
          <p className="text-sm mt-5">
            Welcome to my blog! I'm Ankit Yadav, a passionate Computer Science
            student with a knack for exploring innovative tech solutions.
          </p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4">
            <div>
              <Label value="your-username" />
              <TextInput
                type="text"
                placeholder="enter your name"
                id="username"
              />
            </div>
            <div>
              <Label value="your-email" />
              <TextInput
                type="email"
                placeholder="email@company.com"
                id="email"
              />
            </div>
            <div>
              <Label value="your-password" />
              <TextInput
                type="password"
                placeholder="password..."
                id="password"
              />
            </div>
            <Button type="submit" gradientDuoTone="pinkToOrange">
              SignUp
            </Button>
          </form>
          <div className="mt-5 gap-2 flex text-sm">
            <span>Have an account ?</span>
            <Link to="/signIn" className="text-blue-500">
              signin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
