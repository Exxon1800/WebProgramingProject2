var renderer, camera, projector;
var scene, element;
var ambient, point;
var aspectRatio, windowHalf;
var mouse, time;
var raycaster;

var controls;
var clock;

var ground, groundGeometry, groundMaterial;
var sphere, torus;

var decalTexture;
var decalTargets = [];
var decalFactory;
var objects = [];

function initScene() {
    clock = new THREE.Clock();
    mouse = new THREE.Vector2(0, 0);

    windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
    aspectRatio = window.innerWidth / window.innerHeight;

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(45, aspectRatio, 1, 10000);
    camera.position.z = 512;
    camera.position.y = 2000;
    camera.up
    camera.lookAt(scene.position);

    //initialise projector for clickable link
    projector = new THREE.Projector();
    mouseVector = new THREE.Vector2();

    // Initialize the renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x7EC0EE, 1);

    element = document.getElementById('viewport');
    element.appendChild(renderer.domElement);

    document.addEventListener('mousedown', onDocumentMouseDown, false);

    controls = new THREE.OrbitControls(camera);

    decalFactory = new THREE.DecalFactory({
        material: new THREE.MeshPhongMaterial({
            sides: THREE.DoubleSide,
            color: 0xffffff,
            map: decalTexture,
            polygonOffset: true,
            polygonOffsetFactor: -4,
            transparent: true,
            depthWrite: false,
            shininess: 150,
            specular: 0xffffff
        }),
        maxDecals: 5}
    );

    time = Date.now();
}


function initLights() {
    var hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.7);
    scene.add(hemiLight);
    
    var directionalLight = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight.position.set(100, 100, 100);
    scene.add(directionalLight);
}


