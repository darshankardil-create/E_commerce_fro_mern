import React from "react";
import Checkout from "./../../components/checkout";
import Login from "./../../components/login";
import Signin from "./../../components/sign-in";
import Deleteac from "./../../components/deleteac";




export async function generateStaticParams() {
  return [
    { ways: "checkout" },
    { ways: "login" },
    { ways: "sign-in" },
    { ways: "deleteac" },
  ];
}





const Dynamic_routes = async ({ params }) => {
  const slug = await params;

  switch (slug.ways) {
    case "checkout":
      return <Checkout />;

    case "login":
      return <Login />;

    case "sign-in":
      return <Signin />;

    case "deleteac":
      return <Deleteac />;

     default: return <div className="font-[1000] text-[300px] text-center mt-30">Page not found</div> 
  }

 
};




export default Dynamic_routes


