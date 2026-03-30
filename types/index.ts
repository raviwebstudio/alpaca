export type AppRole = "CUSTOMER" | "SELLER" | "ADMIN";

export type OrderStatus =
  | "PENDING"
  | "CONFIRMED"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED"
  | "RETURNED"
  | "REFUNDED";

export interface NavItem {
  label: string;
  href: string;
}

export interface SidebarNavItem extends NavItem {
  match?: string;
}
