const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try{
    const data = await Tag.findAll({ 
      include: 'tag_param'
    });
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const data = await Tag.findByPk(req.params.id, {
      include: 'tag_param'
    })
  
    if (!data) {
      res.status(400).json({message: 'No product found with that id!'})
    }
    
    res.status(200).json(data)
  
    } catch (err) {
      res.status(500).json(err)
    } 
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const data = await Tag.create({
      tag_name:req.body.tag_name,
    })
    res.status(200).json(data);
    } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', (req, res) => {
  Tag.update(
    {
      tag_name:req.body.tag_name,
    },
    {
      where: {
        id: req.params.id
      }
    })
    .then((data) => {
    res.status(200).json(data);
  })
  .catch((err) => { res.status(400).json(err)
  })
});

router.delete('/:id', async (req, res) => {
  try {
    const data = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!data) {
      res.status(404).json({ message: 'No library card found with that id!' });
      return;
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
