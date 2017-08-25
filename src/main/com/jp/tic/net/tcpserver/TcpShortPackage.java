package com.jp.tic.net.tcpserver;

public class TcpShortPackage {
	private byte[] data;
	private Object protocolMeta;
	
	public byte[] getData() {
		return data;
	}
	public void setData(byte[] data) {
		this.data = data;
	}
	public Object getProtocolMeta() {
		return protocolMeta;
	}
	public void setProtocolMeta(Object protocolMeta) {
		this.protocolMeta = protocolMeta;
	}
}
