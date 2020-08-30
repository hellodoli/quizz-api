class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  /*limitField() {
    const {} = this.queryString;
    return this;
  }*/

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  paginate() {
    const { page, limit } = this.queryString;
    if (page) {
      const pageNum = page * 1;
      const limitNum = limit * 1 || 8;
      const skip = (pageNum - 1) * limitNum;
      this.query = this.query.skip(skip).limit(limitNum);
    }
    return this;
  }
}

module.exports = APIFeatures;
