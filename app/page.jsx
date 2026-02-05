"use client";

import React, { Fragment } from "react";
import axios from "axios";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { useEffect, useState, useContext } from "react";
import baseURL from "./baseURL";

// import {productsArray} from './product_Array'

import { Checkoutproduct } from "./context/context";

import Header from "./components/header";

const PAGE = () => {
  const [productsArray, setproductsArray] = useState([]);
  const {
    addcart,
    setaddcart,
    checked,
    settokenid,
    tokenid,
    cart,
    setcart,
    setArrayop,
    acnotfn,
    setacnotfn,
  } = useContext(Checkoutproduct);




  

  const [serchresult, setserchresult] = useState("");

  const [email, setemail] = useState("");
  const [bool, setbool] = useState(false);

  const [adding, setadding] = useState(false);

  const [reqmany, setreqmany] = useState(false);
  const [req, setreq] = useState(true);

  const [array30, setarray30] = useState(() => {
    const result = [];

    for (let x = 1; x < 30; x++) {
      result.push(x);
    }
    return result;
  });

  // console.log(array30);

  const [productsArray2, setproductsArray2] = useState([]);

  useEffect(() => {
    if (!email) return;
    localStorage.setItem("Email", email);
  }, [email]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get(baseURL); //    "_id:694fb4627d147eb2a01851e9"

        console.log(res.data.dataforget[0].Allproducts);
        setproductsArray(res.data.dataforget[0].Allproducts);
        setproductsArray2(res.data.dataforget[0].Allproducts);
      } catch (error) {
        console.error("Failed to fetch data", error);
        if (error.status === 429) {
          for (let i = 0; i < 3; i++) {
            toast.error("Too many request try again later");
          }
        }
      }
    };

    fetch();
  }, []);
  const [Signinid, setSigninid] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("Signinid");

    try {
      if (token) {
        setSigninid(token);
        async function avoid() {
          console.log("token", token);

          const res = await fetch(`${baseURL}/me`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          });

          if (res.status === 404) {
            console.error(
              "failed to get id by auth token in get rwq status 404",
            );

            setacnotfn(false);

            for (let i = 0; i < 6; i++) {
              toast.error("account not found please create new account");
            }
            return;
          }

          if (res.status === 200) {
            setacnotfn(true);
          }

          const jsonbro = await res.json();

          setemail(jsonbro.data.Email);

          settokenid(jsonbro.data._id);
        }
        avoid();
      }
    } catch (error) {
      console.error(error);
      // file:///Users/sanjaykardile/Library/Mobile%20Documents/com~apple~CloudDocs/Untitled.png
      //if error code execution stop no code after that can execute
    }
  }, []);

  const [serverarray, setserverarray] = useState([]);

  async function getdbcart() {
    try {
      if (!tokenid) return;

      const fetch100 = await fetch(`${baseURL}/${tokenid}`, {
        method: "GET",
      });

      const mo = await fetch100.json();

      if (fetch100.status === 429) {
        setreq(false);
        setreqmany(true);
        console.error("inner", fetch100.status);
      }

      const serverarray = mo.databyme.Cart;

      console.log(` fetched cartarray ${tokenid}`, mo);

      setserverarray(serverarray);
    } catch (error) {
      console.log("failed to fetched cartarray", error);
    }
  }

  useEffect(() => {
    getdbcart();
  }, [tokenid, addcart]);

  const [array, setarray] = useState([]);

  function productqty(e, product) {
    if (e.target.value === "") {
      setarray((prev) => prev.filter((i) => i.id !== product.id));
      return;
    }

    const selectedqty = Number(e.target.value);

    if (selectedqty === 0) {
      setarray((prev) => prev.filter((i) => i.id !== product.id));
      return;
    }

    if (selectedqty > 30) {
      toast.error("Max limit for quantity is 30. ");
      return;
    }

    setarray((prev) => {
      const find = prev?.find((i) => i.id === product.id);

      if (find) {
        return prev.map((i) => {
          if (i.id === product.id) {
            return { ...i, qty: selectedqty };
          } else {
            return i;
          }
        });
      } else {
        if (e.target.value === "") {
          prev.filter((i) => i.id !== product.id);
          return prev;
        }
        // return initial value in setexamle bit problematic but return works perfectly perfectly fine in normal function stops code execution
        return [...prev, { ...product, qty: selectedqty }];
      }
    });
  }


  console.log("dropdown value changed saved to array with obj:", array);


  const [handleid, sethandleid] = useState();

  function handleadd({ product }) {
    sethandleid(product);

    setaddcart((prev) => {
      const findinarray = array.find((i) => product.id === i.id);

      const qtyofproandarray = findinarray ? findinarray.qty : 1; // if array obj id and addtocart obj id doest match then set 1

      const find = prev?.find((i) => i.id === product.id);

      if (find) {
        return prev.map((inprev) => {
          if (inprev.id === product.id) {
            return { ...inprev, qty: qtyofproandarray };
          } else {
            return inprev;
          }
        });
      } else {
        return [...prev, { ...product, qty: qtyofproandarray }];
      }
    });
  }

  console.log("addcart", addcart);

  function cartqty() {
    const reduce = serverarray.reduce((a, i) => {
      let m = a + i.qty;

      return m;
    }, 0);

    setcart(reduce);
  }

  useEffect(() => {
    cartqty();
  }, [serverarray]);

  async function postdata() {
    if (addcart.length === 0) return;

    if (tokenid) {
      for (let s of serverarray) {
        if (addcart[addcart.length - 1].id === s.id) {
          toast.error("Already added to cart");
          setaddcart([]);
          return;
        }
      }

      try {
        console.log(addcart[addcart.length - 1], "kkk");

        setadding(true);

        const updatecartdata = {
          Cart: [addcart[addcart.length - 1]],
        };

        const putcart = await fetch(`${baseURL}/normalpost/${tokenid}`, {
          method: "POST",
          body: JSON.stringify(updatecartdata),
          headers: {
            "Content-Type": "application/json", //auth also inheader  headers: { Authorization: `Bearer ${token}` }
          },
        });

        console.log("posted Successfully by fronend");

        const json2 = await putcart.json();

        if (putcart.status === 201) {
          toast.success("Successfully added product to you'r cart");
          setaddcart([]);
        }

        console.log("json2", json2);
      } catch (error) {
        console.error("Failed to post cartdata", error);
      } finally {
        setTimeout(() => {
          setadding(false);
        }, 300);
      }
    }
  }

  console.log("serverarray", serverarray);

  useEffect(() => {
    if (bool) {
      postdata();
      setbool(false);
    }
  }, [serverarray, addcart]);

  return (
    <div>
      <Header
        setproductsArray={setproductsArray}
        productsArray={productsArray}
        cart={cart}
        productsArray2={productsArray2}
        setserchresult={setserchresult}
        checked={checked}
      />

      {/* for center https://docs.google.com/spreadsheets/d/1NuoBKHcd2zvkU354jLiQ5lf_-vOsl3pAK-7MWM78Xr0/edit?gid=1840512337#gid=1840512337 */}

      <div
        className={` grid lg:grid-cols-4 grid-cols-2 lg:max-w-800 max-w-120 justify-items-center py-24 min-h-screen ${Signinid && acnotfn ? "" : "filter blur-2xl pointer-events-none"}    ${
          checked
            ? `min-h-screen relative inset-0  w-full items-center [background:radial-gradient(125%_125%_at_50%_50%,#000_30%,#63e_100%)]  ${adding ? "pointer-events-none" : ""}`
            : `min-h-screen relative  inset-0  w-full items-center  bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] ${adding ? "pointer-events-none" : ""} `
        }  `}
        onClick={() => setArrayop([])}
      >
        <div
          className={
            checked
              ? "text-[60px] absolute top-90 text-white"
              : "text-[60px] absolute top-90"
          }
        >
          {serchresult}
        </div>

        {reqmany && (
          <div
            className=" bg-red-600 w-200 absolute h-30 rounded-[15px] text-[20px] text-white font-black text-center pt-3 "
            onClick={setArrayop([])}
          >
            <div className="text-[20px] text-white font-black ">ERROR</div>
            Too many request send please try again later
          </div>
        )}

        {req &&
          productsArray.map((product) => {
            return (
              <Fragment key={product.id}>
                <div
                  className={
                    checked
                      ? "bg-red-600 lg:h-100 lg:w-70 lg:mt-20 w-40 h-60 mb-14 lg:mb-0 rounded-[15px]  lg:hover:scale-110  duration-1000  shadow-[4px_2px_8px] "
                      : "bg-gray-300 lg:h-100 lg:w-70 lg:mt-20 w-40 h-60 rounded-[15px] mb-14 lg:mb-0 lg:hover:scale-110  duration-1000 shadow-[4px_2px_8px]" //shadow-[xpx_ypx_blur px]
                  }
                >
                  <div
                    className={
                      checked
                        ? "text-center font-bold lg:text-[20px] text-[13px] mt-2 text-white"
                        : "text-center font-bold lg:text-[20px] text-[13px] mt-2"
                    }
                  >
                    {product.name}
                  </div>

                  <Image
                    alt={product.name}
                    height={230}
                    width={230}
                    src={product.imgsrc}
                    className="mx-auto lg:mt-5 mt-2 lg:h-60 object-cover border-none rounded-lg h-35 w-38 lg:w-65"
                    loading="lazy"
                  />

                  <div className="grid grid-cols-2 lg:gap-3.5 relative left-1 lg:top-1 lg:left-6 gap-1">
                    <div
                      className={
                        checked
                          ? "relative top-1 left-5 text-white font-bold lg:text-[17px] text-[12px]"
                          : "relative top-1 left-5 text-black font-bold text-[12px]"
                      }
                    >
                      PRICE:
                    </div>
                    <div className=" font-black text-green-600 lg:text-[20px] text-[14px] flex gap-15">
                      ₹{product.price}
                    </div>
                    {/*relative left-10 top-3 */}
                    {/* block makes any element block element like div and mx-auto It tells the browser: “Take automatic left and right margins so that the 

element is centered horizontally within its parent.” */}
                    <button
                      className={
                        adding && product.id === handleid?.id
                          ? "btn btn-soft btn-warning bg-gray-500 rounded-lg  block text-white border-none font-[900] hover:cursor-not-allowed   "
                          : "btn btn-soft btn-warning bg-amber-400 rounded-lg block text-blue-600 border-none font-[900] lg:text-[14px] text-[9px] lg:h-10 lg:w-33 h-7 w-18  "
                      } //relative top-5 left-5
                      onClick={() => {
                        handleadd({ product: product });
                        setbool(true);
                      }}
                    >
                      {adding && product.id === handleid?.id
                        ? "Adding..."
                        : "ADD TO CART"}
                    </button>

                    <input
                      type="number"
                      min={1}
                      max={30}
                      placeholder="Quantity:1"
                      list="qty"
                      className={
                        checked
                          ? " border-2 lg:w-20 placeholder:text-white text-[10px] rounded-lg lg:h-10 w-18  text-white"
                          : "border-2 lg:w-20 placeholder:text-black text-[10px] rounded-lg lg:h-10  "
                      }
                      onChange={(e) => {
                        productqty(e, product);
                      }}
                      value={array?.find((i) => i.id === product.id)?.qty || ""} // optional chaining (?) because at starting it is [] so || give ""

                      //  convertion of "" into 0 https://chatgpt.com/share/69520147-5d40-8005-a9ca-45eb2c33a118
                      //in starting "" doest cause troble because code is never run it sorts the issue over here only if undfine || " " no codition is applyed on " "
                    />
                  </div>

                  <datalist id="qty">
                    {array30.map((x) => {
                      return (
                        <Fragment key={x}>
                          <option value={x}>{x}</option>
                        </Fragment>
                      );
                    })}
                  </datalist>
                </div>
              </Fragment>
            );
          })}
      </div>
    </div>
  );
};

export default PAGE;
