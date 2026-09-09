import fs from 'fs';
import readline from 'readline';

async function processLineByLine() {
  const fileStream = fs.createReadStream('sih_entrepreneur_schemes_expanded.csv');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let i = 0;
  for await (const line of rl) {
    console.log(`Line ${i}: ${line}`);
    i++;
    if (i > 3) break;
  }
}

processLineByLine();
