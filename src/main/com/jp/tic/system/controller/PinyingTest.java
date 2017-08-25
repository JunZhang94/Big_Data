package com.jp.tic.system.controller;

import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.HanyuPinyinVCharType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;

public class PinyingTest {

	public static void main(String[] args) {
		try {
			
			String s1 = "我是中国人"; 
			  String s2 = "imchinese"; 
			  String s3 = "im中国人"; 
			  String s4 = "A中国人"; 
			  System.out.println(s1 + ":" + new String(s1).length()); 
			  System.out.println(s2 + ":" + new String(s2).length()); 
			  System.out.println(s3 + ":" + new String(s3).length()); 
			  System.out.println((s1.getBytes().length == s1.length()) ? "s1无汉字" 
			    : "s1有汉字"); 
			  System.out.println((s2.getBytes().length == s2.length()) ? "s2无汉字" 
			    : "s2有汉字"); 
			  System.out.println((s3.getBytes().length == s3.length()) ? "s3无汉字" 
			    : "s3有汉字"); 
			  System.out.println((s4.getBytes().length == s4.length()) ? "s4无汉字" 
					    : "s4有汉字"); 

			/*String str = "长沙市长";
			
			String pinyin = PinyinUtil.converterToSpell(str);    
			System.out.println(str+" pin yin ："+pinyin);    
			
			pinyin = PinyinUtil.converterToFirstSpell(str);
			System.out.println(str + " short pin yin ：" + pinyin);*/

			// System.out.println(converterEname("张1")); //带音调输出：zhāng
			// System.out.println(converterfirstStr("你是张1吗？"));//只取首字母

		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// 将所有汉字转换成全拼音输出
	public static String converterEname(String name)
			throws BadHanyuPinyinOutputFormatCombination {
		StringBuilder succeedPinyin = new StringBuilder();
		HanyuPinyinOutputFormat pin = new HanyuPinyinOutputFormat();
		pin.setCaseType(HanyuPinyinCaseType.UPPERCASE);// 大小写输出
		// 如果不想要音调 删除就行
		pin.setToneType(HanyuPinyinToneType.WITH_TONE_MARK);// 音调设置
		pin.setVCharType(HanyuPinyinVCharType.WITH_U_UNICODE);// 音调
		char[] ar = name.toCharArray();
		for (int i = 0; i < ar.length; i++) {
			String[] a = PinyinHelper.toHanyuPinyinStringArray(ar[i], pin);
			if (null != a)
				succeedPinyin.append(a[0]);
			else
				succeedPinyin.append(ar[i]);
		}
		return succeedPinyin.toString();
	}

	// 只取首字母
	public static String converterfirstStr(String str) {
		StringBuilder succeedPinyin = new StringBuilder();
		for (int i = 0; i < str.length(); i++) {
			char ch = str.charAt(i);
			String[] pinyins = PinyinHelper.toHanyuPinyinStringArray(ch);
			if (null != pinyins)
				succeedPinyin.append(String.valueOf(pinyins[0].charAt(0)));
			else
				succeedPinyin.append(ch);
		}
		return succeedPinyin.toString();
	}

}
