export const RoleBasedRedirect = (res, history) => {
  const intended = history.location.state;
  if (intended) {
    history.push(intended.from);
  } else {
    if (res.data.user.role === "admin") {
      history.push("/admin/dashboard");
    } else {
      history.push("/user/dashboard");
    }
  }
};
