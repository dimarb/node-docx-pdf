const express = require('express')
const app = express()
const port = 3000

const path = require('path');
const fs = require('fs').promises;

const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);

app.get('/', async (req, res)  =>  {
  

  const ext = '.pdf'
  const inputPath = path.join(__dirname, './template.docx');
  const outputPath = path.join(__dirname, `./example${ext}`);

  // Read file
  const docxBuf = await fs.readFile(inputPath);

  // Convert it to pdf format with undefined filter (see Libreoffice docs about filter)
  let pdfBuf = await libre.convertAsync(docxBuf, ext, undefined);
  
  // Here in done you have pdf file which you can save or transfer in another stream
  await fs.writeFile(outputPath, pdfBuf);

  return res.send('Hello World!')

})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})