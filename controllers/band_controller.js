const bands = require('express').Router();
const db = require('../models');
const { Bands, MeetGreet, Event } = db;
const { Op } = require('sequelize');

bands.get('/', async (req, res) =>{
    try {
        const { name = '', limit= 99, offset= 0 } = req.query;
        const foundBands = await Bands.findall({
            order: [['available_start_time', 'ASC']],
            where: {
                name: { [Op.like]: `%${name}%`}
            },
            limit,
            offset
        });
        res.status(200).json(foundBands);
    } catch(e) {
        res.status(500).json(e);
    }
});

bands.get('/:name', async (req, res) => {
    const { name } = req.params;
    try {
        const foundBand = await Bands.findOne({
            where: { name },
            include: {
                model: MeetGreet,
                as: 'meetings',
                include:{
                    model: Event,
                    as: 'event'
                }
            }
        });
        if (foundBand){
            res.status(404).json({message: 'Could not find band'})
        }
        res.status(200).json(foundBand)
    } catch(error) {
        res.status(500).json(error.toString())
    }
});

bands.post('/', async (req, res) => {
    try {
        const newBand = await Band.create(req.body)
        res.status(200).json({
            message: 'Successfully inserted a new band',
            data: newBand
        })
    } catch(err) {
        res.status(500).json(err)
    }
})


bands.put('/:id', async (req, res) => {
    try {
        const updatedBands = await Band.update(req.body, {
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully updated ${updatedBands} band(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})


bands.delete('/:id', async (req, res) => {
    try {
        const deletedBands = await Band.destroy({
            where: {
                band_id: req.params.id
            }
        })
        res.status(200).json({
            message: `Successfully deleted ${deletedBands} band(s)`
        })
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = bands