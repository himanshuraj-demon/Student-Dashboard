import React ,{memo} from "react";
import Navbar from "../components/Navbar";
import MobileNav from "../components/MobileNav";

const Nav = () => {
  return (
    <>
      <Navbar />
      <MobileNav />
    </>
  );
};

export default memo(Nav);
