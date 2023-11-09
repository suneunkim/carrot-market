import type { NextApiRequest, NextApiResponse } from "next";
import client from "@/libs/server/client";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { withApiSession } from "@/libs/server/withSession";

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseType>) {
  const {
    session: { user },
    body: { senderId, receiverId },
  } = req;

  if (req.method === "POST") {
    try {
      // 두 사용자 간의 대화 찾기
      const existingConversation = await client.conversation.findFirst({
        where: {
          AND: [{ users: { some: { id: user?.id } } }, { users: { some: { id: receiverId } } }],
        },
      });

      if (existingConversation) {
        // 이미 대화가 있는 경우 대화 ID를 반환
        res.json({ ok: true, conversationId: existingConversation.id });
      } else {
        // 대화가 없는 경우 새 대화 생성
        const newConversation = await client.conversation.create({
          data: {
            senderId: senderId + "",
            receiverId: receiverId + "",
            users: { connect: [{ id: user?.id }, { id: receiverId }] },
          },
        });
        res.json({ ok: true, conversationId: newConversation.id });
      }
    } catch (error) {
      console.error("Error creating conversation:", error);
      res.status(500).json({ ok: false, error: "Error creating conversation" });
    }
  }

  if (req.method === "GET") {
    // 사용자의 모든 대화 가져오기
    const conversations = await client.conversation.findMany({
      include: {
        users: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
          where: {
            id: {
              not: user?.id,
            },
            // 로그인한 유저가 아닌 상대방만 보내서 대화 목록에 띄우기
          },
        },
        messages: true,
      },
    });

    res.json({ ok: true, conversations });
  }
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
