import Button from "@/components/button";
import Layout from "@/components/layout";
import TextArea from "@/components/textarea";
import useCoords from "@/libs/client/useCoords";
import useMutation from "@/libs/client/useMutation";
import { Post } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface WriteForm {
  question: string; // form의 내용. api/posts로 req.body에 보내질 데이터.
}

interface WriteResponse {
  ok: boolean;
  post: Post;
}

export default function Write() {
  const { latitude, longitude } = useCoords();

  const router = useRouter();
  const { register, handleSubmit } = useForm<WriteForm>();
  const [post, { loading, data }] = useMutation<WriteResponse>("/api/posts");

  const onVaild = (data: WriteForm) => {
    if (loading) return; // data가 여러번 post 되는 것을 방지.
    post({ ...data, latitude, longitude });
  };

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/community/${data.post.id}`);
    }
  }, [data, router]);

  return (
    <Layout canGoBack title="동네에 질문하기">
      <form onSubmit={handleSubmit(onVaild)} className="p-4 space-y-4 mt-4">
        <TextArea
          register={register("question", { required: true, minLength: 3 })}
          required
          rows={7}
          placeholder="동네에 궁금한 점이 있다면 물어보세요!"
        />
        <Button text={loading ? "Loading..." : "작성 완료"} />
      </form>
    </Layout>
  );
}

// formData -> useMutation("api/posts") 보내서 post request. 포스트 생성하기
// 생성해서 ok 응답 받으면 생성된 페이지로 보내기
