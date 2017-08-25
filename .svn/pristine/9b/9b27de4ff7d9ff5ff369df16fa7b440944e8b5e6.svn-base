package com.jp.tic.common.modal;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

public class IRunnerFactory {
	public static IRunner getRunner(final Object runner,final String methodName){
		return new IRunner() {
			
			@Override
			public boolean run() {
				try {
					Method method = runner.getClass().getMethod(methodName, null);
					method.invoke(runner, null);
					return true;
				} catch (SecurityException e) {
					e.printStackTrace();
				} catch (NoSuchMethodException e) {
					e.printStackTrace();
				} catch (IllegalArgumentException e) {
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				} catch (InvocationTargetException e) {
					e.printStackTrace();
				}
				return false;
			}
		};
	}
}
