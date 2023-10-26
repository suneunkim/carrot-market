import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { withApiSession } from "@/libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    session: { user },
    body: { name, price, description },
  } = req;

  if (req.method === "POST") {
    const stream = await client.stream.create({
      data: {
        name,
        price: +price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({ ok: true, stream });
  }

  if (req.method === "GET") {
    const streams = await client.stream.findMany({
      take: 10,
      skip: 10,
    });
    res.json({ ok: true, streams });
  } // 페이지네이션을 추후에 해야함. 한번에 모두를 부르는 것은 나중에 비효율적.
}
export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);

// return 사용시 실행하고 함수가 종요됨. 이후의 코드는 실행이 안된다.
// 해당 조건을 충족 할 때만 함수를 실행하고 조건이 안맞으면 아무 작업도 하지 않는것을 의미.
