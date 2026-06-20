import { useTitle } from "../hooks/useTitle";
import Nav from "../services/Nav";
import SemesterWise from "../components/analytics/SemesterWise";

const Analytics = () => {
  useTitle("Analytics");
  return (
    <div className="main">
      <Nav />
      <SemesterWise />
    </div>
  );
};

export default Analytics;
