import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

export function RewardsScanPage() {
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = token.trim();
    if (!trimmed) return;
    navigate(`/rewards/${trimmed}`);
  };

  return (
    <Wrap>
      <Card>
        <h1>Scan & Check Points</h1>
        <p>Paste your rewards code if QR scan does not open automatically.</p>
        <form onSubmit={onSubmit}>
          <input
            value={token}
            onChange={(event) => setToken(event.target.value)}
            placeholder="Enter reward token"
          />
          <button type="submit">View My Rewards</button>
        </form>
      </Card>
    </Wrap>
  );
}

const Wrap = styled.main`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 1rem;
  background: #f8f8f8;
`;

const Card = styled.section`
  width: min(520px, 100%);
  background: #fff;
  border-radius: 14px;
  padding: 1.2rem;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.08);

  h1 {
    margin-bottom: 0.5rem;
    font-family: "Playfair Display", "Baskerville", serif;
  }

  p {
    color: rgba(0, 0, 0, 0.66);
    margin-bottom: 0.9rem;
  }

  form {
    display: flex;
    gap: 0.6rem;
    flex-wrap: wrap;
  }

  input {
    flex: 1;
    min-width: 220px;
    border: 1px solid rgba(0, 0, 0, 0.16);
    border-radius: 10px;
    padding: 0.7rem 0.8rem;
  }

  button {
    border: none;
    background: var(--color-primary);
    color: #fff;
    border-radius: 10px;
    padding: 0.7rem 1rem;
    font-weight: 600;
    cursor: pointer;
  }
`;
