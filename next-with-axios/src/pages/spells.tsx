import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

interface ApiResponse {
  id: number;
  name: string;
  description: string;
}

export default function Sec1() {
  const [data, setData] = useState<ApiResponse[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          "https://hp-api.onrender.com/api/spells"
        );
        setData(response.data);
      } catch (err: unknown) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      }
    };
    fetchData();
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <>
      <table className="border border-slate-600 m-5">
        <tbody>
          <tr>
            <td className="border-[5px] p-[5px] ">ID</td>
            <td className="border-[5px] p-[5px] ">name</td>
            <td className="border-[5px] p-[5px] ">description</td>
          </tr>
          {data.map((d) => (
            <tr key={d.id}>
              <td className="border-[5px] p-[5px] ">{d.id}</td>
              <td className="border-[5px] p-[5px] ">{d.name}</td>
              <td className="border-[5px] p-[5px] ">{d.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
