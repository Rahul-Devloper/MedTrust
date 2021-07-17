import Cookies from "js-cookie";
import { refreshAccessToken } from "../api/auth";

export const getNewToken = () => {
  const accessToken = Cookies.get("access");
  // Check if refresh token is valid
  const refreshToken = Cookies.get("refresh");
  if (refreshToken === undefined && refreshToken === null) {
    return;
  }

  // Check if access token is invalid
  if (accessToken === undefined && refreshToken) {
    console.log("REFRESHIIINNG");
    // Get new access token
    refreshAccessToken(refreshToken)
      .then((res) => {
        // Set access token cookie
        Cookies.set("access", res.data.accessToken, { expires: 0.000231481 });
        return;
      })
      .catch((err) => {
        console.log("ERROR_GETTING_NEW_TOKEN", err);
      });
  }
};
