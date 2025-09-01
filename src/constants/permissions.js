export const ROLES = {
    ADMIN: 'ADMIN',
    RESEARCHER: 'RESEARCHER', 
    REGULAR: 'REGULAR'
};

export const PERMISSIONS = {
    ACCESS_MAP: '/app/map',
    VIEW_DASHBOARD: '/app/dashboard',
    MANAGE_SIMULATIONS: '/app/tree-simulations',
    MANAGE_HEALTH_SIMULATIONS: '/app/helth-simulations',
    VIEW_ADMIN_PANEL: '/app/management',
    PROFILE_SETTINGS: '/app/profile-settings',
    HEALTH_SIMULATIONS: '/app/health-simulations'
};

export const rolePermissions = {
  [ROLES.ADMIN]: [
    PERMISSIONS.ACCESS_MAP,
    PERMISSIONS.MANAGE_SIMULATIONS,
    PERMISSIONS.HEALTH_SIMULATIONS,
    PERMISSIONS.MANAGE_HEALTH_SIMULATIONS,
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.VIEW_ADMIN_PANEL
  ],
  [ROLES.RESEARCHER]: [
    PERMISSIONS.ACCESS_MAP,
    PERMISSIONS.MANAGE_SIMULATIONS,
    PERMISSIONS.HEALTH_SIMULATIONS,
    PERMISSIONS.MANAGE_HEALTH_SIMULATIONS,
    PERMISSIONS.VIEW_DASHBOARD,
    PERMISSIONS.PROFILE_SETTINGS
  ],
  [ROLES.REGULAR]: [
    PERMISSIONS.ACCESS_MAP,
    PERMISSIONS.PROFILE_SETTINGS
  ]
};

export const hasPermission = (userRole, permission) => {
  if (!userRole || !rolePermissions[userRole]) {
    return false;
  }
  return rolePermissions[userRole].includes(permission);
};