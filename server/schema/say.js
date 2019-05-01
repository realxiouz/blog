/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('say', {
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    detail: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    save_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    file_name: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    tableName: 'say'
  });
};
