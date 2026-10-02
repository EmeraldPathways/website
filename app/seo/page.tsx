import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";
import { PageHero, QuoteCta } from "@/components/page-parts";
import { publicAsset } from "@/lib/site-path";

export const metadata: Metadata = { title: "SEO", description: "SEO audits, competitive analysis and practical search training from Emerald Pathways." };

export default function SeoPage() { return <SiteShell><main id="main-content" className="seo-page">
  <PageHero title="seo" tagline="be found by the people that matter" tone="tone-deepteal" />
  <div className="content-shell"><section className="intro-copy"><p>Without great Search Engine Optimisation - SEO - your site will not be seen by the customers you want to attract.</p><p>Emerald Pathways uses the latest SEO analytic software to guarantee your website higher placement on the major search engines and in front of the eyes of customers you want to reach. Our SEO audit will pinpoint the problem areas and then we will develop a strategy with you to improve overall SEO functioning.</p><p>We provide SEO training that guarantees to provide you with the skills to post content that is professional and will rank in your chosen category.</p></section><QuoteCta />
  <section className="gallery-section seo-gallery"><h2 className="section-title">SEO Audits</h2><p className="section-subtitle">We implement a full SEO audit, identifying any weaknesses and also analysing your direct competition so you stay competitive and rank high on search engines results.</p><img className="seo-dashboard" src={publicAsset("assets/seo_dashboard.png")} alt="SEO analytics dashboard" /><div className="seo-pair"><img className="seo-lower-wide" src={publicAsset("assets/seo_lower_pair.png")} alt="SEO score and keyword audit examples" /><img className="seo-lower-mobile seo-score-mobile" src={publicAsset("assets/seo_score.jpg")} alt="SEO score audit" /><img className="seo-lower-mobile seo-keywords-mobile" src={publicAsset("assets/seo_keywords.jpg")} alt="Keywords cloud test" /></div></section></div>
</main></SiteShell>; }
