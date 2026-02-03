"use client";
import { useState, useContext, useEffect, useRef } from "react";
import toast from "react-hot-toast";
import Header from "./../components/header";
import { Checkoutproduct } from "./../context/context";
import baseURL from "./../baseURL";

const Page = () => {
  const [pass, setpass] = useState("");

  const [hide, sethide] = useState("");

  const { checked } = useContext(Checkoutproduct);
  const [email100, setemail100] = useState("");

  const passline = useRef();

  useEffect(() => {
    const em = localStorage.getItem("Email");

    if (em) {
      function a() {
        setemail100(em);
      }

      a();
    }
  }, []);

  async function deleteaccount(e) {
    e.preventDefault();

    if (pass.trim() === "") {
      toast.error("Please fill the field.Field cannnot be submitted empty!");
      passline.current.style.borderBottomColor = "red";
      return;
    }

    const ep = {
      Email: email100,
      Name: pass,
    };

    try {
      const data = await fetch(`${baseURL}/delete`, {
        body: JSON.stringify(ep),
        headers: {
          "Content-Type": "application/json",
        },
        method: "DELETE",
      });

      if (data.status === 429) {
        for (let i = 0; i < 3; i++) {
          toast.error("Too many request try again later");
        }
      }

      if (data) {
        console.log(data);
        if (data.status === 401) {
          toast.error("Password is not valid!");
        } else if (data.status === 200) {
          toast.success("Successfully deleted accout");
          setTimeout(() => {
            location.href = "https://darshankardil-create.github.io/E_commerce_f_mern/route/sign-in"
          }, 500);
        }
      }
    } catch (error) {
      console.log("failed to delete account", error);
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
              ? "absolute top-50  filter:blur(2px) border-4  border-white h-120 w-150 rounded-[10px] grid justify-items-center gap-y-10"
              : "absolute top-50 filter:blur(2px) border-4  border-black h-120 w-150 rounded-[10px] grid justify-items-center gap-y-10"
          }
          onSubmit={(e) => {
            deleteaccount(e);
          }}
        >
          <div
            className={
              checked
                ? "text-white font-bold text-[40px]"
                : "text-black font-bold text-[40px]"
            }
          >
            DELETE ACCOUNT
          </div>
          <input
            type={hide}
            ref={passline}
            className={
              checked
                ? "border-b-2 border-b-white w-100 text-white focus:outline-none h-10 mt-20"
                : "border-b-2 border-b-black w-100 h-10 text-black focus:outline-none mt-20"
            }
            placeholder="Enter Your accout Password"
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
                ? "checkbox theme-controller absolute top-60 right-15 border-white text-white"
                : "checkbox theme-controller absolute top-60 right-15 "
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
            DELETE ACCOUNT
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
