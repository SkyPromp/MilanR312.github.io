build: translate.mjs
	python test.py $^ $^ /$(basename $^).wasm $(basename $^).wasm
	echo "done"

EMFLAGS= -D Build -Os -g1 -s WASM=1 -s MALLOC=emmalloc -s ALLOW_MEMORY_GROWTH -s EXPORT_ES6=1 -s MODULARIZE=1 --bind

translate.mjs: %.mjs: %.cpp
	echo "start build"
#emcmdprompt.bat do this manually
	em++ $< $(EMFLAGS) -o $@ -std=c++11

EXEC := test.exe
debug: $(EXEC)
	$^
	del $^

$(EXEC): translate.cpp
	g++ -o $@ $^

