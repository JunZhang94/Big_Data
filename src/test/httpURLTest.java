import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.Random;
import java.util.UUID;

import com.google.gson.JsonElement;
import com.google.gson.JsonParser;


public class httpURLTest {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		SimpleDateFormat formatter=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		String dateStr=formatter.format(new Date());
		System.out.println("dateStr========"+dateStr);
//		float interval=(float) 50.3348;
//		float result=(float) (Math.round(interval*100)/100.0);
//		String str=Math.round(interval*10)/10.0 + "%";
//		System.out.println("result========"+result+"/"+str);
//		String uuid = UUID.randomUUID().toString();
//		System.out.println("uuid========"+uuid);
//		String rowKey = uuid.substring(0,8)+uuid.substring(9,13)+uuid.substring(14,18)+uuid.substring(19,23)+uuid.substring(24);
//		System.out.println("rowKey========"+rowKey);
//		SimpleDateFormat format = new SimpleDateFormat("yyMMddhhmmss");
//		int rand = new Random().nextInt(1000);
//		System.out.println("rand========"+rand);
//		String numberName = format.format(new Date()) + rand;
//		System.out.println("numberName========"+numberName);
		//String uuid = UUID.randomUUID().toString();
//		int tt=(int)(Math.random()*100000);
//	//	System.out.println("uuid========"+tt);
//		Calendar cal = Calendar.getInstance(); 
//		Date currentTime = cal.getTime(); 
//		SimpleDateFormat sdFormat = new SimpleDateFormat("yyyyMMddHHmmssSSS"); 
//		String myTimeStr = sdFormat.format(currentTime);
//		int randNum=(int)(Math.random()*100000);
//		System.out.println("uuid========"+randNum);
//		String xxbh=myTimeStr+randNum;
//		System.out.println("xxbh========"+myTimeStr+"/"+xxbh);
		// TODO Auto-generated method stub
//		String httpUrl="http://127.0.0.1:8080/Image/4401008888888888884402010001/2015-11-19/11/0612377-440100888888888888-4402010001-01-绮312KL_01.jpg";
//		httpUrl="http://10.235.36.60:8088/Images1/4401008888888888884402010001/2015-11-19/10/4621877-440100888888888888-4402010001-01-晋AL1110_01.jpg";
//		HttpURLConnection conn;
//		try {
//			conn = (HttpURLConnection) new URL(httpUrl).openConnection();
//			int state = conn.getResponseCode();
//			System.out.println("state====="+state);
//		} catch (MalformedURLException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
	}

}
