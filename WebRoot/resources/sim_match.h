#ifndef SEEMO_SIM_MATCH_LIB_H
#define SEEMO_SIM_MATCH_LIB_H
#include <cstdlib>

#ifdef WIN32
#ifdef SEEMO_SIM_MATCH_EXPORTS
#define SEEMO_SIM_MATCH_API __declspec(dllexport)
#else
#define SEEMO_SIM_MATCH_API __declspec(dllimport)
#endif
#else
#ifdef SEEMO_SIM_MATCH_EXPORTS
#define SEEMO_SIM_MATCH_API __attribute__((visibility("default")))
#else
#define SEEMO_SIM_MATCH_API
#endif
#define __stdcall
#endif 

extern "C"
{
    // 初始化  是否启用beta方案，默认开启
    SEEMO_SIM_MATCH_API long __stdcall seemo_match_init(bool beta_swith);
    
    // 计算相似度
    SEEMO_SIM_MATCH_API long __stdcall seemo_vehicle_match(
            const char* feature_src,
            int feature_src_len,
            const char* feature_to,
            int feature_to_len,
            float& score,
            float* proi=NULL); 
}
#endif
