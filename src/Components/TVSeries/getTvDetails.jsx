import axios from "axios";

export const getTvDetails = async (movieId) => {
  try {
    const detailOptions = {
      method: "GET",
      url: `https://api.themoviedb.org/3/tv/${movieId}`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZmUxMGI4YTZiNmUxMTQ4MTFjMGNlZTU0YzQ4ZTA5NCIsInN1YiI6IjY2NDk1NTRiNDRlYjRmNmQwYTkyY2E5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uVXa_n6NgfHnh5OJaRU-fr4eeNBgib47eIpb1palLBU", // Replace YOUR_ACCESS_TOKEN with your actual access token
      },
    };

    const creditsOptions = {
      method: "GET",
      url: `https://api.themoviedb.org/3/tv/${movieId}/credits`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZmUxMGI4YTZiNmUxMTQ4MTFjMGNlZTU0YzQ4ZTA5NCIsInN1YiI6IjY2NDk1NTRiNDRlYjRmNmQwYTkyY2E5YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.uVXa_n6NgfHnh5OJaRU-fr4eeNBgib47eIpb1palLBU", // Replace YOUR_ACCESS_TOKEN with your actual access token
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
