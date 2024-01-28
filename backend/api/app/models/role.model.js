module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      roleId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.ENUM,
        values: ["admin", "manager", "tourist"],
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );

  return Role;
};
