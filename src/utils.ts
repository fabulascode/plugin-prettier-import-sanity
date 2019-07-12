export function compareNames(a: string, b: string) {
  const firstLetterFirstTerm = a.slice(0, 1)[0].toLowerCase();
  const firstLetterSecondTerm = b.slice(0, 1)[0].toLowerCase();

  if (firstLetterFirstTerm === firstLetterSecondTerm) {
    return 0;
  } else if (firstLetterFirstTerm > firstLetterSecondTerm) {
    return 1;
  } else {
    return -1;
  }
}
