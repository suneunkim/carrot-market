import Item from "@/components/item";
import Layout from "@/components/layout";

export default function Loved() {
  return (
    <Layout title="관심 목록" canGoBack hasTabBar>
      <div className="flex flex-col space-y-5 pb-3">
        {[...Array(6)].map((_, i) => (
          <Item id={i} key={i} title="iPhone 12" price={990000} comments={1} hearts={1} />
        ))}
      </div>
    </Layout>
  );
}
