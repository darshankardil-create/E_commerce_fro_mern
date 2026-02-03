"use client";
import React, { Fragment } from "react";
import { useContext, useEffect, useState } from "react";
import { Checkoutproduct } from "./../context/context";
import Header from "./../components/header";
import Image from "next/image";
import axios from "axios";
import baseURL from "./../baseURL";
import useDebouncer from "./../components/hooks";
import { toast } from "react-hot-toast";
import Link from "next/link";

const Page = () => {
  const [proch, setproch] = useState([]);

  const debouncechange = useDebouncer(proch); //just return proch exact value in the form of debouncechange after specified delay

  const Checkout = useContext(Checkoutproduct); //without destruc

  const [array, setarray] = useState([]);
  const [cartempty, setcartempty] = useState(true);
  const [gotoshop, setgotoshop] = useState(false);
  const [id, setid] = useState("");

  const [list30, setlist30] = useState(() => {
    const a = [];

    for (let i = 1; i < 30; i++) {
      a.push(i);
    }

    return a;
  });

  useEffect(() => {
    function a() {
      const token = localStorage.getItem("Signinid");

      async function me() {
        try {
          if (!token) {
            return;
          }
          const fetch2 = await fetch(`${baseURL}/me`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (fetch2.status === 429) {
            for (let i = 0; i < 4; i++) {
              toast.error("Too many request try again later");
            }
          }

          const jsonify = await fetch2.json();
          console.log(jsonify.data._id);
          const id = jsonify.data._id;
          setid(id);
        } catch (error) {
          console.log("Failed get in checkoutpage", error);
        }
      }

      me();
    }

    a();
  }, []);

  async function fetchitems() {
    if (id) {
      try {
        const Fetch = await axios.get(`${baseURL}/${id}`);

        console.log(Fetch);

        if (Fetch.status === 429) {
          toast.error("Too many request try again later");
        }

        setarray(() => {
          if (Fetch.data.databyme.Cart.length > 0) {
            return Fetch.data.databyme.Cart;
          } else if (Fetch.data.databyme.Cart.length === 0) {
            setcartempty(false);
            setgotoshop(true);
            return [];
          } else {
            return Fetch.data.databyme.Cart;
          }
        });
      } catch (error) {
        console.log("Failed get in checkkoutpage", error);
      }
    }
  }

  useEffect(() => {
    function up() {
      fetchitems();
    }

    up();
  }, [id]);

  async function removeobj() {
    try {
      if (proch.length === 0) return;

      const fetch50 = await fetch(`${baseURL}/removespecificobj/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ proch }),
        method: "POST",
      });
      const jsongy = await fetch50.json();

      console.log(
        fetch50.status,
        "Sucessfully pull out changed id obj from DB",
        jsongy,
      );
    } catch (error) {
      console.log("failed to delete cart OBJ", error);
    }
  }

  let posi;

  array.forEach((ar) => {
    const find = proch.find((i) => i.id === ar.id);
    if (find) {
      posi = array.findIndex((i) => i.id == find.id);
    }
  });

  async function pushproch() {
    try {
      if (!id) return;

      const data = {
        Cart: proch,
        position: posi,
      };

      location.reload();

      const pushfetch = await fetch(`${baseURL}/normalpost/${id}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const push = await pushfetch.json();

      me();
      console.log("Successfully push data", push);

      toast.success("Successfully updated quatity");
    } catch (error) {
      console.log("failed to push data", error);
    }
  }

  useEffect(() => {
    async function awaitasync() {
      await removeobj();
      await pushproch();
    }

    awaitasync();
  }, [debouncechange]);

  function handlechange(eventy, pro) {
    if (eventy.target.value === "") {
      return setproch((prev) => prev.filter((i) => i.id !== pro.id));
    }

    setproch((prev) => {
      const previous = prev.find((i) => i.id === pro.id);

      const value = Number(eventy.target.value);

      if (value <= 0 || value > 30) {
        toast.error("Max limit is 30!");
        return prev;
      }

      if (previous) {
        return prev.map((i) => {
          if (i.id === pro.id) {
            return { ...i, qty: value };
          } else {
            return i;
          }
        });
      } else {
        return [...prev, { ...pro, qty: value }];
      }
    });
  }

  async function removepull(i) {
    const data = {
      proch: [i],
    };

    try {
      const res = await fetch(`${baseURL}/removespecificobj/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
        method: "POST",
      });

      const raw = await res.json();

      console.log("Successfully removed obj on click", raw);
    } catch (error) {
      console.log("failed to remove data by click ", error);
    }
  }

  function refresh(i) {
    setarray((prev) => {
      return prev.filter((f) => f.id !== i.id);
    });
  }

  const [total, settotal] = useState();
  const [total18, settotal18] = useState();
  const [totalqty, settotalqty] = useState();

  const [only18, setonly18] = useState();

  useEffect(() => {
    const reduce = array.reduce((a, c) => {
      let m = a + c.qty;

      return m;
    }, 0);

    Checkout.setcart(reduce);

    const total = array.reduce((a, c) => {
      let m = a + c.price * c.qty;

      return m;
    }, 0);

    if (total) {
      function a() {
        settotal(total);
      }
      a();
    }

    const total18 = array.reduce((a, c) => {
      let m = a + c.price * c.qty * 1.18;

      return m;
    }, 0);

    function v() {
      settotal18(total18.toFixed(2));
    }

    v();

    const totalquantity = array.reduce((a, c) => {
      let m = a + c.qty;
      return m;
    }, 0);

    function c() {
      settotalqty(totalquantity);
    }

    c();

    const on18 = array.reduce((a, i) => {
      let m = a + i.price * i.qty * 0.18;

      return m;
    }, 0);

    function s() {
      setonly18(on18);
    }

    s();
  }, [array]);

  // console.log("Checkout.checked", Checkout.checked);

  return (
    <div>
      <Header cart={Checkout.cart} checked={Checkout.checked} />

      {/* grid grid-cols-1  overflow-y-auto  gap-20 pt-30 pl-30  */}
      <div
        className={`min-h-screen pt-30 ${
          Checkout.checked
            ? "absolute  inset-0 -z-10 h-full w-full items-center px-4 pt-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] duration-600 lg:pb-0 pb-300"
            : "relative  inset-0  w-full items-center  bg-white px-2 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] lg:pb-0 pb-300"
        }`}
      >
        {cartempty && (
          <div className="grid grid-cols-1 lg:gap-15 gap-8 lg:h-170 h-116 overflow-y-auto lg:pl-20 ">
            {array.map((i) => {
              return (
                <Fragment key={i.id}>
                  <div
                    className={
                      Checkout.checked
                        ? "lg:h-60 lg:w-160 h-30 w-80 bg-red-600 outline-1 flex  top-30 duration-600"
                        : "lg:h-60 lg:w-160 w-80 h-30 bg-amber-50 outline-1 flex  top-30 "
                    }
                  >
                    <div className="lg:pt-6 lg:pl-7 pt-3 pl-3">
                      {
                        <Image
                          width={200}
                          height={200}
                          alt={i.name}
                          src={i.imgsrc}
                          className="lg:h-50 lg:w-50  h-25 w-25 "
                        />
                      }

                      <input
                        type="number"
                        placeholder="Qty"
                        min={1}
                        max={30}
                        list="dl"
                        className={
                          Checkout.checked
                            ? "outline-3 lg:w-20 lg:h-10 w-12 h-6 rounded-md p-2 relative left-28.5  bottom-7 cursor-pointer z-1 outline-white placeholder-white duration-600 text-white lg:left-60 lg:bottom-10"
                            : "outline-3 lg:w-20 lg:h-10 w-12 h-6 rounded-md p-2 relative left-28.5  bottom-7 cursor-pointer z-1 lg:left-60 lg:bottom-10"
                        }
                        value={proch?.find((p) => p.id === i.id)?.qty || ""}
                        onChange={(e) => {
                          handlechange(e, i);
                        }}
                      />

                      <div className="text-green-400 font-black relative lg:left-59 lg:text-[22px] text-[13px] lg:bottom-45 left-28 bottom-26">
                        Price : ₹{i.price}
                      </div>

                      <div
                        className={
                          Checkout.checked
                            ? "lg:text-[20px] text-[13px] text-white font-bold relative lg:left-59  lg:bottom-40 bottom-25  left-28 duration-600"
                            : "lg:text-[20px] text-[13px] font-bold relative lg:left-59 lg:bottom-40 bottom-25  left-28 "
                        }
                      >
                        Quantity:{i.qty}
                      </div>

                      <button
                        className={
                          Checkout.checked
                            ? "lg:p-3 bg-purple-700  text-white rounded-[15px] relative lg:bottom-37 lg:left-100 cursor-pointer z-1 duration-600 bottom-24 left-45  lg:text-[17px] text-[11px] p-2"
                            : "lg:p-3 bg-red-700  text-white rounded-[15px] relative lg:bottom-37 lg:left-100 cursor-pointer z-1 duration-600 bottom-24 left-45  lg:text-[17px] text-[11px] p-2 "
                        }
                        onClick={() => {
                          removepull(i);
                          refresh(i);
                        }}
                      >
                        Remove from cart
                      </button>

                      <datalist id="dl">
                        {list30.map((i) => {
                          return (
                            <Fragment key={i}>
                              <option>{i}</option>
                            </Fragment>
                          );
                        })}
                      </datalist>
                    </div>
                    <div
                      className={
                        Checkout.checked
                          ? "font-[1000] lg:text-[22px] text-[12.5px] text-white relative lg:top-10 lg:left-9 duration-600 top-2 right-0"
                          : "font-[1000] lg:text-[22px] text-[12.5px]  relative lg:top-10 lg:left-9 top-2 right-0"
                      }
                    >
                      Name : {i.name}
                    </div>
                  </div>
                </Fragment>
              );
            })}
          </div>
        )}

        {gotoshop && (
          <>
            <Image
              src="/E_commerce_fro_mern/image/delete.png" 
              width={200}
              height={200}
              alt="no product found"
              className="absolute lg:top-60 lg:left-155 top-60 left-42 "
            />
            <Link href="https://darshankardil-create.github.io/E_commerce_fro_mern/">
              <button className="absolute lg:p-10 bg-amber-400 cursor-pointer rounded-[30px] lg:top-120 lg:left-150 text-[20px] font-bold left-40 p-7 top-120  ">
             Start shopping
              </button>
            </Link>
          </>
        )}

        {array.length > 0 > 0 && (
          <div
            className={
              Checkout.checked
                ? "lg:h-150 bg-red-700 lg:w-120  lg:top-40 lg:right-25 lg:fixed  rounded-[10px] shadow-[15px_25px_30px] duration-600 absolute bottom-30 w-90 h-140 z-3"
                : "h-150 bg-amber-50 w-120  top-40 right-25 fixed  rounded-[10px] shadow-[15px_25px_30px]"
            }
          >
            <div className=" overflow-y-auto h-70 relative top-10 outline-1 ">
              {array.map((i) => {
                return (
                  <div
                    className={
                      Checkout.checked
                        ? "h-13  text-center text-white font-bold  grid grid-cols-4 relative  outline-1 duration-600"
                        : "h-13  text-center font-bold  grid grid-cols-4 relative  outline-1"
                    }
                    key={i.id}
                  >
                    <div className="border-r-2"> {i.price} </div>
                    <div className="border-r-2">{i.name}</div>
                    <div className="border-r-2">{i.qty}</div>
                    <div>{(i.price * i.qty * 0.18).toFixed(2)}</div>
                    {/* Math.abs for converting negative number into positive */}
                  </div>
                );
              })}
            </div>
            <div
              className={
                Checkout.checked
                  ? "grid grid-cols-4 text-center text-yellow-300 font-black text-[18px] relative top-10 border-t-2 border-b-2 duration-600 "
                  : "grid grid-cols-4 text-center text-green-600 font-black text-[18px] relative top-10 border-t-2 border-b-2 "
              }
            >
              <div> ₹{total} </div>
              <div className="border-l-2"> </div>
              <div className=" border-l-2 ">{totalqty}</div>
              <div className="border-l-2">₹{only18}</div>
            </div>

            <div
              className={
                Checkout.checked
                  ? "text-[20px] font-black text-green-400 relative top-20 text-center duration-600"
                  : "text-[20px] font-black text-green-600 relative top-20 text-center"
              }
            >
              Fnal cost including 18% GST : ₹{total18}
            </div>

            <div className="flex gap-13.5 text-bold text-white absolute bottom-130 left-5 lg:bottom-142 lg:gap-23">
              <div className=" text-center relative left-2.5 lg:left-5 ">Price</div>
              <div className="relative left-1">Items</div>
              <div className=" relative left-2 ">Qty</div>
              <div className=" relative left-4 ">Tax</div>
            </div>

            <button className="bg-blue-600 hover:bg-blue-800 cursor-pointer relative lg:top-25 lg:left-10 lg:p-4 text-[20px] text-white rounded-[10px] lg:w-100 top-30 p-3 w-80 left-5">
              Place order
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;

//pretty print and all 3 JSON.stringify all 3 parameter  file:///Users/sanjaykardile/Downloads/Json%20Replacer%20Explained.pdf
