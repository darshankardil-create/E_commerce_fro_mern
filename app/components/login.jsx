"use client";
import React from "react";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Header from "./../components/header";
import { Checkoutproduct } from "./../context/context";
import baseURL from "./../baseURL";

const Page = () => {
  const [postingid, setpostingid] = useState(null);
  const [pass, setpass] = useState("");
  const [form, setform] = useState("");
  const [hide, sethide] = useState("");

  const { setSigninid, checked } = useContext(Checkoutproduct);

  async function postemaildata(e) {
    e.preventDefault();

    if (form.trim() === "" || pass.trim() === "") {
      toast.error("Input Can't be empty all filelds should be filled!");
      return;
    }

    setpostingid(true);

    const cartid = {
      Email: form,
      password: pass,
    };

    if (true) {
      try {
        const postemail = await axios.post(`${baseURL}/login`, cartid);

        console.log("registeremail", postemail);

        if (postemail.status === 200) {
          toast.success("Successfully login");
          setSigninid(postemail.data.token);
          console.log(postemail);
          location.href =
            "https://darshankardil-create.github.io/E_commerce_fro_mern/";
        }
      } catch (error) {
        if (error.response.status === 401) {
          toast.error("Email id OR Password is not valid!");
        }

        if (
          error.response.status === 400 &&
          error.response.data.message === "user already exist"
        ) {
          toast.error("User already exist please simply login");
        }

        if (error.status === 429) {
          for (let i = 0; i < 3; i++) {
            toast.error("Too many request try again later");
          }
        }

        console.error("failed to post cart data", error);
      } finally {
        setpostingid(false);
      }
    }
  }

  return (
    <div>
      <div
        className={` min-h-screen grid justify-items-center h-full w-full ${checked ? "absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]" : "absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"} `}
      >
        <Header checked={checked} />

        <form
          className={
            checked
              ? "absolute top-50   border-[4px]  border-white lg:h-120 lg:w-150 h-100 w-100 rounded-[10px] grid justify-items-center gap-y-10"
              : "absolute top-50 filter:blur(2px) border-[4px]  border-black lg:h-120 lg:w-150 h-100 w-100 rounded-[10px] grid justify-items-center gap-y-10"
          }
          onSubmit={(e) => {
            postemaildata(e);
          }}
        >
          <div
            className={
              checked
                ? "text-white font-bold text-[40px]"
                : "text-black font-bold text-[40px]"
            }
          >
            Login In Page
          </div>{" "}
          <div className=" font-[1000] text-yellow-500 text-[40px]">
            {postingid && "Loging you in..."}
          </div>
          <input
            type="email"
            className={
              checked
                ? "border-b-2 border-b-white w-80 text-white focus:outline-none"
                : "border-b-2 border-b-black w-80 text-black focus:outline-none"
            }
            placeholder="Enter your email id"
            onChange={(e) => setform(e.target.value)}
          />
          <input
            type={hide}
            className={
              checked
                ? "border-b-2 border-b-white w-80 text-white focus:outline-none"
                : "border-b-2 border-b-black w-80 text-black focus:outline-none"
            }
            placeholder="Enter Your Password"
            onChange={(e) => setpass(e.target.value)}
          />
          <input
            type="checkbox"
            title="click to show password"
            onChange={(e) =>
              e.target.checked ? sethide("") : sethide("password")
            }
            value="synthwave"
            className={
              checked
                ? "checkbox theme-controller absolute top-80 right-25 border-white text-white"
                : "checkbox theme-controller absolute top-80 right-25"
            }
          />
          <button
            className={
              checked
                ? "btn bg-white text-black border-[#e5e5e5]  w-60"
                : "btn bg-green-600 text-black border-[#e5e5e5]  w-60"
            }
          >
            <svg
              aria-label="Email icon"
              width="16"
              height="16"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2"
                fill="none"
                stroke="black"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
