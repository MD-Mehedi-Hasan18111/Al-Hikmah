"use client";

import { useEffect, useState, useCallback } from "react";
import {
  Building,
  Phone,
  Globe,
  Save,
  CheckCircle2,
  RefreshCw,
  Share2,
  AlertCircle,
  Home,
  BookOpen,
  GraduationCap,
  FileCheck,
  Plus,
  Trash2,
  Sparkles,
  MapPin,
  Clock,
  Images,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Alert } from "@/components/ui/Alert";
import { Skeleton } from "@/components/ui/Skeleton";
import { ImageUpload } from "@/components/ui/ImageUpload";
import { useAppDispatch } from "@/store";
import { addNotification } from "@/store/slices/notificationSlice";

interface SiteSettingsData {
  institutionName: string;
  shortName: string;
  motto: string;
  logoUrl?: string;
  bannerUrl: string;
  phones: string[];
  email: string;
  address: string;
  officeHours?: string;
  whatsAppNumber: string;
  whatsAppPrefillMessage?: string;
  isWhatsAppEnabled?: boolean;
  allowTeacherStudentMessaging?: boolean;
  admissionNotice: string;
  isAdmissionOpen: boolean;
  metaDescription: string;
  socialLinks: {
    facebook?: string;
    youtube?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  // Home Page CMS
  heroTitle?: string;
  heroSubtitle?: string;
  homeStats: Array<{ label: string; value: string }>;
  homeClasses: Array<{
    title: string;
    description: string;
    badge: string;
    timing: string;
    href: string;
  }>;
  homeFeatures: Array<{
    title: string;
    description: string;
  }>;
  classroomGallery: Array<{
    id?: any;
    title: string;
    badge: string;
    description: string;
    features: string[];
    imageSrc: string;
  }>;
  homeCtaTitle?: string;
  homeCtaText?: string;
  // About Page CMS
  aboutTitle?: string;
  aboutText?: string;
  aboutStoryParagraph2?: string;
  aboutMission?: string;
  aboutVision?: string;
  aboutValues?: string;
  aboutHighlights: string[];
  // Classes Page CMS
  classesPageTitle?: string;
  classesPageSubtitle?: string;
  classPrograms: Array<{
    id: string;
    title: string;
    badge: string;
    description: string;
    features: string[];
  }>;
  // Admissions Page CMS
  admissionsPageTitle?: string;
  admissionsPageSubtitle?: string;
  admissionsNoticeTitle?: string;
  admissionsNoticeText?: string;
  admissionSteps: Array<{
    num: string;
    title: string;
    desc: string;
  }>;
  admissionRequirements: string[];
  // Contact Page CMS
  contactPageTitle?: string;
  contactPageSubtitle?: string;
  contactOfficeHours?: string;
  contactMapEmbedUrl?: string;
}

export default function SiteSettingsManagementPage() {
  const dispatch = useAppDispatch();

  const [activeTab, setActiveTab] = useState<
    "branding" | "contact" | "home" | "about" | "classes" | "admissions"
  >("branding");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<SiteSettingsData>({
    institutionName: "আল-হিকমাহ্ কোচিং সেন্টার",
    shortName: "আল-হিকমাহ্",
    motto: "আলোর পথে সফলতা প্রাপ্তির প্রচেষ্টায়...",
    logoUrl: "/images/logo.png",
    bannerUrl: "/images/banner.png",
    phones: ["০১৬৪২-৭৩৩১০৬", "০১৮২৪-০৬৬৫৫৫"],
    email: "info@alhikmah.edu.bd",
    address: "বি-ব্লক, হালিশহর, চট্টগ্রাম",
    officeHours: "সকাল ৮:০০ - রাত ৮:০০ (প্রতিদিন)",
    whatsAppNumber: "+8801859787399",
    whatsAppPrefillMessage:
      "আসসালামু আলাইকুম, আমি কোচিং এ ভর্তির ব্যাপারে তথ্য জানতে চাচ্ছি।",
    isWhatsAppEnabled: true,
    allowTeacherStudentMessaging: true,
    admissionNotice:
      "২০২৬ শিক্ষাবর্ষে প্লে থেকে ১০ম শ্রেণি এবং কওমী ও আলিয়া মাদ্রাসা স্পেশাল কেয়ারে ভর্তি চলছে।",
    isAdmissionOpen: true,
    metaDescription:
      "বিশেষায়িত কওমী ও আলিয়া মাদ্রাসার আরবী ও সাধারণ সকল বিষয়ের স্বয়ংসম্পূর্ণ কোচিং সেন্টার - হালিশহর, চট্টগ্রাম।",
    socialLinks: {
      facebook: "https://facebook.com/alhikmahcoaching",
      youtube: "",
      instagram: "",
      linkedin: "",
      twitter: "",
    },
    // Home
    heroTitle: "সেরা প্রস্তুতিতে গড়ে তুলুন নিশ্চিত ভবিষ্যৎ",
    heroSubtitle:
      "প্লে থেকে ৫ম (প্রাথমিক বিভাগ) ও ৬ষ্ঠ থেকে ১০ম শ্রেণি (মাধ্যমিক বিভাগ) এবং কওমী ও আলিয়া মাদ্রাসার আরবী ও সাধারণ সকল বিষয়ের স্বয়ংসম্পূর্ণ কোচিং সেন্টার।",
    homeStats: [
      { label: "সফল শিক্ষার্থী", value: "৩৫০০+" },
      { label: "অভিজ্ঞ শিক্ষক", value: "২৫+" },
      { label: "সক্রিয় ব্যাচ", value: "১৬+" },
      { label: "বোর্ড জিপিএ-৫ হার", value: "৯৮%" },
    ],
    homeClasses: [
      {
        title: "প্লে থেকে ৫ম শ্রেণি (প্রাথমিক বিভাগ)",
        description:
          "কওমী ও আলিয়া মাদ্রাসার বুনিয়াদি আরবী, কায়দা, তাজবিদ ও সাধারণ বিষয়ের নিবিড় যত্ন।",
        badge: "প্রাথমিক বিভাগ",
        timing: "সকাল ও বিকাল ব্যাচ",
        href: "/classes#primary",
      },
      {
        title: "৬ষ্ঠ থেকে ৮ম শ্রেণি (জুনিয়র কেয়ার)",
        description:
          "আরবি ১ম ও ২য় পত্র, নাহু-সরফ, সাধারণ গণিত, ইংরেজি ও বিজ্ঞানের পূর্ণাঙ্গ প্রস্তুতি।",
        badge: "জুনিয়র মাদ্রাসা",
        timing: "নিয়মিত পাঠদান",
        href: "/classes#class-6-8",
      },
      {
        title: "৯ম ও ১০ম শ্রেণি (দাখিল ও এসএসসি)",
        description:
          "দাখিল ও এসএসসি পরীক্ষার্থীদের শতভাগ এ+ প্রস্তুতি, আরবি সাহিত্য, হাদিস ও বিজ্ঞান বিষয়ের স্পেশাল ব্যাচ।",
        badge: "দাখিল স্পেশাল",
        timing: "প্রতিদিন নিয়মিত ক্লাস",
        href: "/classes#class-9-10",
      },
      {
        title: "বিশেষায়িত কওমী ও আলিয়া কেয়ার",
        description:
          "কওমী ও আলিয়া মাদ্রাসার শিক্ষার্থীদের আরবি ব্যাকরণ, অনুবাদ ও সাধারণ বিষয়ের সমন্বিত গাইডেন্স।",
        badge: "মাদ্রাসা কেয়ার",
        timing: "বিশেষায়িত শিক্ষক",
        href: "/classes#madrasah",
      },
    ],
    homeFeatures: [
      {
        title: "অভিজ্ঞ শিক্ষকমণ্ডলী",
        description:
          "চট্টগ্রামের স্বনামধন্য কলেজ ও বিশ্ববিদ্যালয়ের অভিজ্ঞ শিক্ষকদের প্রত্যক্ষ তত্ত্বাবধানে মানসম্মত ক্লাস।",
      },
      {
        title: "ডিজিটাল হাজিরা ও সময়ানুবর্তিতা",
        description:
          "প্রতিটি ক্লাসে উপস্থিতি নিশ্চিতকরণ এবং অনুপস্থিত শিক্ষার্থীদের অভিভাবকদের কাছে স্বয়ংক্রিয় তথ্য প্রদান।",
      },
      {
        title: "সাপ্তাহিক ও মাসিক মডেল টেস্ট",
        description:
          "নিয়মিত মূল্যায়ন পরীক্ষা, ওএমআর শিট মূল্যায়ন এবং মেধা তালিকা প্রকাশের মাধ্যমে শিক্ষার্থীর উন্নতি যাচাই।",
      },
      {
        title: "স্বচ্ছ ফি ও ডিজিটাল রসিদ",
        description:
          "মাসিক টিউশন ফি ও পরীক্ষা ফির হিসাব সংরক্ষণ, মোবাইল ব্যাংকিং এবং ডিজিটাল মানি রিসিট প্রদান।",
      },
      {
        title: "অভিভাবকদের সার্বক্ষণিক মনিটরিং",
        description:
          "অভিভাবক মিটিং ও নিয়মিত ফিডব্যাকের মাধ্যমে শিক্ষার্থীর দুর্বলতা চিহ্নিত করে বিশেষ ক্লাসের ব্যবস্থা।",
      },
      {
        title: "প্রিন্টেড লেকচার শিট ও হ্যান্ডনোট",
        description:
          "সহজ ও তথ্যবহুল নিজস্ব লেকচার শিট, হ্যান্ডনোট এবং বোর্ড পরীক্ষার স্ট্যান্ডার্ড প্রশ্নব্যাংক সমাধান।",
      },
    ],
    classroomGallery: [
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
    ],
    homeCtaTitle: "২০২৬ শিক্ষাবর্ষে আসন সংখ্যা সীমিত, আজই ভর্তি নিশ্চিত করুন",
    homeCtaText:
      "শিক্ষার্থীকে সরাসরি কোচিং অফিসে এসে প্রয়োজনীয় কাগজপত্রসহ ভর্তি সম্পন্ন করতে হবে। যে কোনো তথ্যের জন্য আমাদের হেল্পলাইনে সরাসরি কল করুন।",
    // About
    aboutTitle: "অভিজ্ঞতা ও আধুনিক পাঠদানের অনন্য সমন্বয়",
    aboutText:
      "আল-হিকমাহ্ কোচিং সেন্টার চট্টগ্রাম হালিশহরে প্রতিষ্ঠিত একটি প্রথম সারির পাঠদান কেন্দ্র। অভিজ্ঞ শিক্ষকমণ্ডলী, নিয়মিত ওএমআর মডেল টেস্ট এবং দুর্বল শিক্ষার্থীদের জন্য বিশেষ তদারকির মাধ্যমে আমরা প্রতিটি শিক্ষার্থীর কাঙ্ক্ষিত ফলাফল নিশ্চিত করি।",
    aboutStoryParagraph2:
      "আমরা বিশ্বাস করি প্রতিটি শিক্ষার্থীর মধ্যেই বিশেষ মেধা রয়েছে। সঠিক দিকনির্দেশনা, বন্ধুত্বপূর্ণ পাঠদান পরিবেশ এবং নিয়মিত অধ্যাবসায়ের চর্চা নিশ্চিত করার মাধ্যমে আমরা প্রতিটি শিক্ষার্থীকে দাখিল ও এসএসসি পরীক্ষায় জিপিএ-৫ ও সর্বোচ্চ সাফল্য এনে দিতে সচেষ্ট।",
    aboutMission:
      "প্রতিটি শিক্ষার্থীর সুপ্ত মেধার সর্বোত্তম বিকাশ ঘটিয়ে সাধারণ ও কওমী/আলিয়া মাদ্রাসা কারিকুলামে বোর্ড পরীক্ষায় শ্রেষ্ঠত্ব অর্জন করানো। দুর্বলদের বিশেষ যত্ন ও মেধার যথোপযুক্ত মূল্যায়ন আমাদের অগ্রাধিকার।",
    aboutVision:
      "মুখস্থবিদ্যার বদলে ধারণাগত স্পষ্টতা (Conceptual Clarity), নিয়মিত মূল্যায়ন এবং শৃঙ্খলাবদ্ধ জীবন গঠনের মাধ্যমে শিক্ষার্থীদের ভবিষ্যতের জন্য আত্মবিশ্বাসী ও নীতিবান নাগরিক হিসেবে গড়ে তোলা।",
    aboutValues:
      "সততা, সময়ানুবর্তিতা, শিক্ষক-শিক্ষার্থী-অভিভাবকের যৌথ সমন্বয় এবং প্রযুক্তিভিত্তিক ডিজিটাল তদারকি। কোনো অবহেলা বা আপস ছাড়াই শিক্ষার মান অক্ষুণ্ণ রাখা।",
    aboutHighlights: [
      "চট্টগ্রামের শীর্ষস্থানীয় অভিজ্ঞ বিষয়ভিত্তিক শিক্ষকমণ্ডলী",
      "প্লে থেকে ১০ম শ্রেণি ও কওমী/আলিয়া মাদ্রাসা স্পেশাল কেয়ার ব্যাচ",
      "প্রতিটি অধ্যায় শেষে মানসম্মত ওএমআর শিটভিত্তিক মূল্যায়ন পরীক্ষা",
      "ডিজিটাল উপস্থিতি খাতা ও অনুপস্থিতিতে অভিভাবকদের সরাসরি নোটিফিকেশন",
      "আধুনিক শীতাতপ নিয়ন্ত্রিত (AC) ও সিসিটিভি ক্যামেরা সমৃদ্ধ ক্লাসরুম",
      "দুর্বল শিক্ষার্থীদের চিহ্নিত করে আলাদা রিমেডিয়াল / এক্সট্রা ক্লাস",
      "নিজস্ব সমৃদ্ধ লেকচার শিট, হ্যান্ডনোট ও বিগত ১০ বছরের প্রশ্নব্যাংক সল্যুশন",
      "নিয়মিত অভিভাবক সমাবেশ (Parents Meeting) ও প্রগ্রেস কার্ড প্রদান",
    ],
    // Classes
    classesPageTitle: "পাঠদান বিভাগ ও সক্রিয় ব্যাচসমূহ",
    classesPageSubtitle:
      "প্লে থেকে ১০ম শ্রেণি এবং কওমী ও আলিয়া মাদ্রাসার শিক্ষার্থীদের জন্য বিষয়ভিত্তিক মানসম্মত ব্যাচ এবং সময়সূচী।",
    classPrograms: [
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
    ],
    // Admissions
    admissionsPageTitle: "সরাসরি ক্যাম্পাসে ভর্তির সম্পূর্ণ নির্দেশিকা",
    admissionsPageSubtitle:
      "প্রতিটি ব্যাচে সীমিত আসন থাকায় গুণগত মান অক্ষুণ্ণ রাখা হয়। শিক্ষার্থীর সঠিক মূল্যায়ন ও ব্যাচ নিশ্চিত করতে সরাসরি অফিসে এসে ভর্তি সম্পন্ন করুন।",
    admissionsNoticeTitle: "ভর্তি সংক্রান্ত প্রাতিষ্ঠানিক নিয়মাবলী (সরাসরি ভর্তি বাধ্যতামূলক)",
    admissionsNoticeText:
      "আমাদের কোচিং সেন্টারে গুণগত মান বজায় রাখা এবং উপযুক্ত ব্যাচ নির্বাচনের স্বার্থে কোনো অনলাইন ভর্তি আবেদন ফরম রাখা হয়নি। শিক্ষার্থী বা সম্মানিত অভিভাবককে সরাসরি আমাদের শাখায় উপস্থিত হয়ে ভর্তি কার্যক্রম সম্পন্ন করতে হবে। কোচিংয়ের প্রধান অ্যাডমিন বা অনুমোদিত কর্মকর্তা সরাসরি সফটওয়্যারে শিক্ষার্থীর তথ্য এন্ট্রি করে ভর্তি সম্পন্ন করবেন।",
    admissionSteps: [
      {
        num: "১",
        title: "ক্যাম্পাসে সরাসরি আগমন ও কাউন্সিলিং",
        desc: "শিক্ষার্থী অথবা অভিভাবককে সরাসরি আমাদের কোচিং সেন্টারে উপস্থিত হতে হবে। অভিজ্ঞ শিক্ষক ও কাউন্সিলর শিক্ষার্থীর পূর্ববর্তী ফলাফল ও শিখন ঘাটতি বিশ্লেষণ করে সঠিক ব্যাচ নির্ধারণ করে দেবেন।",
      },
      {
        num: "২",
        title: "প্রয়োজনীয় কাগজপত্র যাচাই ও জমা",
        desc: "শিক্ষার্থীর ২ কপি পাসপোর্ট ছবি, পূর্ববর্তী শ্রেণির সর্বশেষ পরীক্ষার মার্কশিটের কপি এবং অভিভাবকের পরিচয়পত্রের তথ্য অফিসে সরাসরি জমা দিতে হবে।",
      },
      {
        num: "৩",
        title: "অ্যাডমিন কর্তৃক সফটওয়্যারে রেজিস্ট্রেশন",
        desc: "কোচিংয়ের প্রধান অ্যাডমিন বা অনুমোদিত কর্মকর্তা সরাসরি আমাদের সেন্ট্রাল ম্যানেজমেন্ট সফটওয়্যারে শিক্ষার্থীর যাবতীয় তথ্য এন্ট্রি করে একটি ইউনিক ডিজিটাল স্টুডেন্ট আইডি জেনারেট করবেন।",
      },
      {
        num: "৪",
        title: "ফি প্রদান, আইডি কার্ড ও শিট সংগ্রহ",
        desc: "অফিস কাউন্টারে ভর্তি ফি ও প্রথম মাসের টিউশন ফি পরিশোধ করে ডিজিটাল স্টুডেন্ট আইডি কার্ড, ক্লাস রুটিন এবং প্রথম মাসের লেকচার শিট সংগ্রহ করে ক্লাস শুরু করা যাবে।",
      },
    ],
    admissionRequirements: [
      "শিক্ষার্থীর সাম্প্রতিক ২ কপি রঙিন পাসপোর্ট সাইজ ছবি (ডিজিটাল স্টুডেন্ট আইডি ও অফিশিয়াল ফাইলে সংযুক্ত করার জন্য)",
      "বিগত শ্রেণির সর্বশেষ পরীক্ষার ফলাফল বা মূল/অনলাইন মার্কশিট (শিক্ষার্থীর মেধা ও শিখন স্তর মূল্যায়নের জন্য)",
      "পিতা / মাতার জাতীয় পরিচয়পত্রের (NID) বা জন্ম নিবন্ধনের ফটোকপি (অভিভাবকের প্রাতিষ্ঠানিক রেকর্ড সংরক্ষণের জন্য)",
      "সচল অভিভাবক ও শিক্ষার্থীর মোবাইল নম্বর (দৈনিক ক্লাসরুম হাজিরা, পরীক্ষার নম্বর ও নোটিফিকেশন এসএমএসের জন্য)",
    ],
    // Contact
    contactPageTitle: "আমাদের সাথে যোগাযোগের উপায়",
    contactPageSubtitle:
      "ভর্তি, ব্যাচ তথ্য বা অ্যাকাডেমিক যেকোনো পরামর্শের জন্য সরাসরি আমাদের ক্যাম্পাসে চলে আসুন অথবা ফোনে যোগাযোগ করুন।",
    contactOfficeHours: "সকাল ৮:০০ - রাত ৮:০০ (প্রতিদিন)",
    contactMapEmbedUrl: "",
  });

  const [phoneInput, setPhoneInput] = useState("");
  const [newHighlight, setNewHighlight] = useState("");
  const [newRequirement, setNewRequirement] = useState("");

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/site-settings", { credentials: "include" });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "সেটিংস লোড করা সম্ভব হয়নি।");
      }
      if (json.data) {
        const d = json.data;
        setFormData((prev) => ({
          ...prev,
          institutionName: d.institutionName || prev.institutionName,
          shortName: d.shortName || prev.shortName,
          motto: d.motto || prev.motto,
          logoUrl: d.logoUrl || prev.logoUrl,
          bannerUrl: d.bannerUrl || prev.bannerUrl,
          phones: d.phones?.length ? d.phones : prev.phones,
          email: d.email || prev.email,
          address: d.address || prev.address,
          officeHours: d.officeHours || prev.officeHours,
          whatsAppNumber: d.whatsAppNumber || prev.whatsAppNumber,
          whatsAppPrefillMessage: d.whatsAppPrefillMessage || prev.whatsAppPrefillMessage,
          isWhatsAppEnabled: d.isWhatsAppEnabled ?? prev.isWhatsAppEnabled,
          allowTeacherStudentMessaging:
            d.allowTeacherStudentMessaging ?? prev.allowTeacherStudentMessaging,
          admissionNotice: d.admissionNotice || prev.admissionNotice,
          isAdmissionOpen: d.isAdmissionOpen ?? prev.isAdmissionOpen,
          metaDescription: d.metaDescription || prev.metaDescription,
          socialLinks: d.socialLinks || prev.socialLinks,
          // Home
          heroTitle: d.heroTitle || prev.heroTitle,
          heroSubtitle: d.heroSubtitle || prev.heroSubtitle,
          homeStats: d.homeStats?.length ? d.homeStats : prev.homeStats,
          homeClasses: d.homeClasses?.length ? d.homeClasses : prev.homeClasses,
          homeFeatures: d.homeFeatures?.length ? d.homeFeatures : prev.homeFeatures,
          classroomGallery: d.classroomGallery?.length ? d.classroomGallery : prev.classroomGallery,
          homeCtaTitle: d.homeCtaTitle || prev.homeCtaTitle,
          homeCtaText: d.homeCtaText || prev.homeCtaText,
          // About
          aboutTitle: d.aboutTitle || prev.aboutTitle,
          aboutText: d.aboutText || prev.aboutText,
          aboutStoryParagraph2: d.aboutStoryParagraph2 || prev.aboutStoryParagraph2,
          aboutMission: d.aboutMission || prev.aboutMission,
          aboutVision: d.aboutVision || prev.aboutVision,
          aboutValues: d.aboutValues || prev.aboutValues,
          aboutHighlights: d.aboutHighlights?.length ? d.aboutHighlights : prev.aboutHighlights,
          // Classes
          classesPageTitle: d.classesPageTitle || prev.classesPageTitle,
          classesPageSubtitle: d.classesPageSubtitle || prev.classesPageSubtitle,
          classPrograms: d.classPrograms?.length ? d.classPrograms : prev.classPrograms,
          // Admissions
          admissionsPageTitle: d.admissionsPageTitle || prev.admissionsPageTitle,
          admissionsPageSubtitle: d.admissionsPageSubtitle || prev.admissionsPageSubtitle,
          admissionsNoticeTitle: d.admissionsNoticeTitle || prev.admissionsNoticeTitle,
          admissionsNoticeText: d.admissionsNoticeText || prev.admissionsNoticeText,
          admissionSteps: d.admissionSteps?.length ? d.admissionSteps : prev.admissionSteps,
          admissionRequirements: d.admissionRequirements?.length
            ? d.admissionRequirements
            : prev.admissionRequirements,
          // Contact
          contactPageTitle: d.contactPageTitle || prev.contactPageTitle,
          contactPageSubtitle: d.contactPageSubtitle || prev.contactPageSubtitle,
          contactOfficeHours: d.contactOfficeHours || prev.contactOfficeHours,
          contactMapEmbedUrl: d.contactMapEmbedUrl || prev.contactMapEmbedUrl,
        }));
        setPhoneInput((d.phones || []).join(", "));
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "ডাটা লোড করতে সমস্যা হয়েছে।");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleSaveSettings = async () => {
    setSaving(true);
    const phonesArray = phoneInput
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);

