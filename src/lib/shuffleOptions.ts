import type { Question } from '@/types/quiz';

/**
 * Returns a copy of the question with its options in random order, relabeled A, B, C, D
 * top to bottom, and correctAnswer pointing at the moved correct option.
 * Question banks are authored with the answer mostly in slot A, so play sessions shuffle.
 */
export function shuffleQuestionOptions(question: Question, random: () => number = Math.random): Question {
  const options = [...question.options];
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]];
  }

  const labels = question.options.map((o) => o.id);
  let correctAnswer = question.correctAnswer;
  const relabeled = options.map((option, index) => {
    if (option.id === question.correctAnswer) correctAnswer = labels[index];
    return { ...option, id: labels[index] };
  });

  return { ...question, options: relabeled, correctAnswer };
}
