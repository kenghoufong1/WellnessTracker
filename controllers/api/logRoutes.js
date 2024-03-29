const router = require('express').Router();
const { Log, Workout } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/',withAuth, async (req, res) => {
    try {
        const logData = await Log.findAll({
        });
        res.status(200).json(logData);
    } catch (err) {
        res.status(500).json(err);
    }
});
//get the logged data back for the graph
router.get('/graphdata',withAuth, async (req, res) => {
    try {
        const logData = await Log.findAll({
            where: {
                user_id: req.session.user_id,
            },
        });
        res.status(200).json(logData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id',withAuth, async (req, res) => {
    try {
        const logData = await Log.findByPk(req.params.id, {
            include: [{ model: Product }],
        });
        if (!logData) {
            res.status(404).json({ message: 'No log found with this id!' })
            return;
        }
        res.status(200).json(logData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const newLog = await Log.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.status(200).json(newLog);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.put('/:id', withAuth, async (req, res) => {
    try {
        logData = await Log.update(
            req.body,
            {
                where: {
                    id: req.params.id
                }
            }
        );
        if (!logData) {
            res.status(404).json({ message: 'No log found with this id!' });
            return;
        }
        res.status(200).json(logData);
    } catch (err) {
        res.status(500).json(err);
    }
})

router.delete('/:id', withAuth, async (req, res) => {
    try {
        const logData = await Log.destroy({
            where: {
            id: req.params.id,
            user_id: req.session.user_id,
            },
    });
    if (!logData) {
        res.status(404).json({ message: 'No log found with this id!' });
        return;
    }
    res.status(200).json(logData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;