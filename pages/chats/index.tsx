import Layout from "@/components/layout";
import useUser from "@/libs/client/useUser";
import { Conversation } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Message } from "postcss";
import useSWR from "swr";

interface ChatsResponse {
  conversations: Conversation[];
  id: string;
  senderId: string;
  receiverId: string;
  messages: Message[];
  users: {
    id: string;
    name: string;
    avatar: string;
  };
}

export default function Chats() {
  const { data } = useSWR<ChatsResponse>("/api/chats");
  console.log(data);

  return (
    <Layout title="채팅" hasTabBar>
      <div className="py-10 divide-y">
        {data?.conversations?.map((chat: any) => (
          <Link
            href={{
              pathname: `/chats/[id]`,
              query: { id: chat?.id, receiverId: chat?.receiverId, senderId: chat?.senderId, conversationId: chat?.id },
            }}
            key={chat.id}
            className="flex py-4 px-4 mb-1 pb-3 items-center space-x-3"
          >
            <div className="w-12 h-12 rounded-full bg-slate-300" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-800">{chat?.users[0].name}</p>
              <p className="text-sm font-medium text-gray-500">{chat?.messages[chat?.messages.length - 1].text}</p>
            </div>
            <div className="ml-auto flex text-sm font-medium text-gray-500">
              {formatDistanceToNow(new Date(chat?.messages[chat?.messages.length - 1].createAt), { addSuffix: true })}
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
