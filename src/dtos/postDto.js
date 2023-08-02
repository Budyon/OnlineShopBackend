class postDto {
  id
  name
  scope
  unscoped
  description
  authorName
  image
  date

  constructor(post) {
    this.id = post._id
    this.name = post.name
    this.scope = post.scope
    this.description = post.description
    this.authorName = post.authorName
    this.unscoped = post.authorName
    this.image = post.image
    this.date = post.date
  }
}
  
  export { postDto }