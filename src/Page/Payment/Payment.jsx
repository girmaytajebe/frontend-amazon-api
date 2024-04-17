import React, { useState } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../Componenet/LayOut/LayOut";
import { useContext } from "react";
import { DataContext } from "../../Componenet/DataProvider/DataProvider";
import ProductCard from "../../Componenet/Producut/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Componenet/CurrencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { ClipLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import {  useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function Payment() {
  
  const [{ user, basket }, dispatch] = useContext(DataContext);
  // console.log(user);
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const totalItem = basket?.reduce((amount, item) => {
    return amount + item.amount;
  }, 0);
  const total = basket.reduce((amount, item) => {
    return amount + item.price * item.amount;
  }, 0);
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const handleChange = (e) => {
    // console.log(e);
    e?.error?.message ? setCardError(e.error.message) : setCardError("");
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      setProcessing(true);
      //backend || function ---> contact to get the client  secret key

      const response = await axiosInstance({
        method: "post",
        url: `payment/create?total=${total * 100}`,
      });
      console.log(response.data);
      const client_secret = response.data?.client_secret;
      //client sid(react side conformition)
      const { paymentIntent } = await stripe?.confirmCardPayment(
        client_secret,
        {
          payment_method: {
            card: elements?.getElement(CardElement),
          },
        }
      );
      // console.log(paymentIntent);
      //after the conformition --> order firestore database save,clear basket
      await db
        .collection("users")
        .doc(user?.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          amount: paymentIntent.amount,
          basket: basket,
          created: paymentIntent.created,
        });
//empty the basket
dispatch({
  type:Type.EMPTY_BASKET,

});
      setProcessing(false);
      navigate("/orders",{state:{msg: 'you have placed new order'}})
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      {/* header */}
      <div className={classes.payment__header}>checkout({totalItem})items</div>
      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            {/* Add null check before accessing user.email */}
            <div>{user?.email}</div>
            <div>1234 Maroney St</div>
            <div>Nashville, TN 37013</div>
          </div>
        </div>
        <hr />
        {/* product */}
        <div className={classes.flex}>
          <h3>Review Items and Delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} key={item.id} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.Payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* card element*/}
                <CardElement onChange={handleChange} />
                {/* price */}
                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p> Total Order</p>| <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button>
                    <span type="submit">
                      {processing ? (
                        <div className={classes.loading}>
                          <ClipLoader color="gray" size={12} />
                          <p>please wait...</p>
                        </div>
                      ) : (
                        "Pay Now"
                      )}
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
