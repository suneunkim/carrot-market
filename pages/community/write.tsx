import Button from "@/components/button";
import Layout from "@/components/layout";
import TextArea from "@/components/textarea";

export default function Write() {
  return (
    <Layout canGoBack title="동네에 질문하기">
      <form className="p-4 space-y-4 mt-4">
        <TextArea required rows={7} placeholder="동네에 궁금한 점이 있다면 물어보세요!" />
        <Button text="작성 완료" />
      </form>
    </Layout>
  );
}
