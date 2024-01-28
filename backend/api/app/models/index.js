const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.site = require("./site.model.js")(sequelize, Sequelize);
db.bookmark = require("./bookmark.model.js")(sequelize, Sequelize);
db.critique = require("./critique.model.js")(sequelize, Sequelize);

db.role.hasMany(db.user, { foreignKey: "roleId" });
db.user.belongsTo(db.role, { foreignKey: "roleId" });

db.user.belongsTo(db.site, { foreignKey: "userId", as: "site" });
db.site.belongsTo(db.user, { foreignKey: "userId", as: "user" });

db.user.belongsToMany(db.site, {
  through: db.bookmark,
  foreignKey: "userId",
  otherKey: "siteId",
  as: "bookmarkedSites",
});
db.site.belongsToMany(db.user, {
  through: db.bookmark,
  foreignKey: "siteId",
  otherKey: "userId",
  as: "bookmarkedByUsers",
});

db.ROLES = ["admin", "tourist", "manager"];

module.exports = db;
