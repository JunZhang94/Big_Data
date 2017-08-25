package com.jp.tic.business.alarm.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Repository;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.jp.tic.business.alarm.dao.ControlManagerDao;
import com.jp.tic.framework.controller.AbstractController;
import com.jp.tic.system.dao.BaseDao;
import com.jp.tic.utils.lang.DateUtil;
import com.jp.tic.utils.lang.StringUtil;
import com.jp.tic.utils.sql.SQLUtil;

@SuppressWarnings("unchecked")
@Repository
public class ControlManagerDaoImpl extends BaseDao implements ControlManagerDao{

	/**
	 * 分页查询布控告警信息数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryControlInfo(Map<String, String> param) {
		int pageStart = StringUtil.toInteger(param.get("page.start"));
        int rows = StringUtil.toInteger(param.get("page.limit"));
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		
		buffer.append("select a.*,b.orgName from SETCONTROL_TAB a left join organization_view b on a.bkdw = b.id where 1=1 and a.bk_type=0 ");
		//获取前台我的工作太传输过来的变量
		int flag =StringUtil.toInteger( param.get("flag"));
		
		//flag是用来区别系统菜单和我的工作台传输不同数据的标识
		//如果是我的工作台页面时则执行下面这个条件，其他的不执行
		if(flag==1){
			//获取系统的session变量
			HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
			Map<String, Object> userMap = (Map<String, Object>)(request.getSession().getAttribute(AbstractController.SESSION_USER));
			String userCode = userMap.get("USER_NAME").toString();//USER_NAME=超级管理员
			//判断usercode是否存在
			if(StringUtil.checkStr(userCode)){
				
				//如果是撤控审核状态执行if部分,
				//否则则执行else部分
				if(StringUtil.toInteger(param.get("verifyStatus"))==4){
				   buffer.append(" and a.ckr = '"+userCode+"'");
				}else{
				   buffer.append(" and a.bkr='"+userCode+"'");
				   
				}
			}
		}
		buffer.append(this.packageSeachSql(param));
		String pageSql = this.initPageSql(pageStart, rows, buffer.toString());
		try {
			datas = this.queryBySql(pageSql);
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return datas;
	}
	
	/**
	 * 统计布控告警信息数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countControlDatas(Map<String, String> param) {
		List<Map<String, String>> counts = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select count(*) as COUNTS from SETCONTROL_TAB a where 1=1 and a.bk_type=0 ");
		if(StringUtil.toInteger(param.get("flag"))==1){
			/*if(!StringUtil.checkStr(param.get("status"))){
				sqlBuffer.append(" and a.BKZT in(1,4,5)");
			}*/
			//获取session参数
			HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.getRequestAttributes()).getRequest();
			Map<String, Object> userMap = (Map<String, Object>)(request.getSession().getAttribute(AbstractController.SESSION_USER));
			String userCode = userMap.get("USER_CODE").toString();
			
			//获取param Map参数中的的数据,获取控件的状态
			int verifyStatus = StringUtil.toInteger(param.get("verifyStatus"));
			if(StringUtil.checkStr(userCode)){
				
				//如果是撤控审核状态执行if部分,
				//否则则执行else部分
				if(verifyStatus==4){
					sqlBuffer.append(" and a.ckr='"+userCode+"'");
				}else{
					sqlBuffer.append(" and a.bkr='"+userCode+"'");
				}
		    }
		}
		sqlBuffer.append(this.packageSeachSql(param));
		try {
			counts = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return counts;
	}
	
	/**
	 * 组装分页查询语句
	 * @param pageStart 开始位置
	 * @param rows 每行显示多少数据量
	 * @param seachSql 数据查询语句
	 * @return 分页语句
	 */
	public String initPageSql(int pageStart, int rows, String seachSql) {
		StringBuffer pageSql = new StringBuffer(); 
		if (pageStart == 0) {
            pageSql.append("select * from (");
            pageSql.append(seachSql + ") row_ where rownum <=" + rows);
        } else {
            int nextStart = pageStart + rows;
            pageSql.append(" select * from ( select row_.*, rownum rownum_ from (");
            pageSql.append(seachSql + ") row_ where rownum <= " + nextStart +") where rownum_ > " + pageStart);
        }
		return pageSql.toString();
	}
	
	/**
	 * 组装查询语句
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public String packageSeachSql(Map<String, String> param) {
		StringBuffer buffer = new StringBuffer();
		 //获取车牌信息 
        if(StringUtil.checkStr(param.get("carNumber"))) {
            buffer.append(" and regexp_like(a.HPHM, '"+SQLUtil.getCarNumLikeCondition( param.get("carNumber"))+"')");
        }
        //组装车辆品牌sql
        if(StringUtil.checkStr(param.get("carBrand"))) {
            buffer.append(" and a.CLPP like '%"+ param.get("carBrand")+"%'");
        }
        //组装品牌子品牌种类sql
        if(StringUtil.checkStr(param.get("carType"))) {
        	 buffer.append(" and a.CAR_TYPE ='"+ param.get("carType")+"'");
        }
      //组装车辆子品牌年款种类sql
        if(StringUtil.checkStr(param.get("carYear"))) {
        	 buffer.append(" and a.CAR_YEAR ='"+ param.get("carYear")+"'");
        }
		//车牌颜色
		if (StringUtil.checkStr(param.get("carNumColor")) && !StringUtil.equals(param.get("carNumColor"), "-1")) {
			buffer.append(" and a.HPYS = '" + param.get("carNumColor") + "'");
		}
		//车牌颜色
		if (StringUtil.checkStr(param.get("carColor")) && !StringUtil.equals(param.get("carNumColor"), "-1")) {
			buffer.append(" and a.CSYS = '" + param.get("carColor") + "'");
		}
		//车辆类型
		if (StringUtil.checkStr(param.get("cllx")) && !StringUtil.equals(param.get("cllx"), "-1")) {
			buffer.append(" and a.CLLX = '" + param.get("cllx") + "'");
		}
		//告警类型
		if (StringUtil.checkStr(param.get("surLevel")) && !StringUtil.equals(param.get("surLevel"), "-1")) {
			buffer.append(" and a.BKJB = '" + param.get("surLevel") + "'");
		}
		//布控类型
		if (StringUtil.checkStr(param.get("surType")) && !StringUtil.equals(param.get("surType"), "-1")) {
			buffer.append(" and a.BKLX = '" + param.get("surType") + "'");
		}
		//布控状态
		if (StringUtil.checkStr(param.get("status")) && !StringUtil.equals(param.get("status"), "-1")) {
			buffer.append(" and a.BKZT = '" + param.get("status") + "'");
		}
		//审核状态
		if(StringUtil.equals(param.get("flag"), "1")){
			if(StringUtil.equals(param.get("seachFlag"), "2")){
				if (StringUtil.checkStr(param.get("verifyStatus")) && !StringUtil.equals(param.get("verifyStatus"), "-1")) {
					buffer.append(" and a.SHZT = '" + param.get("verifyStatus") + "'");
				}else{
					buffer.append(" and a.SHZT in (1,2,4)");
				}
			}else{
				buffer.append(" and a.SHZT in (1,2,4)");
			}
		}
		if(!StringUtil.equals(param.get("flag"), "1")) {
			if (StringUtil.checkStr(param.get("verifyStatus")) && !StringUtil.equals(param.get("verifyStatus"), "-1")) {
				buffer.append(" and a.SHZT = '" + param.get("verifyStatus") + "'");
			}
		}
		//布控时间
		if (StringUtil.checkStr(param.get("beginDate")) && StringUtil.checkStr(param.get("endDate"))) {
 			String startTime = "";
			String endTime = "";
			if (StringUtil.equals(param.get("queryType"), "revokeVerify")) {
				buffer.append(" and a.CKSJ ");
			} else {
				buffer.append(" and a.BKSK ");
			}
			if (param.get("beginDate").indexOf("T") > 0 && param.get("endDate").indexOf("T") > 0) {
				startTime = param.get("beginDate").replaceAll("T",  " ");
				endTime = param.get("endDate").replaceAll("T",  " ");
				buffer.append("between to_date('"
	                    + DateUtil.parseToString(startTime, "yyyy-MM-dd HH:mm:ss")
	                    + "','yyyy-MM-dd HH24:mi:ss') and to_date('"
	                    + DateUtil.parseToString(endTime, "yyyy-MM-dd HH:mm:ss")
	                    + "','yyyy-MM-dd HH24:mi:ss')");
			} else {
				startTime = param.get("beginDate").replaceAll("T",  " ");
				endTime = param.get("endDate").replaceAll("T",  " ");
				buffer.append("between to_date('"
	                    + startTime
	                    + "','yyyy-MM-dd HH24:mi:ss') and to_date('"
	                    + endTime
	                    + "','yyyy-MM-dd HH24:mi:ss')");
			}
		}
		if (StringUtil.checkObj(param.get("carCategory"))){
			String[] categoryArray=param.get("carCategory").split(",");
			for(int i=0;i<categoryArray.length;i++){
				buffer.append(" and a.category like '%"+categoryArray[i]+"%'");
			}
		}
		if (StringUtil.equals(param.get("queryType"), "revokeVerify")) {
			buffer.append(" order by a.CKSJ DESC");
		} else {
			buffer.append(" order by a.BKSK DESC");
		}
	 	
		return buffer.toString();
	}
		
	
	/**
	 * 保存布控信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int saveControlInfo(Map<String, String> param) {
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("insert into SETCONTROL_TAB(BKXXBH,HPHM,BKLX,BKLB,CSYS,CLLX,BJDJ,CLPP,CATEGORY,BKLEN,HPYS,HPZL," +
				"CLWX,CZ,LXDH,BKDW,AJMS,BKR,BKSZ,BKSK,BKKSSJ,BKFW,BKZT,SHZT) values (SEQ_SETCONTROL_TAB.NEXTVAL");
		if (StringUtil.checkObj(param.get("carNum"))) {
			buffer.append(",'" + param.get("carNum") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("controlType"))) {
			buffer.append(",'" + param.get("controlType") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("bkCategory"))) {
			buffer.append(",'" + param.get("bkCategory") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("carColor"))) {
			buffer.append(",'" + param.get("carColor") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("carType"))) {
			buffer.append(",'" + param.get("carType") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("alarmLevel"))) {
			buffer.append(",'" + param.get("alarmLevel") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("carBrandWin"))) {
			buffer.append(",'" + param.get("carBrandWin") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("carCategory"))) {
			buffer.append(",'"+param.get("carCategory")+"'");
		}else{
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("endDate"))) {
			buffer.append(",to_date('" + param.get("endDate") + "','yyyy-MM-dd HH24:mi:ss')");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("carLicenseType"))) {
			buffer.append(",'" + param.get("carLicenseType") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("carNumberType"))) {
			buffer.append(",'" + param.get("carNumberType") + "'");
		} else {
			buffer.append(",''");
		}
		
		if (StringUtil.checkObj(param.get("attribution"))) {
			buffer.append(",'" + param.get("attribution") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("linkMan"))) {
			buffer.append(",'" + param.get("linkMan") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("linkManPhone"))) {
			buffer.append(",'" + param.get("linkManPhone") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("orgName"))) {
			buffer.append(",'" + param.get("orgName") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("describer"))) {
			buffer.append(",'" + param.get("describer") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("userName"))) {
			buffer.append(",'" + param.get("userName") + "'");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("controlNature"))) {
			buffer.append(",'" + param.get("controlNature") + "'");
		} else {
			buffer.append(",''");
		}
		buffer.append(", sysdate");
		if (StringUtil.checkObj(param.get("startDate"))) {
			buffer.append(",to_date('" + param.get("startDate") + "','yyyy-MM-dd HH24:mi:ss')");
		} else {
			buffer.append(",''");
		}
		if (StringUtil.checkObj(param.get("bkfw"))) {
			buffer.append(",'" + param.get("bkfw") + "'");
		} else {
			buffer.append(",''");
		}
		buffer.append(",'0'");//布控中
		buffer.append(",'1'");//审核状态，1：布控待审核数据
		
		buffer.append(")");
		try {
			saveFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saveFlag;
	}
	
	/**
	 * 布控时，检查是否存在此布控信息，精确布控
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> checkControlCarNum(Map<String, String> param) {
		List<Map<String, String>> datas = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select * from SETCONTROL_TAB t where sysdate>t.bkkssj and sysdate<t.bklen ");
		if (StringUtil.checkObj(param.get("carNum"))){ 
			sqlBuffer.append(" and regexp_like(HPHM, '"+SQLUtil.getCarNumLikeCondition( param.get("carNum"))+"')");
		}
		if (StringUtil.checkObj(param.get("carBrandWin"))) {
			sqlBuffer.append(" and t.clpp like '%"+param.get("carBrandWin")+"%'");
		}
		if (StringUtil.checkObj(param.get("carCategory"))) {
			sqlBuffer.append(" and t.category like '%"+param.get("carCategory")+"%'");
		}
		
		try {
			datas = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
		}
		return datas;
	}
	
	/**
	 * 审核布控信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int verifyControlInfo(Map<String, String> param) {
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("update SETCONTROL_TAB set");
		if (StringUtil.equals(param.get("verifyResult"), "1")) {//同意
			buffer.append(" SHZT = '2'"); //布控新增审核通过
		} else {//不同意
			buffer.append(" SHZT = '3'"); //布控新增审核不通过
		} 
		if (StringUtil.checkObj(param.get("suggestion"))) {
			buffer.append(", VERIFY_CONTENT = '" + param.get("suggestion") + "'"); //审核意见
		}
		String[] controlIds = param.get("ids").split(",");
		String controlIdStr = "";
		for (int i = 0; i < controlIds.length; i++) {
			if (StringUtil.checkStr(controlIdStr)) {
				controlIdStr += ",";
			}
			controlIdStr += "'" + controlIds[i] + "'";
		}
		buffer.append(" where BKXXBH in (" + controlIdStr + ")");
		try {
			saveFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saveFlag;
	}
	
	/**
	 * 撤控布控信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int revokeControlInfo(Map<String, String> param) {
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("update SETCONTROL_TAB set SHZT = '4'"); //进入撤控待审核状态
		if (StringUtil.checkObj(param.get("suggestion"))) {
			buffer.append(", CKYY = '" + param.get("suggestion") + "'"); //审核意见
		}
		buffer.append(", CKDW = '" + param.get("organId") + "', CKR = '"+param.get("userName")+"', CKSJ = to_date('" + param.get("revokeTime") + "','yyyy-MM-dd HH24:mi:ss')");
		String[] controlIds = param.get("ids").split(",");
		String controlIdStr = "";
		for (int i = 0; i < controlIds.length; i++) {
			if (StringUtil.checkStr(controlIdStr)) {
				controlIdStr += ",";
			}
			controlIdStr += "'" + controlIds[i] + "'";
		}
		buffer.append(" where BKXXBH in (" + controlIdStr + ")");
		try {
			saveFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saveFlag;
	}
	
	/**
	 * 撤控布控审核信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int revokeVerifyControlInfo(Map<String, String> param) {
		int saveFlag = 0;
		StringBuffer buffer = new StringBuffer();
		buffer.append("update SETCONTROL_TAB set"); //进入撤控待审核状态
		if (StringUtil.equals(param.get("revokeVerifyResult"), "1")) {//同意
			buffer.append(" SHZT = '5'"); //撤控审核通过
		} else {//不同意
			buffer.append(" SHZT = '6'"); //撤控审核不通过
		} 
		if (StringUtil.checkObj(param.get("suggestion"))) {
			buffer.append(", REVOKE_VERIFY_CONTENT = '" + param.get("suggestion") + "'"); //审核意见
		}
		String[] controlIds = param.get("ids").split(",");
		String controlIdStr = "";
		for (int i = 0; i < controlIds.length; i++) {
			if (StringUtil.checkStr(controlIdStr)) {
				controlIdStr += ",";
			}
			controlIdStr += "'" + controlIds[i] + "'";
		}
		buffer.append(" where BKXXBH in (" + controlIdStr + ")");
		try {
			saveFlag = this.updateBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saveFlag;
	}
	
	/**
	 * 导出布控信息数据
	 * @param partIds 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> exportControlInfoById(String[] partIds) {
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append("select * from SETCONTROL_TAB where ");
		String idStr = "";
		for (int i = 0; i < partIds.length; i++) {
			if (StringUtil.checkStr(idStr)) {
				idStr += ",";
			}
			idStr += "'" + partIds[i] + "'";
		}
		buffer.append("BKXXBH in (" + idStr + ")");
		try {
			datas = this.queryBySql(buffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return datas;
	}

	/**
	 * 根据查询条件导出查询数据
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public String exportQuerySql(Map<String, String> param) {
		StringBuffer buffer = new StringBuffer();
		buffer.append("select a.*,b.orgName from SETCONTROL_TAB a left join organization_view b on a.bkdw = b.id where 1=1");
		buffer.append(this.packageSeachSql(param));
		return buffer.toString();
	}

	@Override
	public Map<String, Object> doQuery(String sqlStr) {
		Map<String,Object> resultMap=new HashMap<String, Object>();
		List datas = this.queryBySql(sqlStr);
		resultMap.put("row", datas);
		return resultMap;
	}
	
	/**
	 * 分页查询黑名单数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryBlackListInfo(Map<String, String> param) {
		int pageStart = StringUtil.toInteger(param.get("page.start"));
        int rows = StringUtil.toInteger(param.get("page.limit"));
		List<Map<String, String>> datas = null;
		StringBuffer buffer = new StringBuffer();
		buffer.append("select a.* from SETCONTROL_TAB a where (BK_TYPE = '1' or BK_TYPE = '2')");
		buffer.append(this.packageSeachSql(param));
		String pageSql = this.initPageSql(pageStart, rows, buffer.toString());
		try {
			datas = this.queryBySql(pageSql);
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return datas;
	}
	
	/**
	 * 统计黑名单数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countBlackList(Map<String, String> param) {
		List<Map<String, String>> counts = null;
		StringBuffer sqlBuffer = new StringBuffer();
		sqlBuffer.append("select count(*) as COUNTS from SETCONTROL_TAB a where (BK_TYPE = '1' or BK_TYPE = '2')");
		sqlBuffer.append(this.packageSeachSql(param));
		try {
			counts = this.queryBySql(sqlBuffer.toString());
		} catch (Exception e) {
			e.printStackTrace(); 
            return null;
		}
		return counts;
	}
	
	/**
	 * 保存黑名单信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int saveBlackListInfo(List<Map<String, String>> param, String userName, String listType) {
		int saveFlag = 0;
		String[] sqlArray = new String[param.size()];
		for (int i = 0; i < param.size(); i++) {
			StringBuffer buffer = new StringBuffer();
			buffer.append("insert into SETCONTROL_TAB(BKXXBH,HPHM,CLLX,CSYS,HPYS,CLPP,BKSK,BKR,BK_TYPE) values (SEQ_SETCONTROL_TAB.NEXTVAL");
			if (StringUtil.checkObj(param.get(i).get("carNum"))) {
				buffer.append(",'" + param.get(i).get("carNum") + "'");
			} else {
				buffer.append(",''");
			}
			if (StringUtil.checkObj(param.get(i).get("cllx"))) {
				buffer.append(",'" + param.get(i).get("cllx") + "'");
			} else {
				buffer.append(",''");
			}
			if (StringUtil.checkObj(param.get(i).get("csys"))) {
				buffer.append(",'" + param.get(i).get("csys") + "'");
			} else {
				buffer.append(",''");
			}
			if (StringUtil.checkObj(param.get(i).get("hpys"))) {
				buffer.append(",'" + param.get(i).get("hpys") + "'");
			} else {
				buffer.append(",''");
			}
			if (StringUtil.checkObj(param.get(i).get("clpp"))) {
				buffer.append(",'" + param.get(i).get("clpp") + "'");
			} else {
				buffer.append(",''");
			}
			buffer.append(",sysdate");
			if (StringUtil.checkObj(userName)) {
				buffer.append(",'" + userName + "'");
			} else {
				buffer.append(",''");
			}
			if (StringUtil.equals(listType, "1")) {
				buffer.append(",'1'");
			} else if (StringUtil.equals(listType, "2")) {
				buffer.append(",'2'");
			} else {
				buffer.append(",'0'");
			}
			buffer.append(")");
			sqlArray[i] = buffer.toString();
		}
		try {
			saveFlag = this.updateBatchSql(sqlArray);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return saveFlag;
	}
}
