package com.jp.tic.common.net.http;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

public class HttpUrlClient {

	public String getHttpText(String urlString) {
		try {
			URL url = new URL(urlString);
			URLConnection huc = (URLConnection) url.openConnection();
			InputStream is = huc.getInputStream();
			
			BufferedReader br = new BufferedReader(new InputStreamReader(is));
			StringBuffer sb = new StringBuffer();
			String line = "";
			try {
				while ((line = br.readLine()) != null) {
					sb.append(line).append("\n");
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
			
			return sb.toString();
		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}
	
	public static void main(String[] args) {
		HttpUrlClient client=new HttpUrlClient();
		System.out.println(client.getHttpText("http://baidu.com"));
	}
}
