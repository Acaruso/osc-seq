class Table {
  constructor(name) {
    this.name = name;
    this.rows = {};
    this.ids = [];
    this.nextId = 0;
  }

  push(newRow) {
    this.rows[this.nextId] = newRow;
    this.rows[this.nextId].id = this.nextId;
    this.ids.push(this.nextId);
    this.nextId++;
  }

  get(id) {
    return this.rows[id];
  }

  select(selector) {
    return this.ids.flatMap((id) => {
      return selector(this.rows[id]) ? [this.rows[id]] : [];
    });
  }

  find(selector) {
    for (const id of this.ids) {
      if (selector(this.rows[id])) {
        return this.rows[id];
      }
    }
    return {};
  }
}

export { Table };
