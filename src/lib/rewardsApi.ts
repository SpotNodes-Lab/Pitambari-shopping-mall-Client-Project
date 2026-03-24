export interface RewardCustomer {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  points: number;
  tier: "Starter" | "Silver" | "Gold" | string;
  token: string;
  rewardUrl: string;
}

export interface RewardCustomerView {
  name: string;
  points: number;
  tier: string;
  recentActivity: { type: string; pointsChange: number; note: string; createdAt: string }[];
  contact: { phone?: string; email?: string };
}

async function request<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Request failed");
  }
  return response.json() as Promise<T>;
}

export const rewardsApi = {
  listCustomers: () => request<RewardCustomer[]>("/api/rewards/customers"),
  createCustomer: (payload: {
    name: string;
    phone?: string;
    email?: string;
    points?: number;
  }) =>
    request<RewardCustomer>("/api/rewards/customers", {
      method: "POST",
      body: JSON.stringify(payload),
    }),
  updatePoints: (id: string, points: number, note?: string) =>
    request<{ id: string; points: number; tier: string }>(
      `/api/rewards/customers/${id}/points`,
      {
        method: "PATCH",
        body: JSON.stringify({ points, note }),
      }
    ),
  getByToken: (token: string) => request<RewardCustomerView>(`/api/rewards/customer/${token}`),
};
