export const say = (el) => {
  if(!el) return;
  if(!(el instanceof HTMLElement)) return;

  el.innerHTML = 'module';
}
