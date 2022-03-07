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

/************************************************ Super Admin Views ************************************************************/
export { default as SuperAdminDashboard } from "./superAdmin/dashboard/SuperAdminDashboard";
/* Admins View */
export { default as AdminList } from "./superAdmin/admins/AdminList";
/* Visitor View */
export { default as VisitorList } from "./superAdmin/visitor/VisitorList";
/* Leads View */
export { default as LeadsList } from "./superAdmin/leads/LeadsList";
/* Plan View */
export { default as PlansList } from "./superAdmin/plan/PlansList";
export { default as PlanCreate } from "./superAdmin/plan/PlanCreate";
export { default as PlanUpdate } from "./superAdmin/plan/PlanUpdate";
/* Coupon View */
export { default as CouponsList } from "./superAdmin/coupon/CouponsList";
export { default as CouponCreate } from "./superAdmin/coupon/CouponCreate";
export { default as CouponUpdate } from "./superAdmin/coupon/CouponUpdate";

// Admin views
export { default as AdminDashboard } from "./admin/dashboard/AdminDashboard";

// Member views
export { default as MemberDashboard } from "./member/dashboard/MemberDashboard";

// Random Redirect
export { default as RandomPageRedirect } from "./404";
