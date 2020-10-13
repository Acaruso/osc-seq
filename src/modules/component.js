function addComponent(component, componentTable, entityId) {
  componentTable[entityId] = component;
}

function join(componentTableNames, entities, componentTables) {
  let rows = [];

  for (let i = 0; i < entities.length; i++) {
    const entityId = i;
    let row = createRow(entityId, componentTableNames, componentTables);
    row ? rows.push(row) : null;
  }

  return rows;
}

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

export { addComponent, join };
