// Неразрывные пробелы после коротких слов и перед тире — чтобы предлоги не висели в конце строки
const SHORT = /(^|[\s(«"])([а-яёА-ЯЁ]{1,3}|[A-Za-z]{1,2})\s+/g;

export function nb(text: string): string {
  return text
    .replace(SHORT, (_m, pre: string, word: string) => `${pre}${word} `)
    .replace(SHORT, (_m, pre: string, word: string) => `${pre}${word} `)
    .replace(/\s+—/g, " —")
    .replace(/(\d)\s+(?=[а-яёa-z$%])/gi, "$1 ");
}
