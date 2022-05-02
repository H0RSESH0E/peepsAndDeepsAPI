const { User, Thought } = require('../models');

const thoughtController = {

    getAllThought(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(deepsDbData => res.json(deepsDbData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400).send('Error: 400 Bad Request');
            });
    },
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(deepsDbData => res.json(deepsDbData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400).send('Error: 400 Bad Request');
            });
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then(deepsDbData => {
                return User.findOneAndUpdate(
                    { _id: req.params.userId },
                    { $push: { thoughts: deepsDbData._id } },
                    { new: true }
                );
            })
            .then(deepsDbData => {
                if (!deepsDbData) {
                    res.status(404).json({ message: 'No user with that id can be found' });
                    return;
                }
                res.json(deepsDbData)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400).send('Error: 400 Bad Request');
            });
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            req.body,
            { new: true, runValidators: true }
        )
            .then(deepsDbData => {
                if (!deepsDbData) {
                    res.status(404).json({ message: 'No thought with that id can be found' });
                    return;
                }
                res.json(deepsDbData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400).send('Error: 400 Bad Request');
            });
    },
    deleteThought(req, res) {
        Thought.delete({ _id: req.params.thoughtId })
            .then(deepsDbData => res.json(deepsDbData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400).send('Error: 400 Bad Request');
            })

    },

    addReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $push: { reactions: req.body } },
            { new: true, runValidators: true }
        )
            .then(deepsDbData => {
                if (!deepsDbData) {
                    res.status(404).json({ message: 'No thought with that id can be found' });
                    return;
                }
                res.json(deepsDbData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400).send('Error: 400 Bad Request');
            });
    },
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true, runValidators: true }
        )
            .then(deepsDbData => {
                if (!deepsDbData) {
                    res.status(404).json({ message: 'No thought with that id can be found' });
                    return;
                }
                res.json(deepsDbData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400).send('Error: 400 Bad Request');
            });

    }
}

module.exports = thoughtController;