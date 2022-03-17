AFRAME.registerComponent("create-marker",{
    init : async function(){
        var mainScene =  document.querySelector("#main-scene");
        var t = await this.getToys();
        // Mapping toys and creating marker elements
        t.map(toy=>{
            var marker = document.createElement("a-marker");
            marker.setAttribute("id", toy.id);
            marker.setAttribute("type", "pattern")
            marker.setAttribute("url",toy.markerPatternUrl);
            marker.setAttribute("marker-handler",{})
            marker.setAttribute("cursor",{
                rayOrigin : "mouse"
            });
            mainScene.appendChild(marker);

            // Adding 3D model to scene
            var model = document.createElement("a-entity");
            model.setAttribute("id",`model-${toy.id}`);
            model.setAttribute("position",toy.modelGeometry.position);
            model.setAttribute("rotation",toy.modelGeometry.rotation);
            model.setAttribute("scale",toy.modelGeometry.scale);
            model.setAttribute("gesture-handler",{});
            model.setAttribute("animation-mixer",{});
            model.setAttribute("gltf-model",`url(${toy.modelUrl})`);
            marker.appendChild(model);

            // Main Plane
            var mainPlane =  document.createElement("a-plane");
            mainPlane.setAttribute("position","0 0 0");
            mainPlane.setAttribute("rotation","-90 0 0");
            mainPlane.setAttribute("width","2");
            mainPlane.setAttribute("height","1.5");
            
            // Description
            var description =  document.createElement("a-entity");
            description.setAttribute("position","0 0 0.1");
            description.setAttribute("rotation","0 0 0");
            description.setAttribute("text",{
                "color" : "black",
                "align" : "center",
                "width":"1.8",
                "height":"1",
                "font":"monoid",
                "value":toy.description
            });
            mainPlane.appendChild(description)

            // Price
            var price =  document.createElement("a-entity");
            price.setAttribute("position","0 -0.5 0.1");
            price.setAttribute("rotation","0 0 0");
            price.setAttribute("text",{
                "color" : "black",
                "align" : "center",
                "width":"1.8",
                "height":"1",
                "font":"monoid",
                "value":"Price: $"+toy.price
            });
            mainPlane.appendChild(price);        

            // Title Plane
            var titlePlane =  document.createElement("a-plane");
            titlePlane.setAttribute("position","0 0.1 0.05");
            titlePlane.setAttribute("rotation","0 0 0");
            titlePlane.setAttribute("width","2");
            titlePlane.setAttribute("height","1.4");
            titlePlane.setAttribute("color","#f0c30f");
            mainPlane.appendChild(titlePlane)

            // Title
            var title =  document.createElement("a-entity");
            title.setAttribute("position","0 0.6 0.1");
            title.setAttribute("rotation","0 0 0");
            title.setAttribute("text",{
                "color" : "black",
                "align" : "center",
                "width":"2",
                "height":"1",
                "font":"monoid",
                "value":toy.toyName
            });
            titlePlane.appendChild(title)
            marker.appendChild(mainPlane);    
        })
    },
    getToys: async function(){
        return await firebase
        .firestore()
        .collection("toys")
        .get()
        .then(snap=>{
            return snap.docs.map(doc => doc.data());
        });
    }
})