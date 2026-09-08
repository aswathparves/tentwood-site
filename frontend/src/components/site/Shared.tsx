import { useCallback, useEffect, useLayoutEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowUpRight, Check, ChevronDown, ChevronRight, Clock3, Filter, Menu, MessageCircle, Search, X } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { allDestinations } from "@/data/destinations";
import { journeys } from "@/data/journeys";
import { TENTWOOD_CONTACT, whatsappUrl } from "@/lib/whatsapp";
import type { Destination, Journey } from "@/data/types";

if (typeof window !== "undefined") window.history.scrollRestoration = "manual";

const FOOTER_EXPLORE_LINKS: [string, string][] = [["International destinations", "/destinations"], ["Domestic destinations", "/destinations"], ["Visa-free escapes", "/destinations"], ["Traveller stories", "/#stories"]];
const FOOTER_TENTWOOD_LINKS: [string, string][] = [["Our story", "/about"], ["Contact us", "/contact"], ["Careers", "/careers"], ["FAQ", "/faq"]];
const FILTER_GROUPS = { Destination: ["All Destinations", ...Array.from(new Set(journeys.map((journey) => journey.destination)))], Budget: ["All budgets", "Under ₹50K", "₹50K–₹1.5L", "₹1.5L–₹2.5L", "Luxury"], "Travel type": ["All travellers", "Solo", "Couple", "Family", "Friends"], Duration: ["Any duration", "3–5 Days", "6–9 Days", "10+ Days"] };

function upsertMeta(name: string, content: string, attribute: "name" | "property" = "name") {
  let tag = document.querySelector(`meta[${attribute}="${name}"]`);
  if (!tag) {
    tag = document.createElement("meta");
    tag.setAttribute(attribute, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute("content", content);
}

function upsertCanonical(url: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = url;
}

function applySeoMetadata(title: string, description: string) {
  const pageTitle = `${title} | Tentwood Trips`;
  const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
  document.title = pageTitle;
  upsertMeta("description", description);
  upsertMeta("og:title", pageTitle, "property");
  upsertMeta("og:description", description, "property");
  upsertMeta("og:type", "website", "property");
  upsertMeta("og:url", canonicalUrl, "property");
  upsertCanonical(canonicalUrl);
}

function resetDocumentScroll() {
  document.documentElement.style.scrollBehavior = "auto";
  document.body.style.scrollBehavior = "auto";
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
}

function handleInternalRouteClick(event: MouseEvent) {
  if (!(event.target instanceof Element)) return;
  const link = event.target.closest("a");
  const href = link?.getAttribute("href");
  if (!href || href.startsWith("#") || href.includes("#") || href.startsWith("http") || link?.target === "_blank") return;
  resetDocumentScroll();
  window.requestAnimationFrame(resetDocumentScroll);
  window.setTimeout(resetDocumentScroll, 0);
  window.setTimeout(resetDocumentScroll, 100);
}

function installRouteScrollReset(hash: string) {
  window.history.scrollRestoration = "manual";
  if (hash) return undefined;
  resetDocumentScroll();
  const frame = window.requestAnimationFrame(resetDocumentScroll);
  const timer = window.setTimeout(resetDocumentScroll, 180);
  document.addEventListener("click", handleInternalRouteClick, true);
  return () => {
    window.cancelAnimationFrame(frame);
    window.clearTimeout(timer);
    document.removeEventListener("click", handleInternalRouteClick, true);
  };
}

export function Seo({ title, description }: { title: string; description: string }) {
  useEffect(() => applySeoMetadata(title, description), [description, title]);
  return null;
}

function useScrolledHeader() {
  const [scrolled, setScrolled] = useState(false);
  const updateScrolled = useCallback(() => setScrolled(window.scrollY > 24), []);
  useEffect(() => {
    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });
    return () => window.removeEventListener("scroll", updateScrolled);
  }, [updateScrolled]);
  return scrolled;
}

