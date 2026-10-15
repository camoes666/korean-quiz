import { Metadata } from 'next';
import Link from 'next/link';
import { getAllQuizzes } from '@/data/quizzes';
import type { Quiz } from '@/types/quiz';

export const metadata: Metadata = {
  title: 'Record Mode | K-Pulse',
  robots: { index: false, follow: false },
};

function QuizLinks({ quizzes, detail }: { quizzes: Quiz[]; detail: (quiz: Quiz) => string }) {
  return (
    <ul className="mt-3 space-y-2">
      {quizzes.map((quiz) => (
        <li key={quiz.slug}>
          <Link
            href={`/record/${quiz.slug}`}
            className="flex items-center gap-3 rounded-xl bg-slate-900 px-4 py-3 hover:bg-slate-800"
          >
            <span className="text-2xl">{quiz.coverEmoji}</span>
            <span className="flex-1">
              <span className="block font-bold leading-snug">{quiz.title}</span>
              <span className="text-xs text-slate-400">{detail(quiz)}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function RecordIndexPage() {
  const quizzes = getAllQuizzes();
  const personality = quizzes.filter((q) => q.quizType === 'personality');
  const trivia = quizzes.filter((q) => q.quizType !== 'personality' && q.questions.length > 0);

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-black text-slate-100">
      <div className="mx-auto w-full max-w-md p-6">
        <p className="text-xs font-bold tracking-widest text-slate-400">RECORD MODE 🎬</p>
        <h1 className="mt-1 text-xl font-extrabold">녹화할 퀴즈를 고르세요</h1>

        <h2 className="mt-6 text-sm font-bold text-slate-300">🔮 성격 테스트 (질문 → 결과 공개)</h2>
        <QuizLinks
          quizzes={personality}
          detail={(q) => `${Object.keys(q.personalityResults || {}).length}가지 결과 · 결과 멤버 선택 가능`}
        />

        <h2 className="mt-6 text-sm font-bold text-slate-300">🧠 트리비아 퀴즈 (문제 → 정답 공개)</h2>
        <QuizLinks quizzes={trivia} detail={(q) => `${q.category} · ${q.questions.length}문제`} />
      </div>
    </div>
  );
}
