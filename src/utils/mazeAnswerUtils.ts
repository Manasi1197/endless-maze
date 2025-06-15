
export function normalizeAnswer(s: string) {
  return s.trim().toLowerCase().replace(/[.?!]/g, "");
}

export function isCorrectAnswer(userMsg: string, answer: string) {
  const userNorm = normalizeAnswer(userMsg);
  const ansNorm = normalizeAnswer(answer);
  if (ansNorm.includes(",")) {
    return ansNorm.split(",").some((a) => userNorm.includes(a));
  }
  return userNorm.includes(ansNorm);
}
