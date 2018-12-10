/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('config', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(30),
      allowNull: true
    },
    value: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    status: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '1'
    }
  }, {
    tableName: 'config'
  });
};
