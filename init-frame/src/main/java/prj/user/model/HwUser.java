package prj.user.model;
import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.io.Serializable;
import kit.common.TypeConvert;
import org.hibernate.validator.constraints.*;
import javax.validation.constraints.*;
import kit.common.CombineKeysUtil;


/**
* 实体类 HwUser
* happy-generator 1.0.0 生成于 2017-08-22 11:41:23
*/
public class HwUser implements Serializable{

	private String alias;
	private String nt;
	private String password;
	private String tokenOfRole;
	private String roleDesp;
	private int state;
	private String token;
	private String username;

	
	public void setAlias(String alias)
	{
		this.alias = alias;
	};	
	
	public String getAlias()
	{
		return this.alias;
	};
	
	public void setNt(String nt)
	{
		this.nt = nt;
	};	
	
	public String getNt()
	{
		return this.nt;
	};
	
	public void setPassword(String password)
	{
		this.password = password;
	};	
	
	public String getPassword()
	{
		return this.password;
	};
	public String getRole()
	{
		Object[] keys = {tokenOfRole};				
		return HwRole.keyArray2String(keys);
	};
	public void setRole(String text)
	{
		this.tokenOfRole = (String)HwRole.getItemInKeyString(text,0);
				
	};
	
	public void setTokenOfRole(String tokenOfRole)
	{
		this.tokenOfRole = tokenOfRole;
	};	
	
	public String getTokenOfRole()
	{
		return this.tokenOfRole;
	};
	
	public void setRoleDesp(String roleDesp)
	{
		this.roleDesp = roleDesp;
	};	
	public String getRoleDesp()
	{
		return this.roleDesp;
	};
	
	
	public void setState(int state)
	{
		this.state = state;
	};	
	
	public int getState()
	{
		return this.state;
	};
	
	public void setToken(String token)
	{
		this.token = token;
	};	
	
	public String getToken()
	{
		return this.token;
	};
	
	public void setUsername(String username)
	{
		this.username = username;
	};	
	
	public String getUsername()
	{
		return this.username;
	};
	public String getId()
	{
		Object[] ret = {token};
		return keyArray2String(ret);
	}
	static public Object[] keyString2Array(String value)
	{
		String[] keys = CombineKeysUtil.splitKey(value);
		Object[] rets = {TypeConvert.String2String(keys[0])};
		return rets;
	}
	static public Object getItemInKeyString(String value,int index)
	{
		String[] keys = CombineKeysUtil.splitKey(value);
		Object[] rets = {TypeConvert.String2String(keys[0])};
		return rets[index];
	}
	static public String keyArray2String(Object[] array)
	{
		StringBuffer ret = new StringBuffer();
		for(int i = 0 ; i < array.length;i++)
		{
			if(i != 0) ret.append(CombineKeysUtil.getBreak());
			ret.append(array[i].toString());
		}
		return ret.toString();
	}
}
