import { useEffect, useState } from "react";
import axios from "axios";

interface Contest {
  title: string;
  url: string;
  startTime: string; 
  duration: string;
  platform: string;
}

const UpcomingContests = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        setLoading(true);
        
        const res = await axios.get("https://contest-hive.vercel.app/api/all", {
          withCredentials: false
        });
        
        // Grab the grouped data object containing the platforms
        const platformData = res.data?.data || res.data?.contests?.data;
        
        let flattenedList: Contest[] = [];

        if (platformData && typeof platformData === "object") {
          // Loop through each platform key (atcoder, codeforces, etc.)
          Object.keys(platformData).forEach((platformName) => {
            const platformContests = platformData[platformName];
            
            if (Array.isArray(platformContests)) {
              // Inject the platform name into each contest item so we can display it
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const mapped = platformContests.map((c: any) => ({
                title: c.title,
                url: c.url,
                startTime: c.startTime || c.start_time || c.start, // dynamic structural fallback
                duration: c.duration,
                platform: platformName
              }));
              
              flattenedList = [...flattenedList, ...mapped];
            }
          });
        }
        flattenedList.sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

        setContests(flattenedList);
      } catch (error) {
        console.error("Failed to parse platform schedules:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString([], { 
        month: "short", 
        day: "numeric", 
        hour: "2-digit", 
        minute: "2-digit" 
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="competative rounded-2xl p-5 m-2">
      <h2 className="font-bold text-xl mb-4 flex items-center gap-2">
        📅 Upcoming Coding Battles
      </h2>
      
      {loading && <p className="text-sm opacity-60">Flattening platform timelines...</p>}

      <div className="space-y-3 overflow-y-auto max-h-96 pr-1">
        {Array.isArray(contests) && contests.slice(0, 15).map((contest, index) => (
          <div 
            key={index} 
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 rounded-xl  border border-black"
          >
            <div>
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-white/10 opacity-70">
                {contest.platform}
              </span>
              <h3 className="text-sm font-semibold tracking-tight mt-1 opacity-90">
                {contest.title}
              </h3>
              <p className="text-xs opacity-60 mt-0.5">
                ⏰ {formatTime(contest.startTime)} ({contest.duration})
              </p>
            </div>
            
            <a
              href={contest.url}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-medium self-start sm:self-center bg-green-500 text-white px-3 py-1.5 rounded-lg transition-all hover:opacity-90 whitespace-nowrap"
            >
              Register ↗
            </a>
          </div>
        ))}

        {contests.length === 0 && !loading && (
          <p className="text-sm opacity-50 py-4 text-center">No active contests parsed.</p>
        )}
      </div>
    </div>
  );
};

export default UpcomingContests