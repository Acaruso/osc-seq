import { log } from "./util";

function createEcManager() {
  let ecManager = {};

  ecManager.entities = [];
  ecManager.components = {};

  ecManager.createComponentTable = function(tableName, schema, options = {}) {
    this.components[tableName] = createComponentTable(tableName, schema, options);
  };

  ecManager.addEntity = function(options = {}) {
    return addEntity(this.entities, options);
  };

  ecManager.addComponent = function(comp, tableName, entityId) {
    const compTable = this.components[tableName];
    addComponent(comp, compTable, entityId);
  };

  ecManager.updateComponent = function(comp, tableName) {
    const compTable = this.components[tableName];
    updateComponent(compTable, comp);
  };

  ecManager.getComponent = function(tableName, entityId) {
    const compTable = this.components[tableName];
    return getComponent(compTable, entityId);
  };

  ecManager.join = function(compNames) {
    return join(compNames, this.components);
  };

  ecManager.project = function(data, tableName) {
    const compTable = this.components[tableName];
    const schema = compTable.schema;

    let out = { entityId: data.entityId };

    for (const colName of schema) {
      out[colName] = data[colName];
    }

    return out;
  }

  ecManager.join2 = function(compNames) {
    const compTables = this.components;
    const primaryCompName = compNames[0];
    const siblingCompNames = compNames.slice(1);
    const primaryCompTable = compTables[primaryCompName];
    let rows = [];
  
    for (const row of primaryCompTable.data) {
      let foundAllSiblings = true;
      let newRow = {};
      newRow[primaryCompName] = { ...row };
      const entityId = row.entityId;
      for (const siblingCompName of siblingCompNames) {
        const siblingCompTable = compTables[siblingCompName];
        if (!siblingCompTable.index.hasOwnProperty(entityId)) {
          foundAllSiblings = false;
          break;
        } else {
          const siblingRowIndex = siblingCompTable.index[entityId];
          const siblingRow = siblingCompTable.data[siblingRowIndex];
          newRow[siblingCompName] = { ...siblingRow };
        }
      }
      if (foundAllSiblings) {
        rows.push(newRow);
      }
    }
  
    return rows;
  }

  return ecManager;
}

function createComponentTable(tableName, schema, options = {}) {
  const isSingleton = options.isSingleton ? options.isSingleton : false;
  let components = {
    index: {},
    data: [],
    tableName,
    schema,
    isSingleton,
  };
  return components;
}

const defaultEntityOptions = {
  parentId: -1,
  name: "",
};

function addEntity(entities, options = {}) {
  options = { ...defaultEntityOptions, ...options };
  const { name, parentId } = options;
  const entityId = entities.length;

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

function updateComponent(compTable, comp) {
  if (compTable.isSingleton) {
    compTable.data[0] = comp;
  } else {
    const compIndex = compTable.index[comp.entityId];
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

export {
  createEcManager,
  createComponentTable,
  addEntity,
  addComponent,
  updateComponent,
  getComponent,
  join,
};
