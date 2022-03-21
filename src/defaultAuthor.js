import { useFusionContext } from "fusion:context";
import sectionNavigation from "./sectionNavigation";

export default function getDefaultAuthor() {
  let author = "LA";
  const { arcSite, globalContent, globalContentConfig } = useFusionContext();
  if (!["los-andes"].includes(arcSite)) {
    const nav = sectionNavigation(arcSite, globalContent, globalContentConfig);
    author = `${nav.isVia ? "Vía" : ""} ${nav.sectionName}`;
  }
  if (arcSite === "la-voz") return undefined;
  return `Redacción ${author}`;
}
