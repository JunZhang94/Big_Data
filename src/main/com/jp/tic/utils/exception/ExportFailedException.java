package com.jp.tic.utils.exception;

/**
 * 导出失败异常
 * 
 * @author lsg
 * 
 */
public class ExportFailedException extends BaseInfoException {

    /**
     * 
     */
    private static final long serialVersionUID = -6180737137433598480L;


    @Override
	public String getMessage() {
        return "导出失败！";
	}
}
