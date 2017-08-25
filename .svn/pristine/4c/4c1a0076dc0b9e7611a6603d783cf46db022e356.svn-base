package com.jp.tic.system.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.jp.tic.system.hbase.ICarTake;

@Entity
@Table(name = "CAR_TAB_TEMP")
public class CarTake extends AbstractEntity implements Serializable, ICarTake {
	 
	private static final long serialVersionUID = 1L;
    
	@Transient
	private String key;//密钥

	@Id
	@SequenceGenerator(name="seq", sequenceName="SEQ_CAR_TAB_TEMP")
	@GeneratedValue(strategy=GenerationType.SEQUENCE,generator="seq")
	private String xxbh;//车辆信息编号

	private String kkbh;//安装位置编号
	
	private String sbbh;//设备编号

	private Date jgsj;//经过时间
	 
	private String cdbh;//车道编号
	
	private String cdlx;//车道类型
	
	private String fxbh;//方向编号
	 
	private String hphm;//号牌号码
	 
	private String hpys;//号牌颜色
	 
	private String cwhphm;//车尾号牌号码
	 
	private String cwhpys;//车尾号牌颜色
	 
	private String hpyz;//号牌一致
	 
	private Double clsd;//车辆速度
	
	private Double clxs;//车辆限速
	
	private Long cscd;//车身长度
	 
	private String xszt;//行驶状态
	
	private String wfzt;//违法状态
	 
	private String clpp;//车辆品牌
	 
	private String clwx;//车辆外型
	 
	private String csys;//车身颜色
	
	private String cllx;//车辆类型
	 
	private String hpzl;//号牌种类
	 
	private String ssdq;//所属地区
	 
	private Long txsl;//图像数量
	
	private String tx1;//图像1
	
	private String tx2;//图像2
	
	private String tx3;//图像3
	
	private String tx4;//图像4
	
	private String tx5;//图像5
	
	private String tx6;//图像6
	
	private String tx7;//图像7
	
	private String tx8;//图像8
	
	private String amount; //总数
	
	
	@Transient
	private String rowkeyStr;
	@Transient
	private String brand;
	@Transient
	private String type;
	@Transient
	private String caryear;
	@Transient
	private int score;//置信度
	@Transient
	private String clzl;//车辆种类
	@Transient
	private String dropnum;//挂件对象数量
	@Transient
	private String boxnum;//纸巾盒数量
	@Transient
	private String sunflag;//遮阳板标识
	@Transient
	private String tagnum;//年检标数量
	@Transient
	private String seatbelt;//安全带标识
	@Transient
	private String rect;//车辆位置信息
	
	@Transient
	private List<byte[]> pics;//图片信息
	
	@Transient
	private byte[] origBytes;//原始数据包

	public String getCdlx() {
		return cdlx;
	}

	public void setCdlx(String cdlx) {
		this.cdlx = cdlx;
	}

	/**
	 * -----------------------------------------------------------------------
	 * -----------------------------------------------------------------------
	 * 非协议属性
	 * -----------------------------------------------------------------------
	 * -----------------------------------------------------------------------
	 */	 
	private String ylxxlx;//预留信息类型
	private String ylxx;//预留信息
	private String cj;// 车籍
	
	private String qydm;//区域代码
	private String dwbh;//单位编号
	
	private String kkmc;//安装位置名称
	private String dwmc;//单位名称
	private String sbmc;//设备名称
	private String cdmc;//车道名称
	private String fxmc;//方向名称
	private String qymc;//区域名称
	private String hpysmc;//号牌颜色名称
	private String hpzlmc;//号牌种类名称
	 
	private String wfbs;//违法标识;
	private String  wfxwbh;//违法行为编号
	private String wfclbj;//违法处理标记
	
	private Date jssj;//接收时间
	private Date rksj;//入库时间
	private String id;//Row Key
	
	private String detaildesc;
	
	/**
	 * @return 原始数据包
	 */
	public byte[] getOrigBytes() {
		return origBytes;
	}

	/**
	 * @param 原始数据包
	 */
	public void setOrigBytes(byte[] origBytes) {
		this.origBytes = origBytes;
	}

	/**
	 * @return 密钥
	 */
	public String getKey() {
		return key;
	}

