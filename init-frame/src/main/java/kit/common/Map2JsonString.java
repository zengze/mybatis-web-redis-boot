package kit.common;

import com.alibaba.fastjson.JSON;
import org.apache.log4j.Logger;

import java.util.Map;

public class Map2JsonString {
    public final static Logger log = Logger.getLogger(Map2JsonString.class);
	public String map2String(Map map)
	{
		try
		{
			String jsonString = JSON.toJSON(map).toString();
			return jsonString;
		}
		catch(Exception e)
		{
			log.warn(e);
		}
		return null;
	}
}
