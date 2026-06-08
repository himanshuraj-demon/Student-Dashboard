import React from "react";
import "./nav.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

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
            <img src="" alt="SmartTrack" />
            <h1>Smart Track</h1>
          </div>
          <div className="options">
            <button>Log In</button>
            <button>Sign Up</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
