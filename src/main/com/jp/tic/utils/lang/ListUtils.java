package com.jp.tic.utils.lang;

import java.util.ArrayList;
import java.util.List;

/**
 * 
 * @author 梁石光
 * @datetime 2013-05-30
 */
public class ListUtils {
	/**
	 * 分割List
	 *
	 * @param list     待分割的list
	 * @param pageSize 每段list的大小
	 * @return List<<List<T>>
	 */
	public static <T> List<List<T>> splitList(List<T> list, int pageSize) {
		int listSize = list.size(); //list的大小
		int page = (listSize + (pageSize - 1)) / pageSize; //页数

		//创建list数组 ,用来保存分割后的list
		List<List<T>> listArray = new ArrayList<List<T>>();

		//按照数组大小遍历
		for (int i = 0; i < page; i++) {
			//数组每一位放入一个分割后的list
			List<T> subList = new ArrayList<T>();

			//遍历待分割的list
			for (int j = 0; j < listSize; j++) {
				//当前记录的页码(第几页)
				int pageIndex = ((j + 1) + (pageSize - 1)) / pageSize;

				//当前记录的页码等于要放入的页码时
				if (pageIndex == (i + 1)) {
					//放入list中的元素到分割后的list(subList)
					subList.add(list.get(j));
				}

				//当放满一页时退出当前循环
				if ((j + 1) == ((j + 1) * pageSize)) {
					break;
				}
			}
			//将分割后的list放入对应的数组的位中
			listArray.add(subList);
		}
		return listArray;
	}
}
