/**
 * Authorization Roles
 */
const authRoles = {
  admin: ['admin', 'Authenticated'],
  staff: ['admin', 'staff'],
  user: ['admin', 'staff', 'user'],
  onlyGuest: [],
};

export default authRoles;
