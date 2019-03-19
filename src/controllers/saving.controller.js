const Saving = require('../models/saving.model');
const env = require('../environments/environment');

module.exports = {

    depositAmount: (req, res) => {
        if (req.body && req.body.depositAmount) {
            let _createdDate = new Date();
            let _user = env.defaultUserId;
            let saving = new Saving(
                {
                    userId: _user,
                    amount: req.body.depositAmount,
                    createdDate: _createdDate,
                    actualDate: _createdDate
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
        let _user = env.defaultUserId;
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

            return res.json(data[0] || { total: 0, userId: _user });
        })
    },

    /**Exclusively for data fixes */
    updateActualDate: (req, res) => {
        let _user = env.defaultUserId;

        Saving.update({
            userId: _user,
            amount: 265
        },
            {
                actualDate: new Date('01-08-2019')
            }).exec((err, data) => {
                if (err) {
                    console.log('Error while updating savings', err);
                    return res.status(500).send(err);
                }

                return res.json(data);
            })
    },

    updateDateOrder: (req, res) => {
        let _user = env.defaultUserId;

        Saving.aggregate([
            {
                $match: {
                    userId: _user,
                    createdDate: { $gt: new Date('2019-01-07T18:30:00.000Z') }
                }
            },
            {
                $sort: {
                    createdDate: 1
                }
            }
        ]).exec((err, data) => {
            if (err) {
                console.log('Error while fetching update savings', err);
                return res.status(500).send(err);
            }

            let _allData = data;

            let _curActualDate = new Date('01-08-2019');

            _allData.forEach(data => {
                data.actualDate = _curActualDate;
                Saving.updateOne({
                    amount: data.amount,
                    userId: _user
                }, {
                        actualDate: data.actualDate
                    }).exec((err, data) => {
                        console.log('Entering exec for ', data);
                        if (err) {
                            return console.log('err for above', err);
                        }

                        console.log('success for', data);
                    });
                _curActualDate.setDate(_curActualDate.getDate() + 1);
            });

            return res.json(_allData);

        })
    }
};