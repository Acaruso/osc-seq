function addEntity(options = {}, entities) {
  const entityId = entities.length;
  const name = options.name ? options.name : "";
  const parentId = options.parentId ? parentId : -1;
  entities.push({
    name,
    entityId,
    parentId
  });
  return entityId;
}

function getId(entityName, entities) {
  for (let i = 0; i < entities.length; i++) {
    if (entities[i].name === entityName) {
      return i;
    }
  }
  return -1;
}

export { addEntity, getId };
