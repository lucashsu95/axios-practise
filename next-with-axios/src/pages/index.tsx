import Link from "next/link";

export default function Home() {
  return (
    <div className="wrpas">
      <div className="wrap">
        <Link href="/users" className="link">
          Look Users
        </Link>
      </div>
    </div>
  );
}
