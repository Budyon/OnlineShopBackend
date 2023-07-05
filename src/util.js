const paginateQuery = async (mongoQuery, page, limit) => {
    const skip = (page - 1) * limit
    const results = await mongoQuery.skip(skip).limit(limit)
    return results
}

export { paginateQuery }