const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const allCategory = await Category.findAll({
      include: {
        model: Product,
        attributes:["id", "product_name", "price", "stock"]
      }
    });
    res.status(200).json(allCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async(req, res) => {
  try {
    const pkCategory = await Category.findByPk(req.params.id, {
      include: {
        model: Product,
        attributes:["id", "product_name", "price", "stock"]
      }
    });
    res.status(200).json(pkCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async(req, res) => {
  try {
    const catInfo = await Category.create(req.body);
    res.status(200).json(catInfo);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async(req, res) => {
  try {
    const categoryInfo = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!categoryInfo[0]) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(categoryInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const delCat = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!delCat) {
      res.status(404).json({ message: 'No category with this id!' });
      return;
    }
    res.status(200).json(delCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
