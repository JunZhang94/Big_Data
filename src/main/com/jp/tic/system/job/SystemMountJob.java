package com.jp.tic.system.job;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.jp.tic.analyze.service.CarTakeService;
import com.jp.tic.analyze.service.ChartStatusService;
import com.jp.tic.analyze.service.DataTimelyService;
import com.jp.tic.analyze.service.DeckCarAnalysisService;
import com.jp.tic.analyze.service.MountOnlineService;
import com.jp.tic.business.datacenter.service.DataStatisticsService;
import com.jp.tic.business.datacenter.service.FakeCarNumService;
import com.jp.tic.system.entity.CarTake;
import com.jp.tic.system.service.OrganizationService;

public class SystemMountJob {
	
	@Autowired
	ChartStatusService chartStatusService;
	@Autowired
	MountOnlineService mountOnlineService;
	@Autowired
	OrganizationService organizationService;
	@Autowired
	private CarTakeService takeService;
	@Autowired
	private FakeCarNumService fakeCarNumService;
	@Autowired
	private DeckCarAnalysisService deckCarAnalysisService;
	@Autowired
	private DataStatisticsService dataStatisticsService;
	@Autowired
	private DataTimelyService dataTimelyService;
	
	private final Logger logger = LoggerFactory.getLogger(getClass());

	public void myJobTest() {
		System.out.println("=======================================================");
	}
	
	/**
	 * 制造过车统计状态表假数据
	 */
	public void loadDisMountDatas() {
		try {
            logger.info("过车记录状态数据制造开始！");
            this.chartStatusService.makeDisMountDatas();
            logger.info("过车记录状态数据制造结束！");
        } finally {
         
        }
	}
	
	/**
	 * 统计卡口在线状态和数据接收状态数据
	 */
	public void statisticsMountTrendDatas() {
		try {
            logger.info("卡口在线状态和数据接收状态数据按时统计开始！");
            this.chartStatusService.statisticsCharStatusProc();
            logger.info("卡口在线状态和数据接收状态数据按时统计结束！");
        } finally {
         
        }
	}
	
	/**
	 * 统计卡口在线状态和数据接收状态数据,按天统计
	 */
	public void statisticsMountDayTrendDatas() {
		try {
            logger.info("卡口在线状态和数据接收状态数据按天统计开始！");
            this.chartStatusService.statisticsCharStatusDayProc();
            logger.info("卡口在线状态和数据接收状态数据按天统计结束！");
        } finally {
         
        }
	}
	public void updateMountStatusFromHbase() throws Exception{
		List<Map<String, String>> kkbhList=organizationService.findOnlineMountInfo(null);
		List<String> mounts=new ArrayList<String>();
		for(Map<String, String> kkbh:kkbhList){
			mounts.add(kkbh.get("KKBH"));
		}
		Calendar cal=Calendar.getInstance();
		Date now = cal.getTime();
		cal.add(Calendar.MINUTE, -5);
		Date fiveMinuteBefore = cal.getTime();
		cal.add(Calendar.MINUTE, -25);
		Date thirtyMinuteBefore = cal.getTime();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		/*Map<String,String> param = new HashMap<String, String>();
		param.put("orgType", "1");*/
		//List<String> kkbhs = new ArrayList<String>();
		List<String> sqlList= new ArrayList<String>();
		
			//kkbhs.add(kkbh.get("KKBH"));
			//List<Map<String, String>> result=mountOnlineService.mountOnlienStatusInfo(kkbhList.get(i), param);
		List<CarTake> result = takeService.getMountSnapshot(mounts, null, now, 1);
			//String JGSJSTR=result.get(0).get("JGSJ").equals("")?"":result.get(0).get("JGSJ");
		for(int i=0;i<result.size();i++){
			int flag=result.get(i).getJgsj().before(thirtyMinuteBefore)?0:1;
			String insertStr="insert into dis_gate_time_status(kkbh,start_time,end_time,status,jgsj) values('"+
			result.get(i).getKkbh()+"',to_date('"+sdf.format(fiveMinuteBefore)+"','yyyy-MM-dd HH24:mi:ss'),to_date('"+sdf.format(now)+"','yyyy-MM-dd HH24:mi:ss'),'"+flag+"',"+
			"to_date('"+sdf.format(result.get(i).getJgsj())+"','yyyy-MM-dd HH24:mi:ss'))";
			/*String sql = "update dis_gate_time_status set start_time=to_date('"+fiveMinuteBeforeStr+"','yyyy-MM-dd HH24:mi:ss'),end_time=to_date('"+nowStr+"','yyyy-MM-dd HH24:mi:ss')" +
					",status='"+result.get(0).get("ONLINE_STATUS")+"',jgsj=to_date('"+result.get(0).get("JGSJ")+"','yyyy-MM-dd HH24:mi:ss') where kkbh='"+kkbhList.get(i).get("KKBH")+
					"' and end_time>tod_date('"+fiveMinuteBeforeStr+"')";*/
			sqlList.add(insertStr);
		}
		mountOnlineService.updatesql(sqlList);
		
	}
	
	/**
	 * 假牌车分析
	 */
	public void fakeCarNumStatistics() {
        logger.info("假牌车统计分析开始！");
        try {
			this.fakeCarNumService.fakeCarNumStatistics_two();
		} catch (Exception e) {
			e.printStackTrace();
		}
        logger.info("假牌车统计分析结束！");
	}
	
	/**
	 * 通过Hbase时时统计卡口在线状态，统计上一个小时的数据
	 */
	public void mountStatusStatistics() {
        logger.info("卡口在线状态统计分析开始！");
        try {
			this.mountOnlineService.addMountsStatusInfo();
		} catch (Exception e) {
			e.printStackTrace();
		}
        logger.info("卡口在线状态统分析结束！");
	}
	
	/**
	 * 定时分析套牌车数据
	 * 屏蔽定时器入口的打印信息，放后面开关开启之后打印- ligf-20160816
	 */
	public void analysisDeckDatas() {
		String analyType="count";
        logger.info("套牌车算法分析开始！");
        try {
			this.deckCarAnalysisService.startAnalysis(analyType);
		} catch (Exception e) {
			e.printStackTrace();
		}
        logger.info("套牌车算法分析结束！");
	}
	/**
	 * 定时车辆库比对分析套牌车数据
	 */
	public void analysisCompareDeckDatas(){
		
		String analyType="compare";
        logger.info("套牌车辆库比对分析开始！");
        try {
			this.deckCarAnalysisService.startAnalysis(analyType);
		} catch (Exception e) {
			e.printStackTrace();
		}
        logger.info("套牌车辆库比对分析结束！");
	}
	
	/**
	 * 定时查询solr分组数据
	 */
	public void querySolrFacetData() {
		logger.info("车流量统计定时分析开始！");
        try {
			this.dataStatisticsService.querySolrFacetData();
		} catch (Exception e) {
			e.printStackTrace();
		}
        logger.info("车流量统计定时分析结束！");
	}
	
	/**
	 * 定时把car_temp数据转移到hfrz表中
	 */
	public void startTransferData() {
		logger.info("定时数据转移开始！");
        try {
			this.dataTimelyService.startTransferData();
		} catch (Exception e) {
			e.printStackTrace();
		}
        logger.info("定时数据转移结束！");
	}
}
