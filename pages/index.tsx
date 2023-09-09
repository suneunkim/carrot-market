import Layout from "@/components/layout";
import FloatingButton from "@/components/floating-button";
import Item from "@/components/item";

export default function Home() {
  return (
    <Layout title="Home" hasTabBar>
      <div className="flex flex-col space-y-5">
        {[...Array(10)].map((_, i) => (
          <Item id={i} key={i} title="iPhone 20" price={1500000} hearts={1} comments={1} />
        ))}
        <FloatingButton href="/items/upload">
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
