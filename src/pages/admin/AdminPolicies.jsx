import { useEffect,useState } from "react";
import axios from "axios";

function AdminPolicies(){

const [policies,setPolicies] = useState([]);

useEffect(()=>{

axios.get("http://localhost:8085/api/admin/policies")
.then(res=>setPolicies(res.data));

},[]);

return(

<div>

<h1>All Policies</h1>

{policies.map(p=>(
<div key={p.id}>

<p>Worker: {p.workerId}</p>
<p>Plan: {p.planId}</p>

</div>
))}

</div>

);

}

export default AdminPolicies;