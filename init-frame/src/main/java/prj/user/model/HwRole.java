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
* 实体类 HwRole
* happy-generator 1.0.0 生成于 2017-08-22 11:41:23
*/
public class HwRole implements Serializable{

	private String tokenOfModel;
	private String modelDesp;
	private String name;
	private String nt;
	private String token;
	private String type;

	public String getModel()
	{
		Object[] keys = {tokenOfModel};				
		return HwModel.keyArray2String(keys);
	};
	public void setModel(String text)
	{
		this.tokenOfModel = (String)HwModel.getItemInKeyString(text,0);
				
	};
	
	public void setTokenOfModel(String tokenOfModel)
	{
		this.tokenOfModel = tokenOfModel;
	};	
	
	public String getTokenOfModel()
	{
		return this.tokenOfModel;
	};
	
	public void setModelDesp(String modelDesp)
	{
		this.modelDesp = modelDesp;
	};	
	public String getModelDesp()
	{
		return this.modelDesp;
	};
	
	
	public void setName(String name)
	{
		this.name = name;
	};	
	
	public String getName()
	{
		return this.name;
	};
	
	public void setNt(String nt)
	{
		this.nt = nt;
	};	
	
	public String getNt()
	{
		return this.nt;
	};
	
	public void setToken(String token)
	{
		this.token = token;
	};	
	
	public String getToken()
	{
		return this.token;
	};
	
	public void setType(String type)
	{
		this.type = type;
	};	
	
	public String getType()
	{
		return this.type;
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
