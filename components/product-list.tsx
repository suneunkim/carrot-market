import { ProductWithCount } from "@/pages";
import useSWR from "swr";
import HomeItem from "./home-item";

interface ProductListProps {
  kind: "favs" | "sales" | "purchases";
}
interface Record {
  id: number;
  product: ProductWithCount;
}

interface ProductResponse {
  [key: string]: Record[];
}

export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<ProductResponse>(`/api/users/me/${kind}`);
  return (
    <>
      {data?.[kind]?.length === 0 ? (
        <div className="pt-[45%] text-center text-gray-600">내역이 없습니다.</div>
      ) : (
        data?.[kind]?.map((record) => (
          <HomeItem
            id={record?.product?.id}
            key={record?.product?.id}
            title={record?.product?.name}
            price={record?.product?.price}
            hearts={record?.product?._count?.favs}
          />
        ))
      )}
    </>
  );
}

// data?.[kind]?.length 가 0이면 빈 배열.
