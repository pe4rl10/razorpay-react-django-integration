import './App.css'
import useRazorpay from 'react-razorpay'
import React, { useState } from 'react'
import axios from 'axios'


export const App = () => {
    const [Razorpay] = useRazorpay();
    const [amount, setAmount] = useState(50000);

    const complete_payment = (payment_id, order_id, signature) => {
        axios.post('http://127.0.0.1:8000/razorpay/order/complete/', {
            "payment_id": payment_id,
            "order_id": order_id,
            "signature": signature,
            "amount": amount
        })
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error.response);
        })
    }

    const razorpayPayment = () => {
        axios.post('http://127.0.0.1:8000/razorpay/order/create/', {
                "amount": amount,
                "currency": "INR"
            })
            .then(function (response) {
                // console.log(response.data.data);
                const order_id = response.data.data.id;
                const options = {
                    key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
                    name: "Acme Corp",
                    description: "Test Transaction",
                    image: "https://example.com/your_logo",
                    order_id: order_id, //This is a sample Order ID. Pass the `id` obtained in the response of createOrder().
                    handler: function (response) {
                        // alert(response.razorpay_payment_id);
                        // alert(response.razorpay_order_id);
                        // alert(response.razorpay_signature);
                        complete_payment(
                            response.razorpay_payment_id,
                            response.razorpay_order_id,
                            response.razorpay_signature, 
                            amount
                        );
                    },
                    prefill: {
                      name: "Piyush Garg",
                      email: "youremail@example.com",
                      contact: "9999999999",
                    },
                    notes: {
                      address: "Razorpay Corporate Office",
                    },
                    theme: {
                      color: "#3399cc",
                    },
                  };
                
                  const rzp1 = new Razorpay(options);
                
                  rzp1.on("payment.failed", function (response) {
                    alert(response.error.code);
                    alert(response.error.description);
                    alert(response.error.source);
                    alert(response.error.step);
                    alert(response.error.reason);
                    alert(response.error.metadata.order_id);
                    alert(response.error.metadata.payment_id);
                  });
                
                  rzp1.open();
                
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <div className="container mt-5 text-center rounded bg-warning border p-5 shadow" style={{width:"100%"}}>
            <h1 className='fw-bolder display-2'>$500</h1>
            <p className='text-center'>per year</p>
            <h3 className='fw-semibold text-center'>Basic</h3>
            <div className="text-start mt-3">
                <ul className='mt-3' style={{fontSize:"14px"}}>
                    <li>1 custom domain e.g. img.yourdomain.com</li>
                    <li>Media library backup</li>
                    <li>Automated image analysis reports with Performance Center</li>
                    <li>One-time 30 minute consultation with a media optimization expert</li>
                    <li>Live chat & 12-hr SLA support tickets</li>
                    <li>5 user accounts with role-based permissions</li>
                </ul>
                <div className="mt-3 d-grid">
                    <button type='button' className='btn btn-light fw-semibold py-3' onClick={razorpayPayment}>Upgrade now</button>
                </div>
            </div>
        </div>
    )
}


export default App
