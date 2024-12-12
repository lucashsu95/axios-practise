import axiosInstance from "@/lib/axios";
import { useEffect, useState } from "react";

interface ApiData {
  ["ID Nation"]: string;
  Nation: string;
  ["ID Year"]: number;
  Year: string;
  Population: number;
  ["Slug Nation"]: string;
}

export default function Sec2() {
  const [data, setData] = useState<ApiData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
        );
        console.log(response.data);
        setData(response.data.data);
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
            <td className="border-[5px] p-[5px] ">ID Nation</td>
            <td className="border-[5px] p-[5px] ">Nation</td>
            <td className="border-[5px] p-[5px] ">ID Year</td>
            <td className="border-[5px] p-[5px] ">Year</td>
            <td className="border-[5px] p-[5px] ">Population</td>
            <td className="border-[5px] p-[5px] ">Slug Nation</td>
          </tr>
          {data.map((v) => (
            <tr key={v.Population}>
              <td className="border-[5px] p-[5px] ">{v["ID Nation"]}</td>
              <td className="border-[5px] p-[5px] ">{v.Nation}</td>
              <td className="border-[5px] p-[5px] ">{v["ID Year"]}</td>
              <td className="border-[5px] p-[5px] ">{v.Year}</td>
              <td className="border-[5px] p-[5px] ">{v.Population}</td>
              <td className="border-[5px] p-[5px] ">{v["Slug Nation"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
