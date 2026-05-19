const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

const dataPath = path.join(__dirname, '../data/organizations.json')

router.get('/', (req, res) => {
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'))
  res.json(data)
})

module.exports = router
