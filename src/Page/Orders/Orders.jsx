import React, { useContext, useEffect, useState } from "react";
import classes from "./Orders.module.css";
import LayOut from "../../Componenet/LayOut/LayOut";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Componenet/DataProvider/DataProvider";
import ProductCard from "../../Componenet/Producut/ProductCard";
function Orders() {
  const [{user} , dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    } else {
      setOrders([]);
    }
  }, []);
  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.Orders__container}>
          <h2>Your Orders </h2>
          {orders?.length == 0 && (
            <div style={{ padding: "20px" }}>you do't have order yet</div>
          )}
          {/* order items */}
          <div>
            {orders?.map((eachOrders, i) => {
              return (
                <div key={i}>
                  <hr />
                  <p>Order Id: {eachOrders?.id}</p>
                  {eachOrders?.data?.basket?.map((order) => {
                    return (
                      <ProductCard
                        flex={true}
                        product={order}
                        f
                        key={order.id}
                      />
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Orders;
