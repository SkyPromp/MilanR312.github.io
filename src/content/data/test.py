# Script to modify output .js file created by emscripten to make it easily importable and useable in React
# Created by @Sheldonfrith, 2022, based on this answer: https://stackoverflow.com/a/60571821/4205839
# by @Kushuh
# WARNING: This script file was thrown together quickly and is thus very fragile
# especially fragile to any changes in emscripten output .js file format, so will probably break with future versions of emscripten

# Called from the command line

import sys

def main():
    # Command line arguments in order
    inFilePath = sys.argv[1] #path to your emscripten-generated .js file
    outFilePath = sys.argv[2] #path to the modified .js file you can use with React
    pathToDotWasmFileRelativeToBuild = sys.argv[3]  # ! Must include "/" at start, example: /wasm/myModule.wasm
    wasmFileName = sys.argv[4] # example: myModule.wasm

    #line, number of lines to skip

    output = ""

    lines_to_delete = {
        'var dataURIPrefix = "data:application/octet-stream;base64,";' : 2,
        'function isDataURI(filename) {' : 3,
        'if (!isDataURI(wasmBinaryFile)) {' : 3,
        'function getBinary(file) {' : 13,
    }
    lines_to_replace = {
        'var _scriptDir = import.meta.url;': [1, f'var _scriptDir = "{pathToDotWasmFileRelativeToBuild}"'],
        'scriptDirectory = self.location.href;' : [1,'scriptDirectory = window.self.location.href;'],
        'var wasmBinaryFile = "lss.wasm' : [1, f"const wasmBinaryFile = '{pathToDotWasmFileRelativeToBuild}'"],
        'function getBinaryPromise() {' : [27, """
const getBinaryPromise = () => new Promise((resolve, reject) => {
 fetch(wasmBinaryFile, { credentials: 'same-origin' })
   .then(
     response => {
      if (!response['ok']) {
       throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
      }
      return response['arrayBuffer']();
     }
   )
   .then(resolve)
   .catch(reject);
});
        """],
        'if (!wasmBinary && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(wasmBinaryFile) && !isFileURI(wasmBinaryFile) && !ENVIRONMENT_IS_NODE && typeof fetch == "function") {' :
         [1, 'if (!wasmBinary && typeof WebAssembly.instantiateStreaming === "function" && typeof fetch === "function"){']
    
    }
    index = 0
    def add(line, infile):
        nonlocal output
        for key, val in lines_to_delete.items():
            if line.strip() == key:
                for _ in range(val-1):
                    infile.readline()
                return
        for key, l in lines_to_replace.items():
            amount, replc = l
            if line.strip() == key:
                for _ in range(amount-1):
                    infile.readline()
                output += (replc + "\n")
                return
        else:
            output += line
            return

        

    # MAIN function here
    with open(inFilePath, "rt") as fin:
        print(f"writing from {inFilePath} to {outFilePath}")
        output += '/* eslint-disable */'
        for line in fin:
            add(line,fin)
    with open(outFilePath, 'wt') as fout:
        fout.write(output)

                    
if __name__ == "__main__":
    main()