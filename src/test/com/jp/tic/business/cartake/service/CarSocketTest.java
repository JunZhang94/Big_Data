package com.jp.tic.business.cartake.service;

import com.jp.tic.app.carSearch.util.ImageUtils;

public class CarSocketTest {

	public static void main(String[] args) {
		ImageUtils utils2 = new ImageUtils("172.31.108.116", 8080, "梁石光的测试数据...");
		System.out.println("开始调用打开图片识别服务");
		//utils2.sendMessage();
		System.out.println("结束调用打开图片识别服务，并开始调用打开服务返回的请求数据");
		String responseStr = utils2.getMessageTwo();
		System.out.println("结束调用打开服务返回的请求数据:" + responseStr);
	}
}
