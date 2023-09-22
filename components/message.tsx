import { cls } from "@/libs/client/utils";

interface MessageProps {
  message: string;
  reversed?: boolean;
  avatarUrl?: string;
}

export default function Message({ message, avatarUrl, reversed }: MessageProps) {
  return (
    <div className={cls("flex items-start space-x-2", reversed ? "flex-row-reverse space-x-reverse" : "")}>
      <div className="w-10 h-10 rounded-full bg-gray-200" />
      <p className="text-sm text-gray-800 border border-gray-300 rounded-md p-2">{message}</p>
    </div>
  );
}
