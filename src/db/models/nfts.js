'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Nfts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Collections, {
        as: 'collections',
        foreignKey: 'collectionId',
        onDelete: 'RESTRICT'
      })

      this.hasMany(models.MarketLogs, {
        as: 'marketlogs',
        foreignKey: 'nftId',
        onDelete: 'RESTRICT'
      })

    }
  }
  Nfts.init({
    collectionId: {
      field: 'collections_id',
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ipfs: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    creater_account: DataTypes.STRING,
    owner_account: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    }
  }, {
    sequelize,
    modelName: 'Nfts',
  });
  return Nfts;
};