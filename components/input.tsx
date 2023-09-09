interface InputProps {
  label: string;
  name: string;
  kind?: "text" | "phone" | "price";
  [key: string]: any;
}

export default function Input({ label, name, kind = "text", ...rest }: InputProps) {
  return (
    <div>
      <label htmlFor={name} className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </label>
      {kind === "text" ? (
        <div className="rounded-md shadow-sm flex items-center relative">
          <input
            id={name}
            {...rest}
            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-400 focus:border-orange-400"
          />
        </div>
      ) : null}

      {kind === "phone" ? (
        <div className="flex rounded-md shadow-sm">
          <span className="flex items-center justify-center px-3 rounded-l-md border border-gray-300 border-r-0 text-gray-600 select-none">
            +82
          </span>
          <input
            id={name}
            {...rest}
            className="appearance-none w-full px-3 py-2 border-gray-300 rounded-md rounded-l-none shadow-sm focus:outline-none focus:ring-orange-400 focus:border-orange-400"
          />
        </div>
      ) : null}

      {kind === "price" ? (
        <div className="rounded-md shadow-sm flex items-center relative">
          <div className="absolute left-0 pointer-events-none pl-3 flex items-center justify-center">
            <span className="text-gray-500 text-sm">₩</span>
          </div>
          <input
            id={name}
            {...rest}
            className="appearance-none w-full px-3 py-2 border-gray-300 
          rounded-md shadow-sm focus:outline-none focus:ring-orange-400
           focus:border-orange-400 pl-8"
          />
          <div className="absolute right-0 pr-3 pointer-events-none">
            <span className="text-gray-500 text-sm">원</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
