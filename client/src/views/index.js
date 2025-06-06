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
/* Admin List View */
export { default as AdminList } from "./superAdmin/admins/AdminList";
/* Visitor List View */
export { default as VisitorList } from "./superAdmin/visitor/VisitorList";
/* Leads List View */
export { default as LeadsList } from "./superAdmin/leads/LeadsList";
/* Plan List View */
export { default as PlansList } from "./superAdmin/plan/PlansList";
export { default as PlanCreate } from "./superAdmin/plan/PlanCreate";
export { default as PlanUpdate } from "./superAdmin/plan/PlanUpdate";
/* Coupon List View */
export { default as CouponsList } from "./superAdmin/coupon/CouponsList";
export { default as CouponCreate } from "./superAdmin/coupon/CouponCreate";
export { default as CouponUpdate } from "./superAdmin/coupon/CouponUpdate";

/************************************************ Admin Views ************************************************************/
export { default as AdminDashboard } from "./admin/dashboard/AdminDashboard";
export { default as PatientManagement } from './admin/PatientManagement'
export { default as DoctorManagement } from './admin/DoctorManagement'
export { default as PhysicianProfileAdmin } from './admin/PhysicianProfileAdmin'
export { default as PatientProfileAdmin } from './admin/PatientProfileAdmin'
export { default as DeactivatedProfiles } from './admin/DeactivatedProfiles'
/************************************************ Member Views ************************************************************/
export { default as MemberDashboard } from './member/dashboard/MemberDashboard'

/************************************************ Patient Views ************************************************************/
export { default as PatientDashboard } from './patient/dashboard/PatientDashboard'

export { default as PatientFindDoctor } from './patient/PatientFindDoctor'

export { default as CategoryView } from './patient/CategoryView'

export { default as SpecialityDirectory } from './patient/SpecialityDirectory'

export { default as PhysicianProfile } from './patient/PhysicianProfile'

export { default as MyReviews } from './patient/MyReviews'

/************************************************** Doctor Views ************************************************************/
export { default as DoctorDashboard } from './doctor/dashboard/DoctorDashboard'

export { default as PatientReviews } from './doctor/PatientReviews'

export { default as ReviewDetails } from './doctor/ReviewDetails'

/************************************************ Member Views ************************************************************/

// export { default as PatientFindDoctor } from './patient/PatientFindDoctor'

/************************************************ Redirect View ************************************************************/
export { default as RandomPageRedirect } from './404'

/************************************************ Home Page ************************************************************/

export { default as HomePage } from './HomePage'


/************************************************ Common Pages ************************************************************/
export { default as AboutPage } from './AboutPage'
export { default as PrivacyPolicyPage } from './PrivacyPolicyPage'
export { default as ContactPage } from './ContactPage'
