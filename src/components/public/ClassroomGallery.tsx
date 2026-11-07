"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Users,
  Eye,
  Sun,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";

export interface ClassroomItem {
  id: number;
  title: string;
  badge: string;
  description: string;
  features: string[];
  imageSrc: string;
}

export const defaultClassrooms: ClassroomItem[] = [
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

interface ClassroomGalleryProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  className?: string;
  items?: ClassroomItem[];
}

export function ClassroomGallery({
  title = "আমাদের সুশৃঙ্খল ক্লাসরুম ও পাঠদান পরিবেশ",
  subtitle = "কওমী ও আলিয়া মাদ্রাসার শিক্ষার্থীদের একাগ্র পাঠদান, আরামদায়ক পরিবেশ এবং আদর্শ শৃঙ্খলা নিশ্চিত করতে আল-হিকমাহ্-এর শ্রেণিকক্ষসমূহ",
  badgeText = "আল-হিকমাহ্ ক্লাসরুম ও ক্যাম্পাস",
  className = "",
  items,
}: ClassroomGalleryProps) {
  const displayItems = (items && items.length > 0 ? items : defaultClassrooms).map(
    (item, idx) => {
      const fallback = defaultClassrooms[idx] || defaultClassrooms[0];
      // Force Al-Hikmah real classroom photos if legacy classroom-*.jpg or placeholder is provided
      const isLegacy =
        !item.imageSrc ||
        item.imageSrc.includes("/images/classrooms/classroom-") ||
        item.imageSrc.includes("placeholder") ||
        item.imageSrc.includes("shikkhon");

      return {
        ...fallback,
        ...item,
        title: item.title || fallback.title,
        badge: item.badge || fallback.badge,
        description: item.description || fallback.description,
        features: item.features?.length ? item.features : fallback.features,
        imageSrc: isLegacy
          ? `/images/classrooms/al-hikmah-classroom-${(idx % 4) + 1}.jpg`
          : item.imageSrc,
      };
    }
  );
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActiveImageIndex(index);
  };

  const closeLightbox = () => {
    setActiveImageIndex(null);
  };

  const showNext = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex + 1) % displayItems.length);
  };

  const showPrev = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((activeImageIndex - 1 + displayItems.length) % displayItems.length);
  };

  const activeItem = activeImageIndex !== null ? displayItems[activeImageIndex] : null;

  return (
    <section className={`py-16 bg-white border-b border-slate-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Title Section */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f0f7ff] border border-[#e0f0fe] text-xs font-semibold text-[#0274b3]">
            <Sparkles className="h-3.5 w-3.5 text-[#c27a29]" />
            <span>{badgeText}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Feature Highlights Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-blue-100 text-[#0274b3] flex items-center justify-center shrink-0">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">সুশৃঙ্খল সিটিং</p>
              <p className="text-[10px] text-slate-500">কাঠের প্রশস্ত বেঞ্চ ও ডেস্ক</p>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-amber-100 text-[#c27a29] flex items-center justify-center shrink-0">
              <Sun className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">পর্যাপ্ত আলো-বাতাস</p>
              <p className="text-[10px] text-slate-500">স্বাস্থ্যকর ভেন্টিলেশন</p>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
              <Eye className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">বোর্ড ও ভিজ্যুয়াল ভিউ</p>
              <p className="text-[10px] text-slate-500">হোয়াইটবোর্ড ও সাধারণ জ্ঞান</p>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-blue-100 text-blue-800 flex items-center justify-center shrink-0">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-800">দীনি ও আদর্শ পরিবেশ</p>
              <p className="text-[10px] text-slate-500">কওমী ও আলিয়া স্পেশাল কেয়ার</p>
            </div>
          </div>
        </div>

        {/* 4 Classrooms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayItems.map((room, idx) => (
            <Card
              key={room.id}
              className="group overflow-hidden border border-slate-200 hover:border-[#0274b3] hover:shadow-lg transition-all duration-300 flex flex-col justify-between bg-white rounded-2xl"
            >
              {/* Photo Container */}
              <div
                className="relative h-56 w-full overflow-hidden bg-slate-100 cursor-pointer"
                onClick={() => openLightbox(idx)}
              >
                <Image
                  src={room.imageSrc}
                  alt={room.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#0274b3] text-white shadow-sm">
                    {room.badge}
                  </span>
                </div>

                {/* Zoom Hint Icon */}
                <div className="absolute bottom-3 right-3 h-8 w-8 rounded-full bg-white/80 backdrop-blur-xs text-slate-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                  <Maximize2 className="h-4 w-4 text-[#0274b3]" />
                </div>
              </div>

              {/* Details Content */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#0274b3] transition leading-snug">
                    {room.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-3">
                    {room.description}
                  </p>
                </div>

                {/* Feature Tags */}
                <div className="pt-3 border-t border-slate-100 space-y-1.5">
                  {room.features.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-center gap-1.5 text-[11px] text-slate-600"
                    >
                      <CheckCircle2 className="h-3 w-3 text-emerald-600 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* View Fullscreen Action */}
              <div className="px-4 pb-4 pt-1">
                <button
                  onClick={() => openLightbox(idx)}
                  className="w-full py-2 px-3 rounded-xl border border-slate-200 text-[11px] font-semibold text-slate-700 group-hover:border-[#0274b3] group-hover:text-[#0274b3] hover:bg-slate-50 transition flex items-center justify-center gap-1.5"
                >
                  <Eye className="h-3.5 w-3.5" />
                  <span>ছবিটি বড় করে দেখুন</span>
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Lightbox / Fullscreen Modal */}
      {activeItem && activeImageIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 z-60 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition focus:outline-hidden"
            aria-label="বন্ধ করুন"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Navigation Previous */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-60 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition focus:outline-hidden hidden sm:flex items-center justify-center"
            aria-label="পূর্ববর্তী ছবি"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Navigation Next */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-60 p-3 rounded-full bg-white/10 hover:bg-white/25 text-white transition focus:outline-hidden hidden sm:flex items-center justify-center"
            aria-label="পরবর্তী ছবি"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Image & Caption Card Container */}
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Main High-Res Image Display */}
            <div className="relative w-full h-[55vh] sm:h-[65vh] bg-black">
              <Image
                src={activeItem.imageSrc}
                alt={activeItem.title}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-contain"
              />
            </div>

            {/* Caption & Details Footer */}
            <div className="p-4 sm:p-5 bg-slate-900 text-white flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-t border-white/10">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#0274b3] text-white">
                    {activeItem.badge}
                  </span>
                  <h4 className="font-bold text-sm sm:text-base text-white">
                    {activeItem.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                  {activeItem.description}
                </p>
              </div>

              {/* Photo Counter */}
              <div className="text-xs font-semibold text-slate-400 shrink-0">
                ছবি {activeImageIndex + 1} / {displayItems.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
