import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";

interface ApiResponse {
  success: boolean;
  data: {
    id: number;
    name: string;
    email: string;
  }[];
  message: string;
}

export default function Home() {
  const [state, setState] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get<ApiResponse>("users");
        setState(res.data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      }
    };
    fetchData();
  });

  if (error) return <div>Error:{error}</div>;
  if (!state) return <div>Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">User List</h1>
      <ul>
        {state.data.map((data) => (
          <li
            key={data.id}
            className="border px-3 py-2 m-3 rounded-md hover:bg-slate-50"
          >
            {data.name} ({data.email})
          </li>
        ))}
      </ul>
    </div>
  );
}
