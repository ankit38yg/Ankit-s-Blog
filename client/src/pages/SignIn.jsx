import { Button, Label, TextInput, Alert, Spinner } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice.js";
import OAuth from "../components/OAuth.jsx";

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navitgate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("All field are required"));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signIn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        return dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navitgate("/");
      }
    } catch (error) {
      dispatch(signInFailure(data.message));
    }
  };

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
          <br />
          <p>use email and entre your password to signin</p>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <Label value="your-email" />
              <TextInput
                type="email"
                placeholder="email@company.com"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value="your-password" />
              <TextInput
                type="password"
                placeholder="password..."
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button
              type="submit"
              gradientDuoTone="pinkToOrange"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner size="sm" />
                  <span className="pl-3">Loadind...</span>
                </>
              ) : (
                "SignIn"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="mt-5 gap-2 flex text-sm">
            <span>Dont't have an account ?</span>
            <Link to="/signUp" className="text-blue-500">
              signup
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
