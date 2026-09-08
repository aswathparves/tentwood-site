export const TENTWOOD_CONTACT = {
  whatsapp: "18008368966",
  phone: "+91 80 4680 2188",
  email: "hello@tentwoodtrips.com",
};

export function whatsappUrl(message = "Hi Tentwood Trips! I would like to plan a bespoke journey.") {
  return `https://wa.me/${TENTWOOD_CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message?: string) {
  window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
}