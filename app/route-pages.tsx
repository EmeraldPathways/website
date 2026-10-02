import HomePage from "./page";
import AppsPage from "./apps/page";
import ContactPage from "./contact/page";
import SeoPage from "./seo/page";
import SocialMediaPage from "./social-media/page";
import WebDesignPage from "./web-design/page";

export const routePages = [
  { path: "/", Component: HomePage },
  { path: "/web-design", Component: WebDesignPage },
  { path: "/social-media", Component: SocialMediaPage },
  { path: "/apps", Component: AppsPage },
  { path: "/seo", Component: SeoPage },
  { path: "/contact", Component: ContactPage },
];
