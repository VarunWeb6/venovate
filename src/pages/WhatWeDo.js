import React from "react";
import * as components from "../components";
import { Help, Brochure, ServiceContent } from "../components/Services/index";
import { useParams } from "react-router-dom";
import DropdownData from "../Data/WhatweDoCategories";
export default function WhatWeDo() {
  // From Params take the categeory and chamge the whole ui
  const { category } = useParams();
  const decodedCategory = category.replace(/-/g, " ");
  const defaultData = DropdownData.find(
    (item) => item.catgeory === decodedCategory
  );
  // console.log(defaultData);
  // console.log(decodedCategory);

  return (
    <body className="overflow-x-clip">
      <main>
        <components.Navbar Page={"whatwedo"} />
        <components.ServiceHeroSection
          image={defaultData.image}
          Tittle={defaultData.Tittle}
          Para={defaultData.Para}
        />
        <div className="flex flex-col max-w-5xl gap-16 p-5 px-5 mx-auto lg:max-w-none md:px-12 lg:px-24 lg:flex-row md:justify-around md:items-start">
          <div className="space-y-8">
            <components.FilterCategory Tittle={"Category"} Page={"whatwedo"} />
            <Help />
            <Brochure />
            <components.ExpertFrom />
          </div>
          <div>
            <ServiceContent category={decodedCategory} />
          </div>
        </div>
        <components.NewsLetter />
        <components.DragTop />
        <components.Footer />
      </main>
    </body>
  );
}
