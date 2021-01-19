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

class Dino {
    constructor(species, weight, height, diet, where, when, fact, image) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
        this.image = image;
    }
    /**
     * @description Create Dino Compare Method 1
     * @description NOTE: Height in JSON file is in lbs, height in inches.
     * @param {object} human
     * @param {object} dino
     * @returns {string} the highest object from compare two heights*/
    compareHeight(human, dino) {
        if (human.height < dino.height) {
            return dino.species + " has more height than " + human.species;
        } else {
            return human.species + " has more height than " + dino.species;
        }
    }
    /**
     * @description Create Dino Compare Method 2
     * @description NOTE: Weight in JSON file is in lbs, height in inches.
     * @param {object} human
     * @param {object} dino
     * @returns {string} the weightest object from compare two weights*/
    compareWeight(human, dino) {
        if (human.weight < dino.weight) {
            return dino.species + " has more weight than " + human.species;
        } else {
            return human.species + " has more weight than " + dino.species;
        }
    }
    /**
     * @description Create Dino Compare Method 3
     * @description NOTE: Diet in JSON file is in lbs, height in inches.
     * @param {object} human
     * @param {object} dino
     * @returns {string} the object from compare two diet*/
    compareDiet(human, dino) {
        if (human.diet < dino.diet) {
            return dino.species + " has " + dino.diet;
        } else {
            return human.species + " has " + human.diet;
        }
    }
}


/** 
 * @description Create Human Object
 * @param {string} species
 * @param {number}  weight
 * @param {number} height
 * @param {string} diet
 * @param {string} name*
 */
class Human {
    constructor(species, weight, height, diet, name) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.name = name;
    }
}




/** 
 * @description Get Dino Facts with random Method
 * @param {object} human
 * @param {object} dino
 * @returns {Array} of fucts object from dinos objects*/
function getRandomFact(human, dino) {
    const dinosFact = []
    dinosFact.push(dino.fact);
    dinosFact.push(dino.compareHeight(human, dino));
    dinosFact.push(dino.compareWeight(human, dino));
    dinosFact.push(dino.compareDiet(human, dino));

    return dinosFact[Math.floor(Math.random() * Math.floor(4))];
}

let humanInfo = function() {
    const name = document.getElementById("name").value;
    const feet = parseFloat(document.getElementById("feet").value);
    const inches = parseFloat(document.getElementById("inches").value);
    const weight = parseFloat(document.getElementById("weight").value);
    const diet = document.getElementById("diet").value;
    const height = (feet * 12) + inches;
    const human = new Human("Human", weight, height, diet, name);

    return human;
};

/**
 * @description Generate Tiles for each Dino in Array
 */
function createTiles() {

    const getDinosData = async ()=> {
        let dinosaurs =[];
        const getDinos = await fetch("dino.json");
        let response = await getDinos.json();
        response.Dinos.map((item) => {
            dinosaurs.push(new Dino(item.species,item.weight,item.height,item.diet,item.where,item.when,item.fact,item.image))
        });
        return dinosaurs;
    }

    (async () => {
        const grid = document.getElementById("grid");
        const dinosArray = await getDinosData();

        for (let i = 0; i < 9; i++) {
            if (i === 4) {
                const name = humanInfo().species;
                const image = "images/human.png";
                const humanTile = buildTile(name, image, '');
                
                grid.appendChild(humanTile);
              }
              const species = dinosArray[i].species;
              const image = dinosArray[i].image;
              let fact;
              if (dinosArray[i].species === "Pigeon")
              {
                fact = "All birds are living dinosaurs.";
              }
              else{
                fact = getRandomFact(humanInfo(), dinosArray[i]);
              }
              const dinoTile = buildTile(species, image, fact);
              grid.appendChild(dinoTile);
        }
    })();
}

/**
 * @description buid tiles
 * @param {string} h3 name of animalls
 * @param {string} img images of animals
 * @param {string} p facts of animals
 */
function buildTile(h3, img, p) {
    const gridHtml = document.createElement("div");
    gridHtml.className = "grid-item";
    const innerP = document.createElement("p");
    const innerH3 = document.createElement("h3");
    const innerImg = document.createElement("img"); 
    innerH3.innerHTML = h3;
    innerP.innerHTML = p;
    innerImg.src = img;
    gridHtml.appendChild(innerH3);
    gridHtml.appendChild(innerImg);
    gridHtml.appendChild(innerP);
    
    return gridHtml;
  }

/**
 * @description Add tiles to DOM
 * @description this is a function
 */

/**
 * @description Remove form from screen
 */
document.getElementById("btn").addEventListener("click", function() {
    document.getElementById("dino-compare").style.display = "none";

    if (document.getElementById("grid").childNodes.length === 0) {
        createTiles();
    }

    document.getElementById("grid").style.display = "flex";
});

/**
 * @description On button click, restart the process
 */
document.getElementById("restart").addEventListener("click", function() {
    document.getElementById("name").value = "";
    document.getElementById("feet").value = "";
    document.getElementById("inches").value = "";
    document.getElementById("weight").value = "";

    document.getElementById("grid").style.display = "none";
    document.getElementById("dino-compare").style.display = "block";
});