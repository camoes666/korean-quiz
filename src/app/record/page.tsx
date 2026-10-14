import { Metadata } from 'next';
import Link from 'next/link';
import { getTriviaQuizzes } from '@/data/quizzes';

export const metadata: Metadata = {
  title: 'Record Mode | K-Pulse',
  robots: { index: false, follow: false },
};

export default function RecordIndexPage() {
  const quizzes = getTriviaQuizzes();

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-black text-slate-100">
      <div className="mx-auto w-full max-w-md p-6">
        <p className="text-xs font-bold tracking-widest text-slate-400">RECORD MODE 🎬</p>
        <h1 className="mt-1 text-xl font-extrabold">녹화할 퀴즈를 고르세요</h1>
        <ul className="mt-6 space-y-2">
          {quizzes.map((quiz) => (
            <li key={quiz.slug}>
              <Link
                href={`/record/${quiz.slug}`}
                className="flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 hover:bg-slate-800"
              >
                <span className="text-2xl">{quiz.coverEmoji}</span>
                <span className="flex-1">
                  <span className="block font-bold leading-snug">{quiz.title}</span>
                  <span className="text-xs text-slate-400">
                    {quiz.category} · {quiz.questions.length}문제
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-slate-400">
          정답이 있는 퀴즈만 녹화할 수 있어요. &quot;나는 어떤 멤버?&quot; 같은 성격 테스트는 정답이 없어서 빠져 있어요.
        </p>
      </div>
    </div>
  );
}
