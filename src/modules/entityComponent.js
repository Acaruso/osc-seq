function createEcManager() {
  let ecManager = {};

  ecManager.entities = [];
  ecManager.components = {};

  const defaultCompTableOptions = {
    colsToIndex: [],
    isSingleton: false,
  };

  ecManager.createComponentTable = function(tableName, schema, options = {}) {
    options = { ...defaultCompTableOptions, ...options };
    options.colsToIndex.push("entityId"); // always index entityId
    let index = {};
    for (const colToIndex of options.colsToIndex) {
      index[colToIndex] = {};
    }
    this.components[tableName] = {
      index,
      data: [],
      tableName,
      schema,
      isSingleton: options.isSingleton,
    };
  };

  const defaultEntityOptions = {
    parentId: -1,
    name: "",
  };

  ecManager.addEntity = function(options = {}) {
    options = { ...defaultEntityOptions, ...options };
    const { name, parentId } = options;
    const entityId = this.entities.length;

    this.entities.push({
      name,
      entityId,
      parentId,
    });

    return entityId;
  };

  ecManager.addComponent = function(comp, tableName, entityId) {
    const compTable = this.components[tableName];
    const newComp = { ...comp };
    if (compTable.isSingleton) {
      if (compTable.data.length === 0) {
        compTable.data.push(newComp);
      }
    } else {
      newComp.entityId = entityId;
      insertComp(newComp, compTable);
    }
  };

  ecManager.updateComponent = function(comp, tableName) {
    const compTable = this.components[tableName];
    if (compTable.isSingleton) {
      if (compTable.data.length === 1) {
        compTable.data[0] = comp;
      }
    } else {
      updateCompAtIndex(comp, "entityId", compTable);
    }
  };

  ecManager.getComponent = function(tableName, entityId) {
    const compTable = this.components[tableName];
    if (compTable.isSingleton) {
      return compTable.data.length === 1 ? compTable.data[0] : null;
    } else {
      return getCompAtIndex(entityId, "entityId", compTable);
    }
  };

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
        if (!compExistsAtIndex(entityId, "entityId", siblingCompTable)) {
          foundAllSiblings = false;
          break;
        } else {
          const siblingRow = getCompAtIndex(entityId, "entityId", siblingCompTable);
          newRow[siblingCompName] = { ...siblingRow };
        }
      }
      if (foundAllSiblings) {
        rows.push(newRow);
      }
    }

    return rows;
  }

  ecManager.join4 = function(selectName, joins) {
    const compTables = this.components;
    const selectTable = compTables[selectName];

    let set = getFirstSet(selectTable, selectName);

    for (const join of joins) {
      set = doJoin(set, join, compTables);
    }

    return set;
  };

  function getFirstSet(table, name) {
    let out = [];
    for (const row of table.data) {
      let newRow = {};
      newRow[name] = { ...row };
      out.push(newRow);
    }
    return out;
  }

  // create new set
  // for each row in old set, try to join stuff to it + add to new set
  // if cant find match, leave out row
  // if multiple matches, create new rows
  function doJoin(set, join, compTables) {
    const [table1, col1, table2, col2] = join;
    let newSet = [];
    for (const row of set) {
      let newRow = copyObject(row);
      const val = newRow[table1][col1];
      const table = compTables[table2];
      const res = getJoinRows(val, join, table);
      if (res.length === 0) {
        continue;
      }
      const firstRes = res[0];
      const restRes = res.slice(1);
      newRow[table2] = firstRes;
      newSet.push(newRow);
      for (const x of restRes) {
        let newNewRow = copyObject(row);
        newNewRow[table2] = x;
        newSet.push(newNewRow);
      }
    }
    return newSet;
  }

  // get all rows from table where row[col2] === val
  function getJoinRows(val, join, table) {
    const [table1, col1, table2, col2] = join;
    let out = [];

    if (table.index[col2].hasOwnProperty(val)) {
      const idxs = table.index[col2][val];
      for (const idx of idxs) {
        const row = table.data[idx];
        const newRow = { ...row };
        out.push(newRow);
      }
    }

    // for (const row of table.data) {
    //   if (row[col2] === val) {
    //     const newRow = { ...row };
    //     out.push(newRow);
    //   }
    // }

    return out;
  }

  function copyObject(obj) {
    let newObj = {};
    for (const [key, val] of Object.entries(obj)) {
      newObj[key] = { ...val };
    }
    return newObj;
  }

  ecManager.createEC = function(comps) {
    const entityId = this.addEntity();
    for (const [tableName, comp] of Object.entries(comps)) {
      this.addComponent(comp, tableName, entityId);
    }
    return entityId;
  }

  ecManager.extend = function(comps, entityId) {
    for (const [tableName, comp] of Object.entries(comps)) {
      this.addComponent(comp, tableName, entityId);
    }
  }

  function insertComp(newComp, compTable) {
    const newCompRowIndex = compTable.data.length;
    compTable.data.push(newComp);

    for (const [colName, indexMap] of Object.entries(compTable.index)) {
      const colVal = newComp[colName];
      if (!indexMap.hasOwnProperty(colVal)) {
        indexMap[colVal] = [newCompRowIndex];
      } else {
        indexMap[colVal].push(newCompRowIndex)
      }
    }

    // const entityId = newComp.entityId;
    // compTable.index[entityId] = newCompRowIndex;
  }

  function getCompAtIndex(indexVal, indexName, compTable) {
    const idxs = compTable.index[indexName][indexVal];
    const idx = idxs[0];
    return compTable.data[idx];
    // const rowIndex = compTable.index[indexVal];
    // return compTable.data[rowIndex];
  }

  function getCompsAtIndex(indexVal, indexName, compTable) {
    const idxs = compTable.index[indexName][indexVal];
    let out = [];
    for (const idx of idxs) {
      out.push(compTable.data[idx]);
    }
    return out;
  }

  function updateCompAtIndex(comp, indexName, compTable) {
    const indexVal = comp[indexName];
    const idxs = compTable.index[indexName][indexVal];
    const idx = idxs[0];
    compTable.data[idx] = comp;

    // const indexVal = comp[indexName];
    // const rowIndex = compTable.index[indexVal];
    // compTable.data[rowIndex] = comp;
  }

  function compExistsAtIndex(indexVal, indexName, compTable) {
    // return compTable.index.hasOwnProperty(indexVal);
    if (!compTable.index[indexName].hasOwnProperty(indexVal)) {
      return false;
    } else {
      const indexArr = compTable.index[indexName][indexVal];
      return (indexArr.length > 0);
    }
  }

  return ecManager;
}

export { createEcManager };
