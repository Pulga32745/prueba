const API_URL = "http://localhost:3000/api/v1/products";

export async function getProductStats(token) {
  const res = await fetch(`${API_URL}/stats`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  return res.json();
}

export async function getPriceAnalytics(token) {
  const res = await fetch(`${API_URL}/analytics/prices`, {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  });
  return res.json();
}
