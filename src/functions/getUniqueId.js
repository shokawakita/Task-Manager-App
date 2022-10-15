const getUniqueId = () => {
  return new Date().getTime().toString(36) + '-' + Math.random().toString(36);
}

export default getUniqueId;

