/************************************************ Common views ************************************************************/
export { default as Login } from "./auth/login/Login";
export { default as Signup } from "./auth/signup/Signup";
export { default as AccountActivation } from "./auth/accountActivation/AccountActivation";
export { default as ForgotPassword } from "./auth/forgotPassword/ForgotPassword";
export { default as NewPassword } from "./auth/newPassword/NewPassword";
export { default as Terms } from "./auth/terms/Terms";
export { default as Privacy } from "./auth/privacy/Privacy";

// SuperAdmin views
export { default as SuperAdminDashboard } from "./superAdmin/dashboard/SuperAdminDashboard";

// Admin views
export { default as AdminDashboard } from "./admin/dashboard/AdminDashboard";

// Member views
export { default as MemberDashboard } from "./member/dashboard/MemberDashboard";

// Random Redirect
export { default as RandomPageRedirect } from "./404";
