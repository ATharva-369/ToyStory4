AFRAME.registerComponent("create-buttons",{
    init:function(){
        var button1 = document.createElement("button1");
        button1.innerHTML = "ORDER SUMMARY";
        button1.setAttribute("id","summary-button");
        button1.setAttribute("class", "btn btn-warning");

        var button2 = document.createElement("button1");
        button2.innerHTML = "ORDER NOW";
        button2.setAttribute("id","order-button");
        button2.setAttribute("class", "btn btn-warning"); 
        
        
        var division = document.getElementById("button1");
        division.appendChild(button1);
        division.appendChild(button2);
    }
})