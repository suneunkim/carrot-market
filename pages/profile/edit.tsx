import Button from "@/components/button";
import Input from "@/components/input";
import Layout from "@/components/layout";
import useUser from "@/libs/client/useUser";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface EditForm {
  email?: string;
  phone?: string;
  formErrors?: string;
}

export default function Edit() {
  const { user } = useUser();
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<EditForm>();

  useEffect(() => {
    if (user?.email) setValue("email", user.email);
    if (user?.phone) setValue("phone", user.phone);
  }, [user, setValue]);

  const onValid = ({ email, phone }: EditForm) => {
    if (!email && !phone) {
      setError("formErrors", { message: "이메일 또는 전화번호 중 하나가 필요합니다." });
    }
  };

  return (
    <Layout title="프로필 수정하기" canGoBack>
      <form onSubmit={handleSubmit(onValid)} className=" px-4 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 rounded-full bg-slate-200" />
          <label
            htmlFor="picture"
            className="cursor-pointer px-3 py-2 border border-gray-300 
        rounded-full shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2
        focus:ring-orange-400 text-gray-700 hover:font-bold transition"
          >
            프로필 사진 변경하기
            <input id="picture" type="file" className="hidden" accept="image/*" />
          </label>
        </div>
        <Input register={register("email")} label="이메일" name="email" type="email" kind="text" />
        <Input register={register("phone")} label="전화번호" name="phone" type="number" kind="phone" />
        {errors.formErrors ? (
          <div className="my-2 text-center text-red-500 font-semibold">{errors?.formErrors.message}</div>
        ) : null}
        <Button text="수정하기" />
      </form>
    </Layout>
  );
}
