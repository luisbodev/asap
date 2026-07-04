export type AutoReplyTrigger = {
  id: string;
  name: string;
  lastFired: string;
  condition: string;
  reply: string;
  borderColor: "secondary" | "primary" | "tertiary";
  enabled: boolean;
  shimmer?: boolean;
};

export type PendingComment = {
  id: string;
  username: string;
  avatar: string;
  time: string;
  comment: string;
  suggestedReply: string;
  accentColor: "primary" | "secondary";
};

export const COMMENT_STATS = [
  { label: "Total Comments", value: "12,482", meta: "+12% this week", icon: "trending_up", color: "text-on-background" },
  { label: "AI Auto-Replies", value: "8,291", meta: "66% automation rate", icon: "bolt", color: "text-primary" },
  { label: "Sentiment Score", value: "94%", meta: "Exceptional", icon: "sentiment_satisfied", color: "text-secondary" },
  { label: "Time Saved", value: "42h", meta: "vs manual replies", icon: "timer", color: "text-tertiary" },
];

export const AUTO_REPLY_TRIGGERS: AutoReplyTrigger[] = [
  {
    id: "link-request",
    name: "Link Request",
    lastFired: "Last fired: 12m ago",
    condition: "If user asks for tool, website, or link",
    reply:
      "Hey! You can find the full suite here: https://asap.ai/pro. Let me know if you have questions!",
    borderColor: "secondary",
    enabled: true,
    shimmer: true,
  },
  {
    id: "price-inquiry",
    name: "Price Inquiry",
    lastFired: "Last fired: 2h ago",
    condition: "If user mentions cost, price, or subscription",
    reply:
      "Our Pro Plan starts at $29/mo, including all AI automation features. Check our pricing page for detail!",
    borderColor: "primary",
    enabled: true,
  },
  {
    id: "feature-request",
    name: "Feature Request",
    lastFired: "Active but never fired",
    condition: "If user suggests new tools or features",
    reply:
      "That's an awesome idea! I'll pass this straight to our dev team. Thanks for helping us grow! 🚀",
    borderColor: "tertiary",
    enabled: false,
  },
];

export const PENDING_COMMENTS: PendingComment[] = [
  {
    id: "1",
    username: "@AlexCreate",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAqWjP9zUiJE1MDiBHPOUoEu1XIfY9E7k0nVVpf-fvKWKPWjs80wMnV3vG84QvyKqRMrSmXeDq57lGuMkJN65v2EBa4m7P7_5v7-6HvB8v6jLAQMHkmkwkRebOyVo89huXA7r_5O3Ob75fZtzNJM5duQ6jFIYtxrEhJMDbxxIdIJyjmNsmIwMPkO30qlpQmmsY3elj8L71RgHZHrxXPtsG1JqN2xOao1jXTLdi-5yGmFk1IWfTlYTiS8A",
    time: "4m ago",
    comment: "This editor is insanely fast! Does it also support 4K exports?",
    suggestedReply: "Absolutely! 4K exports are available on all Pro plans. ⚡️",
    accentColor: "primary",
  },
  {
    id: "2",
    username: "@SarahGrowth",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuClegGInF5YpE7Va8JSgU3JwJN8jnpne6KRrq9f_dIcIccniFdMvAO0cIKGe9NaaLlrq8yL5QOabFosAagCsIJPieSUWUyubW2K0iGJ25NYkxBDfFHrwNwgLRFL8NpPZMt0jrxf-f_AZNYqekB4wzhXBBT1S4yR6VPbgSE0c9AgQRDIx980ctpAajmp92JaGIwQ6xeYX4kf_TA-Dd3bLHAYHB7gA--5-IUmunjXay6KmPmGvXLPasKRyA",
    time: "18m ago",
    comment:
      "Looking for an alternative to Premiere. How's the learning curve here?",
    suggestedReply:
      "We designed ASAP to be zero-learning-curve. Most users generate their first video in < 2 mins!",
    accentColor: "secondary",
  },
];

export const ENGAGEMENT_BARS = [40, 60, 55, 85, 45, 70, 95];
