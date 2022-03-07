/************************************************ Common views ************************************************************/
export { default as Login } from "./auth/login/Login";
export { default as Signup } from "./auth/signup/Signup";
export { default as AccountActivation } from "./auth/accountActivation/AccountActivation";
export { default as ForgotPassword } from "./auth/forgotPassword/ForgotPassword";
export { default as NewPassword } from "./auth/newPassword/NewPassword";
export { default as Terms } from "./auth/terms/Terms";
export { default as Privacy } from "./auth/privacy/Privacy";

/************************************************ Profile views ************************************************************/
export { default as MyProfile } from "./profile/MyProfile";
export { default as MySubscription } from "./profile/MySubscription";
export { default as MySecurity } from "./profile/MySecurity";
export { default as MyPassword } from "./profile/MyPassword";

// SuperAdmin views
export { default as SuperAdminDashboard } from "./superAdmin/dashboard/SuperAdminDashboard";

// Admin views
export { default as AdminDashboard } from "./admin/dashboard/AdminDashboard";

// Member views
export { default as MemberDashboard } from "./member/dashboard/MemberDashboard";

// Random Redirect
export { default as RandomPageRedirect } from "./404";
