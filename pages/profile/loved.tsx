import Layout from "@/components/layout";
import ProductList from "@/components/product-list";

export default function Loved() {
  return (
    <Layout title="관심 목록" canGoBack hasTabBar>
      <div className="flex flex-col space-y-5 pb-3">
        <ProductList kind="favs" />
      </div>
    </Layout>
  );
}
