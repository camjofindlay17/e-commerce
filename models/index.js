// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

Product.belongsTo(Category, {
  foreignKey: 'category_id',
});

Category.hasMany(Product, {
  foreignKey: 'category_id',
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {model: ProductTag},
  as: 'product_param',
  foreignKey:'product_id'
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {model: ProductTag},
  as: 'tag_param',
  foreignKey:'tag_id'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
