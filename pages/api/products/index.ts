import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { withApiSession } from "@/libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  if (req.method === "GET") {
    // 만들어진 item 전부 찾기
    const products = await client.item.findMany({
      include: {
        _count: {
          select: {
            favs: true,
          },
        },
      },
    });
    // item.findMany 로 category 일치하는 item 찾기
    const {
      query: { categoryQuery },
    } = req;

    const seletedCategory = await client.item.findMany({
      where: {
        category: {
          equals: categoryQuery as string,
        },
      },
    });

    res.json({
      ok: true,
      products,
      seletedCategory,
    });
  }

  if (req.method === "POST") {
    const {
      body: { name, price, description, imageUrl, category },
      session: { user },
    } = req;
    // upload에서 생성함

    const product = await client.item.create({
      data: {
        name,
        price: +price,
        description,
        image: imageUrl ? imageUrl : "",
        category,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({
      ok: true,
      product,
    });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
