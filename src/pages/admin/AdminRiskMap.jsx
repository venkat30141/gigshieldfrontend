import { useState } from "react";
import axios from "axios";

function AdminRiskMap(){

const [city,setCity] = useState("");
const [risk,setRisk] = useState("");

const checkRisk = async()=>{

const res = await axios.get(
`http://localhost:8085/api/weather/${city}`
);

setRisk(res.data.weather[0].main);

};

return(

<div>

<h1>Risk Map</h1>

<input
placeholder="City"
onChange={(e)=>setCity(e.target.value)}
/>

<button onClick={checkRisk}>
Check Risk
</button>

{risk && <p>Weather: {risk}</p>}

</div>

);

}

export default AdminRiskMap;