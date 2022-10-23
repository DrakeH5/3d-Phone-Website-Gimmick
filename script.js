
var scene = new THREE.Scene(); //created a three.js scene

var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000) //create a camera
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer({antialias: true}); //create renderer
renderer.setClearColor("darkgrey"); //essentially a background color
renderer.setSize(window.innerWidth,window.innerHeight); //set renderer size to size of the page

document.body.appendChild(renderer.domElement); //creates a canvas with our render's specifications

window.addEventListener('resize', () => { //when the page is resized
  renderer.setSize(window.innerWidth,window.innerHeight); //resize the renderer accordingly
  camera.aspect = window.innerWidth / window.innerHeight; //re adjust aspect ratio

  camera.updateProjectionMatrix(); //just updating our camera
})



const video = document.getElementById( 'video' );

var geometry = new THREE.BoxGeometry(1, 6, 10); //creates "phone"
var material = new THREE.MeshLambertMaterial({map: new THREE.VideoTexture( video )}); //creates material
var phone = new THREE.Mesh(geometry, material); //creates a mesh out of our sphere and material
phone.position.set(2, 0, -10)
phone.rotation.set(0, -45, 10)

scene.add(phone); //adds phone to the scene



var light = new THREE.PointLight(0xFFFFFF, 1, 500); //creates a light (color, intensity, distance)
light.position.set(10, 0, 25); //sets light position (x, y, z)
scene.add(light); //add the light to the scene


var render = function() {
  requestAnimationFrame(render);
  renderer.render(scene, camera); //just render (show) everything on our canvas
}

render();



document.addEventListener("wheel", function(evt){
    var direction = evt.deltaY / 100
    phone.rotation.y -= (direction / (screen.height/10))*15
})