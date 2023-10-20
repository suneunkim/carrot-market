import { getIronSession } from "iron-session/edge"; // 세션을 관리하고 처리.
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export const middleware = async (req: NextRequest, ev: NextFetchEvent) => {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, {
    cookieName: "carrotsession",
    password: process.env.COOKIE_PASSWORD!,
    cookieOptions: {
      secure: process.env.NODE_ENV! === "production", // if you are using https
    },
  });

  if (!req.url.includes("/api")) {
    if (!session.user && !req.url.includes("/login")) {
      return;

      const loginUrl = new URL("login", req.url);
      return NextResponse.redirect(loginUrl);

      // const url = req.nextUrl.clone();
      // url.pathname = "/login";
      // return NextResponse.rewrite(url);
    }
  }
};
