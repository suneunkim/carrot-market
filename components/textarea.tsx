import { UseFormRegisterReturn } from "react-hook-form";

interface TextAreaProps {
  label?: string;
  name?: string;
  rows?: number;
  register: UseFormRegisterReturn;
  [key: string]: any;
}

export default function TextArea({ label, name, register, ...rest }: TextAreaProps) {
  return (
    <div>
      {label ? (
        <label htmlFor={name} className="mb-1 block text-sm font-medium text-gary-700">
          {label}
        </label>
      ) : null}
      <textarea
        id={name}
        {...register}
        rows={4}
        className="mt-1 shadow-sm w-full rounded-md border-gray-300
          focus:ring-orange-400 focus:border-orange-400"
        {...rest}
      />
    </div>
  );
}
