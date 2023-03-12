const express = require("express");
const router = express.Router();
const axios = require("axios");
const registry = require("./registry.json");
const loadbalancer = require("../util/loadbalancer");
const fs = require("fs");

router.post("/apiEnable/:apiName", (req, res) => {
  const apiName = req.params.apiName;
  const requestBody = req.body;
  const instances = registry.services[apiName].instances;
  console.log("instances :>> ", instances);
  const index = instances.findIndex((srv) => {
    return srv.url === requestBody.url;
  });
  if (index == -1) {
    res.send({
      status: "error",
      message:
        "Could not find '" + requestBody.url + "for service " + apiName + "'",
    });
  } else {
    instances[index].enabled = requestBody.enabled;
    fs.writeFile(
      "./routes/registry.json",
      JSON.stringify(registry),
      (error) => {
        if (error) {
          res.send(
            "Could not enable/disable: " +
              requestBody.enabled +
              " URL:" +
              requestBody.url +
              "\n" +
              error
          );
        } else {
          res.send(
            "Successfully enabled/disabled: " +
              requestBody.enabled +
              " URL:" +
              requestBody.url +
              "\n"
          );
        }
      }
    );
  }
});

router.route("/:apiName/:module/:root").all(async (req, res) => {
  const service = registry.services[req.params.apiName];

  if (service) {
    if (!service.loadBalanceStrategy) {
      service.loadBalanceStrategy = "ROUND_ROBIN";
    }

    const newIndex = loadbalancer[service.loadBalanceStrategy](service);
    const url = service.instances[newIndex].url;

    let redirectUrl = url + req.params.module + "/" + req.params.root;
    //TODO:axios header kısmını düzenle.
    await axios({
      method: req.method,
      url: redirectUrl,
      headers: req.headers["content-type"],
      data: req.body,
    })
      .then((result) => {
        res.send(result.data);
      })
      .catch((error) => {
        console.log("error :>> ", error.response);
        res.send(error.response.data);
      });
  } else {
    res.send("API Name does not exist");
  }
});

router.post("/apiRegister", (req, res, next) => {
  const registrationInfo = req.body;
  let isNotExists = true;
  registrationInfo.url =
    registrationInfo.protocol +
    "://" +
    registrationInfo.host +
    ":" +
    registrationInfo.port +
    "/";
  const service = registry.services[registrationInfo.apiName];
  if (service) {
    if (apiExists(registrationInfo)) {
      isNotExists = false;
      return res.send(
        "Configuration already exists for " +
          registrationInfo.apiName +
          " at " +
          registrationInfo.url
      );
    } else {
      registry.services[registrationInfo.apiName].instances.push({
        ...registrationInfo,
      });
    }
  } else {
    registry.services[registrationInfo.apiName] = {
      index: "0",
      instances: [{ ...registrationInfo }],
      loadBalanceStrategy: "ROUND_ROBIN",
      enabled: true,
    };
  }
  if (isNotExists) {
    fs.writeFile(
      "./routes/registry.json",
      JSON.stringify(registry),
      (error) => {
        if (error) {
          res.send(
            "Could not register " +
              registrationInfo.apiName +
              registrationInfo.port +
              "\n" +
              error
          );
        } else {
          res.send(
            "Successfully registered " +
              registrationInfo.apiName +
              registrationInfo.port +
              "\n"
          );
        }
      }
    );
  }
});

router.post("/apiUnregister", (req, res, next) => {
  const registrationInfo = req.body;

  if (apiExists(registrationInfo)) {
    const index = registry.services[registrationInfo.apiName].findIndex(
      (instance) => {
        return registrationInfo.url === instance.url;
      }
    );
    registry.services[registrationInfo.apiName].splice(index, 1);

    fs.writeFile(
      "./routes/registry.json",
      JSON.stringify(registry),
      (error) => {
        if (error) {
          res.send(
            "Could not unregister " + registrationInfo.apiName + "\n" + error
          );
        } else {
          res.send(
            "Successfully unregistered " + registrationInfo.apiName + "\n"
          );
        }
      }
    );
  } else {
    res.send(
      "Configuration does not exists for " +
        registrationInfo.apiName +
        " at " +
        registrationInfo.url
    );
  }
});

const apiExists = (registrationInfo) => {
  let exist = false;

  registry.services[registrationInfo.apiName].instances.forEach((instance) => {
    if (instance.url === registrationInfo.url) {
      exist = true;
      return exist;
    }
  });

  return exist;
};

module.exports = router;
