import Link from "next/link";
import {
  BookOpen,
  Clock,
  Users,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  School,
  Wallet,
} from "lucide-react";
import { PublicHeader } from "@/components/layout/PublicHeader";
import { PublicFooter } from "@/components/layout/PublicFooter";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/Card";
import { ClassroomGallery } from "@/components/public/ClassroomGallery";
import { getActiveBatchesWithDetails, getSiteSettings } from "@/lib/public-data";
import { toBanglaNumber, formatTo12h } from "@/lib/utils";
import { IClassProgram } from "@/types/database";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "পাঠদান বিভাগ ও সক্রিয় ব্যাচসমূহ | আল-হিকমাহ্ কোচিং সেন্টার",
  description:
    "প্লে থেকে ৫ম শ্রেণি (প্রাথমিক বিভাগ) ও ৬ষ্ঠ থেকে ১০ম শ্রেণি (মাধ্যমিক বিভাগ) এবং কওমী ও আলিয়া মাদ্রাসার সময়সূচী, আসন সংখ্যা ও বিষয়ভিত্তিক ব্যাচ তালিকা।",
};

const classLevelLabels: Record<string, string> = {
  play: "প্লে শ্রেণি",
  nursery: "নার্সারি শ্রেণি",
  kg: "কেজি শ্রেণি",
  class_1: "১ম শ্রেণি",
  class_2: "২য় শ্রেণি",
  class_3: "৩য় শ্রেণি",
  class_4: "৪র্থ শ্রেণি",
  class_5: "৫ম শ্রেণি",
  class_6: "৬ষ্ঠ শ্রেণি",
  class_7: "৭ম শ্রেণি",
  class_8: "৮ম শ্রেণি",
  class_9: "৯ম শ্রেণি",
  class_10: "১০ম শ্রেণি",
  dakhil: "দাখিল স্পেশাল",
};

