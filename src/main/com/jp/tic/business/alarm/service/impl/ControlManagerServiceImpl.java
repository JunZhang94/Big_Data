package com.jp.tic.business.alarm.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import jxl.Sheet;
import jxl.Workbook;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.jp.tic.business.alarm.dao.ControlManagerDao;
import com.jp.tic.business.alarm.mapper.ControlManagerMapper;
import com.jp.tic.business.alarm.service.ControlManagerService;
import com.jp.tic.common.util.DataUtils;
import com.jp.tic.system.dao.DictionaryDao;
import com.jp.tic.utils.BaseException;
import com.jp.tic.utils.lang.StringUtil;

@Service
public class ControlManagerServiceImpl implements ControlManagerService{

	@Autowired
	ControlManagerDao controlManagerDao;
	@Autowired
	ControlManagerMapper mapper;
	@Autowired
	DataUtils dataUtil;
	@Autowired
	DictionaryDao dictionaryDao;
	
	/**
     * 导入开始行
     */
    private static int IMPORT_ROW_START=4;
	
	/**
	 * 分页查询布控信息数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryControlInfo(Map<String, String> param) {
		return controlManagerDao.queryControlInfo(param);
	}
	
	/**
	 * 统计布控信息数量
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countControlDatas(Map<String, String> param) {
		return controlManagerDao.countControlDatas(param);
	}
	
	/**
	 * 保存布控信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int saveControlInfo(Map<String, String> param) {
		return controlManagerDao.saveControlInfo(param);
	}
	
	/**
	 * 布控时，检查是否存在此布控信息，精确布控
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public List<Map<String, String>> checkControlCarNum(Map<String, String> param) {
		return controlManagerDao.checkControlCarNum(param);
	}
	
	/**
	 * 初始化修改数据的详细信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> loadControlDetailInfo(Map<String, String> param) {
		return mapper.loadControlDetailInfo(param);
	}
	
	/**
	 * 更新布控信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int updateControlInfo(Map<String, String> param) {
		return mapper.updateControlInfo(param);
	}
	
	/**
	 * 删除布控信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int deleteControlInfo(Map<String, String> param) {
		return mapper.deleteControlInfo(param);
	}
	
	/**
	 * 更新布控信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int verifyControlInfo(Map<String, String> param) {
		return controlManagerDao.verifyControlInfo(param);
	}
	
	/**
	 * 撤控布控信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int revokeControlInfo(Map<String, String> param) {
		return controlManagerDao.revokeControlInfo(param);
	}
	
	/**
	 * 撤控布控审核信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int revokeVerifyControlInfo(Map<String, String> param) {
		return controlManagerDao.revokeVerifyControlInfo(param);
	}
	
	/**
	 * 导出布控信息数据
	 * @param partIds 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> exportControlInfoById(String[] partIds) {
		return controlManagerDao.exportControlInfoById(partIds);
	}
	
	/**
	 * 根据查询条件导出查询数据
	 * @param param 查询参数
	 * @return 查询结果
	 */
	public String exportQuerySql(Map<String, String> param) {
		return controlManagerDao.exportQuerySql(param);
	}

	@Override
	public Map<String, Object> doQuery(String sqlStr) {
		// TODO Auto-generated method stub
		return controlManagerDao.doQuery(sqlStr);
	}

	@Override
	public Object[] getExportList(Map<String, String> searchParam) {
		Object texts=null;
		Object[] textDatas =null;
		List<Map<String, String>> dataList;
		//String nodeList=searchParam.get("nodeList");
		String idstr = searchParam.get("idstr");
		 if (StringUtil.isNotBlank(idstr)) {
			 String partIds[] = idstr.split(",");
			 dataList = this.exportControlInfoById(partIds); 
		 }else{
			 String sqlStr=this.exportQuerySql(searchParam);
			 Map<String,Object> tpMap=controlManagerDao.doQuery(sqlStr);
			 dataList=(List) tpMap.get("row");
		 }
		 textDatas=new Object[dataList.size()];
		 for(int i=0;i<dataList.size();i++){
			 Map<String, String> tmpMap=dataList.get(i);
			 tmpMap.put("BKLXMC",dataUtil.getDicNameByValue("ControlType", tmpMap.get("BKLX")));
			 tmpMap.put("BKLBMC",dataUtil.getDicNameByValue("ControlCategory", tmpMap.get("BKLB")));
			 tmpMap.put("SHZTMC",dataUtil.getDicNameByValue("ApprovalState", tmpMap.get("SHZT")));
			 texts = new Object[]{
					 tmpMap.get("HPHM"),
					 tmpMap.get("CLPP"),
					 tmpMap.get("CATEGORY"),
					 tmpMap.get("BKLXMC"),
					 tmpMap.get("BKLBMC"),
					 tmpMap.get("SHZTMC"),
					 tmpMap.get("BKSK"),
					 tmpMap.get("BKLEN"),
					 tmpMap.get("BKDW"),
					 tmpMap.get("BKR")
		        	};
		       textDatas[i] = texts;
		 }
		return textDatas;
	}
	
