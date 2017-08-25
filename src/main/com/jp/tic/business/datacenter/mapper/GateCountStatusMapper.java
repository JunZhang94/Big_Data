package com.jp.tic.business.datacenter.mapper;

import java.util.List;
import java.util.Map;

public interface GateCountStatusMapper {
	public List<Map<String,Object>> findCount4GateTime(Map<String,Object> param);
	public List<Map<String,Object>> findCount4SenderTime(Map<String,Object> param);
	public List<Map<String,Object>> findCount4RecieverTime(Map<String,Object> param);
	
	public List<Map<String,Object>> sumCount4Gate(Map<String,Object> param);
	public List<Map<String,Object>> sumCount4Sender(Map<String,Object> param);
	public List<Map<String,Object>> sumCount4Reciever(Map<String,Object> param);
}
