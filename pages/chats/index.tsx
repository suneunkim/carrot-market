import Layout from "@/components/layout";
import Link from "next/link";

export default function Chats() {
  return (
    <Layout title="채팅" hasTabBar>
      <div className="py-10 divide-y">
        {[1, 1, 1, 1, 1].map((_, i) => (
          <Link href={`/chats/${i}`} key={i} className="flex py-4 px-4 mb-1 pb-3 items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-slate-300" />
            <div>
              <p className="text-sm font-medium text-gray-800">마루마루</p>
              <p className="text-sm font-medium text-gray-500">내일 오후2시에 거래해요.</p>
            </div>
          </Link>
        ))}
      </div>
    </Layout>
  );
}