export function Navbar() {
  const scrolled = useScrolledHeader();
  const [menuOpen, setMenuOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const megaCloseTimer = useRef<number | null>(null);
  const { pathname } = useLocation();
  const clearMegaCloseTimer = useCallback(() => { if (megaCloseTimer.current !== null) window.clearTimeout(megaCloseTimer.current); }, []);
  const closeMobileMenu = useCallback(() => setMenuOpen(false), []);
  const closeMegaImmediately = useCallback(() => { clearMegaCloseTimer(); setMegaOpen(false); }, [clearMegaCloseTimer]);
  const openMegaMenu = useCallback(() => { clearMegaCloseTimer(); setMegaOpen(true); }, [clearMegaCloseTimer]);
  const closeMegaMenu = useCallback(() => { clearMegaCloseTimer(); megaCloseTimer.current = window.setTimeout(() => setMegaOpen(false), 180); }, [clearMegaCloseTimer]);
  useEffect(() => closeMobileMenu(), [closeMobileMenu, pathname]);
  useEffect(() => clearMegaCloseTimer, [clearMegaCloseTimer]);
  return <>
    <header className={cn("fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0b6972]/96 text-white shadow-[0_8px_28px_rgba(7,40,43,0.16)] backdrop-blur-md transition-[background-color,border-color,box-shadow,backdrop-filter] duration-500 lg:shadow-none", scrolled ? "lg:border-white/10 lg:bg-[#0b6972]/95 lg:shadow-[0_12px_40px_rgba(7,40,43,0.18)] lg:backdrop-blur-md" : "lg:border-transparent lg:bg-gradient-to-b lg:from-black/35 lg:to-transparent lg:backdrop-blur-none")} data-testid="site-navbar">
      <div className={cn("mx-auto flex h-16 max-w-[1440px] items-center justify-between px-4 transition-[height] duration-500 sm:px-8 lg:px-12", scrolled ? "lg:h-16" : "lg:h-20")}><NavbarBrand /><DesktopNavigation megaOpen={megaOpen} onMegaOpen={openMegaMenu} onMegaClose={closeMegaMenu} onMegaNavigate={closeMegaImmediately} onMegaToggle={() => setMegaOpen((open) => !open)} onMenuOpen={() => setMenuOpen(true)} /><MobileHeaderActions onMenuOpen={() => setMenuOpen(true)} /></div>
    </header>
    <MobileNavigationSheet open={menuOpen} onOpenChange={setMenuOpen} />
  </>;
}

function NavbarBrand() {
  return <Link to="/" className="group flex min-h-11 items-center gap-2.5 sm:gap-3" data-testid="nav-logo-link" aria-label="Tentwood Trips home"><span className="grid h-9 w-9 place-items-center rounded-full border border-white/50 font-serif text-lg italic transition-transform duration-300 group-hover:rotate-6">T</span><span className="font-serif text-lg tracking-tight sm:text-xl">Tentwood <span className="text-[#9de9e6]">Trips</span></span></Link>;
}

function DesktopNavigation({ megaOpen, onMegaOpen, onMegaClose, onMegaNavigate, onMegaToggle, onMenuOpen }: { megaOpen: boolean; onMegaOpen: () => void; onMegaClose: () => void; onMegaNavigate: () => void; onMegaToggle: () => void; onMenuOpen: () => void }) {
  return <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation"><div className="relative" onMouseEnter={onMegaOpen} onMouseLeave={onMegaClose}><button type="button" className="flex cursor-pointer items-center gap-1.5 text-sm text-white/90 transition-colors hover:text-[#a8f1ef]" onFocus={onMegaOpen} onClick={onMegaToggle} data-testid="nav-explore-destinations-button" aria-expanded={megaOpen}>Explore Destinations <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", megaOpen && "rotate-180")} /></button>{megaOpen && <DestinationMegaMenu onNavigate={onMegaNavigate} />}</div><Link to="/about" className="text-sm text-white/90 transition-colors hover:text-[#a8f1ef]" data-testid="nav-about-link">About Us</Link><Link to="/contact" className="text-sm text-white/90 transition-colors hover:text-[#a8f1ef]" data-testid="nav-contact-link">Contact Us</Link><Link to="/careers" className="text-sm text-white/90 transition-colors hover:text-[#a8f1ef]" data-testid="nav-careers-link">Careers</Link><a href={whatsappUrl()} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-white/35 px-4 py-2 text-sm transition-colors hover:border-[#a8f1ef] hover:bg-white/10" data-testid="nav-whatsapp-link"><MessageCircle className="h-4 w-4" /> WhatsApp</a><button type="button" aria-label="Open navigation menu" className="grid h-10 w-10 place-items-center rounded-full border border-white/35 transition-colors hover:bg-white/10" onClick={onMenuOpen} data-testid="nav-menu-button"><Menu className="h-5 w-5" /></button></nav>;
}

function MobileHeaderActions({ onMenuOpen }: { onMenuOpen: () => void }) {
  return <div className="flex items-center gap-2 lg:hidden"><a href={whatsappUrl()} target="_blank" rel="noreferrer" className="grid h-11 w-11 place-items-center rounded-full border border-white/35" aria-label="Chat on WhatsApp" data-testid="mobile-nav-whatsapp-link"><MessageCircle className="h-4 w-4" /></a><button type="button" aria-label="Open navigation menu" className="grid h-11 w-11 place-items-center rounded-full border border-white/35" onClick={onMenuOpen} data-testid="mobile-nav-menu-button"><Menu className="h-5 w-5" /></button></div>;
}

function MobileNavigationSheet({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return <Sheet open={open} onOpenChange={onOpenChange}><SheetContent side="right" className="h-[100dvh] w-screen overflow-y-auto border-l-0 bg-[#fdfbf7] px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-8 sm:max-w-[460px] sm:px-6"><SheetHeader className="border-b border-[#1a1d20]/10 pb-6 text-left"><p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#0d7a84]">Tentwood journeys</p><SheetTitle className="font-serif text-3xl font-normal leading-tight text-[#1a1d20]">Where will you go next?</SheetTitle><SheetDescription className="max-w-xs text-sm leading-relaxed text-[#5a6065]">A considered journey is one conversation away.</SheetDescription></SheetHeader><div className="flex flex-col py-4"><Link to="/destinations" className="flex min-h-14 items-center justify-between border-b border-[#1a1d20]/10 font-serif text-2xl text-[#1a1d20]" data-testid="mobile-menu-destinations-link">Explore destinations <ArrowUpRight className="h-5 w-5 text-[#0d7a84]" /></Link><Link to="/about" className="flex min-h-[52px] items-center border-b border-[#1a1d20]/10 text-lg text-[#1a1d20]" data-testid="mobile-menu-about-link">About Tentwood</Link><Link to="/contact" className="flex min-h-[52px] items-center border-b border-[#1a1d20]/10 text-lg text-[#1a1d20]" data-testid="mobile-menu-contact-link">Contact Us</Link><Link to="/careers" className="flex min-h-[52px] items-center border-b border-[#1a1d20]/10 text-lg text-[#1a1d20]" data-testid="mobile-menu-careers-link">Careers</Link></div><div className="mb-5 grid grid-cols-2 gap-x-4 border-b border-[#1a1d20]/10 pb-5" data-testid="mobile-menu-featured-destinations">{allDestinations.slice(0, 6).map((destination) => <Link key={destination.slug} to={`/destinations/${destination.slug}`} className="flex min-h-11 items-center justify-between text-sm text-[#5a6065]" data-testid={`mobile-menu-${destination.slug}-link`}>{destination.name}<ChevronRight className="h-3.5 w-3.5 text-[#0d7a84]" /></Link>)}</div><div className="mt-auto border-l-2 border-[#9de9e6] bg-[#0d7a84] p-5 text-white"><p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#9de9e6]">Speak with a travel expert</p><p className="mt-2 font-serif text-2xl">Let’s make a plan that feels like you.</p><a href={whatsappUrl()} target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: "secondary" }), "mt-4 min-h-12 w-full justify-center gap-2 bg-white text-[#0d7a84] hover:bg-[#e5f7f5]")} data-testid="mobile-menu-whatsapp-button"><MessageCircle className="h-4 w-4" /> Chat on WhatsApp</a></div><div className="mt-5 flex flex-wrap gap-x-2 text-xs text-[#5a6065]"><a className="flex min-h-11 items-center" href={`tel:${TENTWOOD_CONTACT.phone.replace(/\s/g, "")}`} data-testid="mobile-menu-phone-link">{TENTWOOD_CONTACT.phone}</a><span className="flex items-center">·</span><a className="flex min-h-11 items-center" href={`mailto:${TENTWOOD_CONTACT.email}`} data-testid="mobile-menu-email-link">{TENTWOOD_CONTACT.email}</a></div></SheetContent></Sheet>;
}

function DestinationMegaMenu({ onNavigate }: { onNavigate: () => void }) {
  return <div className="absolute left-1/2 top-full w-[680px] -translate-x-1/2 cursor-default pt-5" data-testid="destination-mega-menu-bridge">
    <div className="animate-menu-reveal border border-[#1a1d20]/10 bg-[#fdfbf7] p-5 text-[#1a1d20] shadow-[0_28px_70px_rgba(13,47,50,0.18)]" data-testid="destination-mega-menu">
      <div className="grid grid-cols-[0.82fr_1.18fr] gap-6">
        <div className="relative min-h-[220px] overflow-hidden p-5 text-white">
          <img src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=700&q=80" alt="A quiet tropical bay" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#102f33]/90 to-[#102f33]/10" />
          <div className="relative flex h-full flex-col justify-end"><p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#a8f1ef]">Go gently</p><p className="mt-2 max-w-[210px] font-serif text-3xl leading-[1.05]">Journeys with a point of view.</p><Link to="/destinations" onClick={onNavigate} className="mt-5 inline-flex w-fit cursor-pointer items-center gap-2 border-b border-white/50 pb-1 text-sm" data-testid="mega-menu-all-destinations-link">View all destinations <ArrowUpRight className="h-4 w-4" /></Link></div>
        </div>
        <div className="grid grid-cols-2 content-center gap-x-6 gap-y-0.5">
          {allDestinations.slice(0, 10).map((destination, index) => <Link key={destination.slug} to={`/destinations/${destination.slug}`} onClick={onNavigate} className="group flex cursor-pointer items-center justify-between border-b border-[#1a1d20]/8 py-2.5 text-sm text-[#5a6065] transition-colors hover:text-[#0d7a84]" data-testid={`mega-menu-${destination.slug}-link`}><span><span className="mr-2 font-mono text-[9px] text-[#0d7a84]/60">{String(index + 1).padStart(2, "0")}</span>{destination.name}</span><ChevronRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" /></Link>)}
        </div>
      </div>
    </div>
  </div>;
}

export function WhatsAppButton() {
  return <a href={whatsappUrl()} target="_blank" rel="noreferrer" aria-label="Chat with Tentwood on WhatsApp" className="group fixed bottom-[max(1rem,env(safe-area-inset-bottom))] right-4 z-50 flex h-12 min-w-12 items-center justify-center gap-2 rounded-full border border-white/25 bg-[#0b6972] px-2.5 text-white shadow-[0_10px_30px_rgba(13,83,89,0.3)] transition-[transform,background-color] duration-300 hover:-translate-y-1 hover:bg-[#095860] sm:bottom-5 sm:right-5 sm:h-14 sm:gap-3 sm:px-3 sm:pr-5" data-testid="floating-whatsapp-button"><span className="grid h-8 w-8 place-items-center rounded-full border border-[#a8f1ef]/60 font-serif text-sm italic">T</span><span className="hidden text-left sm:block"><span className="block font-mono text-[8px] uppercase tracking-[0.18em] text-[#a8f1ef]">Tentwood concierge</span><span className="mt-0.5 block text-xs">Begin on WhatsApp</span></span><MessageCircle className="h-4 w-4 sm:hidden" /></a>;
}

export function SectionHeading({ eyebrow, title, copy, light = false, action }: { eyebrow: string; title: string; copy?: string; light?: boolean; action?: ReactNode }) {
  return <div className={cn("flex flex-col gap-4", light ? "text-white" : "text-[#1a1d20]")}>
    <div className="flex items-center gap-3"><span className={cn("h-px w-8", light ? "bg-[#9de9e6]" : "bg-[#0d7a84]")} /><span className={cn("font-mono text-[10px] uppercase tracking-[0.24em]", light ? "text-[#9de9e6]" : "text-[#0d7a84]")} data-testid="section-eyebrow">{eyebrow}</span></div>
    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><h2 className="max-w-3xl text-balance font-serif text-[2.35rem] font-normal leading-[1.02] tracking-[-0.025em] sm:text-5xl lg:text-[3.7rem]" data-testid="section-heading">{title}</h2>{copy && <p className={cn("mt-4 max-w-xl text-[15px] leading-[1.75] sm:mt-5 sm:text-base sm:leading-[1.8]", light ? "text-white/70" : "text-[#5a6065]")} data-testid="section-copy">{copy}</p>}</div>{action}</div>
  </div>;
}

export function DestinationCard({ destination, compact = false, testIdSuffix }: { destination: Destination; compact?: boolean; testIdSuffix?: string }) {
  return <Link to={`/destinations/${destination.slug}`} className={cn("group relative block cursor-pointer snap-start overflow-hidden border border-[#1a1d20]/8 bg-[#f2ede4]", compact ? "min-w-[82vw] max-w-[330px] sm:min-w-[280px] sm:max-w-none" : "min-h-[360px] sm:min-h-[390px]")} data-testid={`destination-card-${destination.slug}${testIdSuffix ? `-${testIdSuffix}` : ""}`}>
    <img src={destination.image} alt={`${destination.name} — ${destination.descriptor}`} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#0b2629]/90 via-[#0b2629]/5 to-transparent" />
    <div className={cn("relative flex flex-col justify-end p-5 text-white sm:p-6", compact ? "min-h-[390px] sm:min-h-[410px]" : "min-h-[360px] sm:min-h-[390px]")}><div className="mb-auto flex items-start justify-between"><Badge className="rounded-none border border-white/30 bg-black/10 font-mono text-[8px] uppercase tracking-[0.16em] text-white backdrop-blur-sm">{destination.category}</Badge><ArrowUpRight className="h-5 w-5 opacity-80 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div><p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#a8f1ef]">{destination.country}</p><h3 className="mt-2 font-serif text-[2.15rem] font-normal tracking-tight sm:text-4xl">{destination.name}</h3><p className="mt-2 max-w-[260px] text-sm leading-relaxed text-white/72">{destination.descriptor}</p></div>
  </Link>;
}

export function JourneyCard({ journey }: { journey: Journey }) {
  return <article className="group min-w-[84vw] max-w-[340px] snap-start overflow-hidden border border-[#1a1d20]/10 bg-[#fdfbf7] sm:min-w-[360px] sm:max-w-none" data-testid={`journey-card-${journey.id}`}>
    <Link to={`/destinations/${journey.slug}`} className="block overflow-hidden" data-testid={`journey-image-${journey.id}`}><img src={journey.image} alt={`${journey.title} in ${journey.destination}`} loading="lazy" className="aspect-[5/4] w-full object-cover transition duration-700 group-hover:scale-105" /></Link>
    <div className="p-5 sm:p-6"><div className="flex items-center justify-between gap-3"><span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#0d7a84]">{journey.destination}</span><span className="flex items-center gap-1 text-xs text-[#5a6065]"><Clock3 className="h-3.5 w-3.5" /> {journey.duration}</span></div><h3 className="mt-3 font-serif text-[1.7rem] font-normal tracking-tight text-[#1a1d20] sm:text-3xl">{journey.title}</h3><p className="mt-2 text-sm leading-relaxed text-[#5a6065]">{journey.descriptor}</p><div className="mt-5 flex items-end justify-between gap-3 border-t border-[#1a1d20]/10 pt-4 sm:mt-6 sm:pt-5"><div><p className="text-[9px] uppercase tracking-[0.18em] text-[#5a6065]">From</p><p className="mt-0.5 font-serif text-lg text-[#1a1d20] sm:text-xl">{journey.price}<span className="font-sans text-[10px] text-[#5a6065] sm:text-xs"> / person</span></p></div><Link to={`/destinations/${journey.slug}`} className={cn(buttonVariants({ variant: "outline", size: "sm" }), "min-h-11 rounded-none gap-1.5 border-[#0d7a84]/35 px-3 text-[#0d7a84] hover:bg-[#0d7a84] hover:text-white")} data-testid={`journey-explore-${journey.id}`}>Explore <ArrowUpRight className="h-3.5 w-3.5" /></Link></div></div>
  </article>;
}

export function SearchBar({ onSelect }: { onSelect?: (destination: Destination) => void }) {
  const [value, setValue] = useState("");
  const suggestions = value.length > 0 ? [...allDestinations, ...journeys.map((journey) => ({ ...journey, name: journey.title, descriptor: journey.destination, slug: journey.slug, country: "Journey", image: journey.image } as unknown as Destination))].filter((item) => `${item.name} ${item.descriptor}`.toLowerCase().includes(value.toLowerCase())).slice(0, 5) : [];
  const closeSearch = () => setValue("");
  return <div className="relative z-20 w-full max-w-[570px]" data-testid="destination-search"><div className="flex min-h-12 items-center gap-3 border-b border-[#1a1d20]/20 pb-2"><Search className="h-5 w-5 shrink-0 text-[#0d7a84]" /><Input value={value} onChange={(event) => setValue(event.target.value)} placeholder="Where do you want to go?" aria-label="Search destinations" autoComplete="off" enterKeyHint="search" className="h-11 border-0 bg-transparent px-0 text-base shadow-none outline-none placeholder:text-[#5a6065]/70 focus-visible:ring-0 md:h-auto" data-testid="hero-search-input" />{value && <button type="button" onClick={closeSearch} className="grid h-11 w-11 place-items-center text-[#5a6065] md:hidden" aria-label="Close destination search" data-testid="search-close-button"><X className="h-4 w-4" /></button>}</div>{value.length > 0 && <><button type="button" aria-label="Close search suggestions" onClick={closeSearch} className="fixed inset-0 z-[70] bg-[#102f33]/45 backdrop-blur-[1px] md:hidden" data-testid="search-sheet-backdrop" /><div className="fixed inset-x-0 bottom-0 z-[80] max-h-[72dvh] overflow-y-auto rounded-t-[24px] border border-[#1a1d20]/10 bg-[#fdfbf7] p-4 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-2xl md:absolute md:bottom-auto md:left-0 md:right-0 md:top-14 md:max-h-none md:rounded-none md:p-2" data-testid="search-suggestions"><div className="mb-3 flex items-center justify-between border-b border-[#1a1d20]/10 pb-3 md:hidden"><div><p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#0d7a84]">Search results</p><p className="mt-1 text-xs text-[#5a6065]">Choose a place or journey</p></div><button type="button" onClick={closeSearch} className="grid h-11 w-11 place-items-center rounded-full border border-[#1a1d20]/10" aria-label="Close search results" data-testid="search-sheet-close-button"><X className="h-4 w-4" /></button></div>{suggestions.map((item, index) => <Link key={`${item.slug}-${index}`} to={`/destinations/${item.slug}`} onClick={() => { onSelect?.(item); closeSearch(); }} className="flex min-h-16 items-center gap-3 border-b border-[#1a1d20]/8 p-2 transition-colors last:border-0 hover:bg-[#f2ede4] md:min-h-0 md:p-3" data-testid={`search-suggestion-${item.slug}-${index}`}><img src={item.image} alt="" className="h-12 w-16 shrink-0 object-cover md:h-11 md:w-14" /><span className="min-w-0 flex-1"><span className="block truncate font-serif text-xl text-[#1a1d20] md:text-lg">{item.name}</span><span className="block truncate text-xs text-[#5a6065]">{item.descriptor}</span></span><ChevronRight className="h-4 w-4 shrink-0 text-[#0d7a84]" /></Link>)}{suggestions.length === 0 && <div className="p-5 text-sm leading-relaxed text-[#5a6065]" data-testid="search-empty-state">No journeys found yet. Try Bali, Japan or Dubai.</div>}</div></>}</div>;
}

export function FilterBar({ activeFilters, setActiveFilters }: { activeFilters: Record<string, string>; setActiveFilters: (filters: Record<string, string>) => void }) {
  const [open, setOpen] = useState(false);
  const activeCount = Object.values(activeFilters).filter((value) => !value.startsWith("All") && !value.startsWith("Any")).length;
  return <div className="flex flex-col gap-3 border-y border-[#1a1d20]/10 py-3 md:flex-row md:items-center md:justify-between md:py-4"><button type="button" className="flex min-h-12 w-full items-center gap-2 text-sm font-medium text-[#1a1d20] md:hidden" onClick={() => setOpen(true)} data-testid="filters-mobile-toggle"><Filter className="h-4 w-4 text-[#0d7a84]" /> Refine journeys {activeCount > 0 && <span className="grid h-6 min-w-6 place-items-center rounded-full bg-[#0d7a84] px-1 text-xs text-white">{activeCount}</span>}<ChevronRight className="ml-auto h-4 w-4 text-[#0d7a84]" /></button><div className="hidden gap-3 md:flex md:flex-wrap" data-testid="filter-controls"><FilterFields activeFilters={activeFilters} setActiveFilters={setActiveFilters} /></div><span className="hidden text-xs text-[#5a6065] md:block">{journeys.length} journeys to begin with</span><Sheet open={open} onOpenChange={setOpen}><SheetContent side="bottom" className="max-h-[82dvh] overflow-y-auto rounded-t-[28px] border-t border-[#1a1d20]/10 bg-[#fdfbf7] px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-6 md:hidden" data-testid="filters-bottom-sheet"><SheetHeader className="border-b border-[#1a1d20]/10 pb-5 text-left"><p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#0d7a84]">Find your pace</p><SheetTitle className="font-serif text-3xl font-normal">Refine journeys</SheetTitle><SheetDescription>Choose what matters, then swipe through the matches.</SheetDescription></SheetHeader><div className="grid gap-5 py-6"><FilterFields activeFilters={activeFilters} setActiveFilters={setActiveFilters} mobile /></div><Button type="button" onClick={() => setOpen(false)} className="min-h-12 w-full bg-[#0d7a84] text-white" data-testid="filters-apply-button">Show matching journeys</Button></SheetContent></Sheet></div>;
}

function FilterFields({ activeFilters, setActiveFilters, mobile = false }: { activeFilters: Record<string, string>; setActiveFilters: (filters: Record<string, string>) => void; mobile?: boolean }) {
  return <>{Object.entries(FILTER_GROUPS).map(([label, options]) => <label key={label} className="flex min-w-[150px] flex-col gap-2"><span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#5a6065]">{label}</span><select value={activeFilters[label]} onChange={(event) => setActiveFilters({ ...activeFilters, [label]: event.target.value })} className={cn("cursor-pointer bg-transparent text-sm text-[#1a1d20] outline-none", mobile ? "min-h-12 w-full border border-[#1a1d20]/15 px-3" : "border-0 p-0 pr-5")} data-testid={`filter-${label.toLowerCase().replace(" ", "-")}${mobile ? "-mobile" : ""}`}>{options.map((option) => <option key={option} value={option}>{option}</option>)}</select></label>)}</>;
}

export function EnquiryForm({ destination, itinerary }: { destination: Destination; itinerary?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", date: "", adults: "2", children: "0", selectedItinerary: itinerary ?? destination.itineraries[0]?.name ?? "Bespoke journey", budget: "", requirements: "" });
  const update = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => { event.preventDefault(); setSubmitted(true); };
  const message = `Hi Tentwood Trips,\n\nI’d like to request a trip to ${destination.name}.\n\nName: ${form.name}\nItinerary: ${form.selectedItinerary}\nTravel Date: ${form.date || "To be decided"}\nAdults: ${form.adults}\nChildren: ${form.children}\nBudget: ${form.budget || "To be discussed"}\nSpecial requirements: ${form.requirements || "None"}\n\nPlease help me plan this trip.`;
  return <div className="border border-[#1a1d20]/10 bg-[#f8f5ee] p-4 sm:p-8" data-testid="enquiry-form-section"><div className="mb-6 sm:mb-7"><p className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#0d7a84] sm:text-[10px]">Start a conversation</p><h2 className="mt-2 font-serif text-[2rem] text-[#1a1d20] sm:text-3xl">Let’s plan your journey.</h2><p className="mt-2 max-w-lg text-sm leading-relaxed text-[#5a6065]">Tell us a little about what you have in mind. We’ll shape the first idea with you.</p></div>{submitted ? <div className="flex min-h-[300px] flex-col justify-center border border-[#0d7a84]/20 bg-[#e8f4f1] p-5 sm:min-h-[340px] sm:p-6" data-testid="enquiry-success-state"><span className="grid h-10 w-10 place-items-center rounded-full bg-[#0d7a84] text-white"><Check className="h-5 w-5" /></span><h3 className="mt-5 font-serif text-2xl text-[#1a1d20]">Your request is ready.</h3><p className="mt-2 max-w-md text-sm leading-relaxed text-[#5a6065]">We haven’t saved this anywhere. Continue on WhatsApp to send it directly to Tentwood.</p><a href={whatsappUrl(message)} target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: "default" }), "mt-6 min-h-12 w-full gap-2 bg-[#0d7a84] text-white hover:bg-[#0a5e66] sm:w-fit")} data-testid="enquiry-continue-whatsapp-button"><MessageCircle className="h-4 w-4" /> Continue on WhatsApp</a></div> : <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2" data-testid="enquiry-form"><Field label="Full name" required><Input required autoComplete="name" value={form.name} onChange={(event) => update("name", event.target.value)} placeholder="Your name" className="h-12 md:h-10" data-testid="enquiry-name-input" /></Field><Field label="Email" required><Input required type="email" inputMode="email" autoComplete="email" value={form.email} onChange={(event) => update("email", event.target.value)} placeholder="you@email.com" className="h-12 md:h-10" data-testid="enquiry-email-input" /></Field><Field label="Phone / WhatsApp" required><Input required type="tel" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(event) => update("phone", event.target.value)} placeholder="+91" className="h-12 md:h-10" data-testid="enquiry-phone-input" /></Field><Field label="Travel date"><Input type="date" value={form.date} onChange={(event) => update("date", event.target.value)} className="h-12 md:h-10" data-testid="enquiry-date-input" /></Field><Field label="Adults"><Input type="number" inputMode="numeric" min="1" value={form.adults} onChange={(event) => update("adults", event.target.value)} className="h-12 md:h-10" data-testid="enquiry-adults-input" /></Field><Field label="Children"><Input type="number" inputMode="numeric" min="0" value={form.children} onChange={(event) => update("children", event.target.value)} className="h-12 md:h-10" data-testid="enquiry-children-input" /></Field><Field label="Selected itinerary"><select value={form.selectedItinerary} onChange={(event) => update("selectedItinerary", event.target.value)} className="h-12 w-full border border-[#1a1d20]/15 bg-[#fdfbf7] px-3 text-sm text-[#1a1d20] outline-none focus:border-[#0d7a84] md:h-10" data-testid="enquiry-itinerary-select">{destination.itineraries.length ? destination.itineraries.map((item) => <option key={item.id}>{item.name}</option>) : <option>Bespoke journey</option>}</select></Field><Field label="Approximate budget"><Input inputMode="numeric" value={form.budget} onChange={(event) => update("budget", event.target.value)} placeholder="e.g. ₹1,00,000" className="h-12 md:h-10" data-testid="enquiry-budget-input" /></Field><Field label="Special requirements" className="sm:col-span-2"><textarea value={form.requirements} onChange={(event) => update("requirements", event.target.value)} placeholder="Anything you would like us to know?" className="min-h-28 w-full resize-y border border-[#1a1d20]/15 bg-[#fdfbf7] px-3 py-3 text-base text-[#1a1d20] outline-none placeholder:text-[#5a6065]/60 focus:border-[#0d7a84] sm:text-sm" data-testid="enquiry-requirements-input" /></Field><Button type="submit" className="mt-2 min-h-12 w-full gap-2 bg-[#0d7a84] text-white hover:bg-[#0a5e66] sm:col-span-2" data-testid="enquiry-submit-button">Send booking request <ArrowUpRight className="h-4 w-4" /></Button></form>}</div>;
}

function Field({ label, required, className, children }: { label: string; required?: boolean; className?: string; children: ReactNode }) { return <label className={cn("flex flex-col gap-2", className)}><span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#5a6065]">{label}{required && " *"}</span>{children}</label>; }

export function Footer() {
  return <footer className="bg-[#182d30] px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-12 text-white sm:px-8 sm:pt-16 lg:px-12" data-testid="site-footer"><div className="mx-auto max-w-[1440px]"><div className="grid gap-8 border-b border-white/15 pb-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:gap-12 lg:pb-14"><div><p className="font-serif text-3xl">Tentwood <span className="text-[#9de9e6]">Trips</span></p><p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65 sm:mt-5">Beautifully considered journeys for people who want to see the world with a little more feeling.</p><div className="mt-5 flex flex-wrap gap-2 sm:mt-6"><span className="rounded-full border border-white/20 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/65">IATA partner</span><span className="rounded-full border border-white/20 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-white/65">ATTA member</span></div></div><FooterColumn title="Explore" links={FOOTER_EXPLORE_LINKS} /><FooterColumn title="Tentwood" links={FOOTER_TENTWOOD_LINKS} /><div className="border-t border-white/12 pt-5 lg:border-0 lg:pt-0"><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9de9e6]">Say hello</p><a href={`mailto:${TENTWOOD_CONTACT.email}`} className="mt-3 flex min-h-11 items-center font-serif text-xl lg:mt-4 lg:block lg:min-h-0" data-testid="footer-email-link">{TENTWOOD_CONTACT.email}</a><a href={whatsappUrl()} target="_blank" rel="noreferrer" className="flex min-h-11 items-center text-sm text-white/65 transition-colors hover:text-white" data-testid="footer-whatsapp-link">WhatsApp our team ↗</a><div className="mt-4 flex flex-wrap gap-x-5 text-sm text-white/65 lg:mt-7 lg:gap-4"><a className="flex min-h-11 items-center" href="https://www.instagram.com/" target="_blank" rel="noreferrer" data-testid="footer-instagram-link">Instagram</a><a className="flex min-h-11 items-center" href="https://www.facebook.com/" target="_blank" rel="noreferrer" data-testid="footer-facebook-link">Facebook</a><a className="flex min-h-11 items-center" href="https://www.linkedin.com/" target="_blank" rel="noreferrer" data-testid="footer-linkedin-link">LinkedIn</a></div></div></div><div className="flex flex-col gap-4 pt-6 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between sm:pt-7"><span>© 2025 Tentwood Trips. All journeys reserved.</span><div className="flex flex-wrap gap-x-5 gap-y-2"><Link to="/privacy" className="flex min-h-11 items-center sm:min-h-0" data-testid="footer-privacy-link">Privacy</Link><Link to="/terms" className="flex min-h-11 items-center sm:min-h-0" data-testid="footer-terms-link">Terms</Link><Link to="/cancellation" className="flex min-h-11 items-center sm:min-h-0" data-testid="footer-cancellation-link">Cancellation</Link></div></div></div></footer>;
}

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) { return <><details className="group border-t border-white/12 lg:hidden" data-testid={`footer-${title.toLowerCase()}-section-mobile`}><summary className="flex min-h-14 cursor-pointer list-none items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[#9de9e6]">{title}<ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" /></summary><div className="hidden flex-col pb-4 group-open:flex">{links.map(([label, href]) => <Link key={label} to={href} className="flex min-h-11 w-fit items-center text-sm text-white/65 transition-colors hover:text-white" data-testid={`footer-${label.toLowerCase().replaceAll(" ", "-")}-link-mobile`}>{label}</Link>)}</div></details><div className="hidden lg:block" data-testid={`footer-${title.toLowerCase()}-section`}><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#9de9e6]">{title}</p><div className="mt-4 flex flex-col gap-3">{links.map(([label, href]) => <Link key={label} to={href} className="w-fit text-sm text-white/65 transition-colors hover:text-white" data-testid={`footer-${label.toLowerCase().replaceAll(" ", "-")}-link`}>{label}</Link>)}</div></div></>; }

export function SiteLayout({ children }: { children: ReactNode }) { return <div className="min-h-svh bg-[#fdfbf7] text-[#1a1d20]"><ScrollToTop /><Navbar /><main>{children}</main><Footer /><WhatsAppButton /></div>; }

export function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useLayoutEffect(() => installRouteScrollReset(hash), [hash, pathname]);
  return null;
}

export function PageIntro({ eyebrow, title, copy, image }: { eyebrow: string; title: string; copy: string; image?: string }) { return <section className="relative min-h-[440px] overflow-hidden bg-[#0d7a84] px-5 pb-14 pt-28 text-white sm:min-h-[520px] sm:px-8 sm:pb-20 sm:pt-40 lg:px-12 lg:pb-28 lg:pt-48"><div className="absolute inset-0">{image && <img src={image} alt="" className="animate-cinematic-reveal h-full w-full scale-[1.03] object-cover opacity-[0.38] saturate-[0.8]" />}</div><div className="absolute inset-0 bg-gradient-to-r from-[#0b4f56]/95 via-[#0b4f56]/65 to-[#0b4f56]/20" /><div className="relative mx-auto max-w-[1440px]"><div className="max-w-4xl"><div className="flex items-center gap-3"><span className="h-px w-10 bg-[#9de9e6]" /><span className="font-mono text-[9px] uppercase tracking-[0.26em] text-[#9de9e6]">{eyebrow}</span></div><h1 className="mt-5 text-balance font-serif text-[2.85rem] font-normal leading-[0.95] tracking-[-0.035em] sm:mt-6 sm:text-7xl lg:text-[6.6rem]">{title}</h1><p className="mt-5 max-w-xl text-[15px] leading-[1.75] text-white/72 sm:mt-7 sm:text-lg sm:leading-[1.8]">{copy}</p></div></div></section>; }

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) { return <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#5a6065]" data-testid="breadcrumbs">{items.map((item, index) => <span key={item.label} className="flex items-center gap-2">{index > 0 && <ChevronRight className="h-3 w-3" />}{item.href ? <Link to={item.href} className="hover:text-[#0d7a84]" data-testid={`breadcrumb-${item.label.toLowerCase().replaceAll(" ", "-")}-link`}>{item.label}</Link> : <span>{item.label}</span>}</span>)}</nav>; }
