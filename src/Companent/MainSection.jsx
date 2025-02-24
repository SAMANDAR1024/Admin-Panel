import React from "react";
import { Route, Routes } from "react-router";
import HomePage from "../Pages/HomePage";
import ProductsPage from "../Pages/ProductsPage";
import CategoriesPage from "../Pages/CategoriesPage";

function MainSection() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
      </Routes>
    </div>
  );
}

export default MainSection;
