import Link from "next/link";
import Header from "@/components/Header";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="notfound">
        <div>
          <h1>Страница не найдена</h1>
          <p>Возможно, ссылка устарела. Всё о тренингах — на главной странице</p>
          <Link className="btn" href="/">На главную</Link>
        </div>
      </main>
    </>
  );
}
