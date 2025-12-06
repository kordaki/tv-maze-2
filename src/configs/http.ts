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

// apiClient.interceptors.response.use((response: any) => {
//   if (response.status === 200) {
//     // Transform success response in case of having a lighter cache
//     const requestURL = response.request.responseURL;

//     const videoListRegex = new RegExp(`^${BASE_URL}/schedule/*`);
//     if (videoListRegex.test(requestURL))
//       return { ...response, data: videoListTransformer(response.data) };

//     const videoRegex = new RegExp(`^${BASE_URL}/shows/*`);
//     if (videoRegex.test(requestURL))
//       return { ...response, data: videoTransformer(response.data) };

//     const searchVideoRegex = new RegExp(`^${BASE_URL}/search/shows?q*`);
//     if (searchVideoRegex.test(requestURL))
//       return { ...response, data: searchVideosTransformer(response.data) };
//   }
//   return response;
// });
