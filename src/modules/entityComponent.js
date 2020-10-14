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
  const newCompIndex = compTable.data.length;
  comp.entityId = entityId;
  compTable.data.push(comp);
  compTable.index[entityId] = newCompIndex;
}

// function addComponent(component, componentTable, entityId) {
//   componentTable[entityId] = component;
// }

function join(primaryCompName, siblingCompNames, compTables) {
  let rows = [];

  const primaryCompTable = compTables[primaryCompName];
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

// function join(componentTableNames, entities, componentTables) {
//   let rows = [];

//   for (let i = 0; i < entities.length; i++) {
//     const entityId = i;
//     let row = createRow(entityId, componentTableNames, componentTables);
//     row ? rows.push(row) : null;
//   }

//   return rows;
// }

function createRow(entityId, componentTableNames, componentTables) {
  let row = { entityId };

  for (const componentTableName of componentTableNames) {
    const componentTable = componentTables[componentTableName];
    if (isSingleton(componentTable)) {
      const component = componentTable;
      row = addCols(row, component);
    } else {
      const component = componentTable[entityId];
      if (component === null) {
        return null;
      } else {
        row = addCols(row, component);
      }
    }
  }

  return row;
}

function addCols(row, newRow) {
  for (const key in newRow) {
    row[key] = newRow[key];
  }
  return row;
}

function isSingleton(componentTable) {
  return !Array.isArray(componentTable);
}

export { createComponentTable, addEntity, addComponent, join };
