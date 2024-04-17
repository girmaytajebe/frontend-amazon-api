const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const {setGlobalOptions} =  require("firebase-functions/v2");
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
 // Corrected key name

// App config
const app = express();
setGlobalOptions({maxInstances:10})

// Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

// Routes
app.get("/", (request, response) => {
  response.status(200).json({
     message:"Hello, world!"
    })
    });

app.post("/payment/create", async (request, response) => {
  const total = request.query.total;
  if (total > 0) {
    // console.log("Payment request received for this amount:", total);
    // response.send(total)

    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(total),
      currency: "USD",
    });
    console.log(paymentIntent)
    response.status(201).json({
      client_secret: paymentIntent.client_secret,
    });
  } else {
    response.status(403).json({ message: "total must be greater than zero" });
  }

  
});

// Start server

exports.api = onRequest(app);
