export const TENTWOOD_CONTACT = {
  whatsapp: "917358822746",
  phone: "+91 73588 22746",
  email: "hello@tentwoodtrips.com",
};

export function whatsappUrl(message = "Hi Tentwood Trips! I would like to plan a bespoke journey.") {
  return `https://wa.me/${TENTWOOD_CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function openWhatsApp(message?: string) {
  window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
}