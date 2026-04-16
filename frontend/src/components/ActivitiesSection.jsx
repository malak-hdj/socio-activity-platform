import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { activites as activitiesAPI } from "../services/api";
import { activities as defaultActivities } from "../data/activities";

const ArrowIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M5.25 5.25H12.75V12.75M5.25 12.75L12.75 5.25"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

function ActivityCard({ activity, tall = false }) {
  return (
    <Link
      to={`/activities/${activity.slug}`}
      className={`relative rounded-[24px] overflow-hidden bg-white flex flex-col justify-end group ${
        tall ? "h-[560px]" : "h-[270px]"
      }`}
    >
      <img
        src={activity.image}
        alt={activity.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
      />

      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(47,52,59,0.04) 0%, rgba(47,52,59,0.18) 45%, rgba(47,52,59,0.76) 100%)",
        }}
      />

      <div className="absolute top-[18px] left-[18px]">
        <span className="px-3 py-[6.5px] rounded-full bg-[rgba(255,255,255,0.88)] text-[#2F343B] text-xs font-semibold">
          {activity.category}
        </span>
      </div>

      <div className="absolute top-[18px] right-[18px]">
        <span className="w-[38px] h-[38px] flex justify-center items-center rounded-full bg-[rgba(255,255,255,0.18)] backdrop-blur-[4px] group-hover:bg-[rgba(255,255,255,0.28)] transition-colors">
          <ArrowIcon />
        </span>
      </div>

      <div className="relative flex flex-col gap-[5px] p-[22px]">
        <h3
          className="text-white font-bold leading-[102%] tracking-[-1.2px]"
          style={{ fontSize: tall ? "30px" : "28px" }}
        >
          {activity.title}
        </h3>
        <p className="text-[rgba(255,255,255,0.84)] text-[13px] leading-[150%]">
          {activity.shortDescription}
        </p>
      </div>
    </Link>
  );
}

export default function ActivitiesSection() {
  const [activities, setActivities] = useState(defaultActivities);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const data = await activitiesAPI.getAll();
        console.log('API Response:', data);
        
        if (Array.isArray(data) && data.length > 0) {
          // Transform API data to match component format
          const transformed = data.map((item) => ({
            title: item.titre || 'Untitled',
            slug: (item.titre || '').toLowerCase().replace(/\s+/g, "-"),
            category: item.categorie || 'Uncategorized',
            shortDescription: item.description || 'No description',
            image: item.image || "https://via.placeholder.com/400x300?text=" + (item.titre || 'Activity'),
          }));
          console.log('Transformed data:', transformed);
          setActivities(transformed);
        } else {
          console.log('No data from API, using defaults');
        }
      } catch (error) {
        console.error("Error fetching activities:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  const bySlug = Object.fromEntries(activities.map((item) => [item.slug, item]));
  const featuredActivities = [
    bySlug["running"],
    bySlug["summer-camp"],
    bySlug["bungalow-stay"],
    bySlug["camping"],
    bySlug["omra"],
  ].filter(Boolean);

  return (
    <div className="flex flex-col items-center px-4 py-8 gap-8">
      <div className="w-full max-w-[1336px]">
        <div className="flex justify-between items-end mb-[42px]">
          <div className="flex flex-col gap-[10px]">
            <span className="text-[#ED8D31] text-[13px] font-semibold">
              Featured activities
            </span>
            <h2 className="text-[#2F343B] text-[42px] font-extrabold leading-[103%] tracking-[-2.1px]">
              Explore activities on the platform
            </h2>
            <p className="text-[#7A8088] text-base font-normal leading-[170%] max-w-[760px]">
              Discover sports, travel, family and leisure experiences designed for employees.
            </p>
          </div>

          <Link
            to="/catalog"
            className="text-[#ED8D31] text-sm font-semibold leading-[21px] whitespace-nowrap"
          >
            Browse Catalog
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {featuredActivities[0] && <ActivityCard activity={featuredActivities[0]} tall />}

          <div className="flex flex-col gap-5">
            {featuredActivities[1] && <ActivityCard activity={featuredActivities[1]} />}
            {featuredActivities[2] && <ActivityCard activity={featuredActivities[2]} />}
          </div>

          <div className="flex flex-col gap-5">
            {featuredActivities[3] && <ActivityCard activity={featuredActivities[3]} />}
            {featuredActivities[4] && <ActivityCard activity={featuredActivities[4]} />}
          </div>
        </div>
      </div>
    </div>
  );
}
