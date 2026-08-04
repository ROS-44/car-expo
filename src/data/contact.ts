// Coordonnées de contact et informations de l'agence — à modifier ici une seule fois.
export const AGENCY = {
  name: "Aysallrentcar",
  city: "annemasse",
  address: "Annemasse 74100 haute savoie",
  phone: "+33658155906", // format international, sans espaces
  whatsapp: "33658155906", // format international, sans le +
  email: "Durmzrabia74@gmail.com",
  description:
    "Agence de location de voitures à annemasse. Un catalogue simple, des véhicules entretenus, une réponse rapide par téléphone, WhatsApp ou email.",
};

export function whatsappLink(carName?: string): string {
  const text = encodeURIComponent(
    carName
      ? `Bonjour, je souhaite louer la ${carName}. Est-elle disponible ?`
      : `Bonjour, j'aimerais avoir des informations sur vos voitures de location.`,
  );
  return `https://wa.me/${AGENCY.whatsapp}?text=${text}`;
}

export function emailLink(carName?: string): string {
  const subject = encodeURIComponent(
    carName ? `Réservation - ${carName}` : `Demande d'information`,
  );
  const body = encodeURIComponent(
    carName
      ? `Bonjour,\n\nJe souhaite louer la ${carName}.\nMerci de me confirmer la disponibilité et les modalités.\n\nCordialement,`
      : `Bonjour,\n\nJe souhaite avoir des informations sur vos voitures de location.\n\nCordialement,`,
  );
  return `mailto:${AGENCY.email}?subject=${subject}&body=${body}`;
}

export function phoneLink(): string {
  return `tel:${AGENCY.phone}`;
}
