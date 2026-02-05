import React from "react";
import Checkout from "./../../components/checkout";
import Login from "./../../components/login";
import Signin from "./../../components/sign-in";
import Deleteac from "./../../components/deleteac";
import PlaceOrn from "./../../components/placeorder"




export async function generateStaticParams() {
  return [
    { ways: "checkout" },
    { ways: "login" },
    { ways: "sign-in" },
    { ways: "deleteac" },
    {ways:"placeorder"}
  ];
}





const Dynamic_routes = async ({ params }) => {
  const slug = await params;

  console.log("slug",slug)

  switch (slug.ways) {
    case "checkout":
      return <Checkout />;

    case "login":
      return <Login />;

    case "sign-in":
      return <Signin />;

    case "deleteac":
      return <Deleteac />;

     case "placeorder":
     return <PlaceOrn/> 

     default: return <div className="font-[1000] text-[300px] text-center mt-30">Page not found</div> 
  }

 
};




export default Dynamic_routes


