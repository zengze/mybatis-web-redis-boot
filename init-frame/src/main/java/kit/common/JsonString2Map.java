package kit.common;

import com.alibaba.fastjson.JSON;
import org.apache.log4j.Logger;


public class JsonString2Map{
    public final static Logger log = Logger.getLogger(JsonString2Map.class);
	public Object json2Map(String json)
	{
		try
		{
			Object jsonObj = JSON.parse(json);
			if(jsonObj != null)
			{
				return jsonObj;
			}
		}
		catch(Exception e)
		{
			log.warn(e);
		}
		return null;
	}
}
