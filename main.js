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

const pAequorFactory = (specimenNum, dna) => {
  //should return an object that contains the properties specimenNum and dna that correspond to the parameters provided.
  return {
    specimenNum: specimenNum,
    dna: dna,
    mutate: function () {
      let randomIndex = returnRandIndex(dna);
      this.dna[randomIndex] = returnRandBase();
    },
    compareDNA: function (pAequor) {
      let identicalStrands = 0;
      for (var i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === pAequor.dna[i]) {
          identicalStrands++;
        }
      }
      return identicalStrands / this.dna.length;
    },
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
    complementStrand: function () {
      let complement = [];
      for (var gene in dna) {
        console.log(gene)
      }
    },
  };
};

/*
let testStrand = mockUpStrand();
let pAequor = pAequorFactory(0, testStrand);
let testStrandTwo = mockUpStrand();
let pAequorTwo = pAequorFactory(1, testStrandTwo);

console.log("-----------------");
console.log("BEFORE: " + pAequor.dna);
pAequor.mutate();
console.log("AFTER : " + pAequor.dna);
console.log("-----------------");

let diffPercent = pAequor.compareDNA(pAequorTwo);
console.log(Math.round(diffPercent * 100) / 100);
console.log('likely to survive: ' + pAequor.willLikelySurvive())
*/
let pAequors =[];
for (var i = 0; i < 30; i++) {
  let dnaStrand = mockUpStrand();
  let pAequor = pAequorFactory(i, dnaStrand);
  console.log(i + ' - ' + pAequor.dna)
  pAequors.push(pAequor)
}
//pAequors[i].complementStrand();