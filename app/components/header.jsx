import React from "react";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { useContext } from "react";
import { Checkoutproduct } from "./../context/context";
import Image from "next/image";
import toast from "react-hot-toast";

const Header = ({
  setproductsArray,
  cart,
  productsArray2,
  setserchresult,
  checked,
  productsArray,
}) => {
  const [home, sethome] = useState(true);
  const [getback, setgetback] = useState(true);

  const [hideinput, sethideinput] = useState(true);

  const [input, setinput] = useState({ value: "" });
  const { setchecked, setArrayop, Arrayop, setmenu, menu } =
    useContext(Checkoutproduct);

  const focus = useRef();

  useEffect(() => {
    function b() {
      const check = localStorage.getItem("Email");

      if (check) return;

      sethome(false);
    }

    b();

    function a() {
      if (location.pathname === "/") {
        setgetback(false);
      } else {
        setgetback(true);
      }
    }

    a();

    if (location.pathname !== "/") {
      function b() {
        sethideinput(false);
      }

      b();
    }
  }, []);

  useEffect(() => {
    function option() {
      if (input.value.trim() === "" || productsArray.length <= 0) {
        return setArrayop([]);
      } else {
        setArrayop(productsArray);
      }
    }

    option();
  }, [input.value, productsArray]);

  function filter() {
    if (!productsArray) return;

    setproductsArray(() => {
      if (input.value.trim() !== "") {
        const filter = productsArray2.filter((i) => {
          const name = i.name.toLowerCase();
          const input10 = input.value.toLowerCase();

          return name.includes(input10);
        });

        if (filter.length > 0) {
          setserchresult("");

          return filter;
        } else {
          setserchresult(`result for ${input.value} not found 😔`);
          return [];
        }
      } else {
        setserchresult("");
        return productsArray2 || [];
      }
    });
  }

  useEffect(() => {
    function a() {
      filter();
    }

    a();
  }, [input.value]);

  useEffect(() => {
    const check = localStorage.getItem("Email");

    if (check) return;
    if (location.pathname === "/" && focus.current) {
      focus.current.focus();
    }

    toast(
      "Just give any random email id and password by clicking on SIGN-IN button to keep trace of your products",
      {
        duration: 6000,
      },
    );
  }, []);

  return (
    <div>
      <div
        className={
          checked
            ? "bg-blue-700 h-15 fixed z-2 top-0 right-0 w-full flex items-center lg:gap-9 gap-3 duration-200"
            : "bg-green-400 h-15 fixed z-2 top-0 right-0 w-full flex items-center lg:gap-9 gap-3 "
        }
        onClick={() => setArrayop([])}
      >
        {getback && (
          <Link href="/">
            <button className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg xl:btn-xl w-23 lg:w-60 h-11 lg:text-[15px] bg-amber-400 font-bold ml-3  border-none lg:ml-10">
              GET BACK TO SHOPPING
            </button>
          </Link>
        )}

        {home === false && <div className="w-60 h-11"></div>}
        {home && hideinput && (
          <input
            className={`border-2 h-10 lg:w-130 ${getback ? "w-30" : "w-43 ml-3 lg:w-250"} bg-white`}
            onChange={(e) => {
              filter();
              setinput({ value: e.target.value });
            }}
            value={input.value || ""}
            placeholder="Search for item's"
            list="pro"
          />
        )}
        <label
          className={
            checked
              ? "flex cursor-pointer lg:gap-2 gap-1 text-white"
              : "flex cursor-pointer lg:gap-2 gap-1"
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>

          <input
            type="checkbox"
            value="synthwave"
            className={
              checked
                ? "toggle theme-controller text-white"
                : "toggle theme-controller"
            }
            onClick={(e) => setchecked(e.target.checked ? false : true)}
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
        </label>

        {!home && (
          <>
            <Link href="/route/sign-in" onClick={() => setmenu(false)}>
              <button
                type="submit"
                className="btn focus:ring-30 focus:ring-green-400"
                ref={focus}
              >
                Sing in
              </button>
            </Link>

            <Link href="/route/login" onClick={() => setmenu(false)}>
              <button type="submit" className="btn">
                Log in
              </button>
            </Link>
          </>
        )}

        {home && (
          <>
            <Link href={"/route/checkout"} onClick={() => setmenu(false)}>
              <button
                className={
                  checked
                    ? ` text-orange-400  font-bold text-[15px] absolute top-3.5 ${getback ? "right-30" : "right-17 lg:right-43"} cursor-pointer`
                    : ` text-orange-500 font-black text-[15px] absolute top-3.5 ${getback ? "right-30" : "right-17 lg:right-43"} cursor-pointer`
                }
              >
                {cart}
              </button>
            </Link>

            <Link href={"/route/checkout"} onClick={() => setmenu(false)}>
              <Image
                alt="cart"
                height={100}
                width={100}
                src={"/E_commerce_fro_mern/image/online-shopping.png"} // for build /E_commerce_f_mern
                className={`cursor-pointer h-12 w-14 absolute top-1.5 ${getback ? "right-25" : "right-14 lg:right-40"} `}
              />
            </Link>
          </>
        )}
        <div
          className={
            Arrayop.length === 0
              ? ""
              : `bg-amber-200 ${getback ? "lg:w-100 lg:left-81" : "lg:w-250 lg:left-3"} left-2 w-44 absolute top-13  grid grid-cols-1 gap-y-2 pt-5 items-center pb-4 rounded-md `
          }
        >
          {Arrayop.map((i) => {
            return (
              <div key={i.id}>
                <div
                  className="text-center font-bold hover:bg-amber-300"
                  onClick={(e) => setinput({ value: e.target.textContent })}
                >
                  <div
                    className={`mx-auto  cursor-pointer ${getback ? "lg:w-100" : "lg:w-250"} `}
                  >
                    {i.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {home && (
        <label className="btn btn-circle swap swap-rotate z-2 fixed top-3 lg:right-13 right-2">
          <input type="checkbox" onClick={(e) => setmenu(e.target.checked)} />

          <svg
            className="swap-off fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
          </svg>

          <svg
            className="swap-on fill-current"
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 512 512"
          >
            <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
          </svg>
        </label>
      )}

      <div
        className={`duration-700    ${menu ? `min-h-screen ${checked ? "bg-blue-500" : "bg-green-300"} lg:w-100 w-60 fixed top-0 z-1 right-0` : "min-h-screen bg-blue-500 w-0 fixed top-0 z-1 right-0"}`}
      >
        <div className="grid grid-cols-1 pt-50 h-130  ">
          <div className="text-black text-[20px] lg:w-90 ml-5 w-49.5 h-8 text-center border-b-2">
            <Link href="/route/deleteac">🗑️ Delete account</Link>
          </div>

          <div className="text-black text-[20px] lg:w-90  w-49.5 ml-5 h-8 text-center border-b-2 ">
            <Link href="/route/sign-in">➜] Sign-in</Link>
          </div>

          <div className="text-black text-[20px] lg:w-90 ml-5  w-49.5 h-8 text-center border-b-2">
            <Link href="/route/login">➜] Log-in</Link>
          </div>

          <div className="text-black text-[20px] lg:w-90 ml-5 h-8  w-49.5 text-center border-b-2">
            <Link href="/route/checkout">🛒 Cart</Link>
          </div>

          <div className="text-black text-[20px] lg:w-90 ml-5 h-8  w-49.5 text-center border-b-2">
            <Link href="/">🏠 Home page</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
