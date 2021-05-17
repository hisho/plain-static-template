export const asyncModule = (text) => {
  if (!text) return;
  if (!(typeof text === 'string')) return;

  console.log(text);
}
