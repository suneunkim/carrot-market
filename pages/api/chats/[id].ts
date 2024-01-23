import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { withApiSession } from "@/libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    session: { user },
    body: { text, conversationId, senderId, receiverId },
  } = req;

  if (!user) {
    return res.status(401).json({
      ok: false,
    });
  }
  if (req.method === "GET") {
    const userId = user.id;
    const conversations = await client.conversation.findMany({
      where: {
        id: conversationId,
      },
      select: {
        messages: true,
      },
    });
    res.json({ ok: true, conversations, userId });
  }
  // url에서 conversation id 가져오기
  if (req.method === "POST") {
    if (conversationId) {
      try {
        const mesaage = await client.message.create({
          data: {
            text,
            senderId: senderId,
            receiverId: +receiverId,
            conversationId: +conversationId,
          },
        });
        res.json({ ok: true, mesaage });
        console.log(mesaage);
      } catch (error) {
        return res.json({ ok: false, error });
      }
    }
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
