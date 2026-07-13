import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const legacyHost = "scripture-in-sound.vercel.app";
const canonicalHost = "www.scriptureinsound.com";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host")?.split(":")[0].toLowerCase();

  if (host === legacyHost) {
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = canonicalHost;
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
