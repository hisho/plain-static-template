console.log('DOMContentLoaded after');
window.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded');
});
console.log('DOMContentLoaded after');

import {say} from "./say.js";

(() => {

  const app = document.getElementById('app');
  if (!app) return;
  say(app);

})();

(() => {

  const button = document.querySelector('button');
  if (!button) return;

  button.addEventListener('click', async () => {
    const test = await import('./asyncModule.js');
    test.asyncModule('aaaaaaaaaa');
  }, false);


})();
