import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { PageHero, QuoteCta } from "@/components/page-parts";
import { publicAsset } from "@/lib/site-path";

export const metadata: Metadata = { title: "SEO", description: "SEO audits, competitive analysis and practical search training from Emerald Pathways." };

export default function SeoPage() { return <SiteShell><main id="main-content" className="seo-page">
  <PageHero title="seo" tagline="be found by the people that matter" tone="tone-deepteal" />
  <div className="content-shell"><section className="intro-copy"><p>Without great Search Engine Optimisation - SEO - your site will not be seen by the customers you want to attract.</p><p>Emerald Pathways uses SEO analytics to identify opportunities to improve your visibility on search engines. Our SEO audit pinpoints problem areas so we can develop a practical strategy with you.</p><p>We also provide SEO training to help you create professional content and understand how to improve its search performance.</p></section><QuoteCta />
  <section className="gallery-section seo-gallery"><h2 className="section-title">SEO Audits</h2><p className="section-subtitle">We implement a full SEO audit, identifying any weaknesses and also analysing your direct competition so you stay competitive and rank high on search engines results.</p><img className="seo-dashboard" src={publicAsset("assets/seo_dashboard_full.jpg")} alt="Complete SEO analytics dashboard" width={1255} height={687} loading="lazy" /><div className="seo-pair"><img src={publicAsset("assets/seo_score_full.jpg")} alt="Complete SEO audit score showing checks passed, warnings and failures" width={1547} height={704} loading="lazy" /><img src={publicAsset("assets/seo_keywords_full.jpg")} alt="Complete keyword cloud audit" width={1564} height={811} loading="lazy" /></div></section></div>
</main></SiteShell>; }
