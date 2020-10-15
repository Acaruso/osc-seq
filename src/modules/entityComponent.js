import { log } from "./util";

function createComponentTable(options = {}) {
  const isSingleton = options.isSingleton ? options.isSingleton : false;
  let components = {
    index: {},
    data: [],
    isSingleton,
  };
  return components;
}

function addEntity(entities, options = {}) {
  const entityId = entities.length;
  const name = options.name ? options.name : "";
  const parentId = options.parentId ? options.parentId : -1;
  entities.push({
    name,
    entityId,
    parentId,
  });
  return entityId;
}

function addComponent(comp, compTable, entityId) {
  if (compTable.isSingleton) {
    compTable.data.push(comp);
  } else {
    const newCompIndex = compTable.data.length;
    comp.entityId = entityId;
    compTable.data.push(comp);
    compTable.index[entityId] = newCompIndex;
  }
}

function updateComponent(compTable, comp, entityId) {
  if (compTable.isSingleton) {
    compTable.data[0] = comp;
  } else {
    const compIndex = compTable.index[entityId];
    compTable.data[compIndex] = comp;
  }
}

function getComponent(compTable, entityId) {
  if (compTable.isSingleton) {
    return compTable.data[0];
  } else {
    const compIndex = compTable.index[entityId];
    return compTable.data[compIndex];
  }
}

function join(compNames, compTables) {
  const primaryCompName = compNames[0];
  const siblingCompNames = compNames.slice(1);
  const primaryCompTable = compTables[primaryCompName];
  let rows = [];

  for (const row of primaryCompTable.data) {
    let newRow = { ...row };
    const entityId = row.entityId;
    for (const siblingCompName of siblingCompNames) {
      const siblingCompTable = compTables[siblingCompName];
      if (siblingCompTable.index.hasOwnProperty(entityId)) {
        const siblingRowIndex = siblingCompTable.index[entityId];
        const siblingRow = siblingCompTable.data[siblingRowIndex];
        newRow = addCols(newRow, siblingRow);
      }
    }
    rows.push(newRow);
  }

  return rows;
}

function addCols(row, newRow) {
  for (const key in newRow) {
    row[key] = newRow[key];
  }
  return row;
}

export { createComponentTable, addEntity, addComponent, updateComponent, getComponent, join };
