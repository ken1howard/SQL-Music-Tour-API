const events = require('express').Router();
const db = require('../models');
const { Event, MeetGreet, Band } = db;
const { Op } = require('sequelize');

events.get('/', async (req, res) =>{
    try {
        const searchTerm = req.query.name ? req.query.name : '';
        const foundEvents = await Event.findall({
            order: [['date', 'DESC'],
                    ['name','ASC']
            ],
            where: {
                name: { [Op.like]: `%${searchTerm}%`}
            }

        });
        res.status(200).json(foundEvents);
    } catch(e) {
        res.status(500).json(e);
    }
});

events.get('/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const foundEvent = await Event.findOne({
            where: { name  },
            include: {
                model: MeetGreet,
                as: 'meet_greets',
                attrinutes: {
                    exclude: [ 'event_id', 'band_id']
                },
                include: {
                    model: Band,
                    as: 'band'
                }
            }
        });
        if (foundEvent){
            res.status(404).json({message: 'Could not find band'})
        }
        res.status(200).json(foundEvent)
    } catch(error) {
        res.status(500).json(error)
    }
});

events.post('/', async (req, res) => {
    try {
        const newEvent = await Event.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new event',
            data: newEvent
        })
    } catch(err) {
        res.status(500).json(err)
    }
})


events.put('/:id', async (req, res) => {
    try {
        const updatedEvents = await Event.update(req.body, {
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedEvents} event(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})


events.delete('/:id', async (req, res) => {
    try {
        const deletedEvents = await Event.destroy({
            where: {
                event_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedEvents} event(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = events;