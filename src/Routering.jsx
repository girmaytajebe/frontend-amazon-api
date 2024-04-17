import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./Page/Landing/Landing";
import Auth from "./Page/Auth/Auth";
import Results from "./Page/Results/Results";
import Payment from "./Page/Payment/Payment";
import Orders from "./Page/Orders/Orders";
import Cart from "./Page/Cart/Cart";
import ProductDetail from "./Page/ProductDtail/ProductDetail";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import ProtectedRoute from "./Componenet/ProtectedRoute/ProtectedRoute";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51OJTqjHRUtmygy7Oix0k9M9zh8kaEjvf5bRSNt7m8U7bKKxziSsFvrmNCTiqGDG8LuTNW9hMfj9jGUITV1ypwIzw00Ipepora6"
);

function Routering() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payment"
          element={
            <ProtectedRoute msg={"you must login to pay"} redirect={"/payment"}>
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute
              msg={"you must login in to access your orders"}
              redirect={"/orders"}
            >
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      
    </Router>
  );
}

export default Routering;
