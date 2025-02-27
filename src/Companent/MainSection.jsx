import React from "react";
import { Route, Routes } from "react-router";
import CategoriesPage from "../Pages/CategoriesPage";
import HomePage from "../Pages/HomePage";
import ProductsPage from "../Pages/ProductsPage";
import RentsPage from "../Pages/RentsPage";
import StocksPage from "../Pages/StocksPage";
import UsersPage from "../Pages/UsersPage";

function MainSection() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/categories" element={<CategoriesPage />} />
      <Route path="/rents" element={<RentsPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="/books" element={<StocksPage />} />
    </Routes>
  );
}

export default MainSection;
