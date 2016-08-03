class Paddle {
  constructor (GLGeo, GLMat, xPos) {
    this.dY = 0
    this.gl = new THREE.Mesh(GLGeo, GLMat)
    this.gl.position.x = xPos
  }
  getX () {
    return this.gl.position.x
  }
  getY () {
    return this.gl.position.y
  }
  setPos (y) {
    this.gl.position.y = y
  }
  step () {
    this.gl.position.y += this.dY
  }
  reset () {
    this.dY = 0
    this.setPos (0.0)
  }
}
