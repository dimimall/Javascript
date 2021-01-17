
    "use strict";
    
    // Create Dino Constructor
    function Dino(species,weight,height,diet,where,when,fact,image){
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact
        this.image = image;
    }

    // Create Dino Objects
    let dinosaurs = [];
    async function getDinosData(){
        let jsonData = [];
        const getDinos = await  fetch("dino.json")
        let response = await getDinos.json()
        jsonData = response.Dinos.map((i) => i);
        jsonData.forEach(function(item){
            dinosaurs.push(new Dino(item.species,item.weight,item.height,item.diet,item.where,item.when,item.fact,item.image))
        })
        console.log(" data", dinosaurs)

        return dinosaurs;
    }

    // Create Human Object
    function Human(species,weight,height,diet,name){
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.name = name;
    }

    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 
    Dino.prototype.compareHeight = function(human,dino) {
        if (human.height < dino.height)
        {
            return dino.species+" has more height than "+human.species
        }
        else{
            return human.species+" has more height than "+dino.species
        }
    };
    
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
    Dino.prototype.compareWeight = function(human,dino) {
        if (human.weight < dino.weight)
        {
            return dino.species +" has more weight than "+human.species
        }
        else{
            return human.species+" has more weight than "+dino.species
        }
    };
    
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
    Dino.prototype.compareDiet = function(human,dino) {
        if (human.diet < dino.diet)
        {
            return dino.species+" has "+dino.diet
        }
        else{
            return human.species+" has "+human.diet
        }
    };

    function getRandomFact(human,dino){
        const dinosFact = []
        dinosFact.push(dino.fact)
        dinosFact.push(dino.compareHeight(human,dino))
        dinosFact.push(dino.compareWeight(human,dino))
        dinosFact.push(dino.compareDiet(human,dino))

        return dinosFact[Math.floor(Math.random()*Math.floor(4))];
    }
    

    // Generate Tiles for each Dino in Array
    async function createTiles(){
        let dinosArray = await getDinosData();

        let humanInfo = function ()
        {
            const name = document.getElementById('name').value;
            const feet = parseFloat(document.getElementById('feet').value);
            const inches = parseFloat(document.getElementById('inches').value);
            const weight = parseFloat(document.getElementById('weight').value);
            const diet = document.getElementById('diet').value;
            const height = (feet * 12) + inches;
            const human = new Human("Human",weight,height,diet,name);
    
            return human;
        };
        console.log(humanInfo());

        let tiles = [];
        for(let i=0; i<9; i++){
            const gridHtml = document.createElement("div");
            gridHtml.className = "grid-item";

            let innerP = document.createElement("p");
            let innerH3 = document.createElement("h3");
            let innerImg = document.createElement("img");
            gridHtml.id = "grid" + i;


            if(i == 4){
                innerH3.innerHTML = humanInfo().species;
                innerP.innerHTML = "";
                innerImg.src = "images/human.png";
            }
            else if(dinosArray[i].species == "Pigeon"){
                innerH3.innerHTML = dinosArray[i].species;
                innerP.innerHTML = dinosArray[i].fact;
                innerImg.src = dinosArray[i].image;
            }
            else{
                innerH3.innerHTML = dinosArray[i].species;
                innerP.innerHTML = getRandomFact(humanInfo(),dinosArray[i]);
                innerImg.src = dinosArray[i].image;
            }
            gridHtml.appendChild(innerH3);
            gridHtml.appendChild(innerImg);
            gridHtml.appendChild(innerP);
            tiles.push(gridHtml);
        }
        return tiles;
    }
        // Add tiles to DOM
    async function addTilesToHtml()
    {
        let dinoJsonData = await getDinosData()
        let tiles = await createTiles();
        const grid = document.getElementById("grid");

        tiles.forEach(function callback(currentValue){
            grid.appendChild(currentValue);
        });
    }
    // Remove form from screen
    document.getElementById("btn").addEventListener("click",function(){
        document.getElementById("dino-compare").style.display = "none";

        if(document.getElementById("grid").childNodes.length === 0)
        {
            addTilesToHtml();
        }

        document.getElementById("grid").style.display = "flex";
    });

    // On button click, restart the process
    document.getElementById("restart").addEventListener("click",function(){
        document.getElementById('name').value = "";
        document.getElementById('feet').value = "";
        document.getElementById('inches').value = "";
        document.getElementById('weight').value = "";

        document.getElementById("grid").style.display = "none";
        document.getElementById("dino-compare").style.display = "block";
    });

