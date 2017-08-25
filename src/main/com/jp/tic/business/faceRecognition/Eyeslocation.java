package com.jp.tic.business.faceRecognition;

import java.util.List;

import com.sun.jna.Structure;

public class Eyeslocation extends Structure{

	  public int xFirstEye;  //第一只眼睛的 x 坐标 
	 
	  public int yFirstEye;  //第一只眼睛的 y 坐标 
	 
	  public int xSecondEye;  //第二只眼睛的 x 坐标 
	 
	  public int ySecondEye;  //第二只眼睛的 y 坐标 
	 
	  public float confidence;  //脸的信度 
	 


      public static class ByReference extends Eyeslocation implements Structure.ByReference { }

      public static class ByValue extends Eyeslocation implements Structure.ByValue{ }

	@Override
	protected List getFieldOrder() {
		// TODO Auto-generated method stub
		return null;
	}


}

