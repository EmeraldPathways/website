import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { PageHero } from "@/components/page-parts";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = { title: "Contact", description: "Contact Emerald Pathways about your next web, social media, app or SEO project." };

export default function ContactPage() { return <SiteShell><main id="main-content">
  <PageHero title="contact" tagline="We would love to hear what you have to say" tone="tone-sage" />
  <div className="contact-shell"><ContactForm /><iframe className="map" title="Emerald Pathways location" loading="lazy" src="https://www.google.com/maps?q=21%20Riversdale%20Road%20Clondalkin%20Dublin&output=embed" /><div className="address">Emerald Pathways<br />21 Riversdale Road<br />D22 YR65</div></div>
</main></SiteShell>; }
