const fs = require('fs');
const input = process.argv[2];
const output = process.argv[3] || input.replace('.geojson', '.normalized.geojson');

const data = JSON.parse(fs.readFileSync(input, 'utf8'));
let touched = 0;
for (const f of data.features) {
  for (const c of f.geometry.coordinates) {
    if (c[0] === 180) { c[0] = -180; touched++; }
  }
}
fs.writeFileSync(output, JSON.stringify(data));
console.log(`Normalized ${touched} antimeridian vertices → ${output}`);