class postDto {
    name
    scope
    unscoped
    description
    authorName

    constructor(post) {
      this.name = post.name
      this.scope = post.scope
      this.description = post.description
      this.authorName = post.authorName
      this.unscoped = post.authorName
    }
}
  
  export { postDto }