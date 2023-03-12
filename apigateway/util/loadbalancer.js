const loadbalancer = {};

loadbalancer.ROUND_ROBIN = (service) => {
  const newIndex =
    ++service.index >= service.instances.length ? 0 : service.index;
  service.index = newIndex;
  return newIndex;
};
// TODO: isEnabled düzelt
loadbalancer.isEnabled = (service, index, loadBalanceStrategy) => {
  return service.instances[index].enabled
    ? index
    : loadBalanceStrategy(service);
};

module.exports = loadbalancer;
