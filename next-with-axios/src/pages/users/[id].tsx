import { GetServerSideProps } from "next";
import axiosInstance from "@/lib/axios";
import Link from "next/link";
import Button from "@/components/ui/button";
import { useState } from "react";

interface User {
  id: number;
  name: string;
  email: string;
}

interface ApiResponse {
  success: boolean;
  data: User;
  message: string;
}

interface UserPageProps {
  req: ApiResponse;
}

const UserPage = ({ req }: UserPageProps) => {
  const user = req.data;

  const [formData, setFormData] = useState<User | null>({
    id: user.id,
    name: user.name,
    email: user.email,
  });

  if(!formData) return <div>Loading...</div>;

  const onSubmit = () => {};
  return (
    <div className="wraps">
      <form action="" className="w-[400px] wrap mx-auto space-y-3 mt-5">
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
                setFormData((prev) => prev ? { ...prev, name: e.target.value } : prev)
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
                setFormData((prev) => prev ? { ...prev, email: e.target.value } : prev)
              }
            />
          </p>
        </section>
        <Button onClick={onSubmit} className="mt-2">
          儲存
        </Button>
      </form>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const res = await axiosInstance.get<User>(`users/${id}`);
  const req = res.data;

  return {
    props: {
      req,
    },
  };
};

export default UserPage;
