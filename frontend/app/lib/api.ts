const rawApiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
export const API_URL = rawApiUrl.replace(/\/+$/, "");

export function getAuthHeaders(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("personamail_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const headers: Record<string, string> = {
    ...getAuthHeaders(),
    ...((options.headers as Record<string, string>) || {}),
  };
  return fetch(url, {
    ...options,
    headers,
    credentials: "include",
  });
}
