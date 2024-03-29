// import React, { useEffect, useState } from "react";
// import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
// import auth from "../../firebase.init";
// import { useAuthState } from "react-firebase-hooks/auth";
// import Loading from "../Shared/Loading";

// const CheckoutForm = ({ payments }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [cardError, setCardError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [processing, setProcessing] = useState(false);
//   const [transactionId, setTransactionId] = useState("");
//   const [clientSecret, setClientSecret] = useState("");

//   const [user, loading, error] = useAuthState(auth);

//   const { orderId, price, customerEmail, customerName } = payments;
//   console.log(price);

//   if (loading) {
//     <Loading></Loading>;
//   }

//   useEffect(() => {
//     fetch("https://toolsware.onrender.com/create-payment-intent", {
//       method: "POST",
//       headers: {
//         "content-type": "application/json",
//         authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//       },
//       body: JSON.stringify({ price }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data?.clientSecret) {
//           setClientSecret(data.clientSecret);
//         }
//       });
//   }, [price]);

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!stripe || !elements) {
//       return;
//     }

//     const card = elements.getElement(CardElement);

//     if (card === null) {
//       return;
//     }

//     const { error, paymentMethod } = await stripe.createPaymentMethod({
//       type: "card",
//       card,
//     });

//     setCardError(error?.message || "");
//     setSuccess("");
//     setProcessing(true);
//     // confirm card payment
//     const { paymentIntent, error: intentError } =
//       await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: card,
//           billing_details: {
//             name: customerName,
//             email: customerEmail,
//           },
//         },
//       });

//     if (intentError) {
//       setCardError(intentError?.message);
//       setProcessing(false);
//     } else {
//       setCardError("");
//       setTransactionId(paymentIntent.id);
//       console.log(paymentIntent);
//       setSuccess("Congrats! Your payment is completed.");

//       //store payment on database
//       const payment = {
//         order: orderId,
//         transactionId: paymentIntent.id,
//       };
//       fetch(`https://toolsware.onrender.com/order/${orderId}`, {
//         method: "PATCH",
//         headers: {
//           "content-type": "application/json",
//           authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//         },
//         body: JSON.stringify(payment),
//       })
//         .then((res) => res.json())
//         .then((data) => {
//           setProcessing(false);
//           console.log(data);
//         });
//     }
//   };
//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <CardElement
//           options={{
//             style: {
//               base: {
//                 fontSize: "16px",
//                 color: "#424770",
//                 "::placeholder": {
//                   color: "#aab7c4",
//                 },
//               },
//               invalid: {
//                 color: "#9e2146",
//               },
//             },
//           }}
//         />
//         <button
//           className="btn btn-success btn-sm mt-5"
//           type="submit"
//           disabled={!stripe || !clientSecret || success}
//         >
//           Pay
//         </button>
//       </form>
//       {cardError && <p className="text-red-500">{cardError}</p>}
//       {success && (
//         <div className="text-green-500">
//           <p>{success} </p>
//           <p>
//             Your transaction Id:{" "}
//             <span className="text-orange-500 font-bold">{transactionId}</span>{" "}
//           </p>
//         </div>
//       )}
//     </>
//   );
// };

// export default CheckoutForm;

import { async } from "@firebase/util";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";

const CheckoutForm = ({ payments }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [clientSecret, setClientSecret] = useState("");

  const { _id, price, customerEmail, customerName } = payments;

  useEffect(() => {
    // fetch("https://toolsware.onrender.com/create-payment-intent", {
    if (price) {
      fetch("https://toolsware.onrender.com/create-payment-intent", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify({ price }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.clientSecret) {
            setClientSecret(data.clientSecret);
          }
        });
    }
  }, [price]);
  // console.log(clientSecret);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    setCardError(error?.message || "");
    setSuccess("");
    setProcessing(true);
    //confirm card payment
    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: customerName,
            email: customerEmail,
          },
        },
      });

    if (intentError) {
      setCardError(intentError?.message);
      setProcessing(false);
    } else {
      setCardError("");
      setTransactionId(paymentIntent.id);
      console.log(paymentIntent);
      setSuccess("congrats! your payment is completed");

      // Store Payments
      const payment = {
        order: _id,
        transactionId: paymentIntent.id,
      };
      fetch(`https://toolsware.onrender.com/order/${_id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          setProcessing(false);
          console.log(data);
        });
    }
  };
  return (
    <>
      {" "}
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-success btn-sm mt-5"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-red-500">{cardError}</p>}
      {success && (
        <div className="text-green-500">
          <p>{success}</p>
          <p>
            your transaction Id :{" "}
            <span className="text-orange-400">{transactionId}</span>
          </p>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
