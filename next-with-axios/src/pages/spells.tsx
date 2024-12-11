import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios";

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
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axiosInstance.get(
          "https://hp-api.onrender.com/api/spells"
        );
        setData(data);
      } catch (err) {
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
    <div>
      <h1>Data from API</h1> <pre>{JSON.stringify(data, null, 2)}</pre>{" "}
    </div>
  );
}
