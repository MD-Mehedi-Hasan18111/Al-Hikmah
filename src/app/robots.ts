import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://alhikmah.edu.bd";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/api/", "/dashboard/", "/unauthorized", "/forbidden"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
