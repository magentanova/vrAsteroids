


var randBetween = function(min,max) {
  return min + (Math.random() * (max - min))
}

var fireLaser = function(e) {

  var sphereMesh = new THREE.Mesh( new THREE.SphereGeometry(3,32,32),
               new THREE.MeshBasicMaterial({ color: 0xFF0000}) )

  var scene = SceneManager.scene,
         camera = SceneManager.camera ,
         reticleMagnitude = 50

  scene.add(sphereMesh)
  var trackCamera = function(reticle) {
    console.log('reticle & dir')
    console.log(reticle)
    var dir = camera.getWorldDirection()
    console.log(dir)
    reticleMagnitude += 10
    reticle.position.x = reticleMagnitude * dir.x
    reticle.position.y = reticleMagnitude * dir.y
    reticle.position.z = reticleMagnitude * dir.z
  }
  Utils.registerFunction(trackCamera,sphereMesh)
}

if (Meteor.isClient) {
  window.addEventListener('click',fireLaser)
  // counter starts at 0
  Template.scene.onRendered(function (){
    window.tem = Template
    SceneManager.init();
    window.sm = SceneManager
    var n = 0
    while (n < 300) {
      addSphere(SceneManager.scene,{radius: 10, x:randBetween(-800,800) ,y:randBetween(-900,900),z:randBetween(-900,900)})
      n += 1
    }
    Utils.animate( [SceneManager, Utils] );

    console.log('all clear')
  });

  function addSphere(scene,props){
    var mesh = new THREE.Mesh( new THREE.SphereGeometry(props.radius,32,32),
               new THREE.MeshNormalMaterial({ color: 0x009900}) );
    scene.add(mesh);
    mesh.name = "box";
    mesh.position.x = props.x
    mesh.position.y = props.y
    mesh.position.z = props.z
    window.mesh = mesh;
    var changes = {xchg: randBetween(-5,5), ychg: randBetween(-5,5),zchg: randBetween(-5,5)}
    setInterval(function(){
      changes.xchg *= -1
      changes.ychg *= -1
      changes.zchg *= -1
    },4000)
    var drift = function(mesh) {
        mesh.position.x += changes.xchg;
        mesh.position.y += changes.ychg;
        mesh.position.z += changes.zchg;
      }
    Utils.registerFunction(drift, mesh);
    Utils.registerFunction(rotate, mesh);
  }

  function rotate(mesh){
    mesh.rotation.x += .01;
    mesh.rotation.y += .01;
  }
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
