import { jwtDecode } from "jwt-decode";
const assignRole = (userRole) => {
  if (userRole.includes("ADMIN")) {
    return "isAdmin";
  } else if (userRole.includes("STAFF")) {
    return "isStaff";
  } else if (userRole.includes("TOUR GUIDE")) {
    return "isTourGuide";
  } else if (
    !userRole.includes("ADMIN") &&
    !userRole.includes("STAFF") &&
    !userRole.includes("TOUR GUIDE")
  ) {
    return "isCustomer";
  }
};

export const decode = (token) => {
  const decoded = jwtDecode(token);
  const role =
    decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  const roleName = assignRole(role);
  debugger;

  return {
    accountId: decoded.AccountId,
    expire: decoded.exp,
    role: roleName,
  };
};
