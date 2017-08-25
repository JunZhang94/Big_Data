package com.jp.tic.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.googlecode.jsonplugin.JSONUtil;



/**
 * 与客户端返回json数据的接口，把需要的java数据放到data字段中，默认core会序列化到json字符串
 * 
 * @author Abe
 *
 */
public class SuccessJSONResult {
	
	private static final Logger log = LoggerFactory.getLogger(SuccessJSONResult.class);
	
	private int code;
	private String message;
	private boolean success = true;
	private Object data;
	private boolean needAlert = true;
	
	private List<Pattern> includeProperties;
    private List<Pattern> excludeProperties;
    private boolean ignoreHierarchy = true;
    private boolean enumAsBean = false;
    private boolean excludeNullProperties = false;
	public Object getData() {
		return data;
	}
	/**
	 * 把需要的java数据放到jsonResult中，默认core会序列化到json字符串
	 * @param data
	 */
	public void setData(Object data) {
		this.data = data;
	}
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public boolean isSuccess() {
		return success;
	}
	public void setSuccess(boolean success) {
		this.success = success;
	}
	public boolean isNeedAlert() {
		return needAlert;
	}
	/**
	 * 设置ui是否弹出窗
	 * @param needAlert
	 */
	public void setNeedAlert(boolean needAlert) {
		this.needAlert = needAlert;
	}
	public List<Pattern> getIncludeProperties() {
		return includeProperties;
	}
	/**
	 * 
	 * @param commaDelim
	 */
	public void setIncludeProperties(String commaDelim) {
		 List<String> includePatterns = JSONUtil.asList(commaDelim);
	        if (includePatterns != null) {
	            this.includeProperties = new ArrayList<Pattern>(includePatterns.size());

	            HashMap existingPatterns = new HashMap();

	            for (String pattern : includePatterns) {
	                // Compile a pattern for each *unique* "level" of the object
	                // hierarchy specified in the regex.
	                String[] patternPieces = pattern.split("\\\\\\.");

	                String patternExpr = "";
	                for (String patternPiece : patternPieces) {
	                    if (patternExpr.length() > 0) {
	                        patternExpr += "\\.";
	                    }
	                    patternExpr += patternPiece;

	                    // Check for duplicate patterns so that there is no overlap.
	                    if (!existingPatterns.containsKey(patternExpr)) {
	                        existingPatterns.put(patternExpr, patternExpr);

	                        // Add a pattern that does not have the indexed property matching (ie. list\[\d+\] becomes list).
	                        if (patternPiece.endsWith("\\]")) {
	                            this.includeProperties.add(Pattern.compile(patternExpr.substring(0, patternPiece.lastIndexOf("\\["))));

	                            if (log.isDebugEnabled())
	                                log.debug("Adding include property expression:  " + patternExpr.substring(0, patternPiece.lastIndexOf("\\[")));
	                        }

	                        this.includeProperties.add(Pattern.compile(patternExpr));

	                        if (log.isDebugEnabled())
	                            log.debug("Adding include property expression:  " + patternExpr);
	                    }
	                }
	            }
	        }
	}
	public List<Pattern> getExcludeProperties() {
		return excludeProperties;
	}
	/**
	 * 
	 * @param commaDelim
	 */
	public void setExcludeProperties(String commaDelim) {
		 List<String> excludePatterns = JSONUtil.asList(commaDelim);
	        if (excludePatterns != null) {
	            this.excludeProperties = new ArrayList<Pattern>(excludePatterns.size());
	            for (String pattern : excludePatterns) {
	                this.excludeProperties.add(Pattern.compile(pattern));
	            }
	        }
	}
	public boolean isIgnoreHierarchy() {
		return ignoreHierarchy;
	}
	public void setIgnoreHierarchy(boolean ignoreHierarchy) {
		this.ignoreHierarchy = ignoreHierarchy;
	}
	public boolean isEnumAsBean() {
		return enumAsBean;
	}
	public void setEnumAsBean(boolean enumAsBean) {
		this.enumAsBean = enumAsBean;
	}
	public boolean isExcludeNullProperties() {
		return excludeNullProperties;
	}
	public void setExcludeNullProperties(boolean excludeNullProperties) {
		this.excludeNullProperties = excludeNullProperties;
	}
	public void setIncludeProperties(List<Pattern> includeProperties) {
		this.includeProperties = includeProperties;
	}
	public void setExcludeProperties(List<Pattern> excludeProperties) {
		this.excludeProperties = excludeProperties;
	}
}
