import type { Place, Source } from "../types/content";

const reviewedOn = "2026-10-05";

function osmSource(name: string, latitude: number, longitude: number): Source {
  return {
    id: `${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-osm`,
    title: `OpenStreetMap location record for ${name}`,
    publication: "OpenStreetMap contributors",
    url: `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=17/${latitude}/${longitude}`,
    accessDate: reviewedOn,
    rights: "Open data licensed under ODbL 1.0",
    note: "Coordinates reviewed against the mapped temple feature.",
  };
}

const officialSources = {
  yonghe: { id: "beijing-religion-yonghe", title: "雍和宫", author: "北京市民族宗教事务委员会", url: "https://mzzjw.beijing.gov.cn/bjmz/201912/t20191215_1235552.html", accessDate: reviewedOn },
  fayuan: { id: "beijing-fayuan", title: "法源寺", author: "北京市人民政府", url: "https://www.beijing.gov.cn/renwen/rwzyd/qgzdwwbhdw/fys/202210/t20221028_2846902.html", accessDate: reviewedOn },
  guangji: { id: "beijing-guangji", title: "广济寺", author: "中共北京市委统一战线工作部", url: "https://www.bjtzb.gov.cn/wwwroot/sdtyzx/publish/article/55/12290.shtml", accessDate: reviewedOn },
  tanzhe: { id: "beijing-tanzhe", title: "潭柘寺", author: "北京市人民政府", url: "https://www.beijing.gov.cn/gate/big5/www.beijing.gov.cn/renwen/bjgk/mtggk/mtgwl/202304/t20230410_2994438.html", accessDate: reviewedOn },
  jietai: { id: "beijing-jietai", title: "戒台寺", author: "北京市人民政府", url: "https://www.beijing.gov.cn/renwen/rwzyd/lyjq/4A/jts/202210/t20221018_2838543.html", accessDate: reviewedOn },
  dajue: { id: "beijing-dajue", title: "北京西山大觉寺的创立与旸台山", author: "北京市文物局", url: "https://wwj.beijing.gov.cn/bjww/wwjzzcslm/1731063/1731066/djs/1731072/1731190/index.html", accessDate: reviewedOn },
  wofo: { id: "beijing-wofo", title: "西山著名的古老寺院：卧佛寺", author: "北京市公园管理中心", url: "https://gygl.beijing.gov.cn/whgy/whgy_wsgc/201912/t20191206_885741.html", accessDate: reviewedOn },
  biyun: { id: "beijing-biyun", title: "碧云寺", author: "北京市公园管理中心", url: "https://gygl.beijing.gov.cn/mlgy/mlgy_gyjg01/201912/t20191211_1048664.html", accessDate: reviewedOn },
  hongluo: { id: "beijing-hongluo", title: "Hongluo Temple", author: "The People's Government of Beijing Municipality", url: "https://english.beijing.gov.cn/beijinginfo/facts/religion/202008/t20200831_1993652.html", accessDate: reviewedOn },
  yunju: { id: "beijing-yunju", title: "房山云居寺与明清皇室", author: "北京市文物局", url: "https://wwj.beijing.gov.cn/bjww/362760/362770/325924541/", accessDate: reviewedOn },
} satisfies Record<string, Source>;

type PlaceSeed = Omit<Place, "country" | "region" | "city" | "location" | "photographs" | "fieldNoteIds" | "fieldRecordingIds" | "mapPosition" | "status">;

function beijingPlace(seed: PlaceSeed): Place {
  return {
    ...seed,
    city: "Beijing",
    region: "Beijing Municipality",
    country: "China",
    location: "Beijing, China",
    photographs: [],
    fieldNoteIds: seed.id === "yonghe-gong" ? ["incense-visitors-yonghe"] : [],
    fieldRecordingIds: [],
    mapPosition: { x: 50, y: 50 },
    status: "published",
  };
}

