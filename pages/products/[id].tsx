import Layout from "@/components/layout";
import useMutation from "@/libs/client/useMutation";
import useUser from "@/libs/client/useUser";
import { cls } from "@/libs/client/utils";
import { Item, User } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";
import Image from "next/image";
import Loader from "@/components/Loader";

interface ProductWithUser extends Item {
  user: User;
}

interface ItemDetailResponse {
  ok: boolean;
  product: ProductWithUser;
  relatedProducts: Item[];
  isLiked: boolean;
}

export default function ItemDetail() {
  const router = useRouter();
  const { data, mutate: boundMutate } = useSWR<ItemDetailResponse>(
    router.query.id ? `/api/products/${router.query.id}` : null
  );
  const { mutate } = useSWRConfig();

  const [toggleFav] = useMutation(`/api/products/${router.query.id}/fav`);
  const onFavClick = () => {
    boundMutate({ ...data, isLiked: !data?.isLiked }, false);
    toggleFav({});
  };
  return (
    <Layout canGoBack hasTabBar title="상품을 둘러보세요!">
      <div className="px-4 py-10">
        {!data ? (
          <Loader />
        ) : (
          <>
            <div className="mb-8">
              {data?.product?.image ? (
                <Image priority={false} width={500} height={500} alt="상품 이미지" src={data?.product.image} />
              ) : (
                <div className="h-96 bg-slate-200" />
              )}
              <Link
                href={`/user/profiles/${data?.product?.user?.id}`}
                className="flex py-3 items-center space-x-3 border-b"
              >
                {data?.product?.user?.avatar ? (
                  <img className="h-12 w-12 rounded-full" src={data?.product?.user?.avatar} />
                ) : (
                  <div className="h-12 w-12 bg-slate-200 rounded-full" />
                )}
                <div>
                  <p className="font-medium text-gray-700">{data?.product?.user?.name}</p>
                  <p className="text-sm font-medium text-gray-700">View profile &rarr;</p>
                </div>
              </Link>
              <div className="mt-5">
                <h1 className="text-2xl font-bold text-gray-700">{data?.product?.name}</h1>
                <p className="text-2xl mt-3 text-gray-700">{data?.product?.price.toLocaleString("ko-KR")}원</p>
                <p className="text-base my-6 text-gray-700">{data?.product?.description}</p>
                <div className="flex items-center justify-between space-x-2">
                  <button
                    className="flex-1 bg-orange-500 text-white py-3 rounded-md shadow-md font-medium
             focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 hover:bg-orange-400"
                  >
                    대화하기
                  </button>
                  <button
                    onClick={onFavClick}
                    className={cls(
                      "p-3 rounded-md flex items-center justify-center",
                      data?.isLiked ? "text-red-400 hover:bg-gray-100" : "text-gray-400 hover:bg-gray-200"
                    )}
                  >
                    <svg
                      className="h-6 w-6 "
                      xmlns="http://www.w3.org/2000/svg"
                      fill={data?.isLiked ? "currentColor" : "none"}
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
              <h2 className="text-xl font-bold text-gray-800">
                {data?.relatedProducts.length! > 0 ? "비슷한 상품" : "비슷한 상품이 없습니다."}
              </h2>

              <div className="mt-6 grid grid-cols-2 gap-4">
                {data?.relatedProducts.map((product) => (
                  <Link href={`/products/${product.id}`} key={product.id}>
                    <div className="h-56 w-full bg-slate-300 mb-4" />
                    <h3>{product.name}</h3>
                    <p className="text-sm font-medium">{product.price.toLocaleString("ko-KR")}원</p>
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
