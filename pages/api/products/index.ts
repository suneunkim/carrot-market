import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { withApiSession } from "@/libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  // 만들어진 item 전부 찾기 -> seletedCategory와 중복되는거 제외하기.
  const Allproducts = await client.item.findMany({
    include: {
      _count: {
        select: {
          favs: true,
        },
      },
    },
    orderBy: {
      createAt: "desc",
    },
  });

  // item.findMany 로 category 일치하는 item 찾기
  const {
    query: { categoryQuery },
  } = req;

  let query: any = {};
  if (categoryQuery) {
    query.category = categoryQuery;
  }

  const seletedCategoryProducts = await client.item.findMany({
    include: {
      _count: {
        select: {
          favs: true,
        },
      },
    },
    where: query,
    orderBy: {
      createAt: "desc",
    },
  });

  // 중복되는거 제외하기
  const filteredProducts = Allproducts.filter((product) => {
    const isDuplicate = seletedCategoryProducts.some((selectedProduct) => selectedProduct.id === product.id);
    return !isDuplicate;
  });

  res.json({
    ok: true,
    filteredProducts,
    seletedCategoryProducts,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
