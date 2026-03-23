import { useEffect,useState } from "react";
import axios from "axios";

function AdminWorkers(){

const [workers,setWorkers] = useState([]);

useEffect(()=>{

axios.get("http://localhost:8085/api/admin/workers")
.then(res=>setWorkers(res.data));

},[]);

return(

<div>

<h1>All Workers</h1>

{workers.map(w=>(
<div key={w.id}>

<p>Name: {w.fullName}</p>
<p>Phone: {w.phone}</p>
<p>Location: {w.location}</p>

</div>
))}

</div>

);

}

export default AdminWorkers;