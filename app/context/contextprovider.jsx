"use client";
import { useState, useEffect } from "react";
import { Checkoutproduct } from "./context";

export function CheckoutProductArray({ children }) {
  const [addcart, setaddcart] = useState([]);
  const [checked, setchecked] = useState(true);
  const [Signinid, setSigninid] = useState("");
  const [tokenid, settokenid] = useState("");
  const [cart, setcart] = useState();
  const [Arrayop, setArrayop] = useState([]);
  const [menu, setmenu] = useState(false);
   const [placeorder, setplaceorder] = useState(false);
    const [acnotfn, setacnotfn] = useState(true);


  useEffect(() => {
    const saved = localStorage.getItem("Signinid");
    const che = localStorage.getItem("checked");

    if (saved) {
      function e() {
        console.log("localstorage id of cart", saved);
        setSigninid(saved);
        if (che) {
          setchecked(JSON.parse(che));
        }
      }
      e();
    }
  }, []);

  useEffect(() => {
    if (Signinid) {
      localStorage.setItem("Signinid", Signinid);
    }
  }, [Signinid]); // react runs useeffect ones after 1st render regardless what dependancy array says [] or [cartid] it will still run both at 1st render

  useEffect(() => {
    if (typeof checked === "boolean") {
      localStorage.setItem("checked", JSON.stringify(checked));
    }
  }, [checked]);



  return (
    <Checkoutproduct.Provider
      value={{
        addcart,
        setaddcart,
        checked,
        Signinid,
        setSigninid,
        setchecked,
        settokenid,
        tokenid,
        cart,
        setcart,
        Arrayop,
        setArrayop,
        setmenu,
        menu,
        setplaceorder,
        placeorder,
        acnotfn,
        setacnotfn
      }}
    >
      {children}
    </Checkoutproduct.Provider>
  );
}
