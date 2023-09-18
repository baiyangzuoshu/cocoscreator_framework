const { rmSync, mkdirSync, existsSync, readFileSync, writeFileSync } = require('fs');

// console.log(process.argv);
if(process.argv.length <= 2) {
    console.log("invalid params, Example node ./tools/gen_uicomponent prefabName");
    return;
}

var fileName = process.argv[2] + "_UICtrl";
var className = fileName;

console.log("Gen UI Ctrl Template ...");
console.log("... " + fileName + ".ts ...");


var path = "./tools/Temp_UICtrl.ts";
content = readFileSync(path, { encoding: 'utf8' });
content = content.replaceAll("Temp_UICtrl", className);
// console.log(content);

var outDir = "./assets/Game/Scripts/UIControllers/";
if (!existsSync(outDir)) {
    mkdirSync(outDir, { recursive: true });
}

var outPutFile = outDir + fileName + ".ts";
if(existsSync(outPutFile)) {
    console.log("Gen UICtrl Template: File is exist !!!! ");
    return;
}

console.log(outPutFile);
writeFileSync(outPutFile, content);
console.log("end Gen UI Ctrl Template ...");