import { getIronSession } from "iron-session/edge"; // 세션을 관리하고 처리.
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest, ev: NextFetchEvent) => {
  //console.log("@req@", req.nextUrl);
  const res = NextResponse.next();
  const session = await getIronSession(req, res, {
    cookieName: "carrotsession",
    password: process.env.COOKIE_PASSWORD!,
    cookieOptions: {
      secure: process.env.NODE_ENV! === "production", // if you are using https
    },
  });

  const pathname = req.nextUrl.pathname;
  pathname.startsWith;
  //console.log(pathname);
  if (session.user && pathname.startsWith("/login")) {
    //return NextResponse.redirect(new URL("/", req.url));
  }
  if ((!session.user && !pathname.includes("/login")) || !pathname.includes("/create-account")) {
    //return NextResponse.redirect(new URL("login", req.url));
  }
  // return NextResponse.next();
};
