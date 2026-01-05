let genes = ["ACADM", "GLMN", "RLF", "AZIN2", "CRYZ"];
let newGenes = genes.slice();  // copying one array to another. //
console.log(newGenes);
newGenes[2] = genes[4]
newGenes[4] = genes[2];
console.log(newGenes);
newGenes.splice(3 , 1);
console.log(newGenes);
newGenes.push("AZIN2", "AZIN2");
console.log(newGenes);
newGenes.unshift("FXT");
console.log(newGenes);
