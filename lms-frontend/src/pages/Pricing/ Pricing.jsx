import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Pricing() {
  const { completePayment } = useAuth();
  const navigate = useNavigate();

  const handleSelect = (plan) => {
    completePayment(plan); // mock payment success
    navigate("/dashboard");
  };

  return (
    <div className="pricing">

      <h2>Select Your Plan</h2>

      <button onClick={() => handleSelect("Silver")}>Silver</button>
      <button onClick={() => handleSelect("Gold")}>Gold</button>
      <button onClick={() => handleSelect("Gold+")}>Gold+</button>

    </div>
  );
}

export default Pricing;