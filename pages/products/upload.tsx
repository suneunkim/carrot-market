import TextArea from "@/components/textarea";
import Input from "@/components/input";
import Button from "@/components/button";
import Layout from "@/components/layout";
import { useForm } from "react-hook-form";
import useMutation from "@/libs/client/useMutation";
import { useEffect } from "react";
import { Item } from "@prisma/client";
import { useRouter } from "next/router";

interface UploadProductForm {
  name: string;
  price: number;
  description: string;
}

interface UploadProductMutation {
  ok: boolean;
  product: Item;
}

export default function ItemUpload() {
  const router = useRouter();
  const { register, handleSubmit } = useForm<UploadProductForm>();
  const [uploadItem, { loading, data }] = useMutation<UploadProductMutation>("/api/products");
  const onValid = (formData: UploadProductForm) => {
    if (loading) return;
    uploadItem(formData);
  };
  useEffect(() => {
    if (data?.ok) {
      router.replace(`/products/${data.product.id}`);
    }
  }, [data, router]);

  return (
    <Layout title="상품 올리기">
      <form onSubmit={handleSubmit(onValid)} className="p-4 space-y-4">
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
        <Input register={register("name", { required: true })} label="제목" type="text" name="name" required />
        <Input
          register={register("price", { required: true })}
          type="text"
          label="가격"
          kind="price"
          name="price"
          required
        />
        <TextArea
          register={register("description", { required: true })}
          name="description"
          label="자세한 설명"
          placeholder="상품에 대해 자세히 설명해주세요."
          required
        />
        <Button text={loading ? "로딩중..." : "작성 완료"} />
      </form>
    </Layout>
  );
}
