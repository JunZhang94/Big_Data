package com.jp.tic.common.util;


public class RadixUtils
{
	/**
	全局变量，获取进制对应值
	*/
	private static char[] NumChar=new char[]{'0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'};
        private RadixUtils(){}
	/**
	十进制转二进制	
	*/
	public static String DecimalToBinary(int i)
	{
		return DecimalTransition(i,1,1);
	}
	/**
	十进制转八进制
	*/
	public static String DecimalToOctonary(int i)
	{
		return DecimalTransition(i,7,3);
	}
	/**
	十进制转十六进制
	 */
	public static String DecimalToHexadecimal(int i)
	{
		return DecimalTransition(i,15,4);
	}
	/**
	十进制转换方法
	*/
	private static String DecimalTransition(int i,int system,int offset)
	{
		if(i==0)
			return "0";
		char[] arr=new char[32];
		int len=arr.length;
		while(i!=0)
		{
			int temp=i&system;
			arr[--len]=NumChar[temp];
			i=i>>>offset;
		}
		String num="";
		for(;len<arr.length;len++)
		{
			num+=arr[len]+"";
		}
		return num;
	}
	/**
	二进制转十进制
	*/
	public static String BinaryToDecimal(String num)
	{
		return BinaryTransition(num,1);
	}
	/**
	二进制转八进制
	*/
	public static String BinaryToToOctonary(String num)
	{
		return BinaryTransition(num,3);
	}
	/**
	二进制转十六禁止
	*/
	public static String BinaryToHexa(String num)
	{
		return BinaryTransition(num,4);
	}
	/**
	二进制转换方法
	*/
	private static String BinaryTransition(String num,int system)
	{
		String result="";
		int temp=0;
		int sum=0;
		for(int i=0;i<num.length();i++)
		{
			int c=Integer.parseInt(num.substring(num.length()-i-1,num.length()-i));
			sum+=c*Power(2,temp);
			temp++;
			if(temp%system==0)
			{
				if(system==1)
				{
					sum=c*Power(2,i);
					result=(sum+Integer.parseInt(result==""?"0":result))+"";
				}else
				{
					result=NumChar[sum]+result;
				}
				sum=0;
				temp=0;
			}
		}
		return (sum==0?"":sum)+result;
	}
	/**
	二进制，八进制，十六进制。转换成十进制
	*/
	private static int TransitionToDecimal(String num,int system)
	{
		int sum=0;
		for(int i=0;i<num.length();i++)
		{
			char c=num.charAt(num.length()-i-1);
			int n=GetDecimalNum(c);
			sum+=n*Power(system,i);
		}
		return sum;
	}
	/**
	八进制转二进制
	*/
	public static String OctonaryToBinary(String num)
	{
		return DecimalTransition(TransitionToDecimal(num,8),1,1);
	}
	/**
	八进制转十进制
	*/
	public static int OctonaryToDecimal(String num)
	{
		return TransitionToDecimal(num,8);
	}
	/**
	八进制转十六进制
	*/
	public static String OctonaryToHexadecimal(String num)
	{
		return  DecimalTransition(TransitionToDecimal(num,8),15,4);
	}
	/**
	十六进制转二进制
	*/
	public static String HexadecimalToBinary(String num)
	{
		return DecimalTransition(TransitionToDecimal(num,16),1,1);
	}
	/**
	十六进制转十进制
	*/
	public static int HexadecimalToDecimal(String num)
	{
		return TransitionToDecimal(num,16);
	}
	/**
	十六进制转八进制
	*/
	public static String HexadecimalToOctonary(String num)
	{
		return  DecimalTransition(TransitionToDecimal(num,16),7,3);
	}
	/**
	查找数组索引
	*/
	private static int GetDecimalNum(char c)
	{
		for(int i=0;i<NumChar.length;i++)
		{
			if(NumChar[i]==c)
				return i;
		}
		return -1;
	}
	/**
	次方运算
	*/
	private static int Power(int i,int e)
	{
		if(e>=0)
			return Powers(i,e);
		else
			return 1/Powers(i,-e);//考虑小数点后面的时候使用
	}
    /**
    次方运算
    */
	private static int Powers(int i,int e)
	{
		if(e>0)
			return i*Power(i,e-1);
		else
			return 1;
	}
	
	/**
	 * 函数功能说明：十进制转二进制
	 * 创建者： suym
	 * 创建日期：  2013-10-18 下午01:32:00
	 * 修改者： 
	 * 修改日期：
	 * 修改内容
	 * @参数： @param strData
	 * @参数： @param length
	 * @参数： @return    
	 * @return   
	 * @throws Exception
	 */
	public static char[] convertBinary(final byte bytedata,final int sublength) {
		
		String strData=Integer.toBinaryString(bytedata);
		int datalength=strData.length();
		if(datalength<sublength)
		{
			for (int i = 0; i < sublength-datalength; i++) {
				strData="0"+strData;
			}
		}
		datalength=strData.length();
		String str=strData.substring(datalength-sublength, strData.length());
		return str.toCharArray();
    }
	
}