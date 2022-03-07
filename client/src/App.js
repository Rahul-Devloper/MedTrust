import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
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
  // Admin Routes
  AdminDashboard,
  // Member Routes
  MemberDashboard,
  // -------------- Wildcard --------------
  RandomPageRedirect,
} from "./views";
import {
  MemberRoute,
  AdminRoute,
  SuperAdminRoute,
  ProfileRoute,
} from "./routes";
import { refreshTokenAction } from "./redux/actions/authActions";
import "./App.scss";

const App = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);
  const [spinner, setSpinner] = useState(true);

  // If loading the app, we need to check if the user is already logged in
  useEffect(() => {
    setTimeout(() => setSpinner(false), 2000);
  }, []);

  // Update access token on every refresh
  useEffect(() => {
    dispatch(refreshTokenAction());
  }, [dispatch]);

  // If user exists and is on the index page, redirect to dashboard
  useEffect(() => {
    if (
      user?.role &&
      (history.location.pathname === "/" ||
        history.location.pathname === "/signup" ||
        history.location.pathname === "/login")
    ) {
      if (user.role === "superadmin") {
        history.push("/super-admin/dashboard");
      } else if (user.role === "admin") {
        history.push("/admin/dashboard");
      } else if (user.role === "member") {
        history.push("/member/dashboard");
      }
    }
  }, [user, history]);

  return !spinner ? (
    <div className="App">
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
  ) : (
    <div className="boxes">
      <div className="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="box">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default App;
