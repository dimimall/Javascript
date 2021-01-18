
    "use strict";
    
    /** 
    * @description Dino object variables
    * @constractor
    * @param {string} species
    * @param {number} weight
    * @param {number} height
    * @param {string} diet
    * @param {string} where
    * @param {string} when
    * @param {string} fact
    * @param {string} image
    */

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

    // Create Dino Objects from gino.json asynchronous
    let dinosaurs = [];
    async function getDinosData(){
        let jsonData = [];
        const getDinos = await  fetch("dino.json");
        let response = await getDinos.json();
        jsonData = response.Dinos.map((i) => i);
        jsonData.forEach(function(item){
            dinosaurs.push(new Dino(item.species,item.weight,item.height,item.diet,item.where,item.when,item.fact,item.image))
        });
        return dinosaurs;
    }

    /** 
     * @description Create Human Object
     * @param {string} species
     * @param {number}  weight
     * @param {number} height
     * @param {string} diet
     * @param {string} name*
     */ 
    function Human(species,weight,height,diet,name){
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.name = name;
    }

    /** 
     * @description Create Dino Compare Method 1 
     * @description NOTE: Height in JSON file is in lbs, height in inches.
     * @param {object} human
     * @param {object} dino
     * @returns {string} the highest object from compare two heights*/ 
     
    Dino.prototype.compareHeight = function(human,dino) {
        if (human.height < dino.height)
        {
            return dino.species+" has more height than "+human.species
        }
        else{
            return human.species+" has more height than "+dino.species
        }
    };
    
    /** 
     * @description Create Dino Compare Method 2 
     * @description NOTE: Weight in JSON file is in lbs, height in inches.
     * @param {object} human
     * @param {object} dino
     * @returns {string} the weightest object from compare two weights*/ 
    Dino.prototype.compareWeight = function(human,dino) {
        if (human.weight < dino.weight)
        {
            return dino.species +" has more weight than "+human.species
        }
        else{
            return human.species+" has more weight than "+dino.species
        }
    };
    
    /** 
     * @description Create Dino Compare Method 3 
     * @description NOTE: Diet in JSON file is in lbs, height in inches.
     * @param {object} human
     * @param {object} dino
     * @returns {string} the object from compare two diet*/ 
    Dino.prototype.compareDiet = function(human,dino) {
        if (human.diet < dino.diet)
        {
            return dino.species+" has "+dino.diet
        }
        else{
            return human.species+" has "+human.diet
        }
    };

    /** 
     * @description Get Dino Facts with random Method
     * @param {object} human
     * @param {object} dino
     * @returns {Array} of fucts object from dinos objects*/ 
    function getRandomFact(human,dino){
        const dinosFact = []
        dinosFact.push(dino.fact);
        dinosFact.push(dino.compareHeight(human,dino));
        dinosFact.push(dino.compareWeight(human,dino));
        dinosFact.push(dino.compareDiet(human,dino));

        return dinosFact[Math.floor(Math.random()*Math.floor(4))];
    }
    

    /**
     * @description Generate Tiles for each Dino in Array
     * @returns {Array} array of tiles */ 
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
    
            /**
            * @description Add tiles to DOM
            * @description this is a function
            */

           async function addTilesToHtml()
           {
               let dinoJsonData = await getDinosData()
               let tiles = await createTiles();
               const grid = document.getElementById("grid");

               tiles.forEach(function callback(currentValue){
                   grid.appendChild(currentValue);
               });
           };

    /**
     * @description Remove form from screen
     */
    document.getElementById("btn").addEventListener("click",function(){
        document.getElementById("dino-compare").style.display = "none";

        if(document.getElementById("grid").childNodes.length === 0)
        {
            addTilesToHtml();
        }

        document.getElementById("grid").style.display = "flex";
    });

    /**
     * @description On button click, restart the process
     */
    document.getElementById("restart").addEventListener("click",function(){
        document.getElementById('name').value = "";
        document.getElementById('feet').value = "";
        document.getElementById('inches').value = "";
        document.getElementById('weight').value = "";

        document.getElementById("grid").style.display = "none";
        document.getElementById("dino-compare").style.display = "block";
    });