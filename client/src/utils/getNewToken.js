import Cookies from "js-cookie";
import { refreshAccessToken } from "../api/auth";

export const getNewToken = () => {
  const accessToken = Cookies.get("access");
  const refreshToken = Cookies.get("refresh");

  // If refresh token is not present, stop here
  if (refreshToken === undefined && refreshToken === null) {
    return;
  }

  // If access token expired and refresh token is present, refresh the access token
  if (accessToken === undefined && refreshToken) {
    console.log("REFRESHING");
    // Get new access token
    refreshAccessToken(refreshToken)
      .then((res) => {
        // Set access token cookie
        Cookies.set("access", res.data.accessToken, { expires: 0.0104167 });
        return;
      })
      .catch((err) => {
        console.log("ERROR_GETTING_NEW_TOKEN", err);
      });
  }
};
