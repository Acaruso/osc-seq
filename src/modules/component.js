import { getId } from "./entity";

function addComponent(component, componentTable, entityId) {
  componentTable[entityId] = component;
}

function getComponent(entityId, componentTable) {
  for (const component of componentTable) {
    if (component.entityId === entityId) {
      return component;
    }
  }
  return null;
}

function addCols(row, newRow) {
  for (const key in newRow) {
    row[key] = newRow[key];
  }
  return row;
}

function createRow(entityId, componentTableNames, componentTables) {
  let row = { entityId };

  for (const componentTableName of componentTableNames) {
    const componentTable = componentTables[componentTableName];
    const component = componentTable[entityId];
    if (component === null) {
      return null;
    } else {
      row = addCols(row, component)
    }
  }

  return row;
}

function join(entities, componentTableNames, componentTables) {
  let rows = [];

  for (let i = 0; i < entities.length; i++) {
    const entityId = i;
    let row = createRow(entityId, componentTableNames, componentTables);
    row ? rows.push(row) : null;
  }

  return rows;
}

export { addComponent, join };
