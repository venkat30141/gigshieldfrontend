import { useEffect, useState } from "react";
import API from "../services/api";

function WorkerPayments(){

const workerId = localStorage.getItem("workerId");

const [payments,setPayments] = useState([]);

useEffect(()=>{

loadPayments();

},[]);

const loadPayments = async()=>{

const res = await API.get(`/payment/${workerId}`);

setPayments(res.data);

};

const payPremium = async()=>{

await API.post(`/payment/pay/${workerId}`);

alert("Premium paid");

loadPayments();

};

return(

<div>

<h2>Premium Payments</h2>

<button onClick={payPremium}>
Pay Weekly Premium
</button>

{payments.map(p=>(

<div key={p.id}>

<p>Amount ₹{p.amount}</p>

<p>Date {p.date}</p>

</div>

))}

</div>

);

}

export default WorkerPayments;