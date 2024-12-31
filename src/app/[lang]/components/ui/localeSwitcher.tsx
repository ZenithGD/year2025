"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { i18n, type Locale } from "@/i18n-config";

export default function LocaleSwitcher() {
  const pathname = usePathname();
  const redirectedPathname = (locale: Locale) => {
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <ul className="flex gap-2">
      {i18n.locales.map((locale) => {
        return (
          <li key={locale}>
            {/* In order for this to work, the flags should have the same name as the locales */}
            <Link href={redirectedPathname(locale)}>
              <Image
                src={`/images/flags/${locale}.png`}
                alt={"locale " + locale + " switcher"}
                width={26}
                height={26}
                objectFit='contain'
                className='rounded-t-lg border-green-300 object-cover'
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}