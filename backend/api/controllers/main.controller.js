var providers = require("../models/providers.models");
const Provider = require("../db/db");

//Util functions
//Check if list is empty

function isEmptyList(obj) {
  return !obj || obj.length == 0 || Object.keys(obj).length == 0;
}

//Handle error
function handleError(res, error) {
  res.status(200);
  res.send("Something is wrong \n" + error);
}

//Check for exisiting provider
// function existsProvider(id) {
//   return providers.find((provider) => provider.id == id);
// }

//Generate a unique provider id
// function getUniqueId(providers) {
//   let min = 100000;
//   let max = 999999;
//   do {
//     var id = Math.floor(Math.random() * (max - min) + min);
//   } while (existsProvider(id));
//   return id;
// }

//CRUD - Create (Post), Read (Get), Update (Put), Delete (Delete)

//POST
// url: /api/providers
module.exports.create = function (req, res) {
  res.render("providers/providers-add-form", {
    title: "Add Service Provider",
  });
};
//Add Provider
module.exports.create = function (req, res) {
  try {
    // if (isEmptyList(providers)) {
    //   providers = [];
    // }

    // var id = req.body.id;
    // if (existsProvider(id)) {
    //   res.status(400);
    //   res.send("Duplicate Id not allowed");
    //   id = getUniqueId(); //get new ID
    // }

    var provider = req.body; //get new provider
    // provider.id = id;

    //Add new provider to list
    //providers.push(provider);
    Provider.create(provider)
      .then((result) => {
        res.status(201);
        res.send(result);
      })
      .catch((error) => handleError(res, error));
  } catch (error) {
    handleError(res, error);
  }
};

//GET All
// url: /api/providers
module.exports.readAll = function (req, res) {
  try {
    Provider.find()
      .then((result) => {
        if (isEmptyList(result)) {
          res.status(404);
          res.send("List is empty!");
        }
        res.status(200);
        res.send(result);
      })
      .catch((error) => handleError(res, error));
  } catch (error) {
    handleError(res, error);
  }
};

//GET One
// url: /api/providers/id(123)
module.exports.readOne = function (req, res) {
  try {
    let id = req.params.id;
    Provider.find({ id: id })
      .then((result) => {
        if (isEmptyList(result)) {
          res.status(404);
          res.send("List is empty!");
        }
        // let provider = providers.find((provider) => provider.id == id);
        res.status(200);
        res.send(result);
      })
      .catch((error) => handleError(res, error));
  } catch (error) {
    handleError(res, error);
  }
};

//PUT
// url: /api/providers/id(123)
module.exports.update = function (req, res) {
  try {
    let id = req.params.id;
    let provider = req.body;
    Provider.findOneAndUpdate({ id: id }, provider, { new: true })
      .then((result) => {
        if (isEmptyList(result)) {
          res.status(404);
          res.send("List is empty, nothing to update.");
        }
        res.status(200);
        res.send(result);
      })
      .catch((error) => handleError(res, error));

    // providers[idx] = provider;
    // let provider = providers.find((provider) => provider.id == id);
    // provider.firstname = req.body.firstname;
    // provider.lastname = req.body.lastname;
    // provider.position = req.body.position;
    // provider.company.email = req.body.email;
    // provider.company.phone = req.body.phone;
    // provider.company.company_name = req.body.company.company_name;
    // provider.company.address = req.body.company.address;
    // provider.company.address2 = req.body.company.address2;
    // provider.company.city = req.body.company.city;
    // provider.company.state = req.body.company.state;
    // provider.company.postal_code = req.body.company.postal_code;
    // provider.company.description = req.body.company.description;
    // provider.company.tagline = req.body.company.tagline;
  } catch (error) {
    handleError(res, error);
  }
};

//Delete One
// url: /api/providers/id(123)
module.exports.deleteOne = function (req, res) {
  try {
    let id = req.params.id;

    Provider.findOneAndDelete({ id: id })
      .then((result) => {
        if (!result) {
          // Si no se encuentra el proveedor, devolver un 404
          return res.status(404).send("Provider not found. Nothing to delete.");
        } else {
          // Si se eliminó correctamente, devolver el resultado
          return res.status(200).send(result);
        }
      })
      .catch((error) => handleError(res, error));

  } catch (error) {
    handleError(res, error);
  }
};


//Delete All
// url: /api/providers
module.exports.deleteAll = function (req, res) {
  try {
    Provider.deleteMany({})
      .then((result) => {
        if (result.deletedCount === 0) {
          res.status(404).send("List is empty, there is nothing to delete.");
        } else {
          res
            .status(200)
            .send("All providers deleted!\n" + JSON.stringify(result));
        }
      })
      .catch((error) => handleError(res, error));
  } catch (error) {
    handleError(res, error);
  }
};

function handleError(res, error) {
  // Error handling logic here
  console.error(error);
  res.status(500).send("Internal Server Error");
}