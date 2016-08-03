class Ball {
  constructor (GLGeo, GLMat) {
    this.dX = 0.3
    this.dY = 0
    this.gl = new THREE.Mesh(GLGeo, GLMat)
    this.gl.position.x = 0.0
  }
  reflectY () {
    // this.dY *= -1
    this.dY = Math.random() < 0.5 ? -.1 : .1
  }
  getX () {
    return this.gl.position.x
  }
  getY () {
    return this.gl.position.y
  }
  setPos (x, y) {
    this.gl.position.x = x
    this.gl.position.y = y
  }
  step () {
    this.gl.position.x += this.dX
    this.gl.position.y += this.dY
  }
  reset () {
    this.dY = 0
    this.setPos(0, 0)
  }
}
