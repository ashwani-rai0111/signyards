import React, { useEffect, useState } from "react";

const stats = [
  {
    id: 1,
    name: "SKUs of Products & Services across different categories on our Marketplace.",
    value: 50,
  },
  {
    id: 2,
    name: "Sellers or Seller partners are registered on signyards across categories",
    value: 20,
  },
  { id: 3, name: "Registered users or Buyers or clients.", value: 50 },
  {
    id: 4,
    name: "Turnkey Signages & Advertising Projects Completed or delivered for different clients across India.",
    value: 50,
  },
];

const Trend = () => {
  const [visibleStats, setVisibleStats] = useState(
    stats.map((stat) => ({ ...stat, count: 0 }))
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleStats((prevStats) =>
        prevStats.map((stat) => {
          if (stat.count < stat.value) {
            return {
              ...stat,
              count: Math.min(
                stat.count + Math.ceil(stat.value / 20),
                stat.value
              ),
            };
          } else {
            return stat;
          }
        })
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="trend-container">
      <div className="trend-content">
        <dl className="trend-grid">
          {visibleStats.map((stat) => (
            <div key={stat.id} className="stat-item">
              <dd className="stat-value">{stat.count}+</dd>
              <dt className="stat-name">{stat.name}</dt>
            </div>
          ))}
        </dl>
      </div>
      <style jsx>{`
        .trend-container {
          background-color: white;
          padding: 4rem 0;
        }
        .trend-content {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 1.5rem;
        }
        .trend-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 4rem;
        }
        .stat-item {
          text-align: center;
          max-width: 300px;
          margin: 0 auto;
        }
        .stat-value {
          font-size: 3rem;
          font-weight: 700;
          color: #e74c3c;
          text-shadow: 2px 2px 4px gray;
          margin-bottom: 0.5rem;
          transform: scaleY(1);
          transform-origin: bottom;
          animation: countUp 2s ease-out forwards;
        }
        .stat-name {
          font-size: 1rem;
          font-weight: 600;
          color: black;
        }

        @keyframes countUp {
          from {
            transform: scaleY(0);
          }
          to {
            transform: scaleY(1);
          }
        }

        @media (max-width: 768px) {
          .trend-container {
            padding: 4rem 0;
          }
          .stat-item {
            max-width: 100%;
          }
          .stat-value {
            font-size: 2rem;
          }
          .trend-grid {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Trend;