function initGeometry() {
    groundMaterial = new THREE.MeshBasicMaterial({
        wireframe: true
    });


//load in sprites 
    namsanSeoulTower = new THREE.Mesh(
            new THREE.PlaneGeometry(75 / 2, 154 / 2),
            new THREE.MeshLambertMaterial({
                map: THREE.ImageUtils.loadTexture("resources/sprites/namsan.png")
            })
            );
    namsanSeoulTower.position.set(140 , 154 / 4, -120);
    namsanSeoulTower.name = "namsanSeoulTower";
    namsanSeoulTower.material.transparent = true;
    namsanSeoulTower.material.side = THREE.DoubleSide;
    namsanSeoulTower.userData = {URL: "page_1.html"};
    scene.add(namsanSeoulTower);
    objects.push(namsanSeoulTower);


    gyeongbokgung = new THREE.Mesh(
            new THREE.PlaneGeometry(78 / 2, 53 / 2),
            new THREE.MeshLambertMaterial({
                map: THREE.ImageUtils.loadTexture("resources/sprites/gyeongbokgung.png")
            })
            );
    gyeongbokgung.position.set(65, 53 / 4, -348);
    gyeongbokgung.name = "gyeongbokgung";
    gyeongbokgung.material.transparent = true;
    gyeongbokgung.material.side = THREE.DoubleSide;
    gyeongbokgung.userData = {URL: "page_2.html"};
    scene.add(gyeongbokgung);
    objects.push(gyeongbokgung);


    buckhcon = new THREE.Mesh(
            new THREE.PlaneGeometry(116 / 2, 61 / 2),
            new THREE.MeshLambertMaterial({
                map: THREE.ImageUtils.loadTexture("resources/sprites/buckhcon.png")
            })
            );
    buckhcon.position.set(105, 61/4, -370);
    buckhcon.name = "buckhcon";
    buckhcon.material.transparent = true;
    buckhcon.material.side = THREE.DoubleSide;
    buckhcon.userData = {URL: "page_3.html"};
    scene.add(buckhcon);
    objects.push(buckhcon);


    lotteWorldTower = new THREE.Mesh(
            new THREE.PlaneGeometry(30 / 2, 194 / 2),
            new THREE.MeshLambertMaterial({
                map: THREE.ImageUtils.loadTexture("resources/sprites/lotte_world_tower.png")
            })
            );
    lotteWorldTower.position.set(787, 194/4, 177);
    lotteWorldTower.name = "lotteWorldTower";
    lotteWorldTower.material.transparent = true;
    lotteWorldTower.material.side = THREE.DoubleSide;
    lotteWorldTower.userData = {URL: "page_4.html"};
    scene.add(lotteWorldTower);
    objects.push(lotteWorldTower);


    jogyesa = new THREE.Mesh(
            new THREE.PlaneGeometry(90 / 2, 43 / 2),
            new THREE.MeshLambertMaterial({
                map: THREE.ImageUtils.loadTexture("resources/sprites/jogyesa.png")
            })
            );
    jogyesa.position.set(97, 43/4, -292);
    jogyesa.name = "jogyesa";
    jogyesa.material.transparent = true;
    jogyesa.material.side = THREE.DoubleSide;
    jogyesa.userData = {URL: "page_5.html"};
    scene.add(jogyesa);
    objects.push(jogyesa);


    bongeunsa = new THREE.Mesh(
            new THREE.PlaneGeometry(101/2, 44/2),
            new THREE.MeshLambertMaterial({
                map: THREE.ImageUtils.loadTexture("resources/sprites/bongeunsa.png")
            })
            );
    bongeunsa.position.set(518, 44/4, 157);
    bongeunsa.name = "bongeunsa";
    bongeunsa.material.transparent = true;
    bongeunsa.material.side = THREE.DoubleSide;
    bongeunsa.userData = {URL: "page_6.html"};
    scene.add(bongeunsa);
    objects.push(bongeunsa);


    lotte_world = new THREE.Mesh(
            new THREE.PlaneGeometry(66 / 2, 110 / 2),
            new THREE.MeshLambertMaterial({
                map: THREE.ImageUtils.loadTexture("resources/sprites/lotte_world.png")
            })
            );
    lotte_world.position.set(754, 110/4, 230);
    lotte_world.name = "lotte_world";
    lotte_world.material.transparent = true;
    lotte_world.material.side = THREE.DoubleSide;
    lotte_world.userData = {URL: "page_7.html"};
    scene.add(lotte_world);
    objects.push(lotte_world);


    olympic_park = new THREE.Mesh(
            new THREE.PlaneGeometry(118 / 2, 45 / 2),
            new THREE.MeshLambertMaterial({
                map: THREE.ImageUtils.loadTexture("resources/sprites/olympic_park.png")
            })
            );
    olympic_park.position.set(890, 45/4, 132);
    olympic_park.name = "olympic_park";
    olympic_park.material.transparent = true;
    olympic_park.material.side = THREE.DoubleSide;
    olympic_park.userData = {URL: "page_8.html"};
    scene.add(olympic_park);
    objects.push(olympic_park);


    sungnyemun_gate = new THREE.Mesh(
            new THREE.PlaneGeometry(113 / 2, 42 / 2),
            new THREE.MeshLambertMaterial({
                map: THREE.ImageUtils.loadTexture("resources/sprites/sungnyemun_gate.png")
            })
            );
    sungnyemun_gate.position.set(40, 42/4, -187);
    sungnyemun_gate.name = "sungnyemun_gate";
    sungnyemun_gate.material.transparent = true;
    sungnyemun_gate.material.side = THREE.DoubleSide;
    sungnyemun_gate.userData = {URL: "page_9.html"};
    scene.add(sungnyemun_gate);
    objects.push(sungnyemun_gate);


    worldcup_statium = new THREE.Mesh(
            new THREE.PlaneGeometry(120 / 2, 46 / 2),
            new THREE.MeshLambertMaterial({
                map: THREE.ImageUtils.loadTexture("resources/sprites/worldcup_statium.png")
            })
            );
    worldcup_statium.position.set(-400, 46/4, -252);
    worldcup_statium.name = "worldcup_statium";
    worldcup_statium.material.transparent = true;
    worldcup_statium.material.side = THREE.DoubleSide;
    worldcup_statium.userData = {URL: "page_10.html"};
    scene.add(worldcup_statium);
    objects.push(worldcup_statium);


    //map
    var ground = new THREE.Mesh(
            new THREE.PlaneGeometry(2000, 2000, 64, 64),
            new THREE.MeshLambertMaterial({
                map: THREE.ImageUtils.loadTexture("resources/seoulMap.png")
            })
            );

    ground.rotation.x = -Math.PI / 2;
    ground.material.side = THREE.DoubleSide;
    scene.add(ground);

    decalTargets.push(ground);
    decalTargets.push(sphere);
}


function init() {
    window.addEventListener('resize', onResize, false);

    initScene();
    initLights();
    initGeometry();
}


function onResize() {
    windowHalf = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
    aspectRatio = window.innerWidth / window.innerHeight;
    camera.aspect = aspectRatio;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


function onMouseMove(event) {
    mouse.set((event.clientX / window.innerWidth - 0.5) * 2, (event.clientY / window.innerHeight - 0.5) * 2);
}


function onDocumentMouseDown(event) {
    event.preventDefault();
    var vector = new THREE.Vector3((event.clientX / window.innerWidth) * 2 -
            1, -(event.clientY / window.innerHeight) * 2 + 1, 0.5);
    projector.unprojectVector(vector, camera);
    var raycaster = new THREE.Raycaster(camera.position, vector.sub(camera.position)
            .normalize());
    var intersects = raycaster.intersectObjects(objects);
    if (intersects.length > 0) {
        x = raycaster.intersectObjects(objects);
        link = x[0]['object']['userData'].URL;
        console.log(link);
        console.log(raycaster.intersectObjects(objects));
        window.open(link, '_blank');
        
    }
}


function animate() {
    requestAnimationFrame(animate);
    render();
}


function render() {
    var delta = clock.getDelta();
    time += delta;

    controls.update();

    decalFactory.update();
    renderer.render(scene, camera);
}


window.onload = function () {
    init();
    animate();
}