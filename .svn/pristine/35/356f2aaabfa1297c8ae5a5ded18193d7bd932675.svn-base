package com.jp.tic.analyze.util;

/** 
 * @Description TODO
 * @author ming.xin
 * @date 2016年10月14日 上午9:28:01  
 */
public class SimMatch {
	
	public static int seemoMatchInit(boolean beta_swith) {
		int i = -1;
		try {
			i = MyLibrary.INSTANCE.seemo_match_init(true);
		} catch (Exception ex) {
			System.out.println(ex.getMessage());
			ex.printStackTrace();
		}
		return i;
	}
	
	public static int Seemo_SimilarMatch(byte[] bs, byte[] bs2, float[] score, float[] pRoi) {
        return MyLibrary.INSTANCE.seemo_vehicle_match(bs, bs.length, bs2, bs2.length, score, pRoi);
    }
}
