package com.jp.tic.business.cartake.service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import com.jp.tic.base.tester.BaseTest;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.utils.lang.StringUtil;

public class DealProcTest extends BaseTest {
	
	public static void main(String[] args) {
		System.out.println("++++++++++++++++++++++++++++++");
		List<CarTake> resultDatas = new ArrayList<CarTake>();
		List<CarTake> filteDatas = new ArrayList<CarTake>();
		CarTake carTake = new CarTake();
		carTake.setWfzt("62.1235%");
		CarTake carTake1 = new CarTake();
		carTake1.setWfzt("83.33325%");
		CarTake carTake2 = new CarTake();
		carTake2.setWfzt("84.5653%");
		CarTake carTake3 = new CarTake();
		carTake3.setWfzt("100.0%");
		CarTake carTake4 = new CarTake();
		carTake4.setWfzt("72.2335%");
		filteDatas.add(carTake);
		filteDatas.add(carTake1);
		filteDatas.add(carTake2);
		filteDatas.add(carTake3);
		filteDatas.add(carTake4);
		Collections.sort(filteDatas, new Comparator<CarTake>() {
			public int compare(CarTake item1, CarTake item2) {
				return item2.getWfzt().replace("%", "").compareTo(item1.getWfzt().replace("%", ""));
			}
		});
		if (StringUtil.equals(filteDatas.get(filteDatas.size() - 1).getWfzt(), "100.0%")) {
			resultDatas.add(filteDatas.get(filteDatas.size() - 1));
			filteDatas.remove(filteDatas.get(filteDatas.size() - 1));
		}
		resultDatas.addAll(filteDatas);
		for (CarTake take : resultDatas) {
			System.out.println(take.getWfzt());
		}
		//DealWithMethod method = new DealWithMethod();
		System.out.println("==============================");
	}

}
