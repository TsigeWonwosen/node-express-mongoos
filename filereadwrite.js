const fs = require('fs').promises;

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

fileReadAndWrite('It works Now .').then((data) => console.log(data));
