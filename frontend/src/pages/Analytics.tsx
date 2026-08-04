import { useTitle } from "../hooks/useTitle";
import SemesterWise from "../components/analytics/SemesterWise";

const Analytics = () => {
  useTitle("Analytics");
  return <SemesterWise />;
};

export default Analytics;
