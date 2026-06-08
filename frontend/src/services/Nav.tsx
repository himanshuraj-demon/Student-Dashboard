import React ,{memo} from "react";
import Navbar from "../components/Navbar";
import MobileNav from "../components/MobileNav";

const Nav = () => {
  console.log("i am rendering");
  return (
    <>
      <Navbar />
      <MobileNav />
    </>
  );
};

export default memo(Nav);
