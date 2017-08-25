package com.jp.tic.net.tcpserver;

import java.util.Date;

public class BaseProtocolMeta {
	private String clientIp;
	private int clientPort;
	private Date connectTime;
	
	
	private boolean headValidated=false;
	private boolean tailValidated=false;
	private boolean isInValid=false;
	
	public String getClientIp() {
		return clientIp;
	}
	public void setClientIp(String clientIp) {
		this.clientIp = clientIp;
	}
	public int getClientPort() {
		return clientPort;
	}
	public void setClientPort(int clientPort) {
		this.clientPort = clientPort;
	}
	public Date getConnectTime() {
		return connectTime;
	}
	public void setConnectTime(Date connectTime) {
		this.connectTime = connectTime;
	}
	public boolean isInValid() {
		return isInValid;
	}
	public void setInValid(boolean isInValid) {
		this.isInValid = isInValid;
	}
	public boolean isHeadValidated() {
		return headValidated;
	}
	public void setHeadValidated(boolean headValidated) {
		this.headValidated = headValidated;
	}
	public boolean isTailValidated() {
		return tailValidated;
	}
	public void setTailValidated(boolean tailValidated) {
		this.tailValidated = tailValidated;
	}
	
	
}
