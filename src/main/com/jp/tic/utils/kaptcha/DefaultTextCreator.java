package com.jp.tic.utils.kaptcha;

import java.util.Random;

import com.google.code.kaptcha.text.TextProducer;
import com.google.code.kaptcha.util.Configurable;

/**
 * 随机获取指定长度的字符串，必须包含数值和字母，且字母数值间隔
 * @author 梁石光
 * @datetime 2013-05-30
 */
public class DefaultTextCreator extends Configurable implements TextProducer {
	public String getText() {
		int length = getConfig().getTextProducerCharLength();

		Random rand = new Random();
		StringBuffer text = new StringBuffer();

		for (int i = 0; i < length; ++i) {
			if (i % 2 == 1) { //偶数位生产随机整数
				text.append(rand.nextInt(10));
			} else { //奇数产生随机字母包括大小写
				int temp = rand.nextInt(52);
				char x = (char) (temp < 26 ? temp + 97 : (temp % 26) + 65);
				text.append(x);
			}
		}
		return text.toString();
	}
}
