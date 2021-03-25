const fs = require('fs').promises;
const os = require('os')

async function fileReadAndWrite(text) {
  try {
    let data;
    await fs.appendFile('./assets/readMe.txt', text);

    data = await fs.readFile('./assets/readMe.txt', 'utf8');
    return 'DATA SAVED ' + data;
  } catch (error) {
    console.log(error);
  }
}
console.log(os.userInfo());
console.log(os.uptime()/(60 * 60));
// fileReadAndWrite('It works Now .').then((data) => console.log(data));
