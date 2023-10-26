import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { withApiSession } from "@/libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  if (req.method === "POST") {
    const { email } = req.body;
    const user = await client.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(404).json({ ok: false, error: "계정이 없습니다." });
    }
    req.session.user = {
      id: +user.id,
    };
    await req.session.save();

    res.status(200).json({ ok: true });
  }
  return res.status(405).json({ ok: false, error: "요청이 올바르지 않습니다." });
}

export default withApiSession(handler);
