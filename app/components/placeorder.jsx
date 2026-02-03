"use client";
import React from "react";
import Header from "./header";
import { useContext, useEffect, useState } from "react";
import { Checkoutproduct } from "./../context/context";
import toast from "react-hot-toast";

const Placeorder = () => {
  const { checked } = useContext(Checkoutproduct);

  const [daterefined, setdaterefined] = useState("");
  const [daterefined2, setdaterefined2] = useState("");

  const date = new Date();
  const dateing = JSON.stringify(date).split("").splice(1, 10).join("");

  useEffect(() => {
    for (let i = 0; i < 2; i++) {
      toast.success("Order confirm");
    }
    function a() {
      setdaterefined(Number(dateing.split("").splice(8, 4).join("")) + 2);
      setdaterefined2(dateing.split("").splice(0, 7).join(""));
    }
    a();
  }, []);

  return (
    <div
      className={` min-h-screen grid justify-items-center h-full w-full ${checked ? "  bg-slate-950 absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" : "absolute inset-0 h-full -z-10   items-center w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"} `}
    >
      <Header />

      <ul
        className={`${checked ? "text-white font-bold" : "text-black font-black"} steps w-350 h-20 absolute top-100`}
      >
        <li className="step step-primary">Oreder received</li>
        <li className="step step-primary">Above to dispatch</li>
        <li className="step">Dispatch</li>
        <li className="step">
          Delivery expected by {daterefined2}-{daterefined}
        </li>
      </ul>
    </div>
  );
};

export default Placeorder;
