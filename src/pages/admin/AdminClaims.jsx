import { useEffect,useState } from "react";
import axios from "axios";

function AdminClaims(){

const [claims,setClaims] = useState([]);

useEffect(()=>{

axios.get("http://localhost:8085/api/admin/claims")
.then(res=>setClaims(res.data));

},[]);

return(

<div>

<h1>All Claims</h1>

{claims.map(c=>(
<div key={c.id}>

<p>Worker ID: {c.workerId}</p>
<p>Amount: {c.payoutAmount}</p>
<p>Status: {c.status}</p>

</div>
))}

</div>

);

}

export default AdminClaims;