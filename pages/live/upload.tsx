import Button from "@/components/button";
import Input from "@/components/input";
import Layout from "@/components/layout";
import TextArea from "@/components/textarea";

export default function LiveUpload() {
  return (
    <Layout title="라이브 만들기" canGoBack>
      <form className="px-4 space-y-5">
        <Input required label="제목" name="name" />
        <Input required label="가격" name="price" type="text" kind="price" />
        <TextArea label="자세한 설명" name="description" />
        <Button text="작성 완료" />
      </form>
    </Layout>
  );
}
