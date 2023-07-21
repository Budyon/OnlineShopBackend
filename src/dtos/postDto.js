class postDto {
  id
  name
  scope
  unscoped
  description
  authorName
  image

  constructor(post) {
    this.id = post._id
    this.name = post.name
    this.scope = post.scope
    this.description = post.description
    this.authorName = post.authorName
    this.unscoped = post.authorName
    this.image = post.image
  }
}
  
  export { postDto }