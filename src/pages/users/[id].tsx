import axiosInstance from "@/lib/axios";
import Link from "next/link";
import Button from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fail } from "@/lib/ApiResponse";

interface FormData {
  id: number;
  name: string;
  email: string;
}

const UserPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [formData, setFormData] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    axiosInstance
      .get(`users/${id}`)
      .then((res) => {
        const { id, name, email } = res.data.data;
        setFormData({ id, name, email });
      })
      .catch((err) => {
        setError(fail(err));
      });

    setLoading(false);
  }, [id]);

  if (!formData) return <div>User not found</div>;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    axiosInstance
      .put(`users/${formData.id}`, formData)
      .then(() => {
        alert("編輯成功");
        router.push("/users");
      })
      .catch((err) => {
        setError(fail(err));
      });
  };

  if (loading)
    return (
      <div className="h-screen w-screen z-50 bg-slate-200/75 flex justify-center items-center font-bold text-xl">
        Loading...
      </div>
    );

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="wraps">
      <form
        onSubmit={handleSubmit}
        className="w-[400px] wrap mx-auto space-y-3 mt-5"
      >
        <Link href="/users" className="link">
          Back to Users
        </Link>
        <h1 className="text-xl font-bold">修改使用者</h1>
        <section className="space-y-5">
          <p>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              className="input"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev!, name: e.target.value }))
              }
            />
          </p>
          <p>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              className="input"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev!, email: e.target.value }))
              }
            />
          </p>
        </section>
        <Button className="mt-2">儲存</Button>
      </form>
    </div>
  );
};

export default UserPage;
