import { useEffect, useState } from "react";
import API from "../services/api";

function WorkerClaims(){

const [claims,setClaims] = useState([]);

useEffect(()=>{

loadClaims();

},[]);

const loadClaims = async()=>{

const res = await API.get("/claims");

setClaims(res.data);

};

return(

<div>

<h2>Claims</h2>

{claims.map(c=>(

<div key={c.id}>

<p>Reason: {c.reason}</p>

<p>Amount: ₹{c.amount}</p>

<p>Status: {c.status}</p>

</div>

))}

</div>

);

}

export default WorkerClaims;