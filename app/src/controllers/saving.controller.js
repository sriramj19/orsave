const Saving = require('../models/saving.model');
const bcrypt = require('bcrypt');
const env = require('../environments/environment');
ObjectId = require('mongodb').ObjectID;

module.exports = {

    depositAmount: (req, res) => {
        if (req.body && req.body.depositAmount) {
            let _createdDate = new Date();
            let _user = ObjectId('5c376ae1cd32c41292e5ab0d');
            let saving = new Saving(
                {
                    userId: _user,
                    amount: req.body.depositAmount,
                    createdDate: _createdDate
                }
            );
            saving.save((err, response) => {
                if (err) {
                    console.log('Error while saving deposit', err);
                    return res.status(500).send(err);
                }

                Saving.aggregate(
                    [
                        {
                            $match: {
                                userId: _user
                            }
                        },
                        {
                            $group: { _id: null, total: { $sum: "$amount" } }
                        }]

                ).exec((err, data) => {
                    if (err) {
                        console.log('Error while fetching total savings from deposit', err);
                        return res.status(500).send(err);
                    }
                    let savingResponse = {
                        amount: response.amount,
                        total: data[0].total,
                        userId: response.userId,
                        id: response._id
                    };
                    return res.json(savingResponse);
                })
            });
        }
    },

    getSavings: (req, res) => {
        let _user = ObjectId('5c376ae1cd32c41292e5ab0d');
        Saving.aggregate([
            {
                $match: {
                    userId: _user
                }
            },
            {
                $group: {
                    _id: null, total: { $sum: '$amount' }, userId: { $first: '$userId' }
                }
            }
        ]).exec((err, data) => {
            if (err) {
                console.log('Error while fetching total savings', err);
                return res.status(500).send(err);
            }

            return res.json(data[0]);
        })
    }
};