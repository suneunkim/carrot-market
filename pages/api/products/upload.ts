import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { withApiSession } from "@/libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    body: { name, price, description, imageUrl, category },
    session: { user },
  } = req;

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

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
