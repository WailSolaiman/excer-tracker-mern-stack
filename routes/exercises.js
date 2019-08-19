const router = require('express').Router()
const verify = require('../utils/verify-token')
let Exercise = require('../models/exersice.model')

router.get('/', verify, (req, res) => {
    Exercise.find()
        .then(exercises => {
            res.json(exercises)
        })
        .catch(error => res.status(400).json(error))
})

router.post('/add', verify, (req, res) => {
    const userId = req.body.userId
    const username = req.body.username
    const description = req.body.description
    const duration = Number(req.body.duration)
    const date = Date.parse(req.body.date)

    const newExercise = new Exercise({
        userId,
        username,
        description,
        duration,
        date,
    })

    newExercise
        .save()
        .then(() => {
            res.send('Exercise added!')
        })
        .catch(error => {
            res.status(400).json(error)
        })
})

router.get('/:id', verify, (req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(error => res.status(400).json(error))
})

router.delete('/:id', verify, (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.send('Exercise deleted!'))
        .catch(error => res.status(400).json(error))
})

router.post('/update/:id', verify, (req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username
            exercise.description = req.body.description
            exercise.duration = Number(req.body.duration)
            exercise.date = Date.parse(req.body.date)

            exercise
                .save()
                .then(() => res.send('Exercise updated!'))
                .catch(error => res.status(400).json(error))
        })
        .catch(error => res.status(400).json(error))
})

module.exports = router
