var ORIGEM = new THREE.Vector3(0, 0, 0);

var fovy = 75,
    aspectRatio = window.innerWidth/ window.innerHeight,
    near = 1,
    far = 300;

var cena = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(fovy, aspectRatio, near, far);
camera.position.set(75, 75, 75);
camera.lookAt(ORIGEM);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);
document.body.appendChild(renderer.domElement);

function criarSol(objeto) {
    var geometriaSol = new THREE.SphereGeometry(20, 20, 20),
        materialSol = new THREE.MeshBasicMaterial({color: 0xD6D637}),
        sol = new THREE.Mesh(geometriaSol, materialSol);

    sol.add(objeto);

    cena.add(sol);

    return sol;
}

function criarTerra(objeto) {
    var geometriaTerra = new THREE.SphereGeometry(5, 20, 20),
    materialTerra = new THREE.MeshBasicMaterial({color: 0x0000FF}),
    terra = new THREE.Mesh(geometriaTerra, materialTerra);

    terra.add(objeto);
    terra.translateZ(50);

    cena.add(terra);

    return terra;
}

function criarLua() {
    var geometriaLua = new THREE.SphereGeometry(1, 20, 20),
        materialLua = new THREE.MeshBasicMaterial({color: 0x909090}),
        lua = new THREE.Mesh(geometriaLua, materialLua);

        lua.translateZ(60);

        cena.add(lua);
}

var lua = criarLua();
var terra = criarTerra(lua);
var sol = criarSol(terra);

function render(){
    sol.rotation.y += 0.01;

    requestAnimationFrame(render);
    renderer.render(cena, camera);
}

render();