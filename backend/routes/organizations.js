const express = require('express')
const router = express.Router()
const path = require('path')
const { readJson } = require('../lib/jsonStore')

const dataPath = path.join(__dirname, '../data/organizations.json')

router.get('/', (req, res) => {
  res.json(readJson(dataPath))
})

module.exports = router
