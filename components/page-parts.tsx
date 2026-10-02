export function PageHero({ title, tagline, tone }: { title: string; tagline: string; tone: string }) {
  return <section className={`hero page-hero ${tone}`} aria-labelledby="page-title"><div className="hero-inner"><h1 id="page-title">{title}</h1><p>{tagline}</p></div></section>;
}

export function QuoteCta() { return <div className="quote-wrap"><a className="quote-cta" href={`${import.meta.env.BASE_URL}contact/`}>Get a quote today</a></div>; }
