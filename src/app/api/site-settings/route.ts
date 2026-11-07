import { NextRequest } from "next/server";
import { z } from "zod";
import { createApiHandler } from "@/lib/api-handler";
import { apiSuccess } from "@/lib/api-response";
import { getAuthenticatedUser, requireRole, verifyCsrfProtection } from "@/lib/rbac";
import { SiteSettings } from "@/models/SiteSettings";

const updateSiteSettingsSchema = z.object({
  institutionName: z.string().trim().min(2).optional(),
  shortName: z.string().trim().min(2).optional(),
  motto: z.string().trim().optional(),
  logoUrl: z.string().optional(),
  bannerUrl: z.string().optional(),
  phones: z.array(z.string().trim()).optional(),
  email: z.string().email("সঠিক ইমেইল প্রদান করুন").optional(),
  address: z.string().trim().min(5).optional(),
  socialLinks: z
    .object({
      facebook: z.string().optional(),
      youtube: z.string().optional(),
      instagram: z.string().optional(),
      linkedin: z.string().optional(),
      twitter: z.string().optional(),
    })
    .optional(),
  whatsAppNumber: z.string().optional(),
  whatsAppPrefillMessage: z.string().optional(),
  isWhatsAppEnabled: z.boolean().optional(),
  allowTeacherStudentMessaging: z.boolean().optional(),
  admissionNotice: z.string().optional(),
  isAdmissionOpen: z.boolean().optional(),
  heroTitle: z.string().optional(),
  heroSubtitle: z.string().optional(),
  aboutTitle: z.string().optional(),
  aboutText: z.string().optional(),
  metaDescription: z.string().optional(),

  // Home Page CMS
  homeStats: z
    .array(
      z.object({
        label: z.string(),
        value: z.string(),
      })
    )
    .optional(),
  homeClasses: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
        badge: z.string(),
        timing: z.string(),
        href: z.string(),
      })
    )
    .optional(),
  homeFeatures: z
    .array(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    )
    .optional(),
  classroomGallery: z
    .array(
      z.object({
        id: z.union([z.string(), z.number()]).optional(),
        title: z.string(),
        badge: z.string().optional().default(""),
        description: z.string().optional().default(""),
        features: z.array(z.string()).optional().default([]),
        imageSrc: z.string(),
      })
    )
    .optional(),
  homeCtaTitle: z.string().optional(),
  homeCtaText: z.string().optional(),

  // About Page CMS
  aboutStoryParagraph2: z.string().optional(),
  aboutMission: z.string().optional(),
  aboutVision: z.string().optional(),
  aboutValues: z.string().optional(),
  aboutHighlights: z.array(z.string()).optional(),
  officeHours: z.string().optional(),

  // Classes Page CMS
  classesPageTitle: z.string().optional(),
  classesPageSubtitle: z.string().optional(),
  classPrograms: z
    .array(
      z.object({
        id: z.string(),
        title: z.string(),
        badge: z.string(),
        description: z.string(),
        features: z.array(z.string()),
      })
    )
    .optional(),

  // Admission Instructions Page CMS
  admissionsPageTitle: z.string().optional(),
  admissionsPageSubtitle: z.string().optional(),
  admissionsNoticeTitle: z.string().optional(),
  admissionsNoticeText: z.string().optional(),
  admissionSteps: z
    .array(
      z.object({
        num: z.string(),
        title: z.string(),
        desc: z.string(),
      })
    )
    .optional(),
  admissionRequirements: z.array(z.string()).optional(),

  // Contact Page CMS
  contactPageTitle: z.string().optional(),
  contactPageSubtitle: z.string().optional(),
  contactOfficeHours: z.string().optional(),
  contactMapEmbedUrl: z.string().optional(),
});

