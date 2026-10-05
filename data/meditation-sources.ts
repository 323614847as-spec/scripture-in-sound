export type MeditationSourceStatus = "verified" | "needs-review" | "rejected";

export const meditationSources = [
  {
    id: "suttacentral-licensing", title: "SuttaCentral licensing", url: "https://suttacentral.net/licensing", creator: "SuttaCentral", license: "CC0 1.0 for original SuttaCentral material; third-party items vary", status: "verified" as MeditationSourceStatus,
    permissions: { quote: true, adapt: true, commercialUse: true }, reviewedOn: "2026-10-05", note: "Every selected translation must still display its own CC0 statement; the site-wide page explicitly excludes some third-party material from the blanket dedication.",
  },
  {
    id: "suttacentral-mn118", title: "MN 118: Mindfulness of Breathing", url: "https://suttacentral.net/mn118/en/sujato", creator: "Bhikkhu Sujato / SuttaCentral", license: "CC0 1.0", status: "verified" as MeditationSourceStatus,
    permissions: { quote: true, adapt: true, commercialUse: true }, reviewedOn: "2026-10-05", note: "Used only as historical context for a separately labeled modern project exercise.",
  },
  {
    id: "suttacentral-snp1.8", title: "Snp 1.8: The Discourse on Love", url: "https://suttacentral.net/snp1.8/en/sujato", creator: "Bhikkhu Sujato / SuttaCentral", license: "CC0 1.0", status: "verified" as MeditationSourceStatus,
    permissions: { quote: true, adapt: true, commercialUse: true }, reviewedOn: "2026-10-05", note: "Used as a reading reference; the site's guided prompts are not represented as a traditional liturgical script.",
  },
  {
    id: "ati-basic-breath", title: "Basic Breath Meditation Instructions", url: "https://www.accesstoinsight.org/lib/authors/thanissaro/breathmed.html", creator: "Thanissaro Bhikkhu", license: "CC BY-NC 4.0", status: "needs-review" as MeditationSourceStatus,
    permissions: { quote: true, adapt: true, commercialUse: false }, reviewedOn: "2026-10-05", note: "Legally reusable for attributed noncommercial use, but not copied into the library while the project's future commercial status is undecided.",
  },
  {
    id: "audiodharma-guided-material", title: "AudioDharma meditation recordings and transcripts", url: "https://www.audiodharma.org/help", creator: "AudioDharma / individual teachers", license: "CC BY-NC-ND 4.0", status: "needs-review" as MeditationSourceStatus,
    permissions: { quote: false, adapt: false, commercialUse: false }, reviewedOn: "2026-10-05", note: "No adaptation or edited script is permitted under NoDerivatives. Individual works may be linked after item-level review.",
  },
  {
    id: "unattributed-web-guides", title: "Unattributed meditation scripts found through general web search", url: "", creator: "Unknown", license: "Unknown", status: "rejected" as MeditationSourceStatus,
    permissions: { quote: false, adapt: false, commercialUse: false }, reviewedOn: "2026-10-05", note: "Excluded because authorship, lineage context, and reuse rights cannot be verified.",
  },
];

export function getMeditationSource(id: string) {
  return meditationSources.find((source) => source.id === id);
}