	/**
	 * @param 密钥
	 */
	public void setKey(String key) {
		this.key = key;
	}
	
	/**
	 * @return 图片信息
	 */
	public List<byte[]> getPics() {
		return pics;
	}

	/**
	 * @param 图片信息
	 */
	public void setPics(List<byte[]> pics) {
		this.pics = pics;
	}

	/**
	 * @return 所属地区
	 */
	public String getSsdq() {
		return ssdq;
	}

	/**
	 * @param 所属地区
	 */
	public void setSsdq(String ssdq) {
		this.ssdq = ssdq;
	}

	/**
	 * @return 车辆限速
	 */
	public Double getClxs() {
		return clxs;
	}

	/**
	 * @param 车辆限速
	 */
	public void setClxs(double clxs) {
		this.clxs = clxs;
	}

	/**
	 * @return 车辆信息编号
	 */
	public String getXxbh() {
		return xxbh;
	}

	/**
	 * @param 车辆信息编号
	 */
	public void setXxbh(String xxbh) {
		this.xxbh = xxbh;
	}

	/**
	 * @return 安装位置编号
	 */
	public String getKkbh() {
		return kkbh;
	}

	/**
	 * @param 安装位置编号
	 */
	public void setKkbh(String kkbh) {
		this.kkbh = kkbh;
	}

	/**
	 * @return 经过时间
	 */
	public Date getJgsj() {
		return jgsj;
	}

	/**
	 * @param 经过时间
	 */
	public void setJgsj(Date jgsj) {
		this.jgsj = jgsj;
	}

	/**
	 * @return 车道编号
	 */
	public String getCdbh() {
		return cdbh;
	}

	/**
	 * @param 车道编号
	 */
	public void setCdbh(String cdbh) {
		this.cdbh = cdbh;
	}

	/**
	 * @return 号牌号码
	 */
	public String getHphm() {
		return hphm;
	}

	/**
	 * @param 号牌号码
	 */
	public void setHphm(String hphm) {
		this.hphm = hphm;
	}

	/**
	 * @return 号牌颜色
	 */
	public String getHpys() {
		return hpys;
	}

	/**
	 * @param 号牌颜色
	 */
	public void setHpys(String hpys) {
		this.hpys = hpys;
	}

	/**
	 * @return 车尾号牌号码
	 */
	public String getCwhphm() {
		return cwhphm;
	}

	/**
	 * @param 车尾号牌号码
	 */
	public void setCwhphm(String cwhphm) {
		this.cwhphm = cwhphm;
	}

	/**
	 * @return 车尾号牌颜色
	 */
	public String getCwhpys() {
		return cwhpys;
	}

	/**
	 * @param 车尾号牌颜色
	 */
	public void setCwhpys(String cwhpys) {
		this.cwhpys = cwhpys;
	}

	/**
	 * @return 号牌一致
	 */
	public String getHpyz() {
		return hpyz;
	}

	/**
	 * @param 号牌一致
	 */
	public void setHpyz(String hpyz) {
		this.hpyz = hpyz;
	}

	/**
	 * @return 图像数量
	 */
	public Long getTxsl() {
		return txsl;
	}

	/**
	 * @param 图像数量
	 */
	public void setTxsl(Long txsl) {
		this.txsl = txsl;
	}

	/**
	 * @return 车辆速度
	 */
	public Double getClsd() {
		return clsd;
	}

	/**
	 * @param 车辆速度
	 */
	public void setClsd(Double clsd) {
		this.clsd = clsd;
	}

	/**
	 * @return 行驶状态
	 */
	public String getXszt() {
		return xszt;
	}

	/**
	 * @param 行驶状态
	 */
	public void setXszt(String xszt) {
		this.xszt = xszt;
	}

	/**
	 * @return 车辆品牌
	 */
	public String getClpp() {
		return clpp;
	}

	/**
	 * @param 车辆品牌
	 */
	public void setClpp(String clpp) {
		this.clpp = clpp;
	}

	/**
	 * @return 车辆外型
	 */
	public String getClwx() {
		return clwx;
	}

	/**
	 * @param 车辆外型
	 */
	public void setClwx(String clwx) {
		this.clwx = clwx;
	}

	/**
	 * @return 车身颜色
	 */
	public String getCsys() {
		return csys;
	}

