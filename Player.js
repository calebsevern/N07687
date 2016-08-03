class Player {
  constructor (num, paddle) {
    this.paddle = paddle
    this.points = 0
    this.pointsDiv = document.getElementById(`p${num}-points`)
  }
  addPoint () {
    this.points++
    this.pointsDiv.innerHTML = this.points
  }
}
