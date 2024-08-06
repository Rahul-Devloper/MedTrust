export const RoleBasedRedirect = (res, history) => {
  const intended = history.location.state
  if (intended) {
    history.push(intended.from)
  } else {
    if (!res.data.user) {
      window.location.href = '/'
    } else if (res.data.user.role === 'superadmin') {
      window.location.href = '/super-admin/dashboard'
    } else if (res.data.user.role === 'admin') {
      window.location.href = '/admin/dashboard'
    } else if (res.data.user.role === 'member') {
      window.location.href = '/member/dashboard'
    } else if (res.data.user.role === 'patient') {
      window.location.href = '/patient/dashboard'
    } else if (res.data.user.role === 'doctor') {
      window.location.href = '/doctor/dashboard'
    }
  }
}

export const RoleBasedRedirectWithUser = (user, history) => {
  const intended = history.location.state
  if (intended) {
    history.push(intended.from)
  } else {
    if (!user) {
      window.location.href = '/'
    } else if (user.role === 'superadmin') {
      window.location.href = '/super-admin/dashboard'
    } else if (user.role === 'admin') {
      window.location.href = '/admin/dashboard'
    } else if (user.role === 'member') {
      window.location.href = '/member/dashboard'
    } else if (user.role === 'patient') {
      window.location.href = '/patient/dashboard'
    } else if (user.role === 'doctor') {
      window.location.href = '/doctor/dashboard'
    }
  }
}

export const redirectToDashboard = (user) => {
  if (user?.role === 'superadmin') {
    return '/super-admin/dashboard'
  } else if (user?.role === 'admin') {
    return '/admin/dashboard'
  } else if (user?.role === 'member') {
    return '/member/dashboard'
  } else if (user?.role === 'patient') {
    return '/patient/dashboard'
  } else if (user?.role === 'doctor') {
    return '/doctor/dashboard'
  }
}

export const RedirectOnLogout = (res) => {
  if (!res.data.user) {
    window.location.href = '/'
  } else if (res.data.user?.role === 'superadmin') {
    window.location.href = '/super-admin/dashboard'
  } else if (res.data.user?.role === 'admin') {
    window.location.href = '/admin/chatbots'
  } else if (res.data.user?.role === 'member') {
    window.location.href = '/member/dashboard'
  } else if (res.data.user?.role === 'patient') {
    window.location.href = '/patient/dashboard'
  } else if (res.data.user?.role === 'doctor') {
    window.location.href = '/doctor/dashboard'
  }
}
