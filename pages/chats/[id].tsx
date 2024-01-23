import Layout from "@/components/layout";
import Message from "@/components/message";
import useMutation from "@/libs/client/useMutation";
import useUser from "@/libs/client/useUser";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import useSWR from "swr";

export default function ChatDetail() {
  const router = useRouter();
  const { user } = useUser();

  const { conversationId, senderId, receiverId } = router.query;

  const { data, mutate } = useSWR(router.query.id ? `/api/chats/${router.query.id}` : null, {
    refreshInterval: 1000,
  });
  console.log(data);
  const messageData = data?.conversations[0].messages;
  const userMessages = messageData.filter((message: { senderId: number | undefined }) => message.senderId === user?.id);
  const otherUserMessages = messageData.filter(
    (message: { senderId: number | undefined }) => message.senderId !== user?.id
  );

  // 메세지 보내기 POST 요청
  const { register, handleSubmit, reset } = useForm();
  const [sendMessage, { loading, data: sendData }] = useMutation(`/api/chats/${router.query.id}`);
  console.log(sendData);
  const onVaild = (form: any) => {
    const { text } = form;
    if (loading) return;
    reset();
    sendMessage({ text, conversationId, senderId, receiverId });
  };
  return (
    <Layout canGoBack title="대화">
      <div className="py-10 px-4 space-y-4 pb-16">
        {data?.conversations[0].messages.map((message: any) => {
          return <Message key={message.id} message={message.text} reversed={message.senderId === data?.userId} />;
        })}

        <form onSubmit={handleSubmit(onVaild)} className="fixed py-2 bg-white bottom-0 inset-x-0">
          <div className="flex relative max-w-md items-center w-full mx-auto">
            <input
              {...register("text", { required: true })}
              className="shadow-md rounded-full w-full pr-12
           border-gray-400 focus:ring-orange-300 focus:outline-none focus:border-orange-400"
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
          </div>
        </form>
      </div>
    </Layout>
  );
}
