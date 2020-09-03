class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    let queryString = JSON.stringify(queryObj);
    queryString = JSON.parse(
      queryString.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `${match}`)
    );

    if (queryString.id) queryString._id = queryString.id;
    delete queryString.id;

    this.query = this.query.find(queryString);
    return this;
  }

  sort() {
    const { sort } = this.queryString;
    if (sort) {
      const sortBy = sort.split(',').join(' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt'); // default sort new to old
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
