// import { NextResponse } from "next/server";

import { NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

// // This function can be marked `async` if using `await` inside
// export function middleware(request, event) {
//     event.waitUntil(
//         setTimeout(() => {
//             console.log("Done!");
//         }, 3000)
//     );

//     return NextResponse.next();
// }

// // See "Matching Paths" below to learn more
// export const config = {
//     matcher: ["/"],
// };

let defaultLocale = "en";
let locales = ["en", "bn"];

function getLocale(request) {
  const acceptedLanguage = request.headers.get("accept-language") ?? undefined;

  const headers = { "accept-language": acceptedLanguage };
  const languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale);
}

export const middleware = (request) => {
  const pathname = request.nextUrl.pathname;

  const pathNameIsMissionLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}`) && !pathname.startsWith(`/${locale}/`)
  );

  if (pathNameIsMissionLocale) {
    const locale = getLocale(request);

    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    );
  }

  return NextResponse.next();
};
