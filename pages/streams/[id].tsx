import Layout from "@/components/layout";
import ChatMessage from "@/components/message";
import useMutation from "@/libs/client/useMutation";
import useUser from "@/libs/client/useUser";
import { Stream } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

interface StreamMessage {
  message: string;
  id: number;
  user: {
    avatar?: string;
    id: number;
  };
}

interface StreamWithMessage extends Stream {
  messages: StreamMessage[];
}

interface StreamResponse {
  ok: boolean;
  stream: StreamWithMessage;
}

interface MessageForm {
  message: string;
}

export default function StreamDetail() {
  const { user } = useUser(); // 로그인한 유저와 chat id 비교해서 본인 채팅 우측정렬
  const router = useRouter();
  const { data, mutate } = useSWR<StreamResponse>(router.query.id ? `/api/streams/${router.query.id}` : null, {
    refreshInterval: 1000,
  });

  const { register, handleSubmit, reset } = useForm<MessageForm>();

  // input에 입력한 텍스트를 아래 api로 POST 요청 보내기.
  const [sendMessage, { loading, data: sendMessageData }] = useMutation(`/api/streams/${router.query.id}/messages`);
  const onValid = (form: MessageForm) => {
    if (loading) return;
    reset();
    sendMessage(form);
  };
  // 채팅 치면 다시 fetch 하기
  useEffect(() => {
    if (sendMessageData && sendMessageData.ok) {
      mutate();
    }
  }, [sendMessage, mutate]);
  return (
    <Layout streamBack>
      <div className=" px-4 space-y-6">
        <div className="w-full bg-slate-300 aspect-video rounded-md" />
        <div>
          <div className="flex justify-between">
            <h3 className="font-semibold text-gray-700 text-2xl mt-2">{data?.stream?.name}</h3>
            <span className="text-xl block mt-3 text-gray-900">{data?.stream?.price.toLocaleString("ko-KR")}원</span>
          </div>
          <p className="text-sm my-6 text-gray-700">{data?.stream?.description}</p>
        </div>
        {/* 라이브 채팅 */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Live Chat</h2>
          <div className="py-10 pb-16 h-[50vh] px-4 space-y-4 overflow-y-scroll">
            {data?.stream?.messages.map((message) => (
              <ChatMessage key={message?.id} message={message.message} reversed={message.user.id === user?.id} />
            ))}
          </div>
          <div className="fixed py-3 bg-white bottom-0 inset-x-0">
            <form onSubmit={handleSubmit(onValid)} className="flex relative max-w-md mx-auto items-center">
              <input
                {...register("message", { required: true })}
                className="shadow-md rounded-full w-full pr-12
           border-gray-400 focus:ring-orange-400 focus:outline-none focus:border-orange-400"
                type="text"
                placeholder="입력해주세요."
              />
              <div className=" absolute inset-y-0 flex py-1.5 pr-1.5 right-1">
                <button
                  className="flex items-center bg-orange-400 hover:bg-orange-500
            rounded-full px-2 text-sm text-white focus:ring-2 focus:ring-offset-2
            focus:ring-orange-500"
                >
                  &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

// 추후 잘못된 링크로 가면 404 페이지 안내하기
