package com.jp.tic.common.service.impl;

import javax.activation.DataHandler;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.jp.tic.common.enums.UploadState;
import com.jp.tic.common.service.RemoteUploadService;
import com.jp.tic.common.util.UploadFileUtils;
import com.jp.tic.framework.service.impl.AbstractService;

/**
 * <b>function:</b> 远程文件上传WebService服务类
 * @author hoojo
 * @createDate 2013-1-3 下午03:02:09
 * @file RemoteUploadServiceImpl.java
 * @package com.jp.tic.common.service.impl
 * @project SHMB
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
@Service
public class RemoteUploadServiceImpl extends AbstractService implements RemoteUploadService {

	@Value("#{systemConfig['remote.upload.path']}")
	private String path;
	
	public UploadState uploadFile(DataHandler handler, String fileName) throws Exception {
		trace("upload file save path: {}", path);
		UploadState state = UploadFileUtils.upload4Stream(fileName, path, handler.getInputStream());
		
		trace("uploadState: {}", state);
		return state;
	}
}
