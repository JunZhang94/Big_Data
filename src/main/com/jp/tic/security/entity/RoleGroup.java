package com.jp.tic.security.entity;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

import org.hibernate.annotations.GenericGenerator;

import com.jp.tic.framework.entity.BaseEntity;

@Entity
@Table(name = "SYS_T_Roles")
public class RoleGroup extends BaseEntity {

	private static final long serialVersionUID = -3282681227568226740L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "SEQ")
	@GenericGenerator(name = "SEQ", strategy = "org.hibernate.id.IncrementGenerator")
	private int roleId;
	private String roleCode;
	private String roleName;
	private Timestamp createDate;
	private String createUser;
	private Byte isAdmin;
	@Transient
	private List<UserRole> roles = new ArrayList<UserRole>();

	/** default constructor */
	public RoleGroup() {
	}

	/** minimal constructor */
	public RoleGroup(String roleCode) {
		this.roleCode = roleCode;
	}

	/** full constructor */
	public RoleGroup(String roleCode, String roleName, Timestamp createDate, String createUser, Byte isAdmin) {
		this.roleCode = roleCode;
		this.roleName = roleName;
		this.createDate = createDate;
		this.createUser = createUser;
		this.isAdmin = isAdmin;
	}

	// Property accessors

	public int getRoleId() {
		return this.roleId;
	}

	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}

	public String getRoleCode() {
		return this.roleCode;
	}

	public void setRoleCode(String roleCode) {
		this.roleCode = roleCode;
	}

	public String getRoleName() {
		return this.roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public Timestamp getCreateDate() {
		return this.createDate;
	}

	public void setCreateDate(Timestamp createDate) {
		this.createDate = createDate;
	}

	public String getCreateUser() {
		return this.createUser;
	}

	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}

	public Byte getIsAdmin() {
		return this.isAdmin;
	}

	public void setIsAdmin(Byte isAdmin) {
		this.isAdmin = isAdmin;
	}

	public List<UserRole> getRoles() {
		return roles;
	}

	public void setRoles(List<UserRole> roles) {
		this.roles = roles;
	}
}