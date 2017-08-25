package test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.jp.tic.utils.db.DatabaseUtil;

public class Tree4kkMaster {
	
	public List<HashMap<String, String>> getKKTree(){
		List<HashMap<String, String>> list = new ArrayList<HashMap<String,String>>();
		String sqlbase = "select qydm as id, qymc as name from AREA_TAB";
		String sqlmgm = "select dwbh as id, dwmc as name, dwxzqh as pid, '1' as org_type from MGMTDEPT_TAB order by dwbh";
		String sqlkk = "select kkbh as id, kkmc as name, dwbh as pid, '2' as org_type from MOUNT_TAB where kkzt=0 order by NLSSORT(NAME,'NLS_SORT = SCHINESE_PINYIN_M')";
		//String sqlfx = "select a.direction_number as id, a.direction_name as name,a.kkbh as pid from C_DIRECTION_TAB a left join MOUNT_TAB b on a.kkbh=b.kkbh where b.kkzt=0";
		//List fxList = queryBySql(sqlfx);
		List baseList = queryBySql(sqlbase);
		List mgmList = queryBySql(sqlmgm);
		List kkList = queryBySql(sqlkk);
		list.addAll(baseList);
		list.addAll(mgmList);
		list.addAll(kkList);
		//list.addAll(fxList);
		return list;
	}
	
	public List<HashMap<String, String>> getVirtualKKTree() {
		List<HashMap<String, String>> list = new ArrayList<HashMap<String,String>>();
		String sqlmgm = "select dwbh as id, dwmc as name, dwxzqh as pid, '1' as org_type from MGMTDEPT_TAB order by dwbh";
		String sqlkk = "select kkbh as id, kkmc as name, dwbh as pid, '2' as org_type from MOUNT_VIRTUAL_TAB where kkzt=0 order by NLSSORT(NAME,'NLS_SORT = SCHINESE_PINYIN_M')";
		List mgmList = queryBySql(sqlmgm);
		List kkList = queryBySql(sqlkk);
		list.addAll(mgmList);
		list.addAll(kkList);
		return list;
	}
	
	public List<HashMap<String, String>> getKKTreeGzsInc(){
		List<HashMap<String, String>> list = new ArrayList<HashMap<String,String>>();
		//String sqlbase = "select qydm as id, qymc as name from AREA_TAB";
		String sqlgzs = "select A.QYDM as id,A.Qymc as name,'-1' as pid,'0' as org_type from AREA_TAB A";
		String sqlmgm = "select dwbh as id, dwmc as name, dwxzqh as pid, '1' as org_type from MGMTDEPT_TAB order by dwbh";
		String sqlkk = "select kkbh as id, kkmc as name, dwbh as pid, '2' as org_type from MOUNT_TAB where kkzt=0";
		//String sqlfx = "select a.direction_number as id, a.direction_name as name,a.kkbh as pid from C_DIRECTION_TAB a left join MOUNT_TAB b on a.kkbh=b.kkbh where b.kkzt=0";
		//List fxList = queryBySql(sqlfx);
		//List baseList = queryBySql(sqlbase);
		List gzsList = queryBySql(sqlgzs);
		List mgmList = queryBySql(sqlmgm);
		List kkList = queryBySql(sqlkk);
		//list.addAll(baseList);
		list.addAll(gzsList);
		list.addAll(mgmList);
		list.addAll(kkList);
		//list.addAll(fxList);
		return list;
	}
	/**
	 * 普通SQL查询
	 * 
	 * @param sql
	 * @return
	 */
	public List queryBySql(String sql) {
		return DatabaseUtil.queryForList(sql);
	}
	
	/**
	 * 加载方向树
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public List<HashMap<String, String>> getDirectionTree(){
		List<HashMap<String, String>> list = new ArrayList<HashMap<String,String>>();
		String sqlmgm = "select dwbh as id, dwmc as name, dwxzqh as pid, '1' as org_type, '../../../../themes/client/blue/images/kakou_normal.gif' as icon from MGMTDEPT_TAB order by dwbh";
		//String sqlkk = "select kkbh as id, kkmc as name, dwbh as pid, '2' as org_type from MOUNT_TAB where kkzt=0 order by NLSSORT(NAME,'NLS_SORT = SCHINESE_PINYIN_M')";
		String sqlkk = "select distinct m.kkbh as id,m. kkmc as name, m.dwbh as pid, '2' as org_type, '../../../../themes/client/blue/images/direction_normal.gif' as icon from MOUNT_TAB m, C_DIRECTION_TAB c where m.kkbh = c.kkbh and m.kkzt=0 order by NLSSORT(NAME,'NLS_SORT = SCHINESE_PINYIN_M')";
		String sqlfx = "select a.direction_number as id, a.direction_name as name,a.kkbh as pid,'3' as org_type, '../../../../themes/client/blue/images/direction_copy.gif' as icon from C_DIRECTION_TAB a left join MOUNT_TAB b on a.kkbh=b.kkbh where b.kkzt=0";
		List fxList = queryBySql(sqlfx);
		List mgmList = queryBySql(sqlmgm);
		List kkList = queryBySql(sqlkk);
		list.addAll(mgmList);
		list.addAll(kkList);
		list.addAll(fxList);
		return list;
	}
	
	/**
	 * 卡口报备管理数，区别于已报备和未报备图标标签
	 * @return 查询结果
	 */
	@SuppressWarnings("unchecked")
	public List<HashMap<String, String>> getBeyonetTree(){
		List<HashMap<String, String>> list = new ArrayList<HashMap<String,String>>();
		String sqlmgm = "select dwbh as id, dwmc as name, dwxzqh as pid, '1' as org_type, '../../../../themes/client/blue/images/kakou_normal.gif' as icon from MGMTDEPT_TAB order by dwbh";
		String sqlkk = "select kkbh as id, kkmc as name, dwbh as pid, '2' as org_type, " +
				"case when BYZD2 = '1' then '../../../../themes/client/blue/images/direction_normal.gif' " +
				"else '../../../../themes/client/blue/images/mount_scrap.gif' end as icon " +
				"from MOUNT_TAB where kkzt=0 order by NLSSORT(NAME,'NLS_SORT = SCHINESE_PINYIN_M')";
		List mgmList = queryBySql(sqlmgm);
		List kkList = queryBySql(sqlkk);
		list.addAll(mgmList);
		list.addAll(kkList);
		return list;
	}
}
