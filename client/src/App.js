import React, { Suspense, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import {
  MemberRoute,
  AdminRoute,
  SuperAdminRoute,
  ProfileRoute,
} from "./routes";
import { isUserAction } from "./redux/actions/authActions";

import {
  // -------------- Auth views --------------
  Signup,
  AccountActivation,
  Login,
  ForgotPassword,
  NewPassword,
  Terms,
  Privacy,
  // -------------- Profile Views --------------
  // Profile
  MyProfile,
  MySubscription,
  MySecurity,
  MyPassword,
  // -------------- Super Admin views --------------
  SuperAdminDashboard,
  // Admins
  AdminList,
  // Visitors
  VisitorList,
  // Leads
  LeadsList,
  // Plans
  PlansList,
  PlanCreate,
  PlanUpdate,
  // Coupons
  CouponsList,
  CouponCreate,
  CouponUpdate,
  // -------------- Admin views --------------
  AdminDashboard,
  // -------------- Member views --------------
  MemberDashboard,
  // -------------- Wildcard --------------
  RandomPageRedirect,
} from "./views";

import "./App.scss";

const App = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  // If local storage "allgin" is true and is on the auth pages page, redirect to dashboard
  useEffect(() => {
    if (
      localStorage.getItem("allgin") === "true" &&
      (history.location.pathname === "/" ||
        history.location.pathname === "/signup" ||
        history.location.pathname === "/login")
    ) {
      // Dispatch the user action
      dispatch(isUserAction({ history }));
    }
  }, [dispatch, history]);

  return (
    <div className="App">
      <Suspense
        fallback={
          <>
            <div class="loader">
              <div class="bar1"></div>
              <div class="bar2"></div>
              <div class="bar3"></div>
              <div class="bar4"></div>
              <div class="bar5"></div>
              <div class="bar6"></div>
            </div>
          </>
        }
      ></Suspense>
      <Switch>
        {/*************** Common Routes ***************/}
        <Route exact path="/" component={!user && Login} />
        <Route exact path="/login" component={!user && Login} />
        <Route exact path="/signup" component={!user && Signup} />
        <Route
          exact
          path="/account/activate"
          component={!user && AccountActivation}
        />
        <Route
          exact
          path="/forgot-password"
          component={!user && ForgotPassword}
        />
        <Route exact path="/new-password" component={!user && NewPassword} />
        <Route exact path="/privacy" component={!user && Privacy} />
        <Route exact path="/terms" component={!user && Terms} />
        {/*************** Super Admin Routes ***************/}
        <SuperAdminRoute
          exact
          path="/super-admin/dashboard"
          component={SuperAdminDashboard}
        />
        {/* Admins */}
        <SuperAdminRoute
          exact
          path="/super-admin/admins"
          component={AdminList}
        />
        {/* Visitors */}
        <SuperAdminRoute
          exact
          path="/super-admin/visitors"
          component={VisitorList}
        />
        {/* Leads */}
        <SuperAdminRoute
          exact
          path="/super-admin/leads"
          component={LeadsList}
        />
        {/* Plans */}
        <SuperAdminRoute
          exact
          path="/super-admin/plans"
          component={PlansList}
        />
        <SuperAdminRoute
          exact
          path="/super-admin/plans/create"
          component={PlanCreate}
        />
        <SuperAdminRoute
          exact
          path="/super-admin/plans/update/:id"
          component={PlanUpdate}
        />
        {/* Coupons */}
        <SuperAdminRoute
          exact
          path="/super-admin/coupons"
          component={CouponsList}
        />
        <SuperAdminRoute
          exact
          path="/super-admin/coupons/create"
          component={CouponCreate}
        />
        <SuperAdminRoute
          exact
          path="/super-admin/coupons/update/:id"
          component={CouponUpdate}
        />

        {/**************** Admin Routes ****************/}
        <AdminRoute exact path="/admin/dashboard" component={AdminDashboard} />

        {/**************** Member Routes ****************/}
        <MemberRoute
          exact
          path="/member/dashboard"
          component={MemberDashboard}
        />

        {/*************** Profile Routes ***************/}
        <ProfileRoute exact path="/profile/information" component={MyProfile} />
        <ProfileRoute
          exact
          path="/profile/subscription"
          component={MySubscription}
        />
        <ProfileRoute exact path="/profile/security" component={MySecurity} />
        <ProfileRoute exact path="/profile/password" component={MyPassword} />

        {/* Wildcard */}
        <Route path={"*"} component={RandomPageRedirect} />
      </Switch>
    </div>
  );
};

export default App;
