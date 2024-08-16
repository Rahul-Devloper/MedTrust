import superAdmin from "./superAdmin";
import admin from "./admin";
import member from "./member";
import doctor from './doctor'
import patient from './patient'

const superAdminNav = [...superAdmin]
const adminNav = [...admin]
const memberNav = [...member]
const doctorNav = [...doctor]
const patientNav = [...patient]

export { superAdminNav, adminNav, memberNav, doctorNav, patientNav }