export const GET = createApiHandler(
  async () => {
    // Public endpoint: Fetch or initialize default settings
    let settings = await SiteSettings.findOne({ key: "main" }).lean();
    if (!settings) {
      settings = await SiteSettings.create({ key: "main" });
    }

    // Auto-migrate legacy Shikkhon database values to Al-Hikmah
    const isLegacy =
      !settings.institutionName ||
      settings.institutionName.includes("শিক্ষণ") ||
      settings.institutionName.includes("Shikkhon");

    const hasLegacyGallery =
      !settings.classroomGallery ||
      settings.classroomGallery.length === 0 ||
      settings.classroomGallery.some(
        (g: any) =>
          !g.imageSrc ||
          g.imageSrc.includes("/images/classrooms/classroom-") ||
          g.imageSrc.includes("placeholder")
      );

    const hasLegacyPrograms =
      !settings.classPrograms ||
      settings.classPrograms.length === 0 ||
      settings.classPrograms.some((p: any) => {
        const t = `${p.id} ${p.title} ${p.badge}`.toLowerCase();
        return (
          t.includes("hsc") ||
          t.includes("একাদশ") ||
          t.includes("দ্বাদশ") ||
          t.includes("আলিম") ||
          t.includes("কলেজ")
        );
      });

    const hasOldWhatsApp =
      !settings.whatsAppNumber ||
      settings.whatsAppNumber.includes("01642733106") ||
      settings.whatsAppNumber.includes("01642-733106");

    if (isLegacy || hasLegacyGallery || hasLegacyPrograms || hasOldWhatsApp) {
      const alHikmahPrograms = [
        {
          id: "primary",
          title: "প্লে থেকে ৫ম শ্রেণি (প্রাথমিক বিভাগ)",
          badge: "প্লে থেকে ৫ম (প্রাথমিক)",
          description:
            "কওমী ও আলিয়া মাদ্রাসার শিক্ষার্থীদের বুনিয়াদি আরবী, নূরানি কায়দা, সহিহ কুরআন ও তাজবীদ, সাধারণ বাংলা, ইংরেজি ও গণিতের মজবুত ভিত গঠন।",
          features: [
            "নূরানি ও নাজেরা সহিহ কুরআন শিক্ষা",
            "সুন্দর হাতের লেখা ও বানান নির্ভুলকরণ",
            "মৌলিক আরবী ও সাধারণ বিষয়ের নিবিড় পাঠদান",
            "স্নেহশীল তত্ত্বাবধান ও সাপ্তাহিক মূল্যায়ন",
          ],
        },
        {
          id: "class-6-8",
          title: "৬ষ্ঠ থেকে ৮ম শ্রেণি (জুনিয়র ফাউন্ডেশন)",
          badge: "৬ষ্ঠ থেকে ৮ম (জুনিয়র)",
          description:
            "নতুন শিক্ষাক্রমের আলোকে ধারণাগত স্পষ্টতা, সাধারণ গণিত, বিজ্ঞান ও ইংরেজির পাশাপাশি আলিয়া মাদ্রাসার আরবি ১ম ও ২য় পত্র (নাহু ও সরফ)-এর বিশেষ কেয়ার।",
          features: [
            "আরবি ব্যাকরণ ও অনুবাদের বুনিয়াদি ক্লাস",
            "গণিত, ইংরেজি ও বিজ্ঞানের নিয়মিত প্র্যাকটিস",
            "অধ্যায়ভিত্তিক মডেল টেস্ট ও খাতা মূল্যায়ন",
            "দুর্বল শিক্ষার্থীদের জন্য এক্সট্রা রিমেডিয়াল ক্লাস",
          ],
        },
        {
          id: "class-9-10",
          title: "৯ম ও ১০ম শ্রেণি (এসএসসি ও দাখিল প্রস্তুতি)",
          badge: "দাখিল ও এসএসসি স্পেশাল",
          description:
            "দাখিল ও এসএসসি পরীক্ষার্থীদের শতভাগ এ+ (A+) নিশ্চিতকরণে সাজানো পূর্ণাঙ্গ কোর্স। বিজ্ঞান, মানবিক ও ব্যবসায় শিক্ষা শাখার গভীর পাঠদান ও নিয়মিত মডেল টেস্ট।",
          features: [
            "পদার্থ, রসায়ন, জীববিজ্ঞান ও সাধারণ গণিত কেয়ার",
            "আরবি সাহিত্য, কাওয়ায়েদ ও ফিকহ বিষয়ের পাঠদান",
            "অধ্যায়ভিত্তিক মডেল টেস্ট ও বোর্ড প্রশ্ন সমাধান",
            "মেধা তালিকা ও নিয়মিত প্রগ্রেস রিপোর্ট প্রদান",
          ],
        },
        {
          id: "madrasah",
          title: "কওমী ও আলিয়া মাদ্রাসা সমন্বিত কেয়ার",
          badge: "কওমী ও আলিয়া স্পেশাল",
          description:
            "মাদ্রাসা শিক্ষার্থীদের আরবী সাহিত্য, তারজমা, নাহু-সরফ, হাদিস ও ফিকহের পাশাপাশি সাধারণ বাংলা, ইংরেজি ও গণিতে পারদর্শী করে গড়ে তোলার নির্ভরযোগ্য প্ল্যাটফর্ম।",
          features: [
            "কওমী ও আলিয়া কারিকুলামের নিখুঁত সমন্বয়",
            "আরবি সাহিত্য ও ব্যাকরণের ব্যবহারিক ক্লাস",
            "নিয়মিত আমল, আখলাক ও আদব চর্চা",
            "অভিভাবকদের সাথে নিয়মিত সমন্বয় ও প্রগ্রেস মিটিং",
          ],
        },
      ];

      const alHikmahGallery = [
        {
          id: 1,
          title: "প্রাথমিক ও জুনিয়র পাঠদান কক্ষ (প্লে থেকে ৫ম ও ৬ষ্ঠ-৮ম)",
          badge: "সুশৃঙ্খল ও মনোযোগী",
          description:
            "ছোট ছোট শিক্ষার্থীদের জন্য আনন্দমুখর ও সুশৃঙ্খল পাঠদান পরিবেশ। মৌলিক আরবী, কুরআন তেলাওয়াত, বাংলা, গণিত ও ইংরেজি লেখার নিবিড় চর্চা।",
          features: ["সারিবদ্ধ বসার ব্যবস্থা", "ব্যক্তিগত শিট ও ফাইল ফোল্ডার", "শিক্ষকের সার্বক্ষণিক তদারকি"],
          imageSrc: "/images/classrooms/al-hikmah-classroom-1.jpg",
        },
        {
          id: 2,
          title: "কওমী ও আলিয়া মাদ্রাসার নিয়মিত ব্যাচ ক্লাসরুম",
          badge: "দীনি ও শান্ত পরিবেশ",
          description:
            "কওমী ও আলিয়া মাদ্রাসার শিক্ষার্থীদের জন্য নিবেদিত কক্ষ। আরবি ব্যাকরণ, নাহু-সরফ ও সাধারণ বিষয়ের সমন্বিত ও একাগ্র ক্লাসরুম।",
          features: ["ব্ল্যাকবোর্ড ও ভিজ্যুয়াল ভিউ", "আলাদা ছেলে ও মেয়ে বসার সুবিধা", "শান্ত ও একাগ্র পড়াশোনা"],
          imageSrc: "/images/classrooms/al-hikmah-classroom-2.jpg",
        },
        {
          id: 3,
          title: "মডেল টেস্ট ও সৃজনশীল অনুশীলন ক্লাসরুম",
          badge: "উজ্জ্বল ও উন্মুক্ত পরিবেশ",
          description:
            "মানচিত্র, হোয়াইটবোর্ড ও পর্যাপ্ত আলো-বাতাস সমৃদ্ধ বড় ক্লাসরুম। যেখানে শিক্ষার্থীরা নিয়মিত মূল্যায়ন পরীক্ষা ও লিখিত প্র্যাকটিসে অংশ নেয়।",
          features: ["হোয়াইটবোর্ড ও সাধারণ জ্ঞান মানচিত্র", "নিয়মিত শিট ও রাইটিং প্যাড", "পর্যাপ্ত প্রাকৃতিক আলো"],
          imageSrc: "/images/classrooms/al-hikmah-classroom-3.jpg",
        },
        {
          id: 4,
          title: "আল-হিকমাহ্ মূল্যায়ন পরীক্ষা ও স্পেশাল কেয়ার",
          badge: "নিয়মিত মডেল টেস্ট",
          description:
            "আল-হিকমাহ্ কোচিং সেন্টারের নিজস্ব প্যাড ও শিটে অধ্যায়ভিত্তিক লিখিত মূল্যায়ন পরীক্ষা। প্রতিটি শিক্ষার্থীর উত্তরপত্র পুঙ্খানুপুঙ্খ যাচাই।",
          features: ["আল-হিকমাহ্ অফিশিয়াল রাইটিং প্যাড", "অধ্যায়ভিত্তিক লিখিত মূল্যায়ন", "ভুল সংশোধন ও রিভিশন"],
          imageSrc: "/images/classrooms/al-hikmah-classroom-4.jpg",
        },
      ];

      const updated = await SiteSettings.findOneAndUpdate(
        { key: "main" },
        {
          $set: {
            classroomGallery: alHikmahGallery,
            classPrograms: alHikmahPrograms,
            whatsAppNumber: "+8801859787399",
            classesPageSubtitle:
              "প্লে থেকে ১০ম শ্রেণি এবং কওমী ও আলিয়া মাদ্রাসার শিক্ষার্থীদের জন্য বিষয়ভিত্তিক মানসম্মত ব্যাচ এবং সময়সূচী।",
            ...(isLegacy
              ? {
                  institutionName: "আল-হিকমাহ্ কোচিং সেন্টার",
                  shortName: "আল-হিকমাহ্",
                  motto: "আলোর পথে সফলতা প্রাপ্তির প্রচেষ্টায়...",
                  logoUrl: "/images/logo.png",
                  bannerUrl: "/images/banner.png",
                  address: "বি-ব্লক, হালিশহর, চট্টগ্রাম",
                  phones: ["০১৬৪২-৭৩৩১০৬", "০১৮২৪-০৬৬৫৫৫", "০১৮৭৬-৮৫০৪০৮"],
                  email: "info@alhikmah.edu.bd",
                  whatsAppPrefillMessage:
                    "আসসালামু আলাইকুম, আমি আল-হিকমাহ্ কোচিং সেন্টারে ভর্তির ব্যাপারে তথ্য জানতে চাচ্ছি।",
                  heroTitle: "আল-হিকমাহ্ কোচিং সেন্টার",
                  heroSubtitle:
                    "বিশেষায়িত কওমী ও আলিয়া মাদ্রাসার আরবী ও সাধারণ সকল বিষয়ের স্বয়ংসম্পূর্ণ কোচিং সেন্টার। প্লে থেকে ৫ম শ্রেণি (প্রাথমিক বিভাগ) ও ষষ্ঠ থেকে ১০ম শ্রেণি (মাধ্যমিক বিভাগ)।",
                  aboutTitle: "কওমী ও আলিয়া মাদ্রাসার শিক্ষার্থীদের নির্ভরযোগ্য পাঠদান কেন্দ্র",
                  aboutText:
                    "আল-হিকমাহ্ কোচিং সেন্টার চট্টগ্রাম হালিশহরে প্রতিষ্ঠিত একটি বিশেষায়িত পাঠদান কেন্দ্র। কওমী ও আলিয়া মাদ্রাসার আরবী ও সাধারণ সকল বিষয়ে অভিজ্ঞ শিক্ষকমণ্ডলী, নিয়মিত মূল্যায়ন পরীক্ষা এবং দুর্বল শিক্ষার্থীদের জন্য বিশেষ তদারকির মাধ্যমে আমরা প্রতিটি শিক্ষার্থীর কাঙ্ক্ষিত ফলাফল নিশ্চিত করি।",
                }
              : {}),
          },
        },
        { new: true }
      ).lean();
      settings = updated || settings;
    }

    return apiSuccess(settings, "ওয়েবসাইটের সেটিংস পাওয়া গেছে।");
  },
  { requireDb: true }
);

export const PUT = createApiHandler(
  async (req: NextRequest) => {
    verifyCsrfProtection(req);
    const session = await getAuthenticatedUser(req);
    requireRole(session, ["super_admin", "admin"]);

    const body = await req.json();
    const validated = updateSiteSettingsSchema.parse(body);

    const updatedSettings = await SiteSettings.findOneAndUpdate(
      { key: "main" },
      { $set: validated },
      { upsert: true, new: true, runValidators: true }
    );

    try {
      const { revalidatePath } = await import("next/cache");
      revalidatePath("/", "layout");
      revalidatePath("/");
      revalidatePath("/about");
      revalidatePath("/contact");
      revalidatePath("/admissions");
      revalidatePath("/classes");
      revalidatePath("/teachers");
      revalidatePath("/events");
      revalidatePath("/notices");
      revalidatePath("/blog");
    } catch {
      // Ignore if revalidatePath fails in non-server action context
    }

    return apiSuccess(updatedSettings, "ওয়েবসাইটের কনফিগারেশন সফলভাবে আপডেট করা হয়েছে।");
  },
  { requireDb: true }
);
