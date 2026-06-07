import React ,{memo} from "react";
import Navbar from "../components/Navbar";
import MobileNav from "../components/MobileNav";
import { ThemeToggle } from "../context/ThemeToggle";

const Nav = () => {
  console.log("i am rendering");
  return (
    <>
      <Navbar />
      <MobileNav />
      <ThemeToggle/>
    </>
  );
};

export default memo(Nav);
