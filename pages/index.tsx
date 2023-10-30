import Layout from "@/components/layout";
import FloatingButton from "@/components/floating-button";
import useUser from "@/libs/client/useUser";
import useSWR, { SWRConfig } from "swr";
import { Item } from "@prisma/client";
import HomeItem from "@/components/home-item";
import client from "@/libs/server/client";
import { NextPage } from "next";
import CategoryNav from "@/components/categories/CategoryNav";
import React from "react";

export interface ProductWithCount extends Item {
  _count: {
    favs: number;
  };
}

interface ProductsResponse {
  ok: boolean;
  filteredProducts: ProductWithCount[];
  seletedCategoryProducts: ProductWithCount[];
}

export function Home() {
  const { user, isLoading: userIsLoading } = useUser();
  const [seleted, setSelected] = React.useState<string>("");
  const { data, isLoading } = useSWR<ProductsResponse>(`/api/products?categoryQuery=${seleted}`);

  const [viewCategory, setViewCategory] = React.useState<boolean>(false);
  const toggleViewCategory = () => setViewCategory(true);
  console.log(viewCategory);
  return (
    <Layout title="Home" hasTabBar>
      <CategoryNav onClick={toggleViewCategory} setSelected={setSelected} />
      <>
        {viewCategory && data?.seletedCategoryProducts?.length! <= 0 && !isLoading && (
          <div className="pb-4 my-4 flex justify-center text-gray-600">해당 카테고리의 상품이 없습니다.</div>
        )}
        {data?.seletedCategoryProducts?.length! > 0 && !isLoading && (
          <div className="grid sm:grid-cols-2 gap-2">
            {data?.seletedCategoryProducts?.map((product) => (
              <HomeItem
                id={product.id}
                key={product.id}
                title={product.name}
                price={product.price.toLocaleString("ko-KR")}
                hearts={product._count?.favs}
                imageUri={product.image}
              />
            ))}
          </div>
        )}

        <div className="grid sm:grid-cols-2 gap-2 border-t pt-8">
          {data?.filteredProducts?.map((product) => (
            <HomeItem
              id={product.id}
              key={product.id}
              title={product.name}
              price={product.price.toLocaleString("ko-KR")}
              hearts={product._count?.favs}
              imageUri={product.image}
            />
          ))}
        </div>
      </>
      {/* 플로팅 버튼 */}
      {user && (
        <FloatingButton href="/products/upload">
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
      )}
    </Layout>
  );
}

const Page: NextPage<{ products: ProductWithCount[] }> = ({ products }) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          "/api/products": {
            ok: true,
            products,
          },
        },
      }}
    >
      <Home />
    </SWRConfig>
  );
};

export async function getServerSideProps() {
  const products = await client.item.findMany({});
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}

export default Page;
