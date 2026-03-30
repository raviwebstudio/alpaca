import type { AppRole } from "@/types";

export const AUTH_COOKIE_NAMES = {
  access: "alpaca_access",
  refresh: "alpaca_refresh",
} as const;

export const APP_ROLES: AppRole[] = ["CUSTOMER", "SELLER", "ADMIN"];

export function isAdminRole(role: AppRole) {
  return role === "ADMIN";
}

export function canAccessSellerArea(role: AppRole) {
  return role === "SELLER" || role === "ADMIN";
}

export function canAccessAccountArea(role: AppRole) {
  return APP_ROLES.includes(role);
}
