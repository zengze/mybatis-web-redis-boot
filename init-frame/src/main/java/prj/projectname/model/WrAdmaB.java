package prj.projectname.model;
import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.io.Serializable;
import kit.common.TypeConvert;
import org.hibernate.validator.constraints.*;
import javax.validation.constraints.*;
import kit.common.CombineKeysUtil;

import java.text.SimpleDateFormat;


/**
* 实体类 WrAdmaB
* happy-generator 1.0.0 生成于 2017-08-22 11:41:23
*/
public class WrAdmaB implements Serializable{

	private String addr = "";
	private String email= "";
	private String fax= "";
	private String fulldomain= "";
	private String lrNm= "";
	private String menb= "";
	private String nt= "";
	private String orgCd= "";
	private String orgNm= "";
	private String orgScal= "";
	private String orgShnm= "";
	private String orgTp= "";
	private String orgCdOfParent= "";
	private String parentDesp= "";
	private String partdomain= "";
	private String tel= "";
	private Timestamp ts;
	private String web= "";
	private String zip= "";

	
	public void setAddr(String addr)
	{
		this.addr = addr;
	};	
	
	public String getAddr()
	{
		return this.addr;
	};
	
	public void setEmail(String email)
	{
		this.email = email;
	};	
	
	@Email
	public String getEmail()
	{
		return this.email;
	};
	
	public void setFax(String fax)
	{
		this.fax = fax;
	};	
	
	public String getFax()
	{
		return this.fax;
	};
	
	public void setFulldomain(String fulldomain)
	{
		this.fulldomain = fulldomain;
	};	
	
	public String getFulldomain()
	{
		return this.fulldomain;
	};
	
	public void setLrNm(String lrNm)
	{
		this.lrNm = lrNm;
	};	
	
	public String getLrNm()
	{
		return this.lrNm;
	};
	
	public void setMenb(String menb)
	{
		this.menb = menb;
	};	
	
	public String getMenb()
	{
		return this.menb;
	};
	
	public void setNt(String nt)
	{
		this.nt = nt;
	};	
	
	public String getNt()
	{
		return this.nt;
	};
	
	public void setOrgCd(String orgCd)
	{
		this.orgCd = orgCd;
	};	
	
	public String getOrgCd()
	{
		return this.orgCd;
	};
	
	public void setOrgNm(String orgNm)
	{
		this.orgNm = orgNm;
	};	
	
	public String getOrgNm()
	{
		return this.orgNm;
	};
	
	public void setOrgScal(String orgScal)
	{
		this.orgScal = orgScal;
	};	
	
	public String getOrgScal()
	{
		return this.orgScal;
	};
	
	public void setOrgShnm(String orgShnm)
	{
		this.orgShnm = orgShnm;
	};	
	
	public String getOrgShnm()
	{
		return this.orgShnm;
	};
	
	public void setOrgTp(String orgTp)
	{
		this.orgTp = orgTp;
	};	
	
	public String getOrgTp()
	{
		return this.orgTp;
	};
	public String getParent()
	{
		Object[] keys = {orgCdOfParent};				
		return WrAdmaB.keyArray2String(keys);
	};
	public void setParent(String text)
	{
		this.orgCdOfParent = (String)WrAdmaB.getItemInKeyString(text,0);
				
	};
	
	public void setOrgCdOfParent(String orgCdOfParent)
	{
		this.orgCdOfParent = orgCdOfParent;
	};	
	
	public String getOrgCdOfParent()
	{
		return this.orgCdOfParent;
	};
	
	public void setParentDesp(String parentDesp)
	{
		this.parentDesp = parentDesp;
	};	
	public String getParentDesp()
	{
		return this.parentDesp;
	};
	
	
	public void setPartdomain(String partdomain)
	{
		this.partdomain = partdomain;
	};	
	
	public String getPartdomain()
	{
		return this.partdomain;
	};
	
	public void setTel(String tel)
	{
		this.tel = tel;
	};	
	
	public String getTel()
	{
		return this.tel;
	};
	public String getTsAsString()
	{  
		return new SimpleDateFormat ("yyyy-MM-dd HH:mm:ss").format(this.ts);
	};
	public void setTs(Timestamp ts)
	{
		this.ts = ts;
	};	
	
	public Timestamp getTs()
	{
		return this.ts;
	};
	
	public void setWeb(String web)
	{
		this.web = web;
	};	
	
	public String getWeb()
	{
		return this.web;
	};
	
	public void setZip(String zip)
	{
		this.zip = zip;
	};	
	
	@Range(max = 999999)
	public String getZip()
	{
		return this.zip;
	};
	public String getId()
	{
		Object[] ret = {orgCd};
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
