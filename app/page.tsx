import { SiteShell } from "@/components/site-shell";

const services = [
  ["web design", "/web-design", "sage"],
  ["social media", "/social-media", "bluegrey"],
  ["apps", "/apps", "forest"],
  ["seo", "/seo", "deepteal"],
];

export default function Home() {
  return <SiteShell><main id="main-content">
    <section className="hero hero-home" aria-labelledby="home-title"><div className="hero-inner"><h1 id="home-title">Emerald Pathways</h1><p>We connect you to the world</p></div></section>
    <section className="home-services" aria-label="Our services">
      {services.map(([label, href, tone]) => <a className={`home-service ${tone}`} href={`${import.meta.env.BASE_URL}${href.replace(/^\//, "")}/`} key={href}>{label}</a>)}
    </section>
    <div className="home-spacer" />
  </main></SiteShell>;
}
