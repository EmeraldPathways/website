import { createRoot, hydrateRoot } from "react-dom/client";
import "./globals.css";
import { routePages } from "./route-pages";

const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
const route = window.location.pathname.slice(basePath.length).replace(/\/$/, "") || "/";
const page = routePages.find((entry) => entry.path === route) ?? routePages[0];
const Page = page.Component;
const root = document.getElementById("root")!;

if (root.hasChildNodes()) hydrateRoot(root, <Page />);
else createRoot(root).render(<Page />);
