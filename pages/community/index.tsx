import Loader from "@/components/Loader";
import FloatingButton from "@/components/floating-button";
import Layout from "@/components/layout";
import useCoords from "@/libs/client/useCoords";
import { Post, User } from "@prisma/client";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { Suspense, useState } from "react";
import useSWR, { useSWRConfig } from "swr";

interface PostWithUser extends Post {
  user: User;
  _count: {
    wondering: number;
    answers: number;
  };
}

interface PostResponse {
  ok: boolean;
  posts: PostWithUser[];
  neardPosts: PostWithUser[];
}

export default function Community() {
  const { latitude, longitude } = useCoords(); // 유저의 위치정보 알아내기
  const { data } = useSWR<PostResponse>(`/api/posts?latitude=${latitude}&longitude=${longitude}`);

  const [near, setNear] = useState(false); // 가까운 거리의 게시물 보여 줄 상태
  const nearButton = () => {
    setNear((setNear) => !setNear);
  };

  return (
    <Layout title="동네 생활" hasTabBar>
      <button className=" bg-orange-400 ml-4 px-2 py-1 rounded-md text-sm text-white" onClick={nearButton}>
        {near ? "전체 게시물 둘러보기" : "가까운 게시물 둘러보기"}
      </button>

      {data ? (
        <div className="py-3 px-4 space-y-5">
          {near ? (
            <>
              {data?.neardPosts?.map((post) => (
                <Link href={`/community/${post?.id}`} key={post?.id} className="flex flex-col items-start">
                  <span
                    className="flex items-center px-2.5 py-0.5 rounded-full text-sm
        bg-gray-200 font-medium"
                  >
                    동네질문
                  </span>
                  <div className="mt-2 text-gray-800 cursor-pointer ">
                    <span className="text-orange-400 font-medium">Q.</span>
                    {post?.question}
                  </div>
                  <div
                    className="mt-5 flex items-center justify-between w-full
         text-gray-500 font-medium"
                  >
                    <span>{post?.user?.name}</span>
                    <span>{formatDistanceToNow(new Date(post?.createAt), { addSuffix: true })}</span>
                  </div>
                  <div className="flex space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b w-full">
                    <span className="flex space-x-2 items-center text-sm">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <span>궁금해요 {post?._count?.wondering}</span>
                    </span>
                    <span className="flex space-x-2 items-center text-sm">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        ></path>
                      </svg>
                      <span>답변 {post?._count?.answers}</span>
                    </span>
                  </div>
                </Link>
              ))}
            </>
          ) : (
            <>
              {data?.posts?.map((post) => (
                <Link href={`/community/${post?.id}`} key={post?.id} className="flex flex-col items-start">
                  <span
                    className="flex items-center px-2.5 py-0.5 rounded-full text-sm
        bg-gray-200 font-medium"
                  >
                    동네질문
                  </span>
                  <div className="mt-2 text-gray-800 cursor-pointer ">
                    <span className="text-orange-400 font-medium">Q.</span>
                    {post?.question}
                  </div>
                  <div
                    className="mt-5 flex items-center justify-between w-full
         text-gray-500 font-medium"
                  >
                    <span>{post?.user?.name}</span>
                    <span>{formatDistanceToNow(new Date(post?.createAt), { addSuffix: true })}</span>
                  </div>
                  <div className="flex space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b w-full">
                    <span className="flex space-x-2 items-center text-sm">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <span>궁금해요 {post?._count?.wondering}</span>
                    </span>
                    <span className="flex space-x-2 items-center text-sm">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        ></path>
                      </svg>
                      <span>답변 {post?._count?.answers}</span>
                    </span>
                  </div>
                </Link>
              ))}
            </>
          )}
          <FloatingButton href="/community/write">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              ></path>
            </svg>
          </FloatingButton>
        </div>
      ) : (
        <Loader />
      )}
    </Layout>
  );
}
