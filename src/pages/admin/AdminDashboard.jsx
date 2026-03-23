import { useEffect, useState } from "react";
import axios from "axios";

function AdminDashboard() {

  const [workers,setWorkers] = useState([]);
  const [claims,setClaims] = useState([]);
  const [plans,setPlans] = useState([]);

  useEffect(()=>{

    const loadData = async ()=>{

      const w = await axios.get("http://localhost:8085/api/admin/workers");
      const c = await axios.get("http://localhost:8085/api/admin/claims");
      const p = await axios.get("http://localhost:8085/api/plans");

      setWorkers(w.data);
      setClaims(c.data);
      setPlans(p.data);

    };

    loadData();

  },[]);

  return(

    <div>

      <h1>Admin Dashboard</h1>

      <p>Total Workers: {workers.length}</p>
      <p>Total Claims: {claims.length}</p>
      <p>Total Plans: {plans.length}</p>

    </div>

  );

}

export default AdminDashboard;