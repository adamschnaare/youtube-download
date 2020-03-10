const youtubedl = require('youtube-dl')
const inquirer = require('inquirer')
const fs = require('fs')

const questions = [
  {
    type: 'input',
    name: 'url',
    message: "What's the url?",
  },
]

inquirer.prompt(questions).then(answers => {
  console.log('Loading video...')
  const video = youtubedl(answers.url, [], { cwd: __dirname })

  // Will be called when the download starts.
  video.on('info', function(info) {
    console.log('Downloading...')
    console.log('...File: ' + info._filename)
    console.log('...Size: ' + info.size)
    video.pipe(fs.createWriteStream(info._filename, { flags: 'a' }))
  })

  video.on('end', function() {
    console.log('Finished downloading!')
  })
})
