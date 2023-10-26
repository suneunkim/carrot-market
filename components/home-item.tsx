import Link from "next/link";
import Heart from "./elements/Heart";
import Comments from "./elements/Comments";

interface ItemProps {
  title: string;
  id: number;
  price: number | string;
  hearts: number;
}

export default function HomeItem({ title, id, price, hearts }: ItemProps) {
  return (
    <Link className="mb-5" href={`/products/${id}`}>
      <section className="px-3 pb-3 space-y-2 cursor-pointer">
        <div className="w-full h-52 bg-gray-300 rounded-md" />

        <div className="flex justify-between">
          <div className="flex flex-col">
            <h3 className="font-medium text-gray-800">{title}</h3>
            <span className="font-medium text-sm mt-1 text-gray-800">{price}원</span>
          </div>
          <div className="flex items-end space-x-2">
            <div className="flex items-center text-sm text-gray-600">
              <Heart />
              <span>{hearts}</span>
            </div>
          </div>
        </div>
      </section>
    </Link>
  );
}
