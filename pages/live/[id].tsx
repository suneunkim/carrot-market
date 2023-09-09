import Layout from "@/components/layout";
import Message from "@/components/message";

export default function LiveDetail() {
  return (
    <Layout canGoBack>
      <div className=" px-4 space-y-6">
        <div className="w-full bg-slate-300 aspect-video rounded-md" />
        <div>
          <div className="flex justify-between">
            <h3 className="font-semibold text-gray-700 text-2xl mt-2">아이폰 팔아요.</h3>
            <span className="text-xl block mt-3 text-gray-900">80만원</span>
          </div>
          <p className="text-sm my-6 text-gray-700">상태는 a급입니다. 그럭저럭 무난하게 사용할 수 있을거예요.</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">Live Chat</h2>
          <div className="py-10 pb-16 h-[50vh] px-4 space-y-4 overflow-y-scroll">
            <Message message="네고 되나요?" />
            <Message message="네고 되나요?" />
            <Message message="네고 되나요?" />
            <Message message="아뇨." reversed />
            <Message message="네고 되나요?" />
            <Message message="네고 되나요?" />
          </div>
          <div className="fixed py-3 bg-white bottom-0 inset-x-0">
            <div className="flex relative max-w-md mx-auto items-center">
              <input
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
