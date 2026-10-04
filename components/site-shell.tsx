"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { ArrowUp, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [["web design", "/web-design"], ["social media", "/social-media"], ["apps", "/apps"], ["seo", "/seo"], ["contact", "/contact"]];
const cookieChangeEvent = "ep-cookie-choice";

function subscribeToCookieChoice(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(cookieChangeEvent, onChange);
  return () => { window.removeEventListener("storage", onChange); window.removeEventListener(cookieChangeEvent, onChange); };
}

function getCookieNoticeVisible() { return !window.localStorage.getItem("epCookieChoice"); }
function getServerCookieNoticeVisible() { return false; }

function MailIcon({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return <svg viewBox="0 0 30 24" aria-hidden={ariaHidden} focusable="false"><path d="M15 13 7.1 7.1c0-.5.4-1 1-1h13.8c.5 0 1 .4 1 1L15 13Zm0 1.8 7.9-5.9V17c0 .5-.4 1-1 1H8.1c-.5 0-1-.4-1-1V8.8l7.9 6Z" /></svg>;
}

export function SiteShell({ children }: { children: React.ReactNode }) {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
  const pathname = typeof window === "undefined"
    ? "/"
    : window.location.pathname.slice(basePath.length).replace(/\/$/, "") || "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const cookieVisible = useSyncExternalStore(subscribeToCookieChoice, getCookieNoticeVisible, getServerCookieNoticeVisible);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const showBackTop = true;
  const closeMenu = useCallback(() => { setMenuOpen(false); menuButtonRef.current?.focus(); }, []);

  useEffect(() => { document.body.style.overflow = menuOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [menuOpen]);
  useEffect(() => {
    if (!menuOpen) return;
    const panel = menuPanelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>("button, a[href]");
    focusable?.[0]?.focus();
    function keepFocusInMenu(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }
      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
    panel?.addEventListener("keydown", keepFocusInMenu);
    return () => panel?.removeEventListener("keydown", keepFocusInMenu);
  }, [menuOpen, closeMenu]);

  function chooseCookies(choice: "accepted" | "declined" | "closed") { window.localStorage.setItem("epCookieChoice", choice); window.dispatchEvent(new Event(cookieChangeEvent)); }

  return <div id="top" className={`site-root${cookieVisible ? " has-cookie-banner" : ""}`}>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <header className="site-header"><div className="header-inner">
      <nav className="desktop-nav" aria-label="Primary navigation">{navigation.map(([label, href]) => <a aria-current={pathname === href ? "page" : undefined} className={pathname === href ? "active" : ""} href={`${import.meta.env.BASE_URL}${href.replace(/^\//, "")}/`} key={href}>{label}</a>)}</nav>
      <a className="brand" href={import.meta.env.BASE_URL} aria-label="Emerald Pathways home">Emerald Pathways</a>
      <a className="mail-link" href="mailto:goemeraldpathways@gmail.com" aria-label="Email Emerald Pathways"><MailIcon /></a>
      <Button ref={menuButtonRef} className="menu-button" variant="ghost" size="icon" onClick={() => setMenuOpen(true)} aria-expanded={menuOpen} aria-controls="mobile-navigation" aria-label="Open menu"><Menu /></Button>
    </div></header>
    <div ref={menuPanelRef} className={`mobile-menu ${menuOpen ? "open" : ""}`} id="mobile-navigation" role="dialog" aria-modal={menuOpen || undefined} aria-label="Site navigation" aria-hidden={!menuOpen}>
      <Button className="menu-close" variant="ghost" size="icon" onClick={closeMenu} aria-label="Close menu"><X /></Button>
      <nav aria-label="Mobile navigation">{navigation.map(([label, href]) => <a aria-current={pathname === href ? "page" : undefined} className={pathname === href ? "active" : ""} href={`${import.meta.env.BASE_URL}${href.replace(/^\//, "")}/`} key={href}>{label}</a>)}</nav>
    </div>
    {children}
    <footer className="footer"><a className="footer-mail" href="mailto:goemeraldpathways@gmail.com" aria-label="Email Emerald Pathways"><MailIcon ariaHidden /></a><p>Emerald Pathways - 21 Riversdale Road - D22 YR65 || Registered Business No: 557845 || Emerald Pathways {new Date().getFullYear()}</p></footer>
    {showBackTop && <a className="back-top" href="#top" aria-label="Back to top"><ArrowUp size={25} /></a>}
    {cookieVisible && <aside className="cookie-banner" aria-label="Cookie notice"><p>This site uses cookies to improve user experience.</p><div className="cookie-actions"><Button onClick={() => chooseCookies("accepted")}>Accept</Button><Button variant="outline" onClick={() => chooseCookies("declined")}>Decline</Button></div><Button className="cookie-close" variant="ghost" onClick={() => chooseCookies("closed")} aria-label="Close cookie notice"><X /></Button></aside>}
  </div>;
}
