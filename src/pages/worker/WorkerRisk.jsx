import { useEffect, useState } from "react";
import API from "../services/api";

function WorkerRisk(){

const workerId = localStorage.getItem("workerId");

const [premium,setPremium] = useState(null);

useEffect(()=>{

loadRisk();

},[]);

const loadRisk = async()=>{

const res = await API.get(`/premium/calculate/${workerId}`);

setPremium(res.data);

};

return(

<div>

<h2>Risk Level</h2>

{premium && (

<div>

<p>Risk Level: {premium.riskLevel}</p>

<p>Weekly Premium: ₹{premium.weeklyPremium}</p>

</div>

)}

</div>

);

}

export default WorkerRisk;