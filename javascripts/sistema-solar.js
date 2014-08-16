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

function rotacionarSol () {
    var matrizRotacao = new THREE.Matrix4();

    matrizRotacao.makeRotationY(grauToRadiano(1));
    sol.applyMatrix(matrizRotacao);
}

function criarTerra(objeto) {
    var geometriaTerra = new THREE.SphereGeometry(5, 20, 20),
        materialTerra = new THREE.MeshLambertMaterial({color: 0x0000FF}),
        terra = new THREE.Mesh(geometriaTerra, materialTerra);

    terra.add(objeto);
    terra.translateX(50);
    terra.name = 'Terra';

    cena.add(terra);

    return terra;
}

function rotacionarTerra () {
    // Rotation
    var matrizRotacaoY = new THREE.Matrix4();
        matrizRotacaoY.makeRotationY(grauToRadiano  (0.3));
        terra.applyMatrix(matrizRotacaoY);

    // Translation
    var matrizRotacaoEixo =  new THREE.Matrix4(),
        matrizTranslacaoPosicao = new THREE.Matrix4(),
        matrizTranslacaoOrigem = new THREE.Matrix4(),
        posicao = terra.position;

    matrizRotacaoEixo.makeRotationY(grauToRadiano(0.000000000005));
    matrizTranslacaoPosicao.makeTranslation(posicao.x, posicao.y, posicao.z);
    matrizTranslacaoOrigem.makeTranslation(-posicao.x, -posicao.y, -posicao.z);

    terra.applyMatrix(matrizRotacaoEixo);
    terra.applyMatrix(matrizTranslacaoPosicao);
    terra.applyMatrix(matrizTranslacaoOrigem);
}

function criarLua() {
    var geometriaLua = new THREE.SphereGeometry(1, 20, 20),
        materialLua = new THREE.MeshLambertMaterial({color: 0x909090}),
        lua = new THREE.Mesh(geometriaLua, materialLua);
    lua.name = 'Lua';
    lua.translateX(10);

    cena.add(lua);

    return lua;
}

function rotacionarLua() {

    // Rotation
    var matrizRotacaoY = new THREE.Matrix4();
    matrizRotacaoY.makeRotationY(grauToRadiano(1));
    lua.applyMatrix(matrizRotacaoY);

    // Translation
    var matrizRotacaoEixo = new THREE.Matrix4(),
        matrizTranslacaoPosicao = new THREE.Matrix4(),
        matrizTranslacaoOrigem = new THREE.Matrix4(),
        posicao = lua.position;

    matrizRotacaoEixo.makeRotationY(grauToRadiano(0.0));
    matrizTranslacaoPosicao.makeTranslation(posicao.x, posicao.y, posicao.z);
    matrizTranslacaoOrigem.makeTranslation(-posicao.x, -posicao.y, -posicao.z);

    lua.applyMatrix(matrizTranslacaoOrigem);
    lua.applyMatrix(matrizRotacaoEixo);
    lua.applyMatrix(matrizTranslacaoPosicao);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

function grauToRadiano(grau) {
    return grau * Math.PI / 180;
}

var lua = criarLua();
var terra = criarTerra(lua);
var sol = criarSol(terra);

function render(){
    sol.rotation.y += 0.01;
    terra.rotation.y += 0.01;
    lua.rotation.y += 0.01;

    renderer.render(cena, camera);

    // rotacionarSol();
    // rotacionarTerra();
    // rotacionarLua();

    requestAnimationFrame(render);


    window.addEventListener( 'resize', onWindowResize, false );
}

render();
