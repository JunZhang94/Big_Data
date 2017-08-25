package com.jp.tic.business;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JsonConfig;

import org.junit.Test;

import com.jp.tic.base.tester.BaseTest;
import com.jp.tic.utils.jsonUtil.JsonUtil;
import com.jp.tic.utils.lang.StringUtil;

public class ObjectToJsonTest extends BaseTest {

	@Test
	public void testQueryInfo() {
		List<Map<String, String>> datas = new ArrayList<Map<String,String>>();
		Map<String, String> dataMap1 = new HashMap<String, String>();
		dataMap1.put("HPHM", "粤A12341");
		dataMap1.put("KKMC", "石新路潮山村路段");
		dataMap1.put("KKBH", "440183203790015500");
		dataMap1.put("JGSJ", "2015-10-29 12:23:15");
		dataMap1.put("CLLXMC", "别克");
		dataMap1.put("clsd", "100");
		dataMap1.put("TX1", "http://localhost:8080/a/1.JPG");
		Map<String, String> dataMap2 = new HashMap<String, String>();
		dataMap2.put("HPHM", "粤A12342");
		dataMap2.put("KKMC", "石新路潮山村路段");
		dataMap2.put("KKBH", "440183203790015500");
		dataMap2.put("JGSJ", "2015-10-29 12:23:15");
		dataMap2.put("CLLXMC", "别克");
		dataMap2.put("clsd", "100");
		dataMap2.put("TX1", "http://localhost:8080/a/2.JPG");
		Map<String, String> dataMap3 = new HashMap<String, String>();
		dataMap3.put("HPHM", "粤A12343");
		dataMap3.put("KKMC", "石新路潮山村路段");
		dataMap3.put("KKBH", "440183203790015500");
		dataMap3.put("JGSJ", "2015-10-29 12:23:15");
		dataMap3.put("CLLXMC", "别克");
		dataMap3.put("clsd", "100");
		dataMap3.put("TX1", "http://localhost:8080/a/3.JPG");
		Map<String, String> dataMap4 = new HashMap<String, String>();
		dataMap4.put("HPHM", "粤A12344");
		dataMap4.put("KKMC", "石新路潮山村路段");
		dataMap4.put("KKBH", "440183203790015500");
		dataMap4.put("JGSJ", "2015-10-29 12:23:15");
		dataMap4.put("CLLXMC", "别克");
		dataMap4.put("clsd", "100");
		dataMap4.put("TX1", "http://localhost:8080/a/4.JPG");
		Map<String, String> dataMap5 = new HashMap<String, String>();
		dataMap5.put("HPHM", "粤A12341");
		dataMap5.put("KKMC", "石新路潮山村路段");
		dataMap5.put("KKBH", "440183203790015500");
		dataMap5.put("JGSJ", "2015-10-29 12:23:15");
		dataMap5.put("CLLXMC", "别克");
		dataMap5.put("clsd", "100");
		dataMap5.put("TX1", "http://localhost:8080/a/1.JPG");
		Map<String, String> dataMap6 = new HashMap<String, String>();
		dataMap6.put("HPHM", "粤A12342");
		dataMap6.put("KKMC", "石新路潮山村路段");
		dataMap6.put("KKBH", "440183203790015500");
		dataMap6.put("JGSJ", "2015-10-29 12:23:15");
		dataMap6.put("CLLXMC", "别克");
		dataMap6.put("clsd", "100");
		dataMap6.put("TX1", "http://localhost:8080/a/2.JPG");
		Map<String, String> dataMap7 = new HashMap<String, String>();
		dataMap7.put("HPHM", "粤A12343");
		dataMap7.put("KKMC", "石新路潮山村路段");
		dataMap7.put("KKBH", "440183203790015500");
		dataMap7.put("JGSJ", "2015-10-29 12:23:15");
		dataMap7.put("CLLXMC", "别克");
		dataMap7.put("clsd", "100");
		dataMap7.put("TX1", "http://localhost:8080/a/3.JPG");
		Map<String, String> dataMap8 = new HashMap<String, String>();
		dataMap8.put("HPHM", "粤A12344");
		dataMap8.put("KKMC", "石新路潮山村路段");
		dataMap8.put("KKBH", "440183203790015500");
		dataMap8.put("JGSJ", "2015-10-29 12:23:15");
		dataMap8.put("CLLXMC", "别克");
		dataMap8.put("clsd", "100");
		dataMap8.put("TX1", "http://localhost:8080/a/4.JPG");
		Map<String, String> dataMap9 = new HashMap<String, String>();
		dataMap9.put("HPHM", "粤A12341");
		dataMap9.put("KKMC", "石新路潮山村路段");
		dataMap9.put("KKBH", "440183203790015500");
		dataMap9.put("JGSJ", "2015-10-29 12:23:15");
		dataMap9.put("CLLXMC", "别克");
		dataMap9.put("clsd", "100");
		dataMap9.put("TX1", "http://localhost:8080/a/1.JPG");
		Map<String, String> dataMap10 = new HashMap<String, String>();
		dataMap10.put("HPHM", "粤A12342");
		dataMap10.put("KKMC", "石新路潮山村路段");
		dataMap10.put("KKBH", "440183203790015500");
		dataMap10.put("JGSJ", "2015-10-29 12:23:15");
		dataMap10.put("CLLXMC", "别克");
		dataMap10.put("clsd", "100");
		dataMap10.put("TX1", "http://localhost:8080/a/2.JPG");
		Map<String, String> dataMap11 = new HashMap<String, String>();
		dataMap11.put("HPHM", "粤A12343");
		dataMap11.put("KKMC", "石新路潮山村路段");
		dataMap11.put("KKBH", "440183203790015500");
		dataMap11.put("JGSJ", "2015-10-29 12:23:15");
		dataMap11.put("CLLXMC", "别克");
		dataMap11.put("clsd", "100");
		dataMap11.put("TX1", "http://localhost:8080/a/3.JPG");
		Map<String, String> dataMap12 = new HashMap<String, String>();
		dataMap12.put("HPHM", "粤A12344");
		dataMap12.put("KKMC", "石新路潮山村路段");
		dataMap12.put("KKBH", "440183203790015500");
		dataMap12.put("JGSJ", "2015-10-29 12:23:15");
		dataMap12.put("CLLXMC", "别克");
		dataMap12.put("clsd", "100");
		dataMap12.put("TX1", "http://localhost:8080/a/4.JPG");
		datas.add(dataMap1);
		datas.add(dataMap2);
		datas.add(dataMap3);
		datas.add(dataMap4);
		datas.add(dataMap5);
		datas.add(dataMap6);
		datas.add(dataMap7);
		datas.add(dataMap8);
		datas.add(dataMap9);
		datas.add(dataMap10);
		datas.add(dataMap11);
		datas.add(dataMap12);
		
		String recordStr = "";
		Map<String, String> dealMap = new HashMap<String, String>();
		int interval = 4;
		int imgFlag = 0;
		List<Map<String, String>> results = new ArrayList<Map<String,String>>();
		for (int i = 0; i < datas.size(); i++) {
			recordStr = "";
			imgFlag += 1;
			if (StringUtil.checkStr(recordStr)) {
				recordStr += ",";
			}
			recordStr += datas.get(i).get("TX1") + ",";
			recordStr += datas.get(i).get("HPHM") + ",";
			recordStr += datas.get(i).get("JGSJ") + ",";
			recordStr += datas.get(i).get("CLLXMC") + ",";
			recordStr += datas.get(i).get("KKMC") + ",";
			recordStr += datas.get(i).get("KKBH") + ",";
			recordStr += datas.get(i).get("clsd");
			dealMap.put("TX" + imgFlag, recordStr);
			if (i != 0 && (i + 1)%interval == 0) {
				imgFlag = 0;
				results.add(dealMap);
				dealMap = new HashMap<String, String>();
			}
		}
		results.add(dealMap);
		JsonConfig jsonConfig = new JsonConfig();
		String jsonStr = JsonUtil.objToJson(results);
		System.out.println("=======================" + jsonStr);
	}
}
