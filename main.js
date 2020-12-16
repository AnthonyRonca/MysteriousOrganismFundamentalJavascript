/*
    Author: Anthony Ronca 
    ROLE: SOFTWARE ENGINEER
    RUNTIME: BIGO(N^2)

    SOLUTION GUIDE:
    -------------------------
    Gives user ability to mockup pAequors and run multiple functions
    that provide data for scientist's studies
*/

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                                Functions
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ["A", "T", "C", "G"];
  return dnaBases[Math.floor(Math.random() * 4)];
};
// Returns a random array index
const returnRandIndex = (arr) => {
  return Math.floor(Math.random() * arr.length);
};
// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

/**
 * Identifies two pAequors with closest related DNA and returns them.
 * @param array {array of pAequors} contains the related DNA.
 * @return array {array of pAequors} the two closest related pAequors.
 */
const getClosestRelatedDNA = (pAequors) => {
  let maxGenesShared = 0;
  let closestRelatedPair = [];
  for (let i = 0; i < pAequors.length; i++) {
    for (let j = i + 1; j < pAequors.length; j++) {
      if (pAequors[i].compareDNA(pAequors[j]) > maxGenesShared) {
        maxGenesShared = pAequors[i].compareDNA(pAequors[j]);
        // Remove old max pair with new max pair
        closestRelatedPair = [];
        closestRelatedPair.push(pAequors[j]);
        closestRelatedPair.push(pAequors[i]);
      }
    }
  }
  return closestRelatedPair;
};
/**
 * Creates an array of pAequor subjects to study
 * @return array {array of pAequors} that are randomly populated
 */
const createpAequorArray = (numOfSubjects) => {
  let arr = [];
  for (var i = 0; i < numOfSubjects; i++) {
    let dnaStrand = mockUpStrand();
    let pAequor = pAequorFactory(i, dnaStrand);
    arr.push(pAequor);
  }
  return arr;
};
/**
 * Identifies two pAequors with closest related DNA and returns them.
 * @param integer contains the ID associated with the specimen.
 * @param dna {array of genes} contains DNA array.
 * @return pAequor obejct which containes an ID and DNA array.
 */
const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate: function () {
      let randomIndex = returnRandIndex(dna);
      this.dna[randomIndex] = returnRandBase();
    },
    /**
     * Compares how similiar two pAequors are
     * @param pAequor contains DNA array.
     * @return percentage of DNA genes shared.
     */
    compareDNA: function (pAequor) {
      let identicalStrands = 0;
      for (var i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === pAequor.dna[i]) {
          identicalStrands++;
        }
      }
      return identicalStrands / this.dna.length;
    },
    /**
     * Calculates survival rate for species
     * @return Boolean stating whether outlook is good or grim
     */
    willLikelySurvive: function () {
      let strongGenes = 0;
      for (var i = 0; i < dna.length; i++) {
        if (dna[i] === "C" || dna[i] === "G") {
          strongGenes++;
        }
      }
      let sixtyPercent = 0.6;
      if (strongGenes / this.dna.length > sixtyPercent) {
        return true;
      }
      return false;
    },
    /**
     * Creates DNA strand that is opposite of current dna
     * @return opposite DNA strand from dna
     */
    complementStrand: function () {
      let complement = [];
      for (var i = 0; i < dna.length; i++) {
        switch (dna[i]) {
          case "A":
            complement.push("T");
            break;
          case "T":
            complement.push("A");
            break;
          case "C":
            complement.push("G");
            break;
          case "G":
            complement.push("C");
            break;
          default:
            complement.push(dna[i]);
            break;
        }
      }
      return complement;
    },
    /**
     * Identifies closest related DNA pair
     * @param array {array of pAequors} contains the DNA.
     * @return array {array of pAequors} contains the closest pair.
     */
    getClosestRelatedPair: function (pAequors) {
      let maxGenesShared = 0;
      for (let i = 0; i < pAequors.length; i++) {
        for (let j = i + 1; j < pAequors.length; j++) {
          console.log(pAequors[i].compareDNA(pAequors[j]));
          if (pAequors[i].compareDNA(pAequors[j]) > maxGenesShared) {
            maxGenesShared = pAequors[i].compareDNA(pAequors[j]);
          }
        }
      }
    },
    /**
     * Outputs data for scientists to analyze
     */
    displayData: function () {
      console.log("Species Number: " + specimenNum);
      console.log("DNA: " + dna.join(""));
      console.log("Likely to survive: " + this.willLikelySurvive());

      console.log("---");
    },
  };
};

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                             LOGIC AND OUPUT
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

let pAequors = createpAequorArray(5);

for (var i = 0; i < pAequors.length; i++) {
  pAequors[i].displayData();
}
console.log("----------------------------------------------");
console.log("FINDINGS:");
console.log("----------------------------------------------");
console.log("");
console.log("Closest related species: ");
console.log("-------------------------");

let closestPair = getClosestRelatedDNA(pAequors);
console.log(
  "Species Number: " +
    closestPair[0].specimenNum +
    " - " +
    closestPair[0].dna.join("")
);
console.log(
  "Species Number: " +
    closestPair[1].specimenNum +
    " - " +
    closestPair[1].dna.join("")
);
if (closestPair[0].compareDNA(closestPair[1]) === 1.0) {
  console.log("WOAH! Identical match!");
}

console.log("");
console.log("MUTATION DETECTED");
console.log("-------------------------");

let mutatedPaequor = pAequors[returnRandIndex(pAequors)];

console.log("BEFORE:");
console.log(
  "Species Number: " +
    mutatedPaequor.specimenNum +
    " - " +
    mutatedPaequor.dna.join("")
);

mutatedPaequor.mutate();

console.log("AFTER:");
console.log(
  "Species Number: " +
    mutatedPaequor.specimenNum +
    " - " +
    mutatedPaequor.dna.join("")
);
console.log();

console.log("Reverse it for fun!");
console.log("-------------------------");
console.log("BEFORE:");
let tempPaequor = pAequors[returnRandIndex(pAequors)];
console.log(
  "Species Number: " +
    tempPaequor.specimenNum +
    " - " +
    tempPaequor.dna.join("")
);
console.log("AFTER:");
console.log(
  "Species Number: " +
    tempPaequor.specimenNum +
    " - " +
    tempPaequor.complementStrand().join("")
);

console.log();
console.log("----------------------------------------------");
