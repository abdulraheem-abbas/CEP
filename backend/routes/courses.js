const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')

const dataPath = path.join(__dirname, '../data/courses.json')

const readData = () => JSON.parse(fs.readFileSync(dataPath, 'utf8'))
const writeData = (data) => fs.writeFileSync(dataPath, JSON.stringify(data, null, 2))

router.get('/', (req, res) => {
  res.json(readData())
})

router.post('/', (req, res) => {
  const courses = readData()
  const newCourse = { id: Date.now(), ...req.body }
  courses.push(newCourse)
  writeData(courses)
  res.status(201).json(newCourse)
})

router.put('/:id', (req, res) => {
  const courses = readData()
  const index = courses.findIndex(c => String(c.id) === String(req.params.id))
  if (index === -1) return res.status(404).json({ error: 'Course not found' })
  courses[index] = { ...courses[index], ...req.body }
  writeData(courses)
  res.json(courses[index])
})

router.delete('/:id', (req, res) => {
  const courses = readData()
  const filtered = courses.filter(c => String(c.id) !== String(req.params.id))
  writeData(filtered)
  res.json({ success: true })
})

module.exports = router
