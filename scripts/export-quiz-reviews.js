const fs = require('fs');
const path = require('path');

const QUIZZES_DIR = path.join(__dirname, '..', 'src', 'data', 'quizzes');
const DOCS_DIR = path.join(__dirname, '..', 'docs', 'quizzes');

if (!fs.existsSync(DOCS_DIR)) {
  fs.mkdirSync(DOCS_DIR, { recursive: true });
}

const files = fs.readdirSync(QUIZZES_DIR).filter((f) => f.endsWith('.json'));

let masterIndex = `# 📚 K-Pulse Quiz Review & Audit Master Catalog

> **목적**: 서비스 중인 모든 퀴즈의 문항, 정답, 해설, 팩트체크 데이터를 개발 코드가 아닌 읽기 쉬운 마크다운 문서로 통합 관리합니다.  
> **생성일자**: ${new Date().toISOString().split('T')[0]}  
> **총 퀴즈 수**: ${files.length}개

---

## 📊 전체 퀴즈 현황 요약

| 퀴즈 명 (한국어 / English) | 슬러그 (Slug) | 카테고리 | 문항 수 | 난이도 | 바로가기 |
| :--- | :--- | :--- | :---: | :---: | :---: |
`;

let totalQuestionCount = 0;

files.forEach((file) => {
  const filePath = path.join(QUIZZES_DIR, file);
  const quiz = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  const qCount = quiz.questions ? quiz.questions.length : 0;
  totalQuestionCount += qCount;

  const docFileName = `${quiz.slug}.md`;
  const docPath = path.join(DOCS_DIR, docFileName);

  masterIndex += `| **${quiz.titleKo || quiz.title}**<br>_${quiz.title}_ | \`${quiz.slug}\` | ${quiz.category} | **${qCount}문항** | ${quiz.difficulty} | [검토 문서 보기](./${docFileName}) |\n`;

  // Generate individual review document
  let docContent = `# 📝 [검토용 카탈로그] ${quiz.titleKo || quiz.title}
> **영문명**: ${quiz.title}  
> **슬러그**: \`${quiz.slug}\`  
> **카테고리**: ${quiz.category} | **난이도**: ${quiz.difficulty} | **문항 수**: 총 ${qCount}문항  
> **실제 서비스 URL**: [https://kpulsequiz.com/quiz/${quiz.slug}](https://kpulsequiz.com/quiz/${quiz.slug})  
> **뒤로 가기**: [전체 카탈로그 목록 (INDEX)](./README.md)

---

## 🎯 점수 구간 및 평가 뱃지 (Score Tiers)
| 점수 범위 | 뱃지 | 한국어 타이틀 / 영문 타이틀 | 코멘트 |
| :---: | :---: | :--- | :--- |
`;

  if (quiz.scoreTiers && Array.isArray(quiz.scoreTiers)) {
    quiz.scoreTiers.forEach((tier) => {
      docContent += `| ${tier.minScore} ~ ${tier.maxScore}점 | ${tier.badgeKo || tier.badge} | **${tier.titleKo || tier.title}**<br>_${tier.title}_ | ${tier.descriptionKo || tier.description} |\n`;
    });
  }

  docContent += `\n---\n\n## ❓ 전체 문항 리스트 (${qCount}문항)\n\n`;

  if (quiz.questions && Array.isArray(quiz.questions)) {
    quiz.questions.forEach((q, idx) => {
      const qNum = q.id || idx + 1;
      const levelLabel = q.level === 1 ? '🌱 Level 1 (입문)' : q.level === 2 ? '⭐ Level 2 (일반/팬)' : q.level === 3 ? '🔥 Level 3 (코어/고난도)' : '';
      
      docContent += `### Q${qNum}. ${levelLabel ? `[${levelLabel}] ` : ''}${q.questionKo || q.question}\n`;
      if (q.questionKo && q.question) {
        docContent += `* *English*: ${q.question}\n\n`;
      }

      docContent += `#### 🔘 선택지 (Options)\n`;
      if (q.options && Array.isArray(q.options)) {
        q.options.forEach((opt) => {
          const isCorrect = opt.id === q.correctAnswer;
          const optKo = opt.textKo ? `${opt.textKo} (${opt.text})` : opt.text;
          docContent += `- **[${opt.id}]** ${optKo} ${isCorrect ? ' **[✅ 정답]**' : ''}\n`;
        });
      }

      docContent += `\n* **💡 상세 해설 (한국어)**: ${q.explanationKo || q.explanation}\n`;
      if (q.explanationKo && q.explanation) {
        docContent += `* *Explanation (EN)*: ${q.explanation}\n`;
      }
      if (q.funFactKo || q.funFact) {
        docContent += `* **✨ 펀팩트 / 비하인드**: ${q.funFactKo || q.funFact}\n`;
      }
      docContent += `\n---\n\n`;
    });
  }

  fs.writeFileSync(docPath, docContent, 'utf-8');
});

masterIndex += `\n---\n\n**총 누적 문항 수**: **${totalQuestionCount}문제**\n\n`;
masterIndex += `### 💡 검토 및 수정 팁
1. **문항 오류나 번역 개선**: 위 표에서 해당 퀴즈의 문서를 열어 질문, 정답, 해설을 확인합니다.
2. **수정 반영**: \`src/data/quizzes/[slug].json\` 파일을 직접 수정하거나 프롬프트로 "OO 퀴즈 Q3번 정답 수정해줘"라고 요청하면 즉시 반영됩니다.
3. **최신화 동기화**: \`npm run export:quizzes\` 명령어로 모든 문서를 최신 JSON 상태로 다시 일괄 갱신할 수 있습니다.
`;

fs.writeFileSync(path.join(DOCS_DIR, 'README.md'), masterIndex, 'utf-8');
console.log(`Generated review catalogs for ${files.length} quizzes (${totalQuestionCount} total questions) in ${DOCS_DIR}`);
