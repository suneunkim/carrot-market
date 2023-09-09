import Layout from "@/components/layout";
import Message from "@/components/message";

export default function ChatDetail() {
  return (
    <Layout canGoBack title="판매자이름">
      <div className="py-10 px-4 space-y-4 pb-16">
        <Message message="네고 되나요?" />
        <Message message="네고 되나요?" />
        <Message message="아니요" reversed />
        <Message message="네고 되나요?" />
        <Message message="네고 되나요?" />
        <Message message="아니요" reversed />
        <Message message="네고 되나요?" />
        <Message message="네고 되나요?" />
        <Message message="아니요" reversed />
        <Message message="네고 되나요?" />
        <Message message="네고 되나요?" />
        <Message message="아니요" reversed />
        <Message message="네고 되나요?" />
        <Message message="네고 되나요?" />
        <Message message="아니요" reversed />
        <Message message="네고 되나요?" />
        <Message message="아니요" reversed />
        <Message message="네고 되나요?" />

        <form className="fixed py-2 bg-white bottom-0 inset-x-0">
          <div className="flex relative max-w-md items-center w-full mx-auto">
            <input
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
