const { Pizza } = require('../models');

const pizzaController = {
    // get all pizzas
    getAllPizza(req, res) {
    // Mongoose find method (like findAll in Sequelize)
      Pizza.find({})
      // Fetch comments with the fetched pizzas
      .populate({
        path: 'comments',
        // Do not return the __v field
        select: '-__v'
      })
        .select('-__v')
        // Return newest pizza first (sort in descending order by id value)
        .sort({ _id: -1 })
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => {
          console.log(err);
          res.status(400).json(err);
        });
    },
  
    // get one pizza by id
    getPizzaById({ params }, res) {
    // Mongoose find one method
        Pizza.findOne({ _id: params.id })
        .populate({
        path: 'comments',
        select: '-__v'
        })
        .select('-__v')
        .then(dbPizzaData => {
        if (!dbPizzaData) {
            res.status(404).json({ message: 'No pizza found with this id!' });
            return;
        }
        res.json(dbPizzaData);
        })
        .catch(err => {
        console.log(err);
        res.status(400).json(err);
        });
    },

    // createPizza
    createPizza({ body }, res) {
        Pizza.create(body)
        .then(dbPizzaData => res.json(dbPizzaData))
        .catch(err => res.status(400).json(err));
    },

    // update pizza by id
    updatePizza({ params, body }, res) {
        // Run validators (from model) to regulate user entries
        Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
            res.status(404).json({ message: 'No pizza found with this id!' });
            return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete pizza
    deletePizza({ params }, res) {
        Pizza.findOneAndDelete({ _id: params.id })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
            res.status(404).json({ message: 'No pizza found with this id!' });
            return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.status(400).json(err));
    }
  }

module.exports = pizzaController;