

import React from "react";
import CategoryCard from "./CategoryCard"; // Importing CategoryCard component
import { categoryInfos } from "./CategoryFullInfos"; // Assuming you have categoryInfos defined
import classes from "./Category.module.css";
function Category() {
  return (
    <div>
      <section className={classes.category__container}>
        {categoryInfos.map((info) => (
          <CategoryCard key={info.id} data={info} />
        ))}
      </section>
    </div>
  );
}

export default Category;


