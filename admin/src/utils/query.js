export default class Query {
  constructor(url) {
    this.query = `${url  }?`;
  }

  sortBy(sortBy, sortDesc = false) {
    if (sortBy == undefined) return this;

    if (sortDesc == false) sortDesc = '';
    else sortDesc = '.';

    this.query += `sort=${sortDesc}${sortBy}&`;
    return this;
  }

  paginate(page = 1, limit = 50) {
    this.query += `page=${page}&limit=${limit}&`;
    return this;
  }

  graph(graph = null) {
    if (!graph) return this;

    this.query += `graph=${graph}&`;
    return this;
  }

  join(join = null) {
    if (!join) return this;

    this.query += `join=${join}&`;
    return this;
  }
}
