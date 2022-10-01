
#include <bitset>
#include <string>
#include <iostream>
#include <assert.h>
#include <math.h>
#include <algorithm>


#ifdef Build
#include <emscripten/bind.h>
using namespace emscripten;
#define print(text,val)
#else
#define print(text, val) std::cout << text << " = " << val << std::endl;
#endif

std::string IntToInt(double inp, uint16_t decimals){
    std::string out;
    int index = 0;
    uint64_t tmp = 1;
    double val = inp;
    // gets the largest exponent wich is still smaller than the input
    while ((double) (tmp << index) < inp){++index;};
    print("largest exponent",index);
    index--;
    for (index; index >= -decimals; index--){
        double current = val - pow(2,index);
        if (current >= 0.0){
            val = current;
            out += '1';
        } else {
            out += '0';
        }
        if (index == 0) out += '.';
    }
    return out;
}

std::string FloatToInt(double a, int exp, int mantissa){
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

std::string AppleToInt(double a, int exp, int mantissa){
    std::string out;
    out = (a > 0) ? "0" : "1";
    double b = abs(a);
    int n = 1;
    do {
        n++;
    } while (1<<n < b);
    print("n",n);
    assert(mantissa+exp< 64);
    std::string d = IntToInt(b,64);
    print("d",d);
    //remove decimal and pad
    for (size_t i = 0; i < mantissa+1; i++){
        print("d[i", d[i]);
        if (d[i] == '.'){
            continue;
        }
        out += d[i];
    }
    //add offset to exp
    n += 1<<(exp-1);
    out += IntToInt(n,0);
    //remove last decimal
    out.pop_back();
    return out;
}

#ifdef Build
EMSCRIPTEN_BINDINGS(Module){
    function("IntToInt", &IntToInt);
    function("FloatToInt", &FloatToInt);
    function("AppleToInt", &AppleToInt);
}
#else
int main(){
    AppleToInt(-23.75,8,15);
    //AppleToInt(200,10,10);
    //coo
}
#endif