	/**
	 * @param 车身颜色
	 */
	public void setCsys(String csys) {
		this.csys = csys;
	}

	/**
	 * @return 车辆类型
	 */
	public String getCllx() {
		return cllx;
	}

	/**
	 * @param 车辆类型
	 */
	public void setCllx(String cllx) {
		this.cllx = cllx;
	}

	/**
	 * @return 号牌种类
	 */
	public String getHpzl() {
		return hpzl;
	}

	/**
	 * @param 号牌种类
	 */
	public void setHpzl(String hpzl) {
		this.hpzl = hpzl;
	}

	/**
	 * @return 设备编号
	 */
	public String getSbbh() {
		return sbbh;
	}

	/**
	 * @param 设备编号
	 */
	public void setSbbh(String sbbh) {
		this.sbbh = sbbh;
	}

	/**
	 * @return 车身长度
	 */
	public Long getCscd() {
		return cscd;
	}

	/**
	 * @param 车身长度
	 */
	public void setCscd(Long cscd) {
		this.cscd = cscd;
	}

	/**
	 * @return 方向编号
	 */
	public String getFxbh() {
		return fxbh;
	}

	/**
	 * @param 方向编号
	 */
	public void setFxbh(String fxbh) {
		this.fxbh = fxbh;
	}

	/**
	 * @return 图像1
	 */
	public String getTx1() {
		return tx1;
	}

	/**
	 * @param 图像1
	 */
	public void setTx1(String tx1) {
		this.tx1 = tx1;
	}

	/**
	 * @return 图像2
	 */
	public String getTx2() {
		return tx2;
	}

	/**
	 * @param 图像2
	 */
	public void setTx2(String tx2) {
		this.tx2 = tx2;
	}

	/**
	 * @return 图像3
	 */
	public String getTx3() {
		return tx3;
	}

	/**
	 * @param 图像3
	 */
	public void setTx3(String tx3) {
		this.tx3 = tx3;
	}

	/**
	 * @return 图像4
	 */
	public String getTx4() {
		return tx4;
	}

	/**
	 * @param 图像4
	 */
	public void setTx4(String tx4) {
		this.tx4 = tx4;
	}

	/**
	 * @return 图像5
	 */
	public String getTx5() {
		return tx5;
	}

	/**
	 * @param 图像5
	 */
	public void setTx5(String tx5) {
		this.tx5 = tx5;
	}

	/**
	 * @return 图像6
	 */
	public String getTx6() {
		return tx6;
	}

	/**
	 * @param 图像6
	 */
	public void setTx6(String tx6) {
		this.tx6 = tx6;
	}

	/**
	 * @return 图像7
	 */
	public String getTx7() {
		return tx7;
	}

	/**
	 * @param 图像7
	 */
	public void setTx7(String tx7) {
		this.tx7 = tx7;
	}

	/**
	 * @return 图像8
	 */
	public String getTx8() {
		return tx8;
	}

	/**
	 * @param 图像8
	 */
	public void setTx8(String tx8) {
		this.tx8 = tx8;
	}
	
	/**
	 * -----------------------------------------------------------------------
	 * -----------------------------------------------------------------------
	 * 非协议属性
	 * -----------------------------------------------------------------------
	 * -----------------------------------------------------------------------
	 */
	
	public String getYlxxlx() {
		return ylxxlx;
	}

	public void setYlxxlx(String ylxxlx) {
		this.ylxxlx = ylxxlx;
	}

	public String getYlxx() {
		return ylxx;
	}

	public void setYlxx(String ylxx) {
		this.ylxx = ylxx;
	}

	public String getCj() {
		return cj;
	}

	public void setCj(String cj) {
		this.cj = cj;
	}

	public String getQydm() {
		return qydm;
	}

	public void setQydm(String qydm) {
		this.qydm = qydm;
	}

	public String getDwbh() {
		return dwbh;
	}

	public void setDwbh(String dwbh) {
		this.dwbh = dwbh;
	}

	public String getKkmc() {
		return kkmc;
	}

	public void setKkmc(String kkmc) {
		this.kkmc = kkmc;
	}

	public String getDwmc() {
		return dwmc;
	}

