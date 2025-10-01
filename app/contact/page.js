import { site } from "@/lib/siteConfig";
import ContactClient from "./ContactClient"; // client component

export const metadata = {
  title: `Contact — ${site?.name ?? "HaziTExperts"}`,
  description:
    "Reach HaziTExperts for managed IT & cybersecurity. Call, email, or request a free IT assessment.",
};

export default function ContactPage() {
  return <ContactClient />;
}
