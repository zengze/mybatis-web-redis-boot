/**
 * 根据项目路径计算sqlite的路径
 */
package kit.common;
import org.apache.log4j.Logger;

/**
 * @author Administrator
 *
 */
public class DynamicProperty{
	final Logger logger = Logger.getLogger(DynamicProperty.class);
	String appDir;
	String format;
	public DynamicProperty()
	{
		//ex:"jdbc:sqlite:%{app_dir}/test.db3";
		//在mule.bat中要设置环境变量 app_dir
		//在eclipse的调试配置中,设置环境变量 app_dir=${project_loc}
		appDir = System.getProperty("app_dir");
		if(appDir == null)
			appDir = System.getenv("app_dir");
		 
		if(appDir == null)
			logger.error("app_dir is not set");
		else
		{
			int length = appDir.length();
			char last = appDir.charAt(length-1);
			if(last == '/' || last == '\\')
				appDir = appDir.substring(0,length-1);
			logger.info("app_dir is " + appDir);
		}
	}
	/**
	 * @return the format
	 */
	public String getFormat() {
		return format;
	}
	/**
	 * 变量中，涉及应用路径的要写成 %app_dir%,例如
	 * jdbc:sqlite:%app_dir%/test.db3
	 * @param format the format to set
	 */
	public void setFormat(String format) {
		this.format = format;
	}
	public String getValue()
	{
		String result;
		result = replaceEnviromentVariables(format);
		System.out.println("value = " + result);
		return result;
	}
	private String replaceEnviromentVariables(String format) {
		return format.replace("%{app_dir}",this.appDir);
	}
	
}
