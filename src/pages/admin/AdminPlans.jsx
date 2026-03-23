import { useEffect,useState } from "react";
import axios from "axios";

function AdminPlans(){

const [plans,setPlans] = useState([]);
const [name,setName] = useState("");
const [premium,setPremium] = useState("");

useEffect(()=>{

loadPlans();

},[]);

const loadPlans = async()=>{

const res = await axios.get(
"http://localhost:8085/api/plans"
);

setPlans(res.data);

};

const addPlan = async()=>{

await axios.post(
"http://localhost:8085/api/plans",
{
planName:name,
basePremium:premium
}
);

loadPlans();

};

const deletePlan = async(id)=>{

await axios.delete(
`http://localhost:8085/api/plans/${id}`
);

loadPlans();

};

return(

<div>

<h1>Insurance Plans</h1>

<input
placeholder="Plan Name"
onChange={(e)=>setName(e.target.value)}
/>

<input
placeholder="Premium"
onChange={(e)=>setPremium(e.target.value)}
/>

<button onClick={addPlan}>
Add Plan
</button>

<hr/>

{plans.map(p=>(
<div key={p.id}>

<p>{p.planName}</p>

<button onClick={()=>deletePlan(p.id)}>
Delete
</button>

</div>
))}

</div>

);

}

export default AdminPlans;