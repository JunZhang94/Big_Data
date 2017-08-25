package com.jp.tic.security.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

import com.jp.tic.framework.entity.PageEntity;

/**
 * <b>function:</b> 用户角色
 * @author hoojo
 * @createDate 2014-3-12 上午10:44:39
 * @file Role.java
 * @package com.jp.tic.security.entity
 * @project ZHSICS-Server
 * @blog http://blog.csdn.net/IBM_hoojo
 * @email hoojo_@126.com
 * @version 1.0
 */
@Entity
@Table(name = "SYS_ROLE")
public class UserRole extends PageEntity {

	private static final long serialVersionUID = -9049832685994124751L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator = "SEQ")
	@SequenceGenerator(name = "SEQ", sequenceName = "SEQ_SYS_ROLE")
	private Integer id;
	@Column(name = "ACTIONID")
	private Integer actionId;
	@Column(name = "ROLEID")
	private Integer roleId;
	private Date createdt;
	
	public UserRole(){
	}
	
	public UserRole(Integer actionId, Integer roleId, Date createdt) {
		super();
		this.actionId = actionId;
		this.roleId = roleId;
		this.createdt = createdt;
	}
	
	public UserRole(Integer id, Integer actionId, Integer roleId, Date createdt) {
		super();
		this.id = id;
		this.actionId = actionId;
		this.roleId = roleId;
		this.createdt = createdt;
	}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getActionId() {
		return actionId;
	}
	public void setActionId(Integer actionId) {
		this.actionId = actionId;
	}
	public Integer getRoleId() {
		return roleId;
	}
	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}
	public Date getCreatedt() {
		return createdt;
	}
	public void setCreatedt(Date createdt) {
		this.createdt = createdt;
	}
	
	
}
