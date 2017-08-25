package com.jp.tic.common.util;

import java.util.Arrays;

import org.apache.commons.lang.math.IntRange;

/**
 * <b>function:</b> 数学函数工具类
 * @author hoojo
 * @createDate 2012-2-9 下午09:19:47
 * @file MathUtils.java
 * @package com.jp.tic.common.util
 * @version 1.0
 */
public abstract class MathUtils {

	/**
	 * <b>function:</b> 模拟闭合区间：返回lower-upper指定最小到最大且包含区间内的数值
	 * @author hoojo
	 * @createDate 2012-2-9 下午09:26:21
	 * @param num 当前的取值
	 * @param lower 最小区间值（包含该值）
	 * @param upper 最大区间值（包含该值）
	 * @return 返回在最小到最大区间（包含区间）中的一个合法值
	 */
	public static int clip(int num, int lower, int upper) {
		if (upper < lower) {
			throw new ArithmeticException("upper < lower");
		}
		if (num > upper) {
			return upper;
		}
		if (num < lower) {
			return lower;
		}
		return num;
	}

	/**
	 * <b>function:</b> 在当前min-max区间中取值，如果begin和end在当前区间中，就去begin-end的区间值；</br>
	 * 相反，如果end 大于 begin 则取end - begin的区间值；</br>
	 * 如果begin或end大于最大值，或小于最小值，则取最大上限或最小下限值；
	 * eg: 
	 * @author hoojo
	 * @createDate 2012-2-9 下午09:39:44
	 * @param min
	 * @param max
	 * @param begin
	 * @param end
	 * @return
	 */
	public static IntRange clip(int min, int max, int begin, int end) {
		if (min > max) {
			return null;
		}
		return new IntRange(clip(begin, min, max), clip(end, min, max));
	}

	/**
	 * <b>function:</b> 除尽就取商整数，未除尽就去商 + 1
	 * @author hoojo
	 * @createDate 2012-2-9 下午09:58:52
	 * @param dividend
	 * @param divisor
	 * @return 返回商 或 商 + 1
	 */
	public static int divCeil(int dividend, int divisor) {

		if (divisor == 0) {
			throw new ArithmeticException("divided by zero");
		}
		return dividend / divisor + (dividend % divisor == 0 ? 0 : 1);
	}

	public static long divCeilLong(long dividend, long divisor) {
		if (divisor == 0) {
			throw new ArithmeticException("divided by zero");
		}
		return dividend / divisor + (dividend % divisor == 0 ? 0 : 1);
	}
	
	public static boolean isAllZeroByArray(byte[] bytes)
	{
		if((Arrays.toString(bytes)).matches("^\\[(0,\\s)*0\\]$")){
			
			return true;
		}else
		{
			return false;
		}
	}

	public static void main(String[] args) {
		System.out.println(MathUtils.clip(1, 10, 22)); 	// 10 在最小区间外，取下限
		System.out.println(MathUtils.clip(12, 10, 22)); // 12 在区间内，取12
		System.out.println(MathUtils.clip(25, 10, 22)); // 25 在最大区间，取最大上限22
		
		System.out.println(MathUtils.clip(2, 7, 9, 2)); // 取end - max值，2-7
		System.out.println(MathUtils.clip(2, 7, 9, 3)); // 取end - max值，3-7
		System.out.println(MathUtils.clip(2, 7, 9, 12));// 取max - max值，7-7
		System.out.println(MathUtils.clip(3, 7, 1, 2));// 取min - min值，7-7
		System.out.println(MathUtils.clip(2, 7, 2, 5));// 取begin - end值，2-5
		
		
		System.out.println(divCeil(2, 6)); 	// 1page
		System.out.println(divCeil(11, 6)); // 2page
		System.out.println(divCeil(12, 6)); // 2page
		System.out.println(divCeil(13, 6));	// 3page
	}
	
	
	
}
