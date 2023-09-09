import Layout from "@/components/layout";

export default function ItemDetail() {
  return (
    <Layout canGoBack hasTabBar title="상품을 둘러보세요!">
      <div className="px-4 py-10">
        <div className="mb-8">
          <div className="h-96 bg-slate-200" />
          <div className="flex py-3 items-center space-x-3 border-b">
            <div className="w-12 h-12 bg-slate-200 rounded-full" />
            <div>
              <p className="font-medium text-gray-700">Steve Jebs</p>
              <p className="text-sm font-medium text-gray-700">View profile &rarr;</p>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="text-2xl font-bold text-gray-700">Galaxy S50</h1>
            <p className="text-2xl mt-3 text-gray-700">$140</p>
            <p className="text-base my-6 text-gray-700">미개봉입니다. 사실분만 채팅주세요. 거래는 직거래만 합니다.</p>
            <div className="flex items-center justify-between space-x-2">
              <button
                className="flex-1 bg-orange-500 text-white py-3 rounded-md shadow-md font-medium
             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 hover:bg-orange-400"
              >
                대화하기
              </button>
              <button className="p-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100">
                <svg
                  className="h-6 w-6 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-800">비슷한 상품</h2>
          <div className="mt-6 grid grid-cols-2 gap-4">
            {[1, 2, 3, 4, 5, 6].map((_, i) => (
              <div key={i}>
                <div className="h-56 w-full bg-slate-300 mb-4" />
                <h3>Galaxy S60</h3>
                <p className="text-sm font-medium">$6</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
