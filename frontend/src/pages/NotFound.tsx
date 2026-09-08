import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Seo, SiteLayout } from "@/components/site/Shared";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return <SiteLayout><Seo title="Page not found" description="The Tentwood Trips page you requested could not be found." /><section className="flex min-h-[72svh] items-center bg-[#0d7a84] px-5 pb-16 pt-28 text-white sm:px-8 lg:px-12"><div className="mx-auto w-full max-w-[1440px]"><p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#a8f1ef]">404 · A small detour</p><h1 className="mt-5 max-w-3xl font-serif text-5xl font-normal leading-[0.95] sm:text-7xl">This route isn’t on the map.</h1><p className="mt-5 max-w-lg text-[15px] leading-[1.75] text-white/70">Return to our destinations and find a journey that is.</p><Link to="/destinations" className={cn(buttonVariants({ variant: "secondary" }), "mt-8 min-h-12 w-full gap-2 rounded-none bg-white text-[#0d7a84] sm:w-fit")} data-testid="not-found-destinations-button">Explore destinations <ArrowUpRight className="h-4 w-4" /></Link></div></section></SiteLayout>;
}