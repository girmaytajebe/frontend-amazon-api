
import React, { useContext } from "react";
import classes from "./Cart.module.css";
import Layout from "../../Componenet/LayOut/LayOut";
import { DataContext } from "../../Componenet/DataProvider/DataProvider";
import ProductCard from "../../Componenet/Producut/ProductCard";
import CurrencyFormat from "../../Componenet/CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { Type } from "../../Utility/action.type";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
function Cart() {
  const [{ basket }, dispatch] = useContext(DataContext);
 

  const total = basket.reduce((amount, item) => {
    return amount + item.price * item.amount;
  }, 0);

  const increment = (item) => {
    dispatch({
      type: Type.ADD_TO_BASKET, // Change action type
      item,
    });
  };

  const decrement = (id) => {
    dispatch({
      type: Type.REMOVE_FROM_BASKET, // Change action type
      id,
    });
  };

  return (
    <Layout>
      <section className={classes.container}>
        <div className={classes.Cart_container}>
          <h2>Hello</h2>
          <h3>Your shopping basket</h3>
          <hr />
          {basket?.length === 0 ? (
            <p>Oops! No items in your cart</p>
          ) : (
            basket?.map((item, i) => (
              <section key={i} className={classes.cart_product}>
                {" "}
                {/* Moved key to outer element */}
                <ProductCard
                  product={item}
                  renderDesc={true}
                  renderAdd={false}
                  flex={true}
                />
                
                <div className={classes.btn_container}>
                  <button
                    className={classes.btn}
                    onClick={() => increment(item)}
                  >
                    <IoIosArrowUp  size={20}/>
                  </button>
                  <span>{item.amount}</span>
                  <button
                    className={classes.btn}
                    onClick={() => decrement(item.id)}
                  >
                    <IoIosArrowDown size={20}/>
                  </button>
                </div>
              </section>
            ))
          )}
        </div>
        
        {basket.length !== 0 && (
          <div className={classes.subtotal}>
            <div>
              <p> subTotal({basket.length} item)</p>
              <CurrencyFormat amount={total} />
            </div>
            <span>
              <input type="checkbox" />
              <small>This order contains gift</small>
            </span>
            <Link to="/payment">Proceed to Checkout</Link>
          </div>
        )}
      </section>
    </Layout>
  );
}

export default Cart;