export const places: Place[] = [
  beijingPlace({
    id: "yonghe-gong", slug: "yonghe-gong", name: "Yonghe Gong / Lama Temple", localName: "雍和宫", nameChinese: "雍和宫", nameEnglish: "Yonghe Gong (Lama Temple)", romanization: "Yōnghé Gōng",
    traditions: ["Tibetan Buddhism", "Vajrayāna"], historicalPeriod: "Qing dynasty; residence founded 1694, converted to a Tibetan Buddhist monastery in 1744",
    shortDescription: "A Qing imperial complex that became one of Beijing's most prominent Tibetan Buddhist monasteries.",
    summary: "A major Gelug Tibetan Buddhist site in central Beijing, marked by an imperial architectural history and an active devotional setting.",
    description: "The site began as a Qing princely residence. Beijing's religious-affairs authority records its conversion into a lama temple in 1744 and describes its Han, Manchu, Mongolian, and Tibetan architectural features.",
    historicalBackground: "Built as a residence for the future Yongzheng emperor in 1694, the complex became an imperial palace in 1725 and a Tibetan Buddhist monastery in 1744. Its halls, inscriptions, and ritual spaces make it important for studying Qing imperial patronage and Tibetan Buddhism in Beijing.",
    coordinates: { latitude: 39.94562, longitude: 116.411, verified: true, sourceUrl: "https://www.openstreetmap.org/way/24825312", reviewedOn },
    relatedScriptureIds: ["heart-sutra"], relatedPracticeIds: [], relationships: [{ type: "scripture", id: "heart-sutra", note: "Related for future study; no site-specific recitation claim is made." }],
    sources: [officialSources.yonghe, osmSource("Yonghe Gong", 39.94562, 116.411)], featured: true,
  }),
  beijingPlace({
    id: "fayuan-si", slug: "fayuan-si", name: "Fayuan Temple", localName: "法源寺", nameChinese: "法源寺", nameEnglish: "Fayuan Temple", romanization: "Fǎyuán Sì",
    traditions: ["Chinese Buddhism", "Mahāyāna"], historicalPeriod: "Founded in 645; rebuilt and renamed across later dynasties",
    shortDescription: "A historic Chinese Buddhist temple and the home of the Buddhist Academy of China.",
    summary: "One of Beijing's oldest Buddhist temple sites, with major institutional roles in modern Chinese Buddhism.",
    description: "The Beijing municipal record dates its foundation to 645, notes its earlier name Minzhong Temple, and records the establishment of the Buddhist Academy of China here in 1956.",
    historicalBackground: "Founded in the Tang period and renamed Fayuan Temple after Qing rebuilding, the site carries both architectural and institutional histories. The official city record identifies it as a nationally protected cultural site and a key Buddhist temple.",
    coordinates: { latitude: 39.88403, longitude: 116.3638, verified: true, sourceUrl: "https://www.openstreetmap.org/way/30834367", reviewedOn },
    relatedScriptureIds: [], relatedPracticeIds: [], sources: [officialSources.fayuan, osmSource("Fayuan Temple", 39.88403, 116.3638)], featured: true,
  }),
  beijingPlace({
    id: "guangji-si", slug: "guangji-si", name: "Guangji Temple", localName: "广济寺", nameChinese: "广济寺", nameEnglish: "Guangji Temple", romanization: "Guǎngjì Sì",
    traditions: ["Chinese Buddhism", "Mahāyāna"], historicalPeriod: "Founded in the Jin-period tradition; rebuilt and named Hongci Guangji Temple in 1466",
    shortDescription: "A central Beijing monastery associated with the Buddhist Association of China.",
    summary: "An active urban temple whose modern institutional role is as significant as its historic architecture.",
    description: "This record limits its public historical claim to the site's established Ming–Qing fabric and modern institutional role; fuller chronology awaits source review.",
    historicalBackground: "The present record is intentionally concise. Future research should distinguish the earlier temple tradition from securely dated rebuilding phases and document the site's twentieth-century institutional history.",
    coordinates: { latitude: 39.92345, longitude: 116.36617, verified: true, sourceUrl: "https://www.openstreetmap.org/way/233219116", reviewedOn },
    relatedScriptureIds: [], relatedPracticeIds: [], sources: [officialSources.guangji, osmSource("Guangji Temple", 39.92345, 116.36617)],
  }),
  beijingPlace({
    id: "tanzhe-si", slug: "tanzhe-si", name: "Tanzhe Temple", localName: "潭柘寺", nameChinese: "潭柘寺", nameEnglish: "Tanzhe Temple", romanization: "Tánzhè Sì",
    traditions: ["Chinese Buddhism", "Mahāyāna"], historicalPeriod: "Temple tradition traced to the Western Jin; major later rebuilding",
    shortDescription: "A long-established mountain monastery in western Beijing with a complex rebuilding history.",
    summary: "A historic Buddhist complex in Mentougou whose age is often expressed through the saying that the temple predates Beijing city.",
    description: "The site is included for its continuous importance in Beijing's Buddhist geography. Precise foundation narratives vary, so this record separates traditional dating from extant architectural evidence.",
    historicalBackground: "Tanzhe Temple is conventionally associated with an early fourth-century foundation, while much of what visitors encounter reflects later rebuilding. Future research will add a phase-by-phase architectural history from specialist sources.",
    coordinates: { latitude: 39.904016, longitude: 116.024133, verified: true, sourceUrl: "https://www.openstreetmap.org/?mlat=39.904016&mlon=116.024133#map=17/39.904016/116.024133", reviewedOn },
    relatedScriptureIds: [], relatedPracticeIds: [], sources: [officialSources.tanzhe, osmSource("Tanzhe Temple", 39.904016, 116.024133)], featured: true,
  }),
  beijingPlace({
    id: "jietai-si", slug: "jietai-si", name: "Jietai Temple", localName: "戒台寺", nameChinese: "戒台寺", nameEnglish: "Jietai Temple", romanization: "Jiètái Sì",
    traditions: ["Chinese Buddhism", "Mahāyāna"], historicalPeriod: "Historic temple; present identity shaped by its ordination platform",
    shortDescription: "A Mentougou Buddhist temple known for its ordination platform, old pines, and mountain setting.",
    summary: "A monastery whose name and institutional memory center on Buddhist ordination.",
    description: "The Beijing municipal description records the alternate name Jietan Temple and identifies the ordination platform, ancient pines, and caves as defining features.",
    historicalBackground: "The site's ritual importance is bound to its 戒坛, or ordination platform. This page avoids assigning a single foundation date until a specialist architectural source is added.",
    coordinates: { latitude: 39.868884, longitude: 116.080246, verified: true, sourceUrl: "https://www.openstreetmap.org/way/510058918", reviewedOn },
    relatedScriptureIds: [], relatedPracticeIds: [], sources: [officialSources.jietai, osmSource("Jietai Temple", 39.868884, 116.080246)],
  }),
  beijingPlace({
    id: "dajue-si", slug: "dajue-si", name: "Dajue Temple", localName: "大觉寺", nameChinese: "大觉寺", nameEnglish: "Dajue Temple", romanization: "Dàjué Sì",
    traditions: ["Chinese Buddhism", "Mahāyāna"], historicalPeriod: "Liao-period evidence includes a 1068 inscription; later Ming and Qing rebuilding",
    shortDescription: "A western Beijing mountain temple noted for historic halls, trees, and layered rebuilding.",
    summary: "A temple landscape where architecture, springs, and old trees frame the study of Buddhist place-making.",
    description: "The record uses a cautious period label because the complex contains fabric and memories from several dynastic phases rather than a single unchanged foundation moment.",
    historicalBackground: "Dajue Temple is generally connected with Liao-period origins and substantial later reconstruction. A fuller chronology and object history remain a research task for this archive.",
    coordinates: { latitude: 40.051306, longitude: 116.099528, verified: true, sourceUrl: "https://www.openstreetmap.org/?mlat=40.051306&mlon=116.099528#map=17/40.051306/116.099528", reviewedOn },
    relatedScriptureIds: [], relatedPracticeIds: [], sources: [officialSources.dajue, osmSource("Dajue Temple", 40.051306, 116.099528)],
  }),
  beijingPlace({
    id: "wofo-si", slug: "wofo-si", name: "Wofo Temple", localName: "卧佛寺", nameChinese: "卧佛寺", nameEnglish: "Temple of the Reclining Buddha", romanization: "Wòfó Sì",
    traditions: ["Chinese Buddhism", "Mahāyāna"], historicalPeriod: "Tang foundation tradition; Yuan, Ming, and Qing rebuilding",
    shortDescription: "A Buddhist temple in the Beijing Botanical Garden, named for its reclining Buddha image.",
    summary: "A site organized in public memory around the parinirvāṇa image of the reclining Buddha.",
    description: "The temple is treated here as both an active Buddhist heritage site and a place where an image gives the complex its familiar name.",
    historicalBackground: "The temple's long history includes repeated rebuilding. This entry records only the broad period sequence until object-level and architectural sources are added.",
    coordinates: { latitude: 40.0053, longitude: 116.201, verified: true, sourceUrl: "https://www.openstreetmap.org/?mlat=40.0053&mlon=116.201#map=17/40.0053/116.201", reviewedOn },
    relatedScriptureIds: [], relatedPracticeIds: [], sources: [officialSources.wofo, osmSource("Wofo Temple", 40.0053, 116.201)],
  }),
  beijingPlace({
    id: "biyun-si", slug: "biyun-si", name: "Biyun Temple", localName: "碧云寺", nameChinese: "碧云寺", nameEnglish: "Biyun Temple", romanization: "Bìyún Sì",
    traditions: ["Chinese Buddhism", "Mahāyāna"], historicalPeriod: "Yuan foundation tradition; expanded in the Ming and Qing",
    shortDescription: "A terraced temple complex on the eastern side of Beijing's Fragrant Hills.",
    summary: "A mountain-edge Buddhist complex whose ascending courtyards reveal multiple periods of patronage.",
    description: "The page presents a broad chronology and leaves detailed claims about individual halls and patrons for future specialist verification.",
    historicalBackground: "Biyun Temple is generally associated with a Yuan-period origin and substantial Ming and Qing expansion. Its spatial sequence and later memorial uses require careful separation in a future full entry.",
    coordinates: { latitude: 39.9958, longitude: 116.1853, verified: true, sourceUrl: "https://www.openstreetmap.org/?mlat=39.9958&mlon=116.1853#map=17/39.9958/116.1853", reviewedOn },
    relatedScriptureIds: [], relatedPracticeIds: [], sources: [officialSources.biyun, osmSource("Biyun Temple", 39.9958, 116.1853)],
  }),
  beijingPlace({
    id: "hongluo-si", slug: "hongluo-si", name: "Hongluo Temple", localName: "红螺寺", nameChinese: "红螺寺", nameEnglish: "Hongluo Temple", romanization: "Hóngluó Sì",
    traditions: ["Chinese Buddhism", "Mahāyāna"], historicalPeriod: "Founded according to official site history in 338; rebuilt across later periods",
    shortDescription: "A major northern Beijing temple associated in modern memory with Pure Land Buddhism.",
    summary: "A Huairou temple landscape linking monastic history, mountain ecology, and Pure Land lineages.",
    description: "Beijing's official English-language profile dates the temple to 338 and connects it with later Pure Land patriarchs Jixing and Yinguang.",
    historicalBackground: "The official municipal profile presents Hongluo Temple as a long-standing northern Chinese Buddhist center and records its association with the twelfth and thirteenth Pure Land patriarchs.",
    coordinates: { latitude: 40.385, longitude: 116.6184, verified: true, sourceUrl: "https://www.openstreetmap.org/way/756859586", reviewedOn },
    relatedScriptureIds: [], relatedPracticeIds: [], sources: [officialSources.hongluo, osmSource("Hongluo Temple", 40.385, 116.6184)],
  }),
  beijingPlace({
    id: "yunju-si", slug: "yunju-si", name: "Yunju Temple", localName: "云居寺", nameChinese: "云居寺", nameEnglish: "Yunju Temple", romanization: "Yúnjū Sì",
    traditions: ["Chinese Buddhism", "Mahāyāna"], historicalPeriod: "Sui–Tang origins; a major scriptural carving project continued for centuries",
    shortDescription: "A Fangshan Buddhist site central to the history of the stone-carved Chinese Buddhist canon.",
    summary: "A temple and scripture archive where place, material text, preservation, and devotional labor converge.",
    description: "Yunju Temple is especially important to this project because its stone sutras make the physical preservation of scripture visible at architectural scale.",
    historicalBackground: "The temple is closely linked to the Fangshan stone-sutra project, begun around the turn of the seventh century and continued across later dynasties. The Beijing Cultural Heritage Bureau source is used for context; detailed inscription counts are withheld pending specialist review.",
    coordinates: { latitude: 39.60823, longitude: 115.76792, verified: true, sourceUrl: "https://www.openstreetmap.org/way/313092717", reviewedOn },
    relatedScriptureIds: ["heart-sutra"], relatedPracticeIds: [], sources: [officialSources.yunju, osmSource("Yunju Temple", 39.60823, 115.76792)], featured: true,
  }),
];

export function getPlace(slugOrId: string) {
  return places.find((place) => place.slug === slugOrId || place.id === slugOrId);
}
