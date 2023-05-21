const express = require("express");
const router = express.Router();
const axios = require("axios");
const registry = require("./registry.json");
const loadbalancer = require("../util/loadbalancer");
const fs = require("fs");

// Enable/Disable API endpoint
router.post("/apiEnable/:apiName", (req, res) => {
  const apiName = req.params.apiName;
  const requestBody = req.body;
  const instances = registry.services[apiName].instances;

  const index = instances.findIndex((srv) => srv.url === requestBody.url);
  if (index === -1) {
    return res.send({
      status: "error",
      message: `Could not find '${requestBody.url}' for service ${apiName}`,
    });
  }

  instances[index].enabled = requestBody.enabled;
  fs.writeFile("./routes/registry.json", JSON.stringify(registry), (error) => {
    if (error) {
      return res.send(
        `Could not enable/disable: ${requestBody.enabled} URL:${requestBody.url}\n${error}`
      );
    } else {
      return res.send(
        `Successfully enabled/disabled: ${requestBody.enabled} URL:${requestBody.url}\n`
      );
    }
  });
});

// Dynamic API route handling
router.all("/:apiName/:module/:root/*", async (req, res) => {
  console.log("Dynamic API route handling");
  const { apiName, module, root } = req.params;
  const extraParams = req.params[0] || "";

  const service = registry.services[apiName];
  if (!service) {
    return res.status(404).send("API Name does not exist");
  }

  const loadBalanceStrategy = service.loadBalanceStrategy || "ROUND_ROBIN";
  const newIndex = loadbalancer[loadBalanceStrategy](service);
  const url = service.instances[newIndex]?.url;

  if (!url) {
    return res.status(404).send("Service instance not found");
  }

  const redirectUrl = `${url}${module}/${root}/${extraParams}`;
  console.log("url :>> ", redirectUrl);
  try {
    const response = await axios({
      method: req.method,
      url: redirectUrl,
      headers: req.headers["content-type"],
      data: req.body,
      params: req.query,
    });
    res.send(response.data);
  } catch (error) {
    console.log("Error:", redirectUrl);
    res.send(error.response?.data || error.message);
  }
});

// API Registration endpoint
router.post("/apiRegister", (req, res, next) => {
  const registrationInfo = req.body;
  registrationInfo.url = `${registrationInfo.protocol}://${registrationInfo.host}:${registrationInfo.port}/`;

  const service = registry.services[registrationInfo.apiName];
  if (service) {
    if (apiExists(registrationInfo)) {
      return res.send(
        `Configuration already exists for ${registrationInfo.apiName} at ${registrationInfo.url}`
      );
    } else {
      service.instances.push({ ...registrationInfo });
    }
  } else {
    registry.services[registrationInfo.apiName] = {
      index: "0",
      instances: [{ ...registrationInfo }],
      loadBalanceStrategy: "ROUND_ROBIN",
      enabled: true,
    };
  }

  fs.writeFile("./routes/registry.json", JSON.stringify(registry), (error) => {
    if (error) {
      res.send(
        `Could not register ${registrationInfo.apiName}${registrationInfo.port}\n${error}`
      );
    } else {
      res.send(
        `Successfully registered ${registrationInfo.apiName}${registrationInfo.port}\n`
      );
    }
  });
});

// API Unregistration endpoint
router.post("/apiUnregister", (req, res, next) => {
  const registrationInfo = req.body;

  if (apiExists(registrationInfo)) {
    const instances = registry.services[registrationInfo.apiName].instances;
    const index = instances.findIndex(
      (instance) => instance.url === registrationInfo.url
    );
    instances.splice(index, 1);

    fs.writeFile(
      "./routes/registry.json",
      JSON.stringify(registry),
      (error) => {
        if (error) {
          res.send(
            `Could not unregister ${registrationInfo.apiName}\n${error}`
          );
        } else {
          res.send(`Successfully unregistered ${registrationInfo.apiName}\n`);
        }
      }
    );
  } else {
    res.send(
      `Configuration does not exist for ${registrationInfo.apiName} at ${registrationInfo.url}`
    );
  }
});

const apiExists = (registrationInfo) => {
  const instances = registry.services[registrationInfo.apiName].instances;
  return instances.some((instance) => instance.url === registrationInfo.url);
};

module.exports = router;
