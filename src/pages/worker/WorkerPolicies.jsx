import { useEffect, useState } from "react";
import API from "../services/api";

function WorkerPolicies(){

const workerId = localStorage.getItem("workerId");

const [plans,setPlans] = useState([]);
const [policies,setPolicies] = useState([]);

useEffect(()=>{

loadPlans();
loadPolicies();

},[]);

const loadPlans = async()=>{

const res = await API.get("/admin/plans");
setPlans(res.data);

};

const loadPolicies = async()=>{

const res = await API.get(`/policy/${workerId}`);
setPolicies(res.data);

};

const buyPolicy = async(planId)=>{

await API.post(`/policy/buy/${workerId}/${planId}`);

alert("Policy purchased!");

loadPolicies();

};

return(

<div>

<h2>Insurance Plans</h2>

{plans.map(plan=>(

<div key={plan.id}>

<h3>{plan.name}</h3>

<p>Coverage ₹{plan.coverageAmount}</p>

<p>Premium ₹{plan.weeklyPremium}</p>

<button onClick={()=>buyPolicy(plan.id)}>
Buy Plan
</button>

</div>

))}

<hr/>

<h2>My Policies</h2>

{policies.map(policy=>(

<div key={policy.id}>

<p>Plan: {policy.planName}</p>

<p>Status: {policy.status}</p>

</div>

))}

</div>

);

}

export default WorkerPolicies;