// should be defined in .env
const BASE_URL = "https://api.tvmaze.com";

const apiClient = {
  get: async (url: string) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return { data: await response.json(), status: response.status };
  },
  post: async (url: string, data?: any) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return { data: await response.json(), status: response.status };
  },
};

export default apiClient;
