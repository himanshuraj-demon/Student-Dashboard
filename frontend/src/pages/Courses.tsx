import { useTitle } from "../hooks/useTitle";
import Nav from "../services/Nav";
import BranchWise from "../components/cources/BranchWise";

const Cources = () => {
  useTitle("Cources");
  return (
    <div className="main">
      <Nav />
      <BranchWise />
    </div>
  );
};

export default Cources;
