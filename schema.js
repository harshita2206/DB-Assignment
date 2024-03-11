// using popular ORM library called squelize used with node.js
// installation of squelize

npm init -y
npm install sequelize sequelize-cli mysql2 # Replace 'mysql2' with your preferred database driver
npx sequelize-cli init

//Open the generated models/product.js file and define the "Product" model

// models/product.js
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Product.associate = (models) => {
    Product.belongsTo(models.ProductCategory, {
      foreignKey: {
        allowNull: false,
      },
    });
  };

  return Product;
};

//Open the generated models/productCategory.js file and define the "ProductCategory" model
// models/productCategory.js
module.exports = (sequelize, DataTypes) => {
  const ProductCategory = sequelize.define('ProductCategory', {
    categoryName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  ProductCategory.associate = (models) => {
    ProductCategory.hasMany(models.Product);
  };

  return ProductCategory;
};

// db.js
const { Sequelize } = require('sequelize');
const config = require('./config/config.json'); // Adjust path if needed
const ProductModel = require('./models/product');
const ProductCategoryModel = require('./models/productCategory');

const sequelize = new Sequelize(config.development);

const Product = ProductModel(sequelize, Sequelize);
const ProductCategory = ProductCategoryModel(sequelize, Sequelize);

ProductCategory.sync({ force: true }).then(() => {
  console.log('ProductCategory table created');
});

Product.sync({ force: true }).then(() => {
  console.log('Product table created');
});

//Run your db.js file to create the tables

node db.js
