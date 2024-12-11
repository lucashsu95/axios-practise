import Link from "next/link";

export default function Home() {
  return (
    <div className="p-6">
      <Link href="/users" className="link">Look Users</Link>
    </div>
  );
}
