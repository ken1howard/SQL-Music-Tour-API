const stages = require('express').Router();
const db = require('../models');
const { Stage } = db;
const { Op } = require('sequelize');

stages.get('/', async (req, res) =>{
    try {
        const searchTerm = req.query.name ? req.query.name : '';
        const foundStages = await Stage.findall({
            order: [['manager', 'ASC'],
            ['name', 'ASC']
             ],
            where: {
                name: { [Op.like]: `%${searchTerm}%`}
            }

        });
        res.status(200).json(foundStages);
    } catch(e) {
        res.status(500).json(e);
    }
});

stages.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const foundStage = await Stage.findOne({
            where: { event_id: id }
        });
        if (foundStage){
            res.status(404).json({message: 'Could not find band'})
        }
        res.status(200).json(foundStage)
    } catch(error) {
        res.status(500).json(error)
    }
});

stages.post('/', async (req, res) => {
    try {
        const newStage = await Stage.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new event',
            data: newStage
        })
    } catch(err) {
        res.status(500).json(err)
    }
})


stages.put('/:id', async (req, res) => {
    try {
        const updatedStages = await Stage.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedStages} stage(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})


stages.delete('/:id', async (req, res) => {
    try {
        const deletedStages = await Stage.destroy({
            where: {
                stage_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedStages} stage(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = stages;