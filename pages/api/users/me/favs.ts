import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { withApiSession } from "@/libs/server/withSession";

// Records 모델을 사용한다면? #13.2 강의 참고
// /api/users/me/records?kind=fav
// handler에서는 req.query로 확인

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    session: { user },
  } = req;

  const favs = await client.fav.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      product: {
        include: {
          _count: {
            select: {
              favs: true,
            },
          },
        },
      },
    },
  });
  res.json({
    ok: true,
    favs,
  });
}
export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
