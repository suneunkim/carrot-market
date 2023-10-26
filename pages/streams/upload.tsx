import Button from "@/components/button";
import Input from "@/components/input";
import Layout from "@/components/layout";
import TextArea from "@/components/textarea";
import useMutation from "@/libs/client/useMutation";
import { Stream } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface UploadForm {
  name: string;
  price: string;
  description: string;
}

interface UploadResponse {
  ok: boolean;
  stream: Stream;
}

export default function LiveUpload() {
  const router = useRouter();
  const [createLive, { loading, data }] = useMutation<UploadResponse>(`/api/streams`);
  const { register, handleSubmit } = useForm<UploadForm>();

  const onValid = (form: UploadForm) => {
    if (loading) return; // 중복 업로드 방지
    createLive(form);
  };

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/streams/${data.stream.id}`);
    }
  }, [data, router]);

  return (
    <Layout title="라이브 만들기" canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="px-4 space-y-5">
        <Input register={register("name", { required: true })} type="text" required label="제목" name="name" />
        <Input
          register={register("price", { required: true, valueAsNumber: true })}
          type="text"
          required
          label="가격"
          name="price"
          kind="price"
        />
        <TextArea
          register={register("description", { required: true })}
          type="text"
          label="자세한 설명"
          name="description"
        />
        <Button text={loading ? "Loading..." : "작성 완료"} />
      </form>
    </Layout>
  );
}
