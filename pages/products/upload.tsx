import TextArea from "@/components/textarea";
import Input from "@/components/input";
import Button from "@/components/button";
import Layout from "@/components/layout";
import { useForm } from "react-hook-form";
import useMutation from "@/libs/client/useMutation";
import { useEffect, useState } from "react";
import { Item } from "@prisma/client";
import { useRouter } from "next/router";
import CategoryInput from "@/components/categories/CategoryInput";
import categoryList from "@/components/categories/Categories";

interface UploadProductForm {
  name: string;
  price: number;
  description: string;
  image: FileList;
  category: string;
}

interface UploadProductMutation {
  ok: boolean;
  product: Item;
}

export default function ItemUpload() {
  const router = useRouter();
  const { register, handleSubmit, watch, setValue } = useForm<UploadProductForm>({
    defaultValues: {
      category: "기타",
    },
  });

  const category = watch("category");

  const [uploadItem, { loading, data }] = useMutation<UploadProductMutation>("/api/products/upload");

  const imageUploader = async (file: any) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "fff1cvhg");

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/dcmxpsjbw/image/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Image upload failed with status: ${response.status}`);
      }
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  const onValid = async (formData: UploadProductForm) => {
    const { image, name, price, description, category } = formData;

    try {
      if (image) {
        const imageUrl = await imageUploader(image[0]);
        uploadItem({ imageUrl, name, price, description, category });
      } else {
        uploadItem({ name, price, description, category });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (data?.ok) {
      router.replace(`/products/${data.product.id}`);
    }
  }, [data, router]);

  // 상품 사진 미리보기
  const [itemPreview, setItemPreview] = useState<string | undefined>(undefined);
  const itemImage = watch("image");

  useEffect(() => {
    if (itemImage && itemImage.length > 0) {
      const file = itemImage[0];
      const previewURL = URL.createObjectURL(file);
      setItemPreview(previewURL);
    }
  }, [itemImage]);
  // imageUploader 함수의 url 반환값을 넣어줘도 될듯.

  return (
    <Layout canGoBack title="상품 올리기">
      <form onSubmit={handleSubmit(onValid)} className="p-4 space-y-4">
        <div>
          {itemImage ? (
            <img src={itemPreview} className="w-full" />
          ) : (
            <label
              className="w-full flex items-center justify-center border-2 border-dashed border-gray-300 h-60 rounded-md
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
              <input {...register("image")} className="hidden" type="file" accept="image/*" />
            </label>
          )}
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
        {/* 카테고리 */}
        <div className="grid grid-cols-2 gap-4">
          {categoryList.map((item) => (
            <div key={item.label} className="col-span-1">
              <CategoryInput
                onClick={(category: any) => setValue("category", category)}
                selected={category === item.path}
                label={item.label}
                path={item.path}
                icon={item.icon}
              />
            </div>
          ))}
        </div>

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
