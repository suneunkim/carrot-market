import FloatingButton from "@/components/floating-button";
import Layout from "@/components/layout";
import Link from "next/link";

export default function Live() {
  return (
    <Layout title="라이브" hasTabBar>
      <div className="space-y-3 pb-3">
        {[...Array(3)].map((_, i) => (
          <div className="py-2 px-4 border-b">
            <Link href={`/live/${i}`} key={i}>
              <div className="w-full bg-slate-300 aspect-video rounded-md" />
              <h3 className="font-medium text-gray-700 text-lg mt-2">제목의 자리라고 볼수있다.</h3>
            </Link>
          </div>
        ))}
        <FloatingButton href="/live/upload">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  );
}
