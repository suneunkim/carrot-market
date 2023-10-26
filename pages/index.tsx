import Layout from "@/components/layout";
import FloatingButton from "@/components/floating-button";
import useUser from "@/libs/client/useUser";
import useSWR, { SWRConfig } from "swr";
import { Item } from "@prisma/client";
import HomeItem from "@/components/home-item";
import client from "@/libs/server/client";
import { NextPage } from "next";

export interface ProductWithCount extends Item {
  _count: {
    favs: number;
  };
}

interface ProductsResponse {
  ok: boolean;
  products: ProductWithCount[];
}

export function Home() {
  const { user, isLoading } = useUser();
  const { data } = useSWR<ProductsResponse>("/api/products");

  return (
    <Layout title="Home" hasTabBar>
      <div className="flex flex-col space-y-5">
        {data?.products?.map((product) => (
          <HomeItem
            id={product.id}
            key={product.id}
            title={product.name}
            price={product.price.toLocaleString("ko-KR")}
            hearts={product._count?.favs}
            comments={1}
          />
        ))}
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
      </div>
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
