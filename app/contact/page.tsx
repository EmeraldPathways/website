import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { PageHero } from "@/components/page-parts";
import { ContactForm } from "@/components/contact-form";
import { publicAsset } from "@/lib/site-path";

export const metadata: Metadata = { title: "Contact", description: "Contact Emerald Pathways about your next web, social media, app or SEO project." };

export default function ContactPage() { return <SiteShell><main id="main-content">
  <PageHero title="contact" tagline="We would love to hear what you have to say" tone="tone-sage" />
  <div className="contact-shell"><ContactForm /><img className="map" loading="lazy" src={publicAsset("assets/contact_map.jpg")} alt="Map showing Emerald Pathways at 21 Riversdale Road, Clondalkin" /><a className="map-link" href="https://www.google.com/maps?q=21%20Riversdale%20Road%20Clondalkin%20Dublin" target="_blank" rel="noopener noreferrer">Open in Google Maps</a><div className="address">Emerald Pathways<br />21 Riversdale Road<br />D22 YR65</div></div>
</main></SiteShell>; }
