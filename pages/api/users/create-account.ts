import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  if (req.method === "POST") {
    const { email } = req.body;

    let user;
    if (email) {
      user = await client.user.findUnique({
        where: {
          email,
        },
      });
      if (user) {
        return res.status(200).end();
      }

      user = await client.user.create({
        data: {
          name: "익명의 행인",
          email,
        },
      });
      return res.status(201).json({ ok: true });
    }
  }
}

export default withHandler({
  methods: ["POST"],
  handler,
  isPrivate: false,
});
