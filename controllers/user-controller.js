const { User } = require('../models');

const userController = {

    getAllUser(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(peepsDbData => res.json(peepsDbData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400).send('Error: 400 Bad Request');
            });
    },

    getUserById(req, res) {
        User.findOne({ _id: req.params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(peepsDbData => res.json(peepsDbData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400).send('Error: 400 Bad Request');
            });
    },

    createNewUser(req, res) {
        User.create(req.body)
            .then(peepsDbData => res.json(peepsDbData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400).send('Error: 400 Bad Request');
            })
    },

    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            .then(peepsDbData => {
                if (!peepsDbData) {
                    res.status(404).json({ message: 'No user with that id can be found' });
                    return;
                }
                res.json(peepsDbData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400).send('Error: 400 Bad Request');
            })
    },

    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.id })
            .then(peepsDbData => res.json(peepsDbData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400).send('Error: 400 Bad Request');
            })
    },

    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $push: { friends: req.body } },
            { new: true }
        )
            .then(peepsDbData => {
                if (!peepsDbData) {
                    res.status(404).json({ message: 'No user with that id' });
                    return;
                }
                res.json(peepsDbData)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400).send('Error: 400 Bad Request');
            })

    },
    removeFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
            .then(peepsDbData => {
                if (!peepsDbData) {
                    res.status(404).json({ message: 'No user with that id' });
                    return;
                }
                res.json(peepsDbData)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400).send('Error: 400 Bad Request');
            })
    }
}

module.exports = userController;