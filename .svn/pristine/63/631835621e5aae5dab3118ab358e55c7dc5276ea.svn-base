package com.jp.tic.analyze.entity;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;

import com.jp.tic.system.entity.CarTake;

@RunWith(JUnit4.class)
public class PageEntityTest {
	@Test
	public void testBase(){
		PageEntity page=new PageEntity();
		System.out.println("init>>>"+page);
		
		List<CarTake> takes=new ArrayList<CarTake>();
		for(int i=0;i<91;i++){
			CarTake take=new CarTake();
			take.setId("id"+i);
			takes.add(take);
		}
		
		page.addQueryResult(takes);
		System.out.println("firstResult>>>"+page);
		
		page.goLast();
		System.out.println("last>>>"+page+"<<<last");
		
		page.goNext();
		System.out.println("next>>>"+page+"<<<next");
		
		page.goNext();
		System.out.println("next2>>>"+page+"<<<next2");
	}
}
