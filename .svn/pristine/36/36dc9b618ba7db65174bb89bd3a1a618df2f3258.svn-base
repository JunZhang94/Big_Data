package com.jp.tic.business.cartake.service;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.jp.tic.base.tester.BaseTest;
import com.jp.tic.security.entity.UserRole;
import com.jp.tic.security.service.UserRoleService;
import com.jp.tic.system.service.OrganizationService;
import com.jp.tic.utils.lang.StringUtil;

public class UserInfoTest extends BaseTest {
	
	@Autowired
	private OrganizationService organizationService;
	
	@Autowired
	private UserRoleService<UserRole> userRoleService;
	
	@Test
	public void testVediaoStatus() {
		String userCode="ceshi";
		String[] status = userRoleService.getEditVediaoStatus(userCode);
		System.out.println("=================" + status);
	}
	
	/*
	public void testKpiUserLogin() throws Exception {
		MockHttpServletRequest request = new MockHttpServletRequest();
		MockHttpServletResponse response = new MockHttpServletResponse();
		
		request.setRequestURI("/user/login.mvc");
		request.setMethod("GET");
		
		request.setAttribute(HandlerMapping.INTROSPECT_TYPE_LEVEL_MAPPING, true);
		request.setAttribute("idCard", "431128198606086312");
		request.setAttribute("userName", "测试人员");
		request.setAttribute("orgCode", "440100231507");
		
		final ModelAndView mav = this.excuteAction(request, response);  
		
		String orgCode = "440100231507";
		String orgId = orgCode.substring(0, 6);
		String orgId2 = orgCode.substring(0, 8);

		System.out.println(orgId2 + "========================" + orgId);
	}*/

	public void testUserOrgInfo() throws Exception {
		String orgCode = "440113170500";
		String orgId = orgCode.substring(0, 4);
		String orgIdStr = "";
		if (StringUtil.equals(orgId, "4401")) {
			List<Map<String, String>> orgInfos = organizationService.loadAllOrgInfo();
			String orgStr = "";
			boolean havingFlag = false;
			boolean orgFlag = false;
			boolean reFlag = false;
			orgId = orgCode.substring(0, 6);
			for (int i = 0; i < orgInfos.size(); i++) {
				orgStr = orgInfos.get(i).get("DWBH").substring(0, 6);
				if (StringUtil.equals(orgStr, orgId)) {
					if (StringUtil.equals(orgId, "440100")) {
						orgId = orgCode.substring(0, 8);
						if (StringUtil.equals(orgId, "44010023") || StringUtil.equals(orgId, "44010000")) {
							orgIdStr = orgId + "0000";
							reFlag = true;
						}
						orgFlag = true;
					}
					havingFlag = true;
					break;
				}
			}
			if (havingFlag && !orgFlag) {
				orgIdStr = orgId + "000000";
			} else if (havingFlag && orgFlag && !reFlag) {
				orgIdStr = "440100";
			} else if (!havingFlag) {
				orgIdStr = "440100";
			}
		}
		System.out.println("orgId========================" + orgId);
		System.out.println("orgIdStr========================" + orgIdStr);
		System.out.println("orgCode========================" + orgCode);
	}
	
	static String[] array={"1","2","4"};  
	static int index=array.length;  

	public static void add(int pos, String value) {
		String[] temp;
		if (index > array.length - 1) {
			temp = new String[array.length * 3 / 2];
			System.arraycopy(array, 0, temp, 0, array.length);
			array = temp;
		}
		for (int i = index; i > pos; i--) {
			array[i] = array[i - 1];
		}
		array[pos] = value;
		index++;
	}
	
	public static void main(String[] args) {  
		add(2, "3");  
		add(2, "31");  
		add(2, "32");  
		add(2, "33");  
		for (int i = 0; i < array.length; i++) {
			System.out.println("==" + array[i]);
			
		}
		List list= Arrays.asList(array);  
		System.out.println(list);  
	}
}
