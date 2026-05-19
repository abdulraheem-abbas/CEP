const fs = require('fs')
const os = require('os')
const path = require('path')

const getDataPath = (sourcePath) => {
  if (!process.env.VERCEL) return sourcePath

  const tmpPath = path.join(os.tmpdir(), `forsa-${path.basename(sourcePath)}`)
  if (!fs.existsSync(tmpPath)) {
    fs.copyFileSync(sourcePath, tmpPath)
  }
  return tmpPath
}

const readJson = (sourcePath) => {
  return JSON.parse(fs.readFileSync(getDataPath(sourcePath), 'utf8'))
}

const writeJson = (sourcePath, data) => {
  fs.writeFileSync(getDataPath(sourcePath), JSON.stringify(data, null, 2))
}

module.exports = { readJson, writeJson }