    const payload = {
      ...formData,
      phones: phonesArray,
    };

    try {
      const res = await fetch("/api/site-settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.message || "সংরক্ষণ করতে সমস্যা হয়েছে।");
      }

      dispatch(
        addNotification({
          type: "success",
          title: "সংরক্ষণ সফল",
          message: "ওয়েবসাইট ও প্রতিষ্ঠানের কনফিগারেশন সফলভাবে আপডেট হয়েছে।",
        })
      );

      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("site-settings-updated"));
      }
    } catch (err: unknown) {
      dispatch(
        addNotification({
          type: "error",
          title: "সংরক্ষণ ব্যর্থ",
          message: err instanceof Error ? err.message : "সমস্যা হয়েছে।",
        })
      );
    } finally {
      setSaving(false);
    }
  };

  const tabs = [
    { id: "branding", label: "ব্র্যান্ডিং ও পরিচয়", icon: Building },
    { id: "contact", label: "যোগাযোগ ও সোশ্যাল", icon: Phone },
    { id: "home", label: "হোম পেজ কনটেন্ট", icon: Home },
    { id: "about", label: "আমাদের সম্পর্কে পেজ", icon: BookOpen },
    { id: "classes", label: "পাঠদান ও ব্যাচ পেজ", icon: GraduationCap },
    { id: "admissions", label: "ভর্তি নির্দেশিকা পেজ", icon: FileCheck },
  ] as const;

  return (
    <div className="space-y-6">
      <PageHeader
        title="প্রতিষ্ঠান ও কনটেন্ট ম্যানেজমেন্ট (Site Settings & CMS)"
        subtitle="প্রতিষ্ঠানের লোগো, ব্যানার, হোমপেজ, অ্যাবাউট পেজ, ব্যাচ পেজ, ভর্তি নির্দেশিকা ও যোগাযোগের সম্পূর্ণ কনটেন্ট পরিচালনা করুন"
        breadcrumbs={[{ label: "ড্যাশবোর্ড", href: "/admin" }, { label: "সেটিংস ও কনটেন্ট" }]}
        actions={
          <Button
            onClick={handleSaveSettings}
            disabled={saving || loading}
            className="flex items-center gap-1.5 bg-[#0274b3] hover:bg-[#015b93] text-white shadow-xs"
          >
            <Save className="h-4 w-4" />
            <span>{saving ? "সংরক্ষণ হচ্ছে..." : "পরিবর্তন সংরক্ষণ করুন"}</span>
          </Button>
        }
      />

      {error && (
        <Alert variant="danger" title="ত্রুটি">
          {error}
        </Alert>
      )}

      {/* Tabs Navigation Bar */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-t-xl text-xs sm:text-sm font-semibold transition border-b-2 whitespace-nowrap ${
                isActive
                  ? "border-[#0274b3] text-[#0274b3] bg-white shadow-2xs"
                  : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Icon className={`h-4 w-4 ${isActive ? "text-[#0274b3]" : "text-slate-400"}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-48 w-full" />
          <Skeleton className="h-48 w-full" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* TAB 1: BRANDING & IDENTITY */}
          {activeTab === "branding" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <Card className="shadow-xs">
                <CardHeader className="pb-3 border-b border-slate-100">
                  <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <Building className="h-4 w-4 text-[#0274b3]" />
                    <span>প্রাতিষ্ঠানিক পরিচয় ও সাধারণ তথ্য</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        প্রতিষ্ঠানের পূর্ণ নাম
                      </label>
                      <Input
                        value={formData.institutionName}
                        onChange={(e) =>
                          setFormData({ ...formData, institutionName: e.target.value })
                        }
                        placeholder="যেমন: আল-হিকমাহ্ কোচিং সেন্টার"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        সংক্ষিপ্ত নাম (Short Name)
                      </label>
                      <Input
                        value={formData.shortName}
                        onChange={(e) =>
                          setFormData({ ...formData, shortName: e.target.value })
                        }
                        placeholder="যেমন: আল-হিকমাহ্"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        মূল স্লোগান (Motto)
                      </label>
                      <Input
                        value={formData.motto}
                        onChange={(e) => setFormData({ ...formData, motto: e.target.value })}
                        placeholder="যেমন: আলোর পথে সফলতা প্রাপ্তির প্রচেষ্টায়..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        অফিস খোলার সময়সূচী (Office Hours)
                      </label>
                      <Input
                        value={formData.officeHours || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, officeHours: e.target.value })
                        }
                        placeholder="সকাল ৮:০০ - রাত ৮:০০ (প্রতিদিন)"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        ক্যাম্পাস ঠিকানা
                      </label>
                      <Input
                        value={formData.address}
                        onChange={(e) =>
                          setFormData({ ...formData, address: e.target.value })
                        }
                        placeholder="বি-ব্লক, হালিশহর, চট্টগ্রাম"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        সার্চ ইঞ্জিন মেটা বিবরণ (SEO Meta Description)
                      </label>
                      <Input
                        value={formData.metaDescription}
                        onChange={(e) =>
                          setFormData({ ...formData, metaDescription: e.target.value })
                        }
                        placeholder="গুগল সার্চে প্রদর্শিত সংক্ষিপ্ত প্রাতিষ্ঠানিক বিবরণ..."
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Institution Logo Changer */}
              <Card className="shadow-xs border-slate-200">
                <CardHeader className="pb-3 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                      <Building className="h-4 w-4 text-[#0274b3]" />
                      <span>প্রতিষ্ঠানের অফিসিয়াল লোগো (Logo Changer)</span>
                    </CardTitle>
                    {formData.logoUrl && formData.logoUrl !== "/images/logo.png" && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setFormData({ ...formData, logoUrl: "/images/logo.png" })
                        }
                        className="text-xs h-7 text-slate-600 border-slate-200 hover:bg-slate-50"
                      >
                        ডিফল্ট লোগোতে ফিরুন
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  <ImageUpload
                    value={formData.logoUrl}
                    onChange={(url) =>
                      setFormData({ ...formData, logoUrl: url || "/images/logo.png" })
                    }
                    folder="general"
                    aspectRatio="square"
                    objectFit="contain"
                    label="কোচিং এর প্রধান অফিসিয়াল লোগো"
                    description="মানি রসিদ (Money Receipt), ড্যাশবোর্ড হেডার, পাবলিক ওয়েবসাইট এবং সাইডবারে প্রদর্শিত অফিসিয়াল লোগো। স্বচ্ছ ব্যাকগ্রাউন্ডের PNG বা বর্গাকার লোগো ছবি আপলোড করুন।"
                  />
                </CardContent>
              </Card>

              {/* Homepage Banner Image */}
              <Card className="shadow-xs border-slate-200">
                <CardHeader className="pb-3 border-b border-slate-100">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                      <Globe className="h-4 w-4 text-[#0274b3]" />
                      <span>হোমপেজ ব্যানার ইমেজ (Full Width Hero Banner)</span>
                    </CardTitle>
                    {formData.bannerUrl !== "/images/banner.png" && (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setFormData({ ...formData, bannerUrl: "/images/banner.png" })
                        }
                        className="text-xs h-7 text-slate-600 border-slate-200 hover:bg-slate-50"
                      >
                        ডিফল্ট ব্যানারে ফিরুন
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  <ImageUpload
                    value={formData.bannerUrl}
                    onChange={(url) =>
                      setFormData({ ...formData, bannerUrl: url || "/images/banner.png" })
                    }
                    folder="banners"
                    aspectRatio="banner"
                    label="মূল হোমপেজ ব্যানার"
                    description="হোমপেজের শীর্ষে পূর্ণ-প্রস্থে (Full Width) এই ব্যানারটি প্রদর্শিত হবে। নতুন ছবি আপলোড করলে ওয়েবসাইট তাৎক্ষণিকভাবে নতুন ব্যানার প্রদর্শন করবে।"
                  />
                </CardContent>
              </Card>
            </div>
          )}

          {/* TAB 2: CONTACT & HELPLINE */}
          {activeTab === "contact" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <Card className="shadow-xs">
                <CardHeader className="pb-3 border-b border-slate-100">
                  <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <Phone className="h-4 w-4 text-[#c27a29]" />
                    <span>হেল্পলাইন, ইমেইল ও হোয়াটসঅ্যাপ</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        যোগাযোগের ফোন নম্বরসমূহ (কমা দিয়ে লিখুন)
                      </label>
                      <Input
                        value={phoneInput}
                        onChange={(e) => setPhoneInput(e.target.value)}
                        placeholder="০১৬৪২-৭৩৩১০৬, ০১৮২৪-০৬৬৫৫৫"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        হোয়াটসঅ্যাপ নম্বর (দেশ কোডসহ)
                      </label>
                      <Input
                        value={formData.whatsAppNumber}
                        onChange={(e) =>
                          setFormData({ ...formData, whatsAppNumber: e.target.value })
                        }
                        placeholder="+8801859787399"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        অফিসিয়াল ইমেইল
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="info@alhikmah.edu.bd"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      হোয়াটসঅ্যাপ প্রাক-নির্ধারিত মেসেজ (Prefilled Chat Message)
                    </label>
                    <Input
                      value={formData.whatsAppPrefillMessage || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, whatsAppPrefillMessage: e.target.value })
                      }
                      placeholder="আসসালামু আলাইকুম, আমি কোচিং এ ভর্তির ব্যাপারে তথ্য জানতে চাচ্ছি।"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
                    <label className="flex items-center gap-2.5 p-3 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100/70 transition">
                      <input
                        type="checkbox"
                        checked={formData.isWhatsAppEnabled ?? true}
                        onChange={(e) =>
                          setFormData({ ...formData, isWhatsAppEnabled: e.target.checked })
                        }
                        className="h-4 w-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                      />
                      <div>
                        <span className="text-xs font-semibold text-slate-800 block">
                          ওয়েবসাইটে ফ্লোটিং হোয়াটসঅ্যাপ বাটন প্রদর্শন করুন
                        </span>
                        <span className="text-[11px] text-slate-500">
                          সক্রিয় থাকলে পাবলিক পোর্টালের সব পেজে সবুজ চ্যাট বাটনটি ভেসে থাকবে।
                        </span>
                      </div>
                    </label>

                    <label className="flex items-center gap-2.5 p-3 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer hover:bg-slate-100/70 transition">
                      <input
                        type="checkbox"
                        checked={formData.allowTeacherStudentMessaging ?? true}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            allowTeacherStudentMessaging: e.target.checked,
                          })
                        }
                        className="h-4 w-4 text-primary-600 rounded border-slate-300 focus:ring-primary-500"
                      />
                      <div>
                        <span className="text-xs font-semibold text-slate-800 block">
                          শিক্ষক-শিক্ষার্থী সরাসরি ইন-অ্যাপ চ্যাট অনুমতি
                        </span>
                        <span className="text-[11px] text-slate-500">
                          নিষ্ক্রিয় থাকলে শিক্ষক ও শিক্ষার্থী কেবল প্রশাসনের সাথে মেসেজ করতে পারবে।
                        </span>
                      </div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      গুগল ম্যাপস এমবেড লিংক (Google Maps Embed URL / Iframe src)
                    </label>
                    <Input
                      value={formData.contactMapEmbedUrl || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, contactMapEmbedUrl: e.target.value })
                      }
                      placeholder="https://www.google.com/maps/embed?pb=..."
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      গুগল ম্যাপস থেকে Share - Embed a map অপশনের iframe src লিংকটি এখানে দিন। খালি রাখলে সাধারণ ম্যাপ কার্ড প্রদর্শিত হবে।
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Social Media Links */}
              <Card className="shadow-xs">
                <CardHeader className="pb-3 border-b border-slate-100">
                  <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <Share2 className="h-4 w-4 text-blue-600" />
                    <span>সোশ্যাল মিডিয়া পেজের লিংকসমূহ</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        ফেসবুক পেজ লিংক
                      </label>
                      <Input
                        value={formData.socialLinks.facebook || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            socialLinks: {
                              ...formData.socialLinks,
                              facebook: e.target.value,
                            },
                          })
                        }
                        placeholder="https://facebook.com/..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        ইউটিউব চ্যানেল
                      </label>
                      <Input
                        value={formData.socialLinks.youtube || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            socialLinks: { ...formData.socialLinks, youtube: e.target.value },
                          })
                        }
                        placeholder="https://youtube.com/..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        ইনস্টাগ্রাম
                      </label>
                      <Input
                        value={formData.socialLinks.instagram || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            socialLinks: {
                              ...formData.socialLinks,
                              instagram: e.target.value,
                            },
                          })
                        }
                        placeholder="https://instagram.com/..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        লিঙ্কডইন (LinkedIn)
                      </label>
                      <Input
                        value={formData.socialLinks.linkedin || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            socialLinks: {
                              ...formData.socialLinks,
                              linkedin: e.target.value,
                            },
                          })
                        }
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        এক্স / টুইটার (X)
                      </label>
                      <Input
                        value={formData.socialLinks.twitter || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            socialLinks: {
                              ...formData.socialLinks,
                              twitter: e.target.value,
                            },
                          })
                        }
                        placeholder="https://x.com/..."
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* TAB 3: HOME PAGE CMS */}
          {activeTab === "home" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Hero Banner Text */}
              <Card className="shadow-xs">
                <CardHeader className="pb-3 border-b border-slate-100">
                  <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <Home className="h-4 w-4 text-[#0274b3]" />
                    <span>হোমপেজ প্রধান ব্যানার বার্তা (Hero Section Text)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      হিরো সেকশন প্রধান শিরোনাম (Hero Title)
                    </label>
                    <Input
                      value={formData.heroTitle || ""}
                      onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                      placeholder="সেরা প্রস্তুতিতে গড়ে তুলুন নিশ্চিত ভবিষ্যৎ"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      হিরো সেকশন বিস্তারিত বিবরণী (Hero Subtitle)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.heroSubtitle || ""}
                      onChange={(e) => setFormData({ ...formData, heroSubtitle: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0274b3]"
                      placeholder="প্লে থেকে ৫ম (প্রাথমিক) ও ৬ষ্ঠ থেকে ১০ম শ্রেণি (মাধ্যমিক)..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Statistics Counters */}
              <Card className="shadow-xs">
                <CardHeader className="pb-3 border-b border-slate-100">
                  <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#c27a29]" />
                    <span>সাফল্যের পরিসংখ্যান কাউন্টার (Home Statistics 4 Cards)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.homeStats.map((stat, sIdx) => (
                      <div key={sIdx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                        <span className="text-[11px] font-bold text-slate-500 uppercase">
                          কাউন্টার {sIdx + 1}
                        </span>
                        <div>
                          <label className="block text-[10px] text-slate-500 mb-0.5">লেবেল</label>
                          <Input
                            value={stat.label}
                            onChange={(e) => {
                              const updated = [...formData.homeStats];
                              updated[sIdx].label = e.target.value;
                              setFormData({ ...formData, homeStats: updated });
                            }}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 mb-0.5">মান / সংখ্যা</label>
                          <Input
                            value={stat.value}
                            onChange={(e) => {
                              const updated = [...formData.homeStats];
                              updated[sIdx].value = e.target.value;
                              setFormData({ ...formData, homeStats: updated });
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Why Choose Us Features */}
              <Card className="shadow-xs">
                <CardHeader className="pb-3 border-b border-slate-100">
                  <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>আমাদের বিশেষত্ব (Why Choose Us - 6 Features)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {formData.homeFeatures.map((feat, fIdx) => (
                      <div key={fIdx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                        <span className="text-[11px] font-bold text-slate-500 uppercase">
                          বিশেষত্ব #{fIdx + 1}
                        </span>
                        <div>
                          <label className="block text-[10px] text-slate-500 mb-0.5">শিরোনাম</label>
                          <Input
                            value={feat.title}
                            onChange={(e) => {
                              const updated = [...formData.homeFeatures];
                              updated[fIdx].title = e.target.value;
                              setFormData({ ...formData, homeFeatures: updated });
                            }}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 mb-0.5">বর্ণনা</label>
                          <textarea
                            rows={3}
                            value={feat.description}
                            onChange={(e) => {
                              const updated = [...formData.homeFeatures];
                              updated[fIdx].description = e.target.value;
                              setFormData({ ...formData, homeFeatures: updated });
                            }}
                            className="w-full p-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0274b3]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Classroom & Campus Gallery */}
              <Card className="shadow-xs">
                <CardHeader className="pb-3 border-b border-slate-100">
                  <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <Images className="h-4 w-4 text-purple-600" />
                    <span>ক্যাম্পাস ও শ্রেণিকক্ষ গ্যালারি ছবি ও বিবরণী (Classroom Gallery)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {formData.classroomGallery.map((room, rIdx) => (
                      <div key={rIdx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#0274b3]">
                            শ্রেণিকক্ষ #{rIdx + 1}
                          </span>
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-slate-700 mb-1">
                            রুমের ছবি
                          </label>
                          <ImageUpload
                            value={room.imageSrc}
                            onChange={(url) => {
                              const updated = [...formData.classroomGallery];
                              updated[rIdx].imageSrc = url;
                              setFormData({ ...formData, classroomGallery: updated });
                            }}
                            folder="general"
                            aspectRatio="banner"
                            label={`রুম #${rIdx + 1} ছবি আপলোড`}
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] text-slate-500 mb-0.5">টাইটেল</label>
                            <Input
                              value={room.title}
                              onChange={(e) => {
                                const updated = [...formData.classroomGallery];
                                updated[rIdx].title = e.target.value;
                                setFormData({ ...formData, classroomGallery: updated });
                              }}
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-slate-500 mb-0.5">ব্যাজ</label>
                            <Input
                              value={room.badge}
                              onChange={(e) => {
                                const updated = [...formData.classroomGallery];
                                updated[rIdx].badge = e.target.value;
                                setFormData({ ...formData, classroomGallery: updated });
                              }}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] text-slate-500 mb-0.5">বিবরণ</label>
                          <textarea
                            rows={2}
                            value={room.description}
                            onChange={(e) => {
                              const updated = [...formData.classroomGallery];
                              updated[rIdx].description = e.target.value;
                              setFormData({ ...formData, classroomGallery: updated });
                            }}
                            className="w-full p-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0274b3]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Home CTA Banner */}
              <Card className="shadow-xs">
                <CardHeader className="pb-3 border-b border-slate-100">
                  <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <Globe className="h-4 w-4 text-[#0274b3]" />
                    <span>হোমপেজ নিচের ভর্তি আহ্বান ব্যানার (Admission CTA Banner)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      ব্যানার শিরোনাম
                    </label>
                    <Input
                      value={formData.homeCtaTitle || ""}
                      onChange={(e) => setFormData({ ...formData, homeCtaTitle: e.target.value })}
                      placeholder="২০২৬ শিক্ষাবর্ষে আসন সংখ্যা সীমিত, আজই ভর্তি নিশ্চিত করুন"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      ব্যানার বিস্তারিত বক্তব্য
                    </label>
                    <textarea
                      rows={2}
                      value={formData.homeCtaText || ""}
                      onChange={(e) => setFormData({ ...formData, homeCtaText: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0274b3]"
                      placeholder="শিক্ষার্থীকে সরাসরি কোচিং অফিসে এসে প্রয়োজনীয় কাগজপত্রসহ ভর্তি সম্পন্ন করতে হবে..."
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* TAB 4: ABOUT PAGE CMS */}
          {activeTab === "about" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <Card className="shadow-xs">
                <CardHeader className="pb-3 border-b border-slate-100">
                  <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-[#0274b3]" />
                    <span>আমাদের সম্পর্কে পেজের মূল বৃত্তান্ত (Story & Introduction)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      পরিচিতি সেকশনের শিরোনাম (About Title)
                    </label>
                    <Input
                      value={formData.aboutTitle || ""}
                      onChange={(e) => setFormData({ ...formData, aboutTitle: e.target.value })}
                      placeholder="শিক্ষার্থীদের মেধা বিকাশ ও বোর্ড পরীক্ষায় শ্রেষ্ঠত্ব অর্জনে আমরা অঙ্গীকারাবদ্ধ"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      প্রথম অনুচ্ছেদ (Paragraph 1)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.aboutText || ""}
                      onChange={(e) => setFormData({ ...formData, aboutText: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0274b3]"
                      placeholder="আল-হিকমাহ্ কোচিং সেন্টার চট্টগ্রাম হালিশহরে প্রতিষ্ঠিত একটি প্রথম সারির পাঠদান কেন্দ্র..."
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      দ্বিতীয় অনুচ্ছেদ (Paragraph 2)
                    </label>
                    <textarea
                      rows={3}
                      value={formData.aboutStoryParagraph2 || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, aboutStoryParagraph2: e.target.value })
                      }
                      className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0274b3]"
                      placeholder="আমরা বিশ্বাস করি প্রতিটি শিক্ষার্থীর মধ্যেই বিশেষ মেধা রয়েছে..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Core Pillars (Mission, Vision, Values) */}
              <Card className="shadow-xs">
                <CardHeader className="pb-3 border-b border-slate-100">
                  <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>আমাদের মূলনীতিসমূহ (Mission, Vision, Values)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      আমাদের লক্ষ্য (Mission)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.aboutMission || ""}
                      onChange={(e) => setFormData({ ...formData, aboutMission: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0274b3]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      আমাদের দৃষ্টিভঙ্গি (Vision)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.aboutVision || ""}
                      onChange={(e) => setFormData({ ...formData, aboutVision: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0274b3]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      আদর্শ ও মূল্যবোধ (Core Values)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.aboutValues || ""}
                      onChange={(e) => setFormData({ ...formData, aboutValues: e.target.value })}
                      className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0274b3]"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* About Highlights */}
              <Card className="shadow-xs">
                <CardHeader className="pb-3 border-b border-slate-100">
                  <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#c27a29]" />
                    <span>প্রতিষ্ঠানের বিশেষ সুবিধাসমূহ (Highlights List)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  <div className="space-y-2">
                    {formData.aboutHighlights.map((hl, hIdx) => (
                      <div key={hIdx} className="flex items-center gap-2">
                        <Input
                          value={hl}
                          onChange={(e) => {
                            const updated = [...formData.aboutHighlights];
                            updated[hIdx] = e.target.value;
                            setFormData({ ...formData, aboutHighlights: updated });
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = formData.aboutHighlights.filter((_, i) => i !== hIdx);
                            setFormData({ ...formData, aboutHighlights: updated });
                          }}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <Input
                      value={newHighlight}
                      onChange={(e) => setNewHighlight(e.target.value)}
                      placeholder="নতুন সুবিধা বা পয়েন্ট লিখুন..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && newHighlight.trim()) {
                          e.preventDefault();
                          setFormData({
                            ...formData,
                            aboutHighlights: [...formData.aboutHighlights, newHighlight.trim()],
                          });
                          setNewHighlight("");
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        if (newHighlight.trim()) {
                          setFormData({
                            ...formData,
                            aboutHighlights: [...formData.aboutHighlights, newHighlight.trim()],
                          });
                          setNewHighlight("");
                        }
                      }}
                    >
                      <Plus className="h-4 w-4 mr-1" /> যোগ করুন
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* TAB 5: CLASSES / BATCHES PAGE CMS */}
          {activeTab === "classes" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <Card className="shadow-xs">
                <CardHeader className="pb-3 border-b border-slate-100">
                  <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-[#0274b3]" />
                    <span>পাঠদান পেজ হেডার শিরোনাম ও বিবরণ (Header CMS)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      পেজ শিরোনাম
                    </label>
                    <Input
                      value={formData.classesPageTitle || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, classesPageTitle: e.target.value })
                      }
                      placeholder="পাঠদান বিভাগ ও সক্রিয় ব্যাচসমূহ"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      পেজ সাবটাইটেল
                    </label>
                    <Input
                      value={formData.classesPageSubtitle || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, classesPageSubtitle: e.target.value })
                      }
                      placeholder="প্লে থেকে ১০ম শ্রেণি এবং কওমী ও আলিয়া মাদ্রাসার শিক্ষার্থীদের জন্য..."
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Class Programs */}
              <Card className="shadow-xs">
                <CardHeader className="pb-3 border-b border-slate-100">
                  <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-[#c27a29]" />
                    <span>৪টি পাঠদান কাঠামো (Class Programs 4 Categories)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {formData.classPrograms.map((prog, pIdx) => (
                      <div key={pIdx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-[#0274b3]">
                            বিভাগ #{pIdx + 1}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <label className="block text-[10px] text-slate-500 mb-0.5">টাইটেল</label>
                            <Input
                              value={prog.title}
                              onChange={(e) => {
                                const updated = [...formData.classPrograms];
                                updated[pIdx].title = e.target.value;
                                setFormData({ ...formData, classPrograms: updated });
                              }}
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] text-slate-500 mb-0.5">ব্যাজ</label>
                            <Input
                              value={prog.badge}
                              onChange={(e) => {
                                const updated = [...formData.classPrograms];
                                updated[pIdx].badge = e.target.value;
                                setFormData({ ...formData, classPrograms: updated });
                              }}
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[10px] text-slate-500 mb-0.5">বর্ণনা</label>
                          <textarea
                            rows={2}
                            value={prog.description}
                            onChange={(e) => {
                              const updated = [...formData.classPrograms];
                              updated[pIdx].description = e.target.value;
                              setFormData({ ...formData, classPrograms: updated });
                            }}
                            className="w-full p-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0274b3]"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] text-slate-500 mb-0.5">
                            ফিচার পয়েন্টসমূহ (কমা দিয়ে লিখুন)
                          </label>
                          <Input
                            value={prog.features.join(", ")}
                            onChange={(e) => {
                              const updated = [...formData.classPrograms];
                              updated[pIdx].features = e.target.value
                                .split(",")
                                .map((s) => s.trim())
                                .filter(Boolean);
                              setFormData({ ...formData, classPrograms: updated });
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* TAB 6: ADMISSIONS PAGE CMS */}
          {activeTab === "admissions" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Admission Notice & Status */}
              <Card className="shadow-xs">
                <CardHeader className="pb-3 border-b border-slate-100">
                  <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <FileCheck className="h-4 w-4 text-emerald-600" />
                    <span>ভর্তি চলার ব্যানার ও স্ট্যাটাস</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="flex items-center gap-2 p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <input
                      type="checkbox"
                      id="admissionStatusCheck"
                      checked={formData.isAdmissionOpen}
                      onChange={(e) =>
                        setFormData({ ...formData, isAdmissionOpen: e.target.checked })
                      }
                      className="h-4 w-4 rounded border-slate-300 text-[#0274b3] focus:ring-[#0274b3]"
                    />
                    <label
                      htmlFor="admissionStatusCheck"
                      className="text-xs font-semibold text-slate-800 cursor-pointer"
                    >
                      ওয়েবসাইটে <span className="text-emerald-700 font-bold">&quot;ভর্তি চলছে (Admission On)&quot;</span> স্ট্যাটাস সক্রিয় রাখুন
                    </label>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      ভর্তি চলার কেন্দ্রীয় ব্যানার বার্তা (Admission Notice Ribbon)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.admissionNotice}
                      onChange={(e) =>
                        setFormData({ ...formData, admissionNotice: e.target.value })
                      }
                      className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0274b3]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        ভর্তি পেজ হেডার শিরোনাম
                      </label>
                      <Input
                        value={formData.admissionsPageTitle || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, admissionsPageTitle: e.target.value })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1">
                        ভর্তি পেজ হেডার সাবটাইটেল
                      </label>
                      <Input
                        value={formData.admissionsPageSubtitle || ""}
                        onChange={(e) =>
                          setFormData({ ...formData, admissionsPageSubtitle: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Physical Admission Notice Box */}
              <Card className="shadow-xs">
                <CardHeader className="pb-3 border-b border-slate-100">
                  <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-600" />
                    <span>সরাসরি ভর্তি নিয়মাবলী নোটিশ বক্স (Physical Admission Notice)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      নোটিশ বক্স শিরোনাম
                    </label>
                    <Input
                      value={formData.admissionsNoticeTitle || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, admissionsNoticeTitle: e.target.value })
                      }
                      placeholder="ভর্তি সংক্রান্ত প্রাতিষ্ঠানিক নিয়মাবলী (সরাসরি ভর্তি বাধ্যতামূলক)"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">
                      নোটিশ বক্স বিস্তারিত নির্দেশিকা
                    </label>
                    <textarea
                      rows={3}
                      value={formData.admissionsNoticeText || ""}
                      onChange={(e) =>
                        setFormData({ ...formData, admissionsNoticeText: e.target.value })
                      }
                      className="w-full p-2.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0274b3]"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Admission 4 Steps */}
              <Card className="shadow-xs">
                <CardHeader className="pb-3 border-b border-slate-100">
                  <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#0274b3]" />
                    <span>ভর্তি সম্পন্ন করার ৪টি ধাপ (4 Steps)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {formData.admissionSteps.map((st, sIdx) => (
                      <div key={sIdx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                        <span className="text-[11px] font-bold text-slate-500 uppercase">
                          ধাপ {st.num || sIdx + 1}
                        </span>
                        <div>
                          <label className="block text-[10px] text-slate-500 mb-0.5">ধাপের নাম</label>
                          <Input
                            value={st.title}
                            onChange={(e) => {
                              const updated = [...formData.admissionSteps];
                              updated[sIdx].title = e.target.value;
                              setFormData({ ...formData, admissionSteps: updated });
                            }}
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] text-slate-500 mb-0.5">বিস্তারিত বিবরণ</label>
                          <textarea
                            rows={3}
                            value={st.desc}
                            onChange={(e) => {
                              const updated = [...formData.admissionSteps];
                              updated[sIdx].desc = e.target.value;
                              setFormData({ ...formData, admissionSteps: updated });
                            }}
                            className="w-full p-2 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-[#0274b3]"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Required Documents Checklist */}
              <Card className="shadow-xs">
                <CardHeader className="pb-3 border-b border-slate-100">
                  <CardTitle className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                    <FileCheck className="h-4 w-4 text-[#0274b3]" />
                    <span>ভর্তির জন্য প্রয়োজনীয় কাগজপত্র তালিকা (Required Documents)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-3">
                  <div className="space-y-2">
                    {formData.admissionRequirements.map((req, rIdx) => (
                      <div key={rIdx} className="flex items-center gap-2">
                        <Input
                          value={req}
                          onChange={(e) => {
                            const updated = [...formData.admissionRequirements];
                            updated[rIdx] = e.target.value;
                            setFormData({ ...formData, admissionRequirements: updated });
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = formData.admissionRequirements.filter((_, i) => i !== rIdx);
                            setFormData({ ...formData, admissionRequirements: updated });
                          }}
                          className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <Input
                      value={newRequirement}
                      onChange={(e) => setNewRequirement(e.target.value)}
                      placeholder="নতুন প্রয়োজনীয় কাগজপত্রের বিবরণ দিন..."
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && newRequirement.trim()) {
                          e.preventDefault();
                          setFormData({
                            ...formData,
                            admissionRequirements: [
                              ...formData.admissionRequirements,
                              newRequirement.trim(),
                            ],
                          });
                          setNewRequirement("");
                        }
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        if (newRequirement.trim()) {
                          setFormData({
                            ...formData,
                            admissionRequirements: [
                              ...formData.admissionRequirements,
                              newRequirement.trim(),
                            ],
                          });
                          setNewRequirement("");
                        }
                      }}
                    >
                      <Plus className="h-4 w-4 mr-1" /> যোগ করুন
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
