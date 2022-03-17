// User number
var userNumber = null;

AFRAME.registerComponent("marker-handler",{
    init:async function(){

        if(userNumber === null){
            this.askUserNumber();
        }


        //Get the toys collection
        var toys = await this.getToys();
        console.log(toys)

        this.el.addEventListener("markerFound",()=>{
            console.log("Marker Found!");
            if (userNumber !== null) {
                var markerId = this.el.id;
                this.markerFound(toys, markerId);
              }
        });
        this.el.addEventListener("markerLost",()=>{
            console.log("Marker Lost!");
            this.markerLost();
        });    
    },  
    markerFound:function(toys,markerId){
        // Get the toy based on ID
        var toy = toys.filter(toy => toy.id === markerId)[0];

        var button = document.getElementById("button1");
        button.style.display = "flex" ;
        var summaryButton = document.getElementById("summary-button");
        var orderButton = document.getElementById("order-button");
        summaryButton.addEventListener("click",()=>{  
            swal({
                icon : "warning",
                tite : "Order Summary",
                text : "Work In Progress..."
            });
        });
        orderButton.addEventListener("click",()=>{
            var uNumber;
            userNumber <= 9 ? (uNumber = `U0${userNumber}`) : `T${tableNumber}`;
            this.handleOrder(uNumber, toy);
  
            swal({
                icon : "https://cdn-icons-png.flaticon.com/512/686/686370.png",
                tite : "Thankyou For Ordering!",
                text : "Your Toy Will Be Delivered Soon",
                timer: 2000,
                buttons: false
            });
        });
    },
    markerLost:function(){
        var button = document.getElementById("button1");
        button.style.display = "none" ;

    },
    handleOrder :function(uid, toy){
        firebase 
        .firestore()
        .collection("users")
        .doc(uid)
        .get()
        .then(doc=>{
            var details = doc.data();

            if(details["current_orders"][toy.id]){
                details["current_orders"][toy.id]["quantity"] += 1;

                var currentQuantity = details["current_orders"][toy.id]["quantity"];

                details["current_orders"][toy.id]["subtotal"] = 
                    currentQuantity * toy.price;
            }
            else{
                details["current_orders"][toy.id] = {
                    item : toy.toyName,
                    price:toy.price,
                    quantity:1,
                    subtotal:toy.price*1
                };

            };
            details.total_bill += toy.price;

            // Updating DB
            firebase
                .firestore()
                .collection("users")
                .doc(doc.id)
                .update(details);
        });
    },
    // Function to get toys collection from db
    getDishes: async function () {
        return await firebase
          .firestore()
          .collection("toys")
          .get()
          .then(snap => {
            return snap.docs.map(doc => doc.data());
          });
      },
    //  Ask the user for the number
      askUserNumber: function () {
        var iconUrl = "https://cdn-icons.flaticon.com/png/512/551/premium/551239.png?token=exp=1647527419~hmac=210f9a1a086408bf483f0ae9cf865472";
        swal({
          title: "Welcome to ToysForU!!",
          icon: iconUrl,
          content: {
            element: "input",
            attributes: {
              placeholder: "Type in your user number",
              type: "number",
              min: 1
            }
          },
          closeOnClickOutside: false,
        }).then(inputValue => {
          userNumber = inputValue;
        });
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
});