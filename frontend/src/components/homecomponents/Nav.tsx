import "./nav.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
import {Link} from "react-router-dom"

const Nav = () => {
  useGSAP(() => {
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        toggleActions: "play none none reverse",
      },
    });

    navTween.fromTo(
      ".mainnav",
      {
        backgroundColor: "transparent",
        width: "100dvw",
        borderRadius: "0px",
      },
      {
        backgroundColor: "rgba(0,0,0,0.3)",
        backdropFilter: "blur(10px)",
        width: "94dvw",
        borderRadius: "999px",
        duration: 0.7,
        ease: "power2.out",
      },
    );
    navTween.to(".mainnav", {
      width: "92dvw",
      borderRadius: "999px",
      backgroundColor: "rgba(0,0,0,0.3)",
      backdropFilter: "blur(10px)",
      duration: 0.5,
    });
  }, []);
  return (
    <>
      <div className="flex flex-col">
        <div className="mainnav self-center">
          <div className="logo">
            <img src="./images/logo.svg" alt="SmartTrack" width={30} />
            <h1 className="text-2xl">Smart Track</h1>
          </div>
          <div>
            <ul className="flex gap-10 text-base font-semibold">
              <li><a href="#about">About</a></li>
              <li><a href="#fetures">Fetures</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          <div className="options">
          <Link to={"/login"}><button>Log In</button></Link> 
          <Link to={"/signup"}><button>Sign Up</button></Link> 
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