	/**
	 * 分页查询黑名单数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> queryBlackListInfo(Map<String, String> param) {
		return controlManagerDao.queryBlackListInfo(param);
	}
	
	/**
	 * 统计黑名单数据
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public List<Map<String, String>> countBlackList(Map<String, String> param) {
		return controlManagerDao.countBlackList(param);
	}
	/**
     * 解析文件得到carNum的list
     * @param file
     * @return ArrayList<DevicesEntity>
     * @throws Exception
     */
	public List<Map<String, String>> parseblackListExcel(MultipartFile file) throws Exception {
        ArrayList<Map<String, String>> result = new ArrayList<Map<String, String>>();
        Workbook wb;
        try {
            wb = Workbook.getWorkbook(file.getInputStream());
        } catch (Exception e) {
            e.printStackTrace();
            BaseException baseException = new BaseException();
            baseException.setMessage("导入失败");
            throw baseException;
        }
        Sheet deviceSheet = wb.getSheet(0);
        // Sheet channelSheet =wb.getSheet(1);
        // 行数
        int deviceRows = deviceSheet.getRows();
        //车牌号码(*)
        try {
            for (int row = IMPORT_ROW_START; row < deviceRows; row++) {
                int colStart = 1;
                Map<String, String> datas = new HashMap<String, String>();
                // 车牌号码(*)
                String carNum = deviceSheet.getCell(colStart++, row).getContents();
                if (!this.checkColumn(carNum, "carNum")) {
                    //throw new Exception("车牌号码模板第" + (row + 1) + "行，车牌号码为空，导入失败，请修改！");
                	break;
                } else {
                	 datas.put("carNum", carNum);
                     //result.add(datas);
				}
                String cllx = deviceSheet.getCell(colStart++, row).getContents();
                if (cllx == null || cllx =="" || cllx.trim().isEmpty()) {
                } else {
                	String cllxVal = this.findDictionaryData("CarCategory", cllx);
                	datas.put("cllx", cllxVal);
				}
                String csys = deviceSheet.getCell(colStart++, row).getContents();
                if (csys == null || csys =="" || csys.trim().isEmpty()) {
                } else {
                	String csysVal = this.findDictionaryData("CarColor", csys);
                	datas.put("csys", csysVal);
				}
                String hpys = deviceSheet.getCell(colStart++, row).getContents();
                if (hpys == null || hpys =="" || hpys.trim().isEmpty()) {
                } else {
                	String hpysVal = this.findDictionaryData("LicPlateColor", hpys);
                	datas.put("hpys", hpysVal);
				}
                String clpp = deviceSheet.getCell(colStart++, row).getContents();
                if (clpp == null || clpp =="" || clpp.trim().isEmpty()) {
                } else {
                	datas.put("clpp", clpp);
				}
                result.add(datas);
            }
        } catch (Exception e) {
            e.printStackTrace();
            BaseException baseException = new BaseException();
            baseException.setMessage(e.getMessage());
            throw baseException;
        }finally{
            wb.close();
        }
        return result;
    }
	
	/**
     * 检查excle中的字段是否符合要求
     * @param value
     * @param name
     * @return 符合true 不符合false
     */
    private boolean checkColumn(String value, String name) {
        boolean result = true;
        if ("carNum".equals(name)) {
            if (value == null || value.trim().isEmpty())
                result = false;
        }
        return result;
    }
    
    /**
	 * 保存黑名单信息
	 * @param param 查询参数
	 * @return 返回结果
	 */
	public int saveBlackListInfo(List<Map<String, String>> param, String userName, String listType) {
		return controlManagerDao.saveBlackListInfo(param, userName, listType);
	}
	
	/**
	 * 加载字典数据项
	 * @param param type参数
	 * @return 查询结果
	 */
	public String findDictionaryData(String code, String value) {
		Map<String, String> param = new HashMap<String, String>();
		param.put("code", code);
		List<Map<String, String>> datas = dictionaryDao.findDictionaryData(param);
		String realValue = "";
		if (datas != null && datas.size() > 0) {
			for (Map<String, String> dataMap : datas) {
				if (StringUtil.equals(dataMap.get("DISPLAYVALUE"), value)) {
					realValue = dataMap.get("STOREVALUE");
					break;
				}
			}
		}
		if (!StringUtil.checkStr(realValue)) {
			return value;
		} else {
			return realValue;
		}
	}
}
