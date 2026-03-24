import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { rewardsApi } from "@/lib/rewardsApi";
import type { RewardCustomerView } from "@/lib/rewardsApi";

export function RewardsCustomerPage() {
  const { token = "" } = useParams();
  const [data, setData] = useState<RewardCustomerView | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    rewardsApi
      .getByToken(token)
      .then(setData)
      .catch(() => setError("Rewards profile not found."));
  }, [token]);

  if (error) return <Wrap><Card>{error}</Card></Wrap>;
  if (!data) return <Wrap><Card>Loading rewards...</Card></Wrap>;

  return (
    <Wrap>
      <Card>
        <h1>{data.name}</h1>
        <Points>{data.points} points</Points>
        <Tier>{data.tier} tier</Tier>

        <h3>Recent Activity</h3>
        <ul>
          {data.recentActivity.length === 0 ? (
            <li>No recent activity</li>
          ) : (
            data.recentActivity.map((item, index) => (
              <li key={`${item.createdAt}-${index}`}>
                {item.type} ({item.pointsChange >= 0 ? "+" : ""}
                {item.pointsChange}) - {item.note}
              </li>
            ))
          )}
        </ul>

        <Actions>
          <a href={`/api/rewards/customer/${token}/contact.vcf`}>Save Contact</a>
          <a
            href={`https://wa.me/?text=${encodeURIComponent(
              `My rewards page: ${window.location.origin}/rewards/${token}`
            )}`}
            target="_blank"
            rel="noreferrer"
          >
            Share on WhatsApp
          </a>
        </Actions>
      </Card>
    </Wrap>
  );
}

const Wrap = styled.main`
  min-height: 100vh;
  background: #f5f7f7;
  padding: 1rem;
  display: grid;
  place-items: center;
`;

const Card = styled.section`
  width: min(560px, 100%);
  background: #fff;
  border-radius: 14px;
  padding: 1rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);

  h1 {
    margin-bottom: 0.3rem;
  }

  h3 {
    margin-top: 0.95rem;
    margin-bottom: 0.5rem;
  }

  ul {
    margin: 0;
    padding-left: 1rem;
    color: rgba(0, 0, 0, 0.78);
  }
`;

const Points = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
  margin-bottom: 0.2rem;
`;

const Tier = styled.p`
  color: var(--color-primary);
  font-weight: 700;
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.7rem;
  margin-top: 1rem;

  a {
    text-decoration: none;
    border-radius: 8px;
    padding: 0.6rem 0.9rem;
    border: 1px solid rgba(0, 0, 0, 0.2);
    color: #111;
    font-weight: 600;
  }
`;
