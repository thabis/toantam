
export const checkRoleUser = (roles) => {
  if (roles && roles.length > 0) {
    switch (roles[0].name) {
      case 'Designer': {
        return 'designer';
      }
      case 'Saler': {
        return 'saler';
      }
      case 'Admin': {
        return 'saler';
      }
      case 'Printer': {
        return 'printer';
      }
      case 'Store': {
        return 'store';
      }
      case 'Deliver': {
        return 'deliver';
      }
      default: {
        return false;
      }
    }
  }
  return false;
};
