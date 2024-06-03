import axios from "axios";

export const getTvDetails = async (movieId) => {
  try {
    const detailOptions = {
      method: "GET",
      url: `https://api.themoviedb.org/3/tv/${movieId}`,
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_APP_API_KEY,
      },
    };

    const creditsOptions = {
      method: "GET",
      url: `https://api.themoviedb.org/3/tv/${movieId}/credits`,
      headers: {
        accept: "application/json",
        Authorization: import.meta.env.VITE_APP_API_KEY,
      },
    };

    const [detailsResponse, creditsResponse] = await Promise.all([
      axios.request(detailOptions),
      axios.request(creditsOptions),
    ]);

    return {
      details: detailsResponse.data,
      credits: creditsResponse.data,
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
