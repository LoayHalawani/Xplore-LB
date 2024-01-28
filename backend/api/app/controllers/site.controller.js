const db = require("../models");
const Site = db.site;

exports.getSite = (req, res) => {
  const managerId = req.userId;
  Site.findOne({
    where: {
      userId: managerId,
    },
  })
    .then((site) => {
      if (!site) {
        return res
          .status(404)
          .send({ message: "No site found. Please add a site." });
      }
      res.status(200).send(site);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.addSite = (req, res) => {
  const managerId = req.userId;
  Site.findOne({
    where: {
      userId: managerId,
    },
  })
    .then((existingSite) => {
      if (existingSite) {
        return res
          .status(400)
          .send({ message: "Sorry, you can only add and manage one site." });
      }
      Site.create({
        userId: managerId,
        name: req.body.name,
        location: req.body.location,
        description: req.body.description,
        image: req.body.image,
        type: req.body.type,
      })
        .then((site) => {
          res.status(201).send({ message: "Site added successfully." });
        })
        .catch((err) => {
          return res.status(500).send({ message: err.message });
        });
    })
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    });
};

exports.updateSite = (req, res) => {
  const managerId = req.userId;
  Site.update(req.body, {
    where: { userId: managerId },
  })
    .then((num) => {
      if (num >= 1) {
        res.status(200).send({ message: "Site updated successfully." });
      } else {
        res.status(404).send({ message: "Site not found, please add a site." });
      }
    })
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    });
};

exports.deleteSite = (req, res) => {
  const managerId = req.userId;
  Site.destroy({
    where: { userId: managerId },
  })
    .then((num) => {
      if (num > 0) {
        res.status(200).send({ message: "Site deleted successfully." });
      } else {
        res.status(404).send({ message: "Site not found." });
      }
    })
    .catch((err) => {
      return res.status(500).send({ message: err.message });
    });
};

exports.getAllSites = (req, res) => {
  Site.findAll({
    attributes: {
      exclude: ["siteId", "userId"],
    },
  })
    .then((sites) => {
      res.status(200).send(sites);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
