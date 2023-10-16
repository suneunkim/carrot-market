import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: "carrotsession",
  password: process.env.COOKIE_PASSWORD!,
};
``;
export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}

export function withSsrSession(handler: any) {
  return withIronSessionSsr(handler, cookieOptions);
}

// withApiSession 함수는 쿠키를 가져와서 암호화를 풀고 req 안에 쿠키 내용들을 넣어준다.
// iron session에게 req 객체 제공 -> iron session이 쿠키를 가져와서 해독 -> 그 결과를 req.session.user 내부에 넣어주기
