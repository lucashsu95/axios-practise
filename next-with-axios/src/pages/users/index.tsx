import axiosInstance from "@/lib/axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "@/components/ui/button";

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
  }, [state]);

  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`users/${id}`);
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

  if (error) return <div>Error:{error}</div>;
  if (!state) return <div>Loading...</div>;

  return (
    <div className="wraps flex-col">
      <section className="wrap space-y-5">
        <h1 className="text-2xl font-bold">User List</h1>

        <Button className="bg-sky-500 w-max">
          <Link href={"/users/create"}>新增使用者</Link>
        </Button>

        <table className="w-[800px] rounded-md overflow-hidden shadow divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {state.data.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td>
                  <Button className="bg-amber-400">
                    <Link href={`/users/${user.id}`}>編輯</Link>
                  </Button>
                  <Button
                    className="bg-rose-400 sm:ms-1"
                    onClick={() => handleDelete(user.id)}
                  >
                    刪除
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
