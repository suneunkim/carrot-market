import TextArea from "@/components/textarea";
import Input from "@/components/input";
import Button from "@/components/button";
import Layout from "@/components/layout";

export default function ItemUpload() {
  return (
    <Layout title="상품 올리기">
      <form className="p-4 space-y-4">
        <div>
          <label
            className="w-full flex items-center justify-center border-2 border-dashed border-gray-300 h-44 rounded-md
         hover:text-orange-400 hover:border-orange-400 cursor-pointer"
          >
            <svg className="h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <input className="hidden" type="file" />
          </label>
        </div>
        <Input label="제목" type="text" name="name" required />
        <Input label="가격" kind="price" name="price" required />
        <TextArea name="description" label="자세한 설명" placeholder="상품에 대해 자세히 설명해주세요." />
        <Button text="작성 완료" />
      </form>
    </Layout>
  );
}