export default async function ClassesPage() {
  const [batches, settings] = await Promise.all([
    getActiveBatchesWithDetails(),
    getSiteSettings(),
  ]);

  // Al-Hikmah is strictly Play to 10th class: filter out any higher batches
  const filteredBatches = batches.filter((b: any) => {
    if (!b.classLevel) return true;
    const lower = String(b.classLevel).toLowerCase();
    return !["hsc_1st", "hsc_2nd", "alim_1st", "alim_2nd", "admission", "hsc", "alim"].includes(lower);
  });

  const defaultClassPrograms: IClassProgram[] = [
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

  const rawPrograms = settings.classPrograms?.length
    ? settings.classPrograms
    : defaultClassPrograms;

  // Filter out any higher classes (HSC/11th/12th/Alim/College) strictly for Al-Hikmah Play to 10th
  const nonHscPrograms = rawPrograms.filter((p: any) => {
    const text = `${p.id} ${p.title} ${p.badge} ${p.description}`.toLowerCase();
    return (
      !text.includes("hsc") &&
      !text.includes("একাদশ") &&
      !text.includes("দ্বাদশ") &&
      !text.includes("আলিম") &&
      !text.includes("কলেজ")
    );
  });

  const classPrograms: IClassProgram[] =
    nonHscPrograms.length >= 4 ? nonHscPrograms : defaultClassPrograms;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <PublicHeader settings={settings} />

      <main className="flex-1">
        {/* Header Section */}
        <section className="bg-white border-b border-slate-200 py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
            <Badge variant="primary" size="sm">
              অ্যাকাডেমিক পাঠদান ও রুটিন
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {settings.classesPageTitle || "পাঠদান বিভাগ ও সক্রিয় ব্যাচসমূহ"}
            </h1>
            <p className="text-sm text-slate-600 max-w-2xl mx-auto leading-relaxed">
              {settings.classesPageSubtitle &&
              !settings.classesPageSubtitle.includes("দ্বাদশ")
                ? settings.classesPageSubtitle
                : "প্লে থেকে ১০ম শ্রেণি এবং কওমী ও আলিয়া মাদ্রাসার শিক্ষার্থীদের জন্য বিষয়ভিত্তিক মানসম্মত ব্যাচ এবং সময়সূচী।"}
            </p>
          </div>
        </section>

        {/* Programs Overview Section */}
        <section className="py-14 bg-white border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center max-w-xl mx-auto">
              <h2 className="text-2xl font-bold text-slate-900">আমাদের পাঠদান কাঠামো</h2>
              <p className="text-xs text-slate-500 mt-1">
                প্রতিটি স্তরের জন্য আলাদা কারিকুলাম ও নিবেদিত শিক্ষক
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {classPrograms.map((prog) => (
                <div
                  key={prog.id}
                  id={prog.id}
                  className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:border-[#0274b3] transition-all space-y-4"
                >
                  <div className="flex items-center justify-between">
                    <Badge variant="gold" size="sm">
                      {prog.badge}
                    </Badge>
                    <span className="text-xs text-slate-400 font-medium">
                      ২০২৬ শিক্ষাবর্ষ
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{prog.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {prog.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-200/60">
                    {prog.features.map((f: string, i: number) => (
                      <div
                        key={i}
                        className="flex items-center gap-1.5 text-xs text-slate-700"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Live Active Batches from Database */}
        <section className="py-16 bg-slate-50 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <Badge variant="primary" size="sm">
                  লাইভ ব্যাচ তালিকা
                </Badge>
                <h2 className="text-2xl font-bold text-slate-900 mt-1">
                  চলমান ও আসন্ন সক্রিয় ব্যাচসমূহ
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  রুটিন, বিষয় এবং আসন সংখ্যা যাচাই করে আপনার পছন্দের ব্যাচে ভর্তি নিশ্চিত
                  করুন
                </p>
              </div>
              <Link href="/admissions">
                <Button size="sm" className="bg-[#0274b3] hover:bg-[#015b93] gap-1.5">
                  <School className="h-4 w-4" />
                  <span>ভর্তি নির্দেশিকা ও তথ্য</span>
                </Button>
              </Link>
            </div>

            {filteredBatches.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
                <BookOpen className="h-10 w-10 text-slate-300 mx-auto mb-2" />
                <p className="text-sm font-semibold text-slate-700">
                  বর্তমানে কোনো সক্রিয় ব্যাচ প্রদর্শিত নেই।
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  ভর্তি সংক্রান্ত তথ্যের জন্য সরাসরি আমাদের হেল্পলাইনে যোগাযোগ করুন।
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBatches.map(
                  (b: {
                    _id: string;
                    name: string;
                    code: string;
                    classLevel: string;
                    subjects?: string[];
                    capacity: number;
                    monthlyFee?: number;
                    enrolledCount?: number;
                    availableSeats?: number;
                    isFull?: boolean;
                    schedule?: Array<{
                      day: string;
                      startTime: string;
                      endTime: string;
                      roomNo?: string;
                    }>;
                    assignedTeachers?: Array<{ fullName: string; designation?: string }>;
                    academicSession?: { name: string };
                  }) => {
                    const isBatchFull =
                      b.isFull ||
                      (b.availableSeats !== undefined && b.availableSeats <= 0);
                    const remainingSeats =
                      b.availableSeats !== undefined
                        ? b.availableSeats
                        : Math.max(0, b.capacity - (b.enrolledCount || 0));

                    return (
                      <Card
                        key={b._id}
                        className="relative overflow-hidden border border-slate-200 hover:border-[#0274b3] transition flex flex-col justify-between bg-white shadow-2xs hover:shadow-md pt-2"
                      >
                        {/* Corner Admission Tip Ribbon */}
                        {isBatchFull ? (
                          <div className="absolute top-0 right-0 z-10">
                            <div className="bg-rose-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-2xs flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-white inline-block" />
                              <span>আসন পূর্ণ (Closed)</span>
                            </div>
                          </div>
                        ) : remainingSeats <= 5 ? (
                          <div className="absolute top-0 right-0 z-10">
                            <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-2xs flex items-center gap-1 animate-pulse">
                              <Sparkles className="h-3 w-3" />
                              <span>ভর্তি চলছে • সীমিত আসন</span>
                            </div>
                          </div>
                        ) : (
                          <div className="absolute top-0 right-0 z-10">
                            <div className="bg-gradient-to-r from-[#0274b3] to-teal-600 text-white text-[10px] font-bold px-3 py-1 rounded-bl-xl shadow-2xs flex items-center gap-1">
                              <Sparkles className="h-3 w-3" />
                              <span>ভর্তি চলছে (Admission On)</span>
                            </div>
                          </div>
                        )}

                        <CardHeader className="space-y-3 pb-3">
                          <div className="flex items-center justify-between pr-28">
                            <Badge variant="primary" size="sm">
                              {classLevelLabels[b.classLevel] || b.classLevel}
                            </Badge>
                            <span className="text-xs font-mono font-bold text-slate-500">
                              {b.code}
                            </span>
                          </div>
                          <CardTitle className="text-base text-slate-900 leading-snug">
                            {b.name}
                          </CardTitle>
                          <div className="text-xs text-slate-600 space-y-1">
                            <p>
                              <span className="font-semibold text-slate-700">বিষয়: </span>
                              {b.subjects?.join(", ") || "সকল বিষয়"}
                            </p>
                            {b.assignedTeachers && b.assignedTeachers.length > 0 && (
                              <p>
                                <span className="font-semibold text-slate-700">
                                  শিক্ষক:{" "}
                                </span>
                                {b.assignedTeachers
                                  .filter((t) => t && t.fullName)
                                  .map((t) => t.fullName)
                                  .join(", ")}
                              </p>
                            )}
                          </div>
                        </CardHeader>

                        <CardContent className="space-y-3 pt-0">
                          {/* Schedule Snippet */}
                          {b.schedule && b.schedule.length > 0 && (
                            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-100 text-[11px] text-slate-600 space-y-1.5">
                              <span className="font-bold text-slate-700 block">
                                ক্লাস শিডিউল:
                              </span>
                              {b.schedule.map((s, idx) => (
                                <div
                                  key={idx}
                                  className="flex justify-between items-center py-0.5"
                                >
                                  <span className="capitalize font-medium text-slate-700">
                                    {s.day}
                                  </span>
                                  <span className="font-mono text-slate-800 font-semibold">
                                    {formatTo12h(s.startTime)} – {formatTo12h(s.endTime)}
                                  </span>
                                  {s.roomNo && (
                                    <span className="text-slate-500 text-[10px]">
                                      ({s.roomNo})
                                    </span>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}

                          {/* Fee, Total Capacity & Seats Remaining */}
                          <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                            <div className="flex items-center justify-between text-slate-700">
                              <div className="flex items-center gap-1.5">
                                <Users className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                                <span className="font-semibold">
                                  সর্বোচ্চ আসন: {toBanglaNumber(b.capacity)} জন
                                </span>
                              </div>
                              {b.monthlyFee !== undefined && b.monthlyFee > 0 && (
                                <span className="font-bold text-[#0274b3]">
                                  ফি: ৳{toBanglaNumber(b.monthlyFee)}
                                </span>
                              )}
                            </div>

                            {/* Real-time Seat Availability Indicator */}
                            <div
                              className={`flex items-center justify-between text-xs py-1.5 px-2.5 rounded-lg border font-medium ${
                                isBatchFull
                                  ? "bg-rose-50 border-rose-200 text-rose-800"
                                  : remainingSeats <= 5
                                  ? "bg-amber-50 border-amber-200 text-amber-900"
                                  : "bg-emerald-50 border-emerald-200 text-emerald-900"
                              }`}
                            >
                              <span className="text-[11px] text-slate-500">
                                আসন স্থিতি:
                              </span>
                              {isBatchFull ? (
                                <span className="font-bold text-rose-600 text-[11px] flex items-center gap-1.5">
                                  <span className="h-2 w-2 rounded-full bg-rose-500 inline-block animate-pulse" />
                                  আসন পূর্ণ (ভর্তি বন্ধ)
                                </span>
                              ) : (
                                <span className="font-bold text-emerald-700 text-[11px] flex items-center gap-1.5">
                                  <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block" />
                                  অবশিষ্ট আসন:{" "}
                                  <strong className="text-slate-900 font-extrabold text-xs">
                                    {toBanglaNumber(remainingSeats)}
                                  </strong>{" "}
                                  টি
                                </span>
                              )}
                            </div>
                          </div>

                          {isBatchFull ? (
                            <Button
                              variant="outline"
                              size="sm"
                              disabled
                              className="w-full text-xs text-rose-600 border-rose-200 bg-rose-50/70 cursor-not-allowed font-semibold"
                            >
                              আসন পূর্ণ (ভর্তি বন্ধ)
                            </Button>
                          ) : (
                            <Link href="/admissions" className="block w-full">
                              <Button
                                variant="outline"
                                size="sm"
                                className="w-full text-xs hover:border-[#0274b3] hover:text-[#0274b3] font-semibold text-slate-700"
                              >
                                ভর্তি তথ্য ও নিয়মাবলী
                              </Button>
                            </Link>
                          )}
                        </CardContent>
                      </Card>
                    );
                  }
                )}
              </div>
            )}
          </div>
        </section>

        {/* Real Classrooms and Infrastructure Showcase */}
        <ClassroomGallery
          items={settings.classroomGallery}
          title="আমাদের সুশৃঙ্খল ক্লাসরুম ও পাঠদান পরিবেশ"
          subtitle="কওমী ও আলিয়া মাদ্রাসার শিক্ষার্থীদের একাগ্র পাঠদান, মডেল টেস্ট ও স্পেশাল কেয়ার ব্যাচের জন্য সম্পূর্ণ প্রস্তুত শ্রেণিকক্ষ"
        />

        {/* Admission Inquiry CTA */}
        <section className="py-12 bg-[#015b93] text-white text-center">
          <div className="max-w-3xl mx-auto px-4 space-y-4">
            <h2 className="text-2xl font-bold">
              আপনার পছন্দসই ব্যাচ সম্পর্কে আরও জানতে চান?
            </h2>
            <p className="text-xs sm:text-sm text-slate-200">
              আমাদের শিক্ষা পরামর্শকদের সাথে কথা বলুন অথবা সরাসরি ক্যাম্পাসে এসে ভর্তি
              সম্পন্ন করুন।
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <Link href="/admissions">
                <Button
                  size="lg"
                  className="bg-[#65a30d] hover:bg-[#4d7c0f] text-white font-bold"
                >
                  ভর্তি নির্দেশিকা
                </Button>
              </Link>
              {settings.phones?.[0] && (
                <a
                  href={`tel:${settings.phones[0].replace(/[^0-9]/g, "")}`}
                  className="inline-flex items-center gap-2 bg-white text-slate-900 hover:bg-slate-100 px-5 py-2.5 rounded-lg text-sm font-bold shadow-sm transition"
                >
                  <Clock className="h-4 w-4 text-[#0274b3]" />
                  <span>কল করুন: {settings.phones[0]}</span>
                </a>
              )}
            </div>
          </div>
        </section>
      </main>

      <PublicFooter settings={settings} />
    </div>
  );
}
