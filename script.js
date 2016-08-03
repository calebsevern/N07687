var scene = new THREE.Scene()
var camera  = new THREE.PerspectiveCamera(75, 600.0 / 480.0, 0.1, 1000)
camera.position.z = 10

var renderer = new THREE.WebGLRenderer()
renderer.setSize(600.0, 480.0)
document.body.appendChild(renderer.domElement)

var geometry = new THREE.BoxGeometry(0.5, 3.0, 0)
var material = new THREE.MeshBasicMaterial({color: 0x00ff00})

// Player 1
var P1 = new Player('1', new Paddle(geometry, material, -9.0))
scene.add(P1.paddle.gl)

// Player 2
var P2 = new Player('2', new Paddle(geometry, material, 9.0))
scene.add(P2.paddle.gl)

// Ball
var ball = new Ball(
  new THREE.CircleGeometry(0.2, 64),
  new THREE.MeshBasicMaterial({color: 0xff0000})
)
scene.add(ball.gl)

function render () {
  requestAnimationFrame(render)
  move()
  renderer.render(scene, camera)
}

function move () {
  // Move paddles
  P1.paddle.step()
  P2.paddle.step()
  
  // Check for wall collisions
  if (ball.getY() >= 7.0 || ball.getY() <= -7.0) {
    ball.dY = -ball.dY
  }
 
  if (ball.getX() < P1.paddle.getX() - 0.1) {
    P2.addPoint()
    return reset()
  }
  if (ball.getX() > P2.paddle.getX() + 0.1) {
    P1.addPoint()
    return reset()
  }
   
  // Check for paddle collisions
  if (ball.getX() >= P2.paddle.getX() - 0.5) {
    if (ball.getY() <= P2.paddle.getY() + 1.5 &&
        ball.getY() >= P2.paddle.getY() - 1.5) {
      ball.dX = -ball.dX
      ball.reflectY()
    }
  } else if (ball.getX() <= P1.paddle.getX() + 0.5) {
    if (ball.getY() <= P1.paddle.getY() + 1.5 &&
        ball.getY() >= P1.paddle.getY() - 1.5) {
      ball.dX = -ball.dX
      ball.reflectY()
    }
  }
  ball.step()
}

function reset () {
  P1.paddle.reset()
  P2.paddle.reset()
  ball.reset()
}

document.onkeydown = function (e) {
  e = e.keyCode || window.event
  if (e === 38) P1.paddle.dY = 0.25
  if (e === 40) P1.paddle.dY = -0.25
}

document.onkeyup = function (e) {
  e = e.keyCode || window.event
  if (e === 38 || e === 40) {
    P1.paddle.dY = 0
  }
}
