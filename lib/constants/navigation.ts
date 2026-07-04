export type NavItem = {
  href: string;
  label: string;
  icon: string;
  filled?: boolean;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/editor", label: "Editor", icon: "movie_edit" },
  { href: "/scheduler", label: "Scheduler", icon: "calendar_month" },
  { href: "/comments", label: "Comments", icon: "forum" },
  { href: "/analytics", label: "Analytics", icon: "bar_chart" },
  { href: "/trends", label: "Trends", icon: "trending_up" },
];

export const USER_AVATAR =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuB8yv3lxeeE-h3tJqiglFUPNRRsSDs5PI3b56Jd8-HNwGCmFublJfhqmQykasALL4Aqi3LY7qVvtr5HuPi1sfz6W-Fc7J0e679ztqQoFycv47jIGfH6AZHVUmF6K_sqpO6cc2GBaaBrzwofdFNgNTFJpwQ8zmmWrpnEokeMzvQUsB4Wq1N5gJtMYLTIPJfDwgFqcOxj5DUkH0ZWEUzgt3m0oTkfNQfLXOgM-FYyjqsU1wJYsATM9hGVaw";
