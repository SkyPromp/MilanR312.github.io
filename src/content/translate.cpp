
#include <bitset>
#include <string>
#include <iostream>
#include <assert.h>
#include <emscripten/bind.h>



using namespace emscripten;
std::string toInt(double a, int exp, int mantissa){
    std::string temp;

    std::string output;

    uint64_t * p = reinterpret_cast<uint64_t*>(&a);
    std::bitset<64> x(*p);
    std::cout << x << std::endl;

    output = (x >> 63) == 1 ? '1' : '0';


    auto reduceExponent = [&x](int exp){
        std::string temp;
        temp = (x << 1 >> 53).to_string().substr(53,11); //get only the exponent part and put it in a string
        int32_t val = std::stoi(temp,nullptr,2) - 1023;
        int32_t offset = (1 << (exp - 1)) - 1;
        assert(val+offset < (1 << exp));
        std::bitset<32> e(val + offset);
        temp = e.to_string().substr(32-exp, 32);
        return temp;
    };

    temp = reduceExponent(exp);
    std::cout << temp << std::endl;
    output += temp;
    temp = ((x<<12 >>12 >> 53 - mantissa - 1).to_string().substr(53 - mantissa - 1 + 12,53));
    std::cout << temp << std::endl;
    output += temp;
    std::cout << output << std::endl;
    return output;
} 

EMSCRIPTEN_BINDINGS(Module){
    function("toInt", &toInt);
}
