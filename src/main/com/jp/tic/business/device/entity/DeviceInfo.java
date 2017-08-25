package com.jp.tic.business.device.entity;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.jp.tic.framework.entity.PageEntity;

/**
 * <b>function:</b> 设备机柜信息实体
 * <pre>
 * 名称	数据项名称	类型	长度
	设备编号	SBBH	字符	15
	经度	JD	数字	10
	纬度	WD	数字	10
	设备IP地址	IPDZ	字符	12
	设备类型	SBLX	字符	12
	设备状态	SBZT	字符	12
	端口号	DKH	字符	12
	登录名称	DLMC	字符	20
	登录密码	DLMM	字符	12
	所属卡口编号	SSKKBH	字符	15
	设备产家	SBCJ	字符	15
	所属单位	SSDW	字符	50
	设备名称	SBMC	字符	80
 * </pre>
 * @author hoojo
 * @createDate 2013-4-25 下午04:42:04
 * @file DeviceInfo.java
 * @package com.jp.tic.zhsics.device.entity
 * @project SHMB
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
@Entity
@Table(name = "deviceInfo_tab")
public class DeviceInfo extends PageEntity {

	private static final long serialVersionUID = 212668228211347414L;

	//@GenericGenerator(name = "idGenerator", strategy = "increment")
	//@GeneratedValue( generator = "idGenerator" )
	
	//@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "gid")
	//@GenericGenerator(name = "gid", strategy = "org.hibernate.id.IncrementGenerator")
	@Id
	/** 设备编号	*/
	private String sbbh;
	/** 经度	*/ 
	private double jd;
	/** 纬度 */
	private double wd;
	/** 设备IP地址 */
	private String ipdz;
	/** 设备类型 */
	private String sblx;
	/** 设备状态	*/
	private String sbzt;
	/** 端口号 */	
	private String dkh;
	/** 登录名称 */
	private String dlmc;
	/** 登录密码 */
	private String dlmm;	
	/** 所属卡口编号 */
	private String sskkbh;
	/** 设备产家 */
	private String sbcj;
	/** 所属单位 */	
	private String ssdw;
	/** 设备名称 */
	private String sbmc;
	
	@Transient
	private String cls;
	@Transient
	private String text;
	@Transient
	private boolean checked;
	@Transient
	private boolean leaf;
	@Transient
	private List<DeviceInfo> children;
	
	public DeviceInfo() {
		super();
	}
	
	public DeviceInfo(String sbbh, int jd, int wd, String ipdz, String sblx, String sbzt) {
		super();
		this.sbbh = sbbh;
		this.jd = jd;
		this.wd = wd;
		this.ipdz = ipdz;
		this.sblx = sblx;
		this.sbzt = sbzt;
	}

	/**
	 * @return 设备编号
	 */
	public String getSbbh() {
		return sbbh;
	}

	/**
	 * @param sbbh 设备编号 to set
	 */
	public void setSbbh(String sbbh) {
		this.sbbh = sbbh;
	}

	/**
	 * @return 经度
	 */
	public double getJd() {
		return jd;
	}

	/**
	 * @param jd 经度 to set
	 */
	public void setJd(double jd) {
		this.jd = jd;
	}

	/**
	 * @return 纬度
	 */
	public double getWd() {
		return wd;
	}

	/**
	 * @param wd 纬度 to set
	 */
	public void setWd(double wd) {
		this.wd = wd;
	}

	/**
	 * @return the 设备IP地址
	 */
	public String getIpdz() {
		return ipdz;
	}

	/**
	 * @param ipdz the 设备IP地址 to set
	 */
	public void setIpdz(String ipdz) {
		this.ipdz = ipdz;
	}

	/**
	 * @return 设备类型
	 */
	public String getSblx() {
		return sblx;
	}

	/**
	 * @param sblx 设备类型 to set
	 */
	public void setSblx(String sblx) {
		this.sblx = sblx;
	}

	/**
	 * @return 设备状态
	 */
	public String getSbzt() {
		return sbzt;
	}

	/**
	 * @param sbzt 设备状态 to set
	 */
	public void setSbzt(String sbzt) {
		this.sbzt = sbzt;
	}

	/**
	 * @return 端口号
	 */
	public String getDkh() {
		return dkh;
	}

	/**
	 * @param dkh 端口号 to set
	 */
	public void setDkh(String dkh) {
		this.dkh = dkh;
	}

	/**
	 * @return 登录名称
	 */
	public String getDlmc() {
		return dlmc;
	}

	/**
	 * @param dlmc 登录名称 to set
	 */
	public void setDlmc(String dlmc) {
		this.dlmc = dlmc;
	}

	/**
	 * @return 登录密码
	 */
	public String getDlmm() {
		return dlmm;
	}

	/**
	 * @param dlmm 登录密码 to set
	 */
	public void setDlmm(String dlmm) {
		this.dlmm = dlmm;
	}

	/**
	 * @return the 所属卡口编号
	 */
	public String getSskkbh() {
		return sskkbh;
	}

	/**
	 * @param sskkbh the 所属卡口编号 to set
	 */
	public void setSskkbh(String sskkbh) {
		this.sskkbh = sskkbh;
	}

	/**
	 * @return the 设备产家
	 */
	public String getSbcj() {
		return sbcj;
	}

	/**
	 * @param sbcj the 设备产家 to set
	 */
	public void setSbcj(String sbcj) {
		this.sbcj = sbcj;
	}

	/**
	 * @return the 所属单位
	 */
	public String getSsdw() {
		return ssdw;
	}

	/**
	 * @param ssdw the 所属单位 to set
	 */
	public void setSsdw(String ssdw) {
		this.ssdw = ssdw;
	}

	/**
	 * @return the 设备名称
	 */
	public String getSbmc() {
		return sbmc;
	}

	/**
	 * @param sbmc the 设备名称 to set
	 */
	public void setSbmc(String sbmc) {
		this.sbmc = sbmc;
		this.setText(sbmc);
	}
	
	public List<DeviceInfo> getChildren() {
		return children;
	}

	public void setChildren(List<DeviceInfo> children) {
		this.children = children;
	}

	public boolean getLeaf() {
		return leaf;
	}

	public void setLeaf(boolean leaf) {
		this.leaf = leaf;
	}

	public String getCls() {
		return cls;
	}

	public void setCls(String cls) {
		this.cls = cls;
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public boolean getChecked() {
		return checked;
	}

	public void setChecked(boolean checked) {
		this.checked = checked;
	}
}
