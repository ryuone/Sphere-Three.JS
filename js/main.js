/*
 * User: ryuone
 * Date: 12/07/07 22:19
 * License: MIT License
 */

(function(window){
    var camera, scene, renderer,
        geometry, material, mesh, particle;

    window.addEventListener("DOMContentLoaded",initialize);

    function initialize(){
        var stageObj = new StageObject();
        stageObj.init();

        var spherMeshObjA = new SphereMeshObject();
        var spherMeshObjB = new SphereMeshObject();
        var spherMeshObjC = new SphereMeshObject();
        stageObj.addMesh(spherMeshObjA);
        stageObj.addMesh(spherMeshObjB);
        stageObj.addMesh(spherMeshObjC);

        spherMeshObjB.getMesh().rotation.z = 100;
        spherMeshObjC.getMesh().rotation.x = 45;
        spherMeshObjB.getMesh().position.x = 100;
        spherMeshObjC.getMesh().position.x = -100;

        stageObj.appendRendererToBody();

        stageObj.animate();
    }

    /**
     * 画面表示
     * @constructor
     */
    function StageObject(){
    }
    StageObject.prototype = {
        camera: null,
        scene: null,
        mesh: null,
        renderer: null,
        geometry: null,
        material: null,
        init : function init(){
            this.createScene();
            this.createCamera(0,0,1000);
            this.scene.add(this.camera);
            this.createRenderer();

            this.trackball = new THREE.TrackballControls( this.camera, this.renderer.domElement );
        },
        createScene : function createScene(){
            this.scene = new THREE.Scene();
        },
        createCamera : function createCamera(posX, posY, posZ){
            this.camera = new THREE.PerspectiveCamera( 20, window.innerWidth / window.innerHeight, 1, 10000 );
            this.camera.position.x = posX;
            this.camera.position.y = posY;
            this.camera.position.z = posZ;
        },
        createRenderer : function createRenderer(){
            this.renderer = new THREE.CanvasRenderer();
            this.renderer.setSize( window.innerWidth, window.innerHeight );
        },
        appendRendererToBody : function appendRendererToBody(){
            document.body.appendChild( this.renderer.domElement );
        },
        addMesh : function addMesh(mesh){
            this.mesh = this.mesh || [];
            this.mesh.push(mesh);

            this.scene.add(mesh.getMesh());
        },
        render : function render(){
            this.trackball.update();
            this.renderer.render(this.scene, this.camera);
        },
        animate : function animate(){
            var self = this;
            requestAnimationFrame(function(){
                return function(){
                    self.animate.apply(self, null);
                }
            }());
            var xmov = 0.01;
            var ymov = 0.02;
            for(var i= 0,imax=this.mesh.length; i<imax; i++){
                this.mesh[i].getMesh().rotation.x += xmov + (i*0.01);
                this.mesh[i].getMesh().rotation.y += ymov + (i*-0.02);
            }

            this.render();
        }
    };

    /**
     * 球体メッシュ
     * @constructor
     */
    function SphereMeshObject(){
        this.geometry = null;
        this.material = null;
        this.mesh = null;
        this.createGeometry();
        this.createMaterial();
    }

    SphereMeshObject.prototype = {
        createGeometry : function createGeometry(){
            this.geometry = new THREE.SphereGeometry(50, 20, 20, 0, Math.PI *2);
        },
        createMaterial : function createMaterial(){
            this.material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true, wireframeLinewidth:1 } );
        },
        getMesh : function getMesh(){
            return this.mesh = this.mesh || new THREE.Mesh( this.geometry, this.material );
        }
    };

})(window);



