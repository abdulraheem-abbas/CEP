const express = require('express')
const router = express.Router()
const path = require('path')
const { readJson, writeJson } = require('../lib/jsonStore')

const dataPath = path.join(__dirname, '../data/curriculum.json')

const readData = () => readJson(dataPath)
const writeData = (data) => writeJson(dataPath, data)

router.get('/', (req, res) => {
  res.json(readData())
})

router.post('/', (req, res) => {
  const items = readData()
  const newItem = { id: Date.now(), ...req.body }
  items.push(newItem)
  writeData(items)
  res.status(201).json(newItem)
})

router.put('/:id', (req, res) => {
  const items = readData()
  const index = items.findIndex(i => String(i.id) === String(req.params.id))
  if (index === -1) return res.status(404).json({ error: 'Week not found' })
  items[index] = { ...items[index], ...req.body }
  writeData(items)
  res.json(items[index])
})

router.delete('/:id', (req, res) => {
  const items = readData()
  const filtered = items.filter(i => String(i.id) !== String(req.params.id))
  writeData(filtered)
  res.json({ success: true })
})

module.exports = router
