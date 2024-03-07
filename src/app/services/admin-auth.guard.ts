import { CanActivateFn } from '@angular/router';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  if (sessionStorage.getItem("Admin") === "true") {
    return true;
  } else {
    return false;
  }
};
