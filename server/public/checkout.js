// This is your test secret API key.
const stripe = Stripe("pk_test_51PfVrRHi5DWvkUgtgkwVUFSryTNWmRFDhHC0nOfjLxaknI9HLBQFkAltP4lahSckhq9TzshovM3aUWRJvWkuYkQA00W1mEjRx0");

initialize();

// Create a Checkout Session
async function initialize() {
  const fetchClientSecret = async () => {
    const response = await fetch("/create-checkout-session", {
      method: "POST",
    });
    const { clientSecret } = await response.json();
    return clientSecret;
  };

  const checkout = await stripe.initEmbeddedCheckout({
    fetchClientSecret,
  });

  // Mount Checkout
  checkout.mount('#checkout');
}