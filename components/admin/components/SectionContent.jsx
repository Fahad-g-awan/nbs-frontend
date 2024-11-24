import React, { useEffect, useState } from "react";

import MainCategory from "./sections/category/Category";
import Product from "./sections/product/Product";

const SectionContent = ({ activeSection }) => {
  const [metadata, setMetadata] = useState(null);

  useEffect(() => {
    let data = {};

    if (activeSection === "Products") {
      return;
    } else if (activeSection === "Main Category") {
      data = {
        api: "/category",
        subCategory: true,
        field: "category",
      };
    } else if (activeSection === "Space Association Category") {
      data = {
        api: "/spaces",
        subCategory: false,
        field: "type",
        apiField: "type",
      };
    } else if (activeSection === "Material Categories") {
      data = {
        api: "/material-category",
        subCategory: false,
        field: "material",
        apiField: "materials",
      };
    } else if (activeSection === "Additional Features") {
      data = {
        api: "/features",
        subCategory: false,
        field: "feature",
        apiField: "features",
      };
    } else if (activeSection === "Style Categories") {
      data = {
        api: "/style-category",
        subCategory: false,
        field: "style",
        apiField: "styles",
      };
    }

    setMetadata(data);
  }, [activeSection]);

  return (
    <div className="w-full p-6">
      {activeSection === "Products" && <Product />}

      {metadata && activeSection !== "Products" && (
        <MainCategory metadata={metadata} />
      )}
    </div>
  );
};

export default SectionContent;
