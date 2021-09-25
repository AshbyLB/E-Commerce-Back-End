const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


router.get('/', async (req, res) => {
  try {
    const allTags = await Tag.findAll({
      include:{
        model: Product,
        attributes: ["product_name", "price", "stock", "category_id"]
      }
    });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {

  try {
    const pkTags = await Tag.findByPk(req.params.id, {
      include:{
        model: Product,
        attributes: ["product_name", "price", "stock", "category_id"]
      }
    });
    res.status(200).json(pkTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const tagInfo = await Tag.create(req.body);
    res.status(200).json(tagInfo);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const tagInfo = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagInfo[0]) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(tagInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const delTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!delTag) {
      res.status(404).json({ message: 'No tag with this id!' });
      return;
    }
    res.status(200).json(delTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
