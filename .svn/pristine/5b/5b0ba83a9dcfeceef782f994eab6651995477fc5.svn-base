package com.jp.tic.common.service;

import javax.activation.DataHandler;
import javax.jws.WebService;

import com.jp.tic.common.enums.UploadState;

/**
 * <b>function:</b> 远程上传文件WebService服务类
 * @author hoojo
 * @createDate 2013-1-3 下午02:55:02
 * @file RemoteUploadService.java
 * @package com.jp.tic.common.service
 * @project SHMB
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
@WebService
public interface RemoteUploadService {

	/**
	 * <b>function:</b> 上传文件，文件文件传输器
	 * @author hoojo
	 * @createDate 2013-1-3 下午02:56:22
	 * @param handler 文件传输器
	 * @param fileName 文件名称
	 * @return 返回文件上传结果 #{@link UploadState}
	 * @throws Exception
	 */
	public UploadState uploadFile(DataHandler handler, String fileName) throws Exception;
}
