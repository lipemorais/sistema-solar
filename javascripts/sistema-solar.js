var ORIGEM = new THREE.Vector3(0, 0, 0);

var fovy = 75,
    aspectRatio = window.innerWidth/ window.innerHeight,
    near = 1,
    far = 300;

//Criando a cena
var cena = new THREE.Scene();

// Criando e posicionando a câmera
var camera = new THREE.PerspectiveCamera(fovy, aspectRatio, near, far);
camera.position.set(75, 75, 75);
camera.lookAt(ORIGEM);

// create a point light
var pointLight =
  new THREE.PointLight(0xFFFFFF);

// set its position
pointLight.position.x = 130;
pointLight.position.y = 60;
pointLight.position.z = 50;

// add to the scene
cena.add(pointLight);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
var main_content = document.getElementById("main_content");
main_content.appendChild(renderer.domElement);

function criarSol(objeto) {
    var geometriaSol = new THREE.SphereGeometry(20, 20, 20),
        materialSol = new THREE.MeshPhongMaterial({color: 0xD6D637, ambient: 0xD6D637, specular: 0x050505, shininess: 100}),
        sol = new THREE.Mesh(geometriaSol, materialSol);

    sol.add(objeto);
    sol.name = 'Sol';

    cena.add(sol);

    return sol;
}


function criarTerra(objeto) {
    var geometriaTerra = new THREE.SphereGeometry(5, 20, 20),
        materialTerra = new THREE.MeshLambertMaterial({color: 0x0000FF}),
        terra = new THREE.Mesh(geometriaTerra, materialTerra);

    terra.add(objeto);
    terra.translateZ(50);
    terra.name = 'Terra';

    cena.add(terra);

    return terra;
}

function criarLua() {
    var geometriaLua = new THREE.SphereGeometry(1, 20, 20),
        materialLua = new THREE.MeshLambertMaterial({color: 0x909090}),
        lua = new THREE.Mesh(geometriaLua, materialLua);
    lua.name = 'Lua';
    lua.translateZ(10);

    cena.add(lua);

    return lua;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

var lua = criarLua();
var terra = criarTerra(lua);
var sol = criarSol(terra);

function render(){
    sol.rotation.y += 0.01;

    requestAnimationFrame(render);
    renderer.render(cena, camera);

    window.addEventListener( 'resize', onWindowResize, false );
}

render();
