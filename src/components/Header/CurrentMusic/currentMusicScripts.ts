import querystring from "querystring";

const NOW_PLAYING_ENDPOINT =
  "https://api.spotify.com/v1/me/player/currently-playing";
const TOKEN_ENDPOINT = "https://accounts.spotify.com/api/token";

const client_id = "79880f92ef7540ba86b609ec1f233108";
const client_secret = "84defb61c8024c3c87ceb38db2146c0e";
const refresh_token =
  "AQAkNvqzFJLRPB6h_FaVbHJOi71Y97KoNhRyYndMrfDXxdCS5RrH-caXzDwt4jTdh_O3MbO1a8mufv6PvHlltznI3hK64TQMQOOnxjI7vteXqK3D8H33AbDQ0_ju485tTj0";

//Function to generate an access token using the refresh token everytime the website is opened or refreshed
export const getAccessToken = async (
  client_id: string,
  client_secret: string,
  refresh_token: string
) => {
  //Creates a base64 code of client_id:client_secret as required by the API
  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

  //The response will contain the access token
  const response = await fetch(TOKEN_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });

  return response.json();
};

//Uses the access token to fetch the currently playing song
export const getNowPlaying = async () => {
  try {
    //Generating an access token
    const { access_token } = await getAccessToken(
      client_id,
      client_secret,
      refresh_token
    );

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.status > 400) {
      throw new Error("Unable to Fetch Song");
    } else if (response.status === 204) {
      throw new Error("Currently Not Playing");
    }

    const song = await response.json();
    const albumImageUrl = song.item.album.images[0].url;
    const artist = song.item.artists
      .map((artist: any) => artist.name)
      .join(", ");
    const isPlaying = song.is_playing;
    const songUrl = song.item.external_urls.spotify;
    const title = song.item.name;
    const timePlayed = song.progress_ms;
    const timeTotal = song.item.duration_ms;
    const artistUrl = song.item.album.artists[0].external_urls.spotify;

    return {
      albumImageUrl,
      artist,
      isPlaying,
      songUrl,
      title,
      timePlayed,
      timeTotal,
      artistUrl,
    };
  } catch (error: any) {
    console.error("Error fetching currently playing song: ", error);
    return error.message.toString();
  }
};