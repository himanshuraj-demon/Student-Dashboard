import { memo } from "react";
import Navbar from "../components/helpers/Navbar";
import MobileNav from "../components/helpers/MobileNav";

const Nav = () => {
  return (
    <>
      <Navbar />
      <MobileNav />
    </>
  );
};

export default memo(Nav);
