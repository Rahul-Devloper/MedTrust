import api from "./index";

// Signup user to send verification email
export const signUp = async (name, email, password, nhsNumber, gmcNumber) => {
  return await api.post('/signup', {
    name,
    email,
    password,
    nhsNumber,
    gmcNumber,
  })
}

// Login user
export const login = async (email, password) => {
  return await api.post(
    "/login",
    {
      email,
      password,
    },
    {
      withCredentials: true,
      credentials: "include",
    }
  );
};

// Verify otp
export const verifyOtp = async (userId, otp) => {
  return await api.post(
    "/verifyOtp",
    {
      userId,
      otp
    },
    {
      withCredentials: true,
      credentials: "include",
    }
  );
};

// Google signup or login
export const googleCreateOrLogin = async (name, email) => {
  return await api.post(
    "/googleAuth",
    {
      name,
      email,
    },
    {
      withCredentials: true,
      credentials: "include",
    }
  );
};

// Activate user account
export const accountActivate = async (token) => {
  return await api.post("/account/activate", {
    token,
  });
};

// Send reset user password email
export const resetPassword = async (email) => {
  return await api.post("/password/reset", {
    email,
  });
};

// Set new password
export const newPassword = async (token, newPassword) => {
  return await api.post("/password/reset/verify", {
    token,
    newPassword,
  });
};

// Account resend verification
export const resendVerification = async (email) => {
  return await api.post("/account/reverify", {
    email,
  });
};

// Refresh access token
export const refreshAccessToken = async () => {
  return await api.post(
    "/refresh_token",
    {},
    {
      withCredentials: true,
      credentials: "include",
    }
  );
};

// Log out user
export const logout = async () => {
  return await api.post(
    "/logout",
    {},
    {
      withCredentials: true,
      credentials: "include",
    }
  );
};
