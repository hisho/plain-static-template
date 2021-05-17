const chalk = require('chalk'); //コンソールに色をつける

const _args = {
  key: 'string',
  value: 'string',
  color: 'blue'
}

function timeLog(...args) {
  const date = new Date();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const currentTime = `${hours}:${minutes}:${seconds}`;
  args.forEach(({key,value,color}) => {
    console.log(`[${chalk.gray(currentTime)}] ${key} :${chalk[color](value)}`);
  })
}

module.exports = timeLog;
