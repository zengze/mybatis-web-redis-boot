package kit.common;

import java.util.HashMap;
import java.util.Map;

public class ResourceMap {
	private Map map = new HashMap();
	public ResourceMap()
	{
		this.map.put("user.add",true);
		this.map.put("user.del",false);
	}
	private Object getValue(String path,Object defValue)
	{
		if(!map.containsKey(path)) return defValue;
		return map.get(path);
	}
	public boolean getBooleanValue(String path,boolean defValue)
	{
		return (Boolean) getValue(path,defValue);
	}
	public String getStringValue(String path,String defValue)
	{
		return (String) getValue(path,defValue);
	}
	public int getIntValue(String path,int defValue)
	{
		return (Integer) getValue(path,defValue);
	}
	public float getFloatValue(String path,float defValue)
	{
		return (Float) getValue(path,defValue);
	}
	public double getFloatValue(String path,double defValue)
	{
		return (Double) getValue(path,defValue);
	}	
}