	public void setDwmc(String dwmc) {
		this.dwmc = dwmc;
	}

	public String getSbmc() {
		return sbmc;
	}

	public void setSbmc(String sbmc) {
		this.sbmc = sbmc;
	}

	public String getCdmc() {
		return cdmc;
	}

	public void setCdmc(String cdmc) {
		this.cdmc = cdmc;
	}

	public String getFxmc() {
		return fxmc;
	}

	public void setFxmc(String fxmc) {
		this.fxmc = fxmc;
	}

	public String getQymc() {
		return qymc;
	}

	public void setQymc(String qymc) {
		this.qymc = qymc;
	}

	public String getWfbs() {
		return wfbs;
	}

	public void setWfbs(String wfbs) {
		this.wfbs = wfbs;
	}

	public String getWfxwbh() {
		return wfxwbh;
	}

	public void setWfxwbh(String wfxwbh) {
		this.wfxwbh = wfxwbh;
	}

	public String getWfclbj() {
		return wfclbj;
	}

	public void setWfclbj(String wfclbj) {
		this.wfclbj = wfclbj;
	}

	public Date getRksj() {
		return rksj;
	}

	public void setRksj(Date rksj) {
		this.rksj = rksj;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public void setClxs(Double clxs) {
		this.clxs = clxs;
	}

	public String getWfzt() {
		return wfzt;
	}

	public void setWfzt(String wfzt) {
		this.wfzt = wfzt;
	}

	public String getHpysmc() {
		return hpysmc;
	}

	public void setHpysmc(String hpysmc) {
		this.hpysmc = hpysmc;
	}

	public String getHpzlmc() {
		return hpzlmc;
	}

	public void setHpzlmc(String hpzlmc) {
		this.hpzlmc = hpzlmc;
	}

	public Date getJssj() {
		return jssj;
	}

	public void setJssj(Date jssj) {
		this.jssj = jssj;
	}

	/**
	 * 车辆品牌
	 * @return
	 */
	public String getBrand() {
		return brand;
	}
	public void setBrand(String brand) {
		this.brand = brand;
	}
	/**
	 * 车辆类型
	 * @return
	 */
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	/**
	 * 车辆年号
	 * @return
	 */
	public String getCaryear() {
		return caryear;
	}
	public void setCaryear(String caryear) {
		this.caryear = caryear;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}
	/**
	 * 置信度
	 * @return
	 */
	public int getScore() {
		return score;
	}
	public void setScore(int score) {
		this.score = score;
	}
	/**
	 * 车辆种类
	 * @return
	 */
	public String getClzl() {
		return clzl;
	}
	public void setClzl(String clzl) {
		this.clzl = clzl;
	}
	/**
	 * 挂件对象数量
	 * @return
	 */
	public String getDropnum() {
		return dropnum;
	}
	public void setDropnum(String dropnum) {
		this.dropnum = dropnum;
	}
	/**
	 * 纸巾盒数量
	 * @return
	 */
	public String getBoxnum() {
		return boxnum;
	}
	public void setBoxnum(String boxnum) {
		this.boxnum = boxnum;
	}
	/**
	 * 遮阳板标识
	 * @return
	 */
	public String getSunflag() {
		return sunflag;
	}
	public void setSunflag(String sunflag) {
		this.sunflag = sunflag;
	}
	/**
	 * 年检标数量
	 * @return
	 */
	public String getTagnum() {
		return tagnum;
	}
	public void setTagnum(String tagnum) {
		this.tagnum = tagnum;
	}
	/**
	 * 安全带标识
	 * @return
	 */
	public String getSeatbelt() {
		return seatbelt;
	}
	public void setSeatbelt(String seatbelt) {
		this.seatbelt = seatbelt;
	}

	public String getRowkeyStr() {
		return rowkeyStr;
	}

	public void setRowkeyStr(String rowkeyStr) {
		this.rowkeyStr = rowkeyStr;
	}
	
	public String getDetaildesc() {
		return detaildesc;
	}

	public void setDetaildesc(String detaildesc) {
		this.detaildesc = detaildesc;
	}

	@Override
	public String getRect() {
		// TODO Auto-generated method stub
		return rect;
	}

	@Override
	public void setRect(String rect) {
		this.rect=rect;
		
	}
	
}