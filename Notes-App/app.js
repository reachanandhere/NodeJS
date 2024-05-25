const fs = require('fs')
fs.writeFileSync('notes.txt', 'This is written by node js. \n')

fs.appendFileSync('notes.txt', 'This was added later')