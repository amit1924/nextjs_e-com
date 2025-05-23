// app/api/create-payment-intent/route.js
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.json();
    const { cart } = body;

    const amount = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // in cents
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    return Response.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Stripe Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
