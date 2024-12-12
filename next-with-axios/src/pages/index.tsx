import Link from "next/link";

export default function Home() {
  return (
    <div className="wraps">
      <div className="wrap">
        <ul className="space-y-3 w-52">
          <li>
            <Link href="/spells" className="link">
              練習1
            </Link>
          </li>
          <li>
            <Link href="/drilldowns" className="link">
              練習2
            </Link>
          </li>
          <li>
            <Link href="/users" className="link">
              Users 練習
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
