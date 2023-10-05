import FloatingButton from "@/components/floating-button";
import Layout from "@/components/layout";
import { Stream } from "@prisma/client";
import Link from "next/link";
import useSWR from "swr";

interface StreamResponse {
  ok: boolean;
  streams: Stream[];
}

export default function Stream() {
  const { data } = useSWR<StreamResponse>("/api/streams");

  return (
    <Layout title="라이브" hasTabBar>
      <div className="space-y-3 pb-3">
        {data?.streams.map((live: any) => (
          <div key={live.id} className="py-2 px-4 border-b">
            <Link href={`/streams/${live.id}`}>
              <div className="w-full bg-slate-300 aspect-video rounded-md" />
              <h3 className="font-medium text-gray-700 text-lg mt-2">{live.name}</h3>
            </Link>
          </div>
        ))}
        <FloatingButton href="/streams/upload">
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
