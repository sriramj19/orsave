const Saving = require('../models/saving.model');
const env = require('../environments/environment');

module.exports = {
    getRandomSuggestion: (req, res) => {
        let _user = env.defaultUserId;
        Saving.find({ userId: _user }, { amount: 1 }).exec((err, data) => {
            if (err) {
                console.log('Error while fetching suggestions for savings', err);
                return res.status(500).send(err);
            }

            const range = (start, end) => {
                const length = end - start + 1;
                return Array.from({ length }, (_, i) => start + i);
            };

            let _universalSet = range(1, 365);

            let _alreadyExistingAmts = data.map(saving => saving.amount);

            _universalSet = _universalSet.filter(univSet => !_alreadyExistingAmts.includes(univSet));

            var rand = _universalSet[Math.floor(Math.random() * _universalSet.length)];

            return res.json(rand);
        })
    }
};