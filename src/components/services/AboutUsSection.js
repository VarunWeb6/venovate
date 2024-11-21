import React from "react";
import { AboutUsFaq } from "../components/index";

export default function AboutUsSection() {
  return (
    <section className="p-10 md:px-12 px-5 lg:px-24">
      <div className=" pt-5 space-y-4 ">
        <h1 className="font-semibold text-[#ff5e15] md:text-lg ">
          FOR ALL YOUR
        </h1>
        <p className="font-bold text-2xl font-poppins lg:text-3xl">
          CARGO NEEDS
        </p>
      </div>
      <AboutUsFaq />
    </section>
  );
}
