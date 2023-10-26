import Layout from "@/components/layout";
import ProductList from "@/components/product-list";

export default function Loved() {
  return (
    <Layout title="판매 내역" canGoBack hasTabBar>
      <div className="flex flex-col space-y-5 pb-3">
        <ProductList kind="sales" />
      </div>
    </Layout>
  );
}
