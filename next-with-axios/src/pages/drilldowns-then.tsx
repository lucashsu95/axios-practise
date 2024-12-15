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
    axiosInstance
      .get("https://datausa.io/api/data?drilldowns=Nation&measures=Population")
      .then((response) => {
        console.log(response.data);
        setData(response.data.data);
      })
      .catch((err) => {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      });
  }, []);

  if (error) return <div>Error: {error}</div>;
  if (!data)
    return (
      <div className="h-screen w-screen z-50 bg-slate-200/75 flex justify-center items-center font-bold text-xl">
        Loading...
      </div>
    );

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
