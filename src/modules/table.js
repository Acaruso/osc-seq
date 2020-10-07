class Table {
  constructor() {
    this.rows = {};
    this.ids = [];
    this.nextId = 0;
  }

  push(newRow) {
    this.rows[this.nextId] = {
      data: newRow,
      id: this.nextId,
    };
    this.nextId++;
  }

  get(id) {
    return this.rows[id];
  }

  getData(id) {
    return this.rows[id].data;
  }
}

export { Table };
