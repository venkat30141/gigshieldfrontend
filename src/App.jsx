import { BrowserRouter, Routes, Route } from "react-router-dom";

/* PUBLIC */
import Home from "./pages/public/Home";

/* WORKER */
import WorkerLogin from "./pages/worker/WorkerLogin";
import WorkerRegister from "./pages/worker/WorkerRegister";
import WorkerDashboard from "./pages/worker/WorkerDashboard";
import WorkerClaims from "./pages/worker/WorkerClaims";
import WorkerPayments from "./pages/worker/WorkerPayments";
import WorkerPolicies from "./pages/worker/WorkerPolicies";
import WorkerRisk from "./pages/worker/WorkerRisk";

/* ADMIN */
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminWorkers from "./pages/admin/AdminWorkers";
import AdminClaims from "./pages/admin/AdminClaims";
import AdminPlans from "./pages/admin/AdminPlans";
import AdminPolicies from "./pages/admin/AdminPolicies";
import AdminRiskMap from "./pages/admin/AdminRiskMap";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* PUBLIC */}
        <Route path="/" element={<Home />} />

        {/* WORKER AUTH */}
        <Route path="/login" element={<WorkerLogin />} />
        <Route path="/register" element={<WorkerRegister />} />

        {/* WORKER DASHBOARD */}
        <Route path="/worker/dashboard" element={<WorkerDashboard />} />
        <Route path="/worker/claims" element={<WorkerClaims />} />
        <Route path="/worker/payments" element={<WorkerPayments />} />
        <Route path="/worker/policies" element={<WorkerPolicies />} />
        <Route path="/worker/risk" element={<WorkerRisk />} />

        {/* ADMIN PANEL */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/workers" element={<AdminWorkers />} />
        <Route path="/admin/claims" element={<AdminClaims />} />
        <Route path="/admin/plans" element={<AdminPlans />} />
        <Route path="/admin/policies" element={<AdminPolicies />} />
        <Route path="/admin/risk-map" element={<AdminRiskMap />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;