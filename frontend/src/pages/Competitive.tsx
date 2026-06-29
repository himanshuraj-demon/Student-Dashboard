import { useEffect, useState } from "react";
import { useTitle } from "../hooks/useTitle";
import Nav from "../services/Nav";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";
import { SiGithub, SiCodeforces } from "react-icons/si";
import { TbBrandLeetcode } from "react-icons/tb";
import UpcomingContests from "../components/competitive/UpcomingContests";
type githubProp={
  avatar_url: string;
  name: string;
  login: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}
type cfPrope={
  rating:string;
  maxRating:string;
  rank:string;
  maxRank:string;
}
type leetcodeProps={
  ranking:string;
  totalSolved:string;
  easySolved:string;
  mediumSolved:string;
  hardSolved:string;
}


interface CacheSchema {
  timestamp: number;
  githubData: githubProp | null;
  cfData: cfPrope | null;
  leetcodeData: leetcodeProps | null;
}

const CACHE_KEY = "competitive_dashboard_data";
const CACHE_DURATION = 2 * 60 * 60 * 1000; // 2 hours

const Competitive = () => {
  const { user } = useAuth();
  const github = user?.details?.github;
  const codeforces = user?.details?.codeforcesHandle;
  const leetcode = user?.details?.codechefHandle || user?.details?.codechefHandle; 
  const [githubData, setGithubData] = useState<githubProp|null>(null);
  const [cfData, setCfData] = useState<cfPrope|null>(null);
  const [leetcodeData, setLeetcodeData] = useState<leetcodeProps|null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!github && !codeforces && !leetcode) return;

    const fetchProfiles = async () => {
      try {
       
        const localCache = localStorage.getItem(CACHE_KEY);
        if (localCache) {
          const parsed: CacheSchema = JSON.parse(localCache);
          const cacheAge = Date.now() - parsed.timestamp;

          
          setGithubData(parsed.githubData);
          setCfData(parsed.cfData);
          setLeetcodeData(parsed.leetcodeData);

          
          if (cacheAge < CACHE_DURATION) {
            setLoading(false);
            return;
          }
        }

       
        setLoading(true);

        const [githubRes, cfRes, lcRes] = await Promise.all([
          github ? axios.get(`https://api.github.com/users/${github}`, { withCredentials: false }) : null,
          codeforces ? axios.get(`https://codeforces.com/api/user.info?handles=${codeforces}`, { withCredentials: false }) : null,
          leetcode ? axios.get(`https://alfa-leetcode-api.onrender.com/${leetcode}`, { withCredentials: false }) : null,
        ]);

        const freshGithub = githubRes ? githubRes.data : null;
        const freshCf = cfRes ? cfRes.data.result[0] : null;
        const freshLc = lcRes ? lcRes.data : null;

        if (freshGithub) setGithubData(freshGithub);
        if (freshCf) setCfData(freshCf);
        if (freshLc) setLeetcodeData(freshLc);

        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            timestamp: Date.now(),
            githubData: freshGithub || githubData,
            cfData: freshCf || cfData,
            leetcodeData: freshLc || leetcodeData,
          })
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, [github, codeforces, leetcode]);

  useTitle("Competitive");
  return (
    <div className="main">
      <Nav />
      <div className="h-dvh flex text-black flex-col overflow-y-scroll">
        <div className="md:h-30 m-2 h-auto rounded-2xl flex flex-col justify-center px-6 py-2 bg-[#ffffff99]">
          <h1 className="md:text-3xl text-2xl font-bold tracking-tight text-center">
            👋Welcome Back, Coder!
          </h1>
          <p className="text-sm opacity-80 mt-1 hidden md:flex">
            Track progress, solve problems, and stay consistent every day.
          </p>
        </div>
        {loading && <h1>Loading...</h1>}
        <div className="competative rounded-2xl p-6 m-2">
          <div className="flex flex-col md:flex-row items-center gap-5">
            <img
              src={githubData?.avatar_url}
              alt="avatar"
              className="w-24 h-24 rounded-full border-4 border-white/20"
            />

            <div className="flex-1">
              <h1 className="text-2xl font-bold">{githubData?.name}</h1>

              <p className="opacity-80">@{githubData?.login}</p>

              <p className="mt-2 text-sm opacity-90">{githubData?.bio}</p>
            </div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4 m-2">
          {/* GitHub */}
          <div className="competative rounded-2xl p-5">
            <h2 className="font-bold text-xl mb-4 flex items-center gap-2">
              <SiGithub />
              GitHub
            </h2>

            <div className="space-y-2">
              <p>⭐ Repos: {githubData?.public_repos}</p>
              <p>👥 Followers: {githubData?.followers}</p>
              <p>➡️ Following: {githubData?.following}</p>
            </div>
          </div>

          {/* Codeforces */}
          <div className="competative rounded-2xl p-5">
            <h2 className="font-bold text-xl mb-4 flex items-center gap-2">
              <SiCodeforces /> Codeforces
            </h2>

            <div className="space-y-2">
              <p>🏆 Rating: {cfData?.rating}</p>
              <p>🎖 Max Rating: {cfData?.maxRating}</p>
              <p>👑 Rank: {cfData?.rank}</p>
              <p>🔥 Max Rank: {cfData?.maxRank}</p>
            </div>
          </div>

          {/* LeetCode */}
          <div className="competative rounded-2xl p-5">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <TbBrandLeetcode /> LeetCode
            </h2>

            <div className="space-y-2">
              <p>🏆 Ranking: {leetcodeData?.ranking}</p>
              <p>✅ Solved: {leetcodeData?.totalSolved}</p>
              <p>🟢 Easy: {leetcodeData?.easySolved}</p>
              <p>🟠 Medium: {leetcodeData?.mediumSolved}</p>
              <p>🔴 Hard: {leetcodeData?.hardSolved}</p>
            </div>
          </div>
        </div>
        <UpcomingContests />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 m-2">
          <div className="competative p-4 rounded-xl text-center">
            <p className="text-3xl font-bold">{githubData?.public_repos}</p>
            <p>Repositories</p>
          </div>

          <div className="competative p-4 rounded-xl text-center">
            <p className="text-3xl font-bold">{cfData?.rating}</p>
            <p>CF Rating</p>
          </div>

          <div className="competative p-4 rounded-xl text-center">
            <p className="text-3xl font-bold">{leetcodeData?.totalSolved}</p>
            <p>LeetCode Solved</p>
          </div>

          <div className="competative p-4 rounded-xl text-center">
            <p className="text-3xl font-bold">{githubData?.followers}</p>
            <p>Followers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Competitive;