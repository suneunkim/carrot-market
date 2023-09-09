import Button from "@/components/button";
import Input from "@/components/input";
import Layout from "@/components/layout";

export default function Edit() {
  return (
    <Layout title="프로필 수정하기" canGoBack>
      <form className=" px-4 space-y-4">
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
        <Input required label="이메일" name="email" type="email" />
        <Input required label="전화번호" name="phone" type="number" kind="phone" />
        <Button text="수정하기" />
      </form>
    </Layout>
  );
}
