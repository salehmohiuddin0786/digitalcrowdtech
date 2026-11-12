export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/admin/",
          "/api",
          "/api/",
          "/user",
          "/user/",
          "/account",
          "/account/",
          "/profile",
          "/profile/",
          "/dashboard",
          "/dashboard/",
          "/settings",
          "/settings/",
          "/auth/",
          "/*?*id=",
          "/*?*token=",
          "/*?*key=",
          "/*?*secret=",
          "/*?*session=",
        ],
      },
    ],
    sitemap: "https://digitalcrowdtech.in/sitemap.xml",
  };
}
