const yaml = require('js-yaml'); 
const https = require('https');
const fs   = require('fs');

try {
  const doc = yaml.load(fs.readFileSync('./openapi-companies.yaml', 'utf8'));
  console.log(doc);
} catch (e) {
  console.log(e);
}
