package prj.projectname.dao;
import java.util.List;
import java.util.Map;
import org.apache.ibatis.annotations.Param;
import org.mybatis.pagination.dto.PageMyBatis;
import org.mybatis.pagination.dto.datatables.PagingCriteria;
import kit.common.*;
import org.apache.ibatis.annotations.Mapper;
import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.util.HashMap;
import prj.projectname.model.*;
/**
* 映射接口类 WrAdmaBDao
* happy-generator 1.0.0 生成于 2017-08-22 11:41:24
*/
@Mapper
@CommonDataBase
//@UserDataBase
public interface WrAdmaBDao {
	public long insert(WrAdmaB WrAdmaB);
	public int delete(@Param(value="orgCd") String orgCd);
	public int update(WrAdmaB WrAdmaB);
	public WrAdmaB getObj(@Param(value="orgCd") String orgCd);
	public PageMyBatis<WrAdmaB> queryListByPageFully(PagingCriteria pagingCriteria);
	
	public List<WrAdmaB> queryList();
	public List<WrAdmaB> queryListFully();
	public WrAdmaB searchOne(@Param("addr") String addr,@Param("email") String email,@Param("fax") String fax,@Param("fulldomain") String fulldomain,@Param("lrNm") String lrNm,@Param("menb") String menb,@Param("nt") String nt,@Param("orgCd") String orgCd,@Param("orgNm") String orgNm,@Param("orgScal") String orgScal,@Param("orgShnm") String orgShnm,@Param("orgTp") String orgTp,@Param("orgCdOfParent")String orgCdOfParent,@Param("partdomain") String partdomain,@Param("tel") String tel,@Param("ts") Timestamp ts,@Param("web") String web,@Param("zip") String zip);
	public List<WrAdmaB> searchList(@Param("addr") String addr,@Param("email") String email,@Param("fax") String fax,@Param("fulldomain") String fulldomain,@Param("lrNm") String lrNm,@Param("menb") String menb,@Param("nt") String nt,@Param("orgCd") String orgCd,@Param("orgNm") String orgNm,@Param("orgScal") String orgScal,@Param("orgShnm") String orgShnm,@Param("orgTp") String orgTp,@Param("orgCdOfParent")String orgCdOfParent,@Param("partdomain") String partdomain,@Param("tel") String tel,@Param("ts") Timestamp ts,@Param("web") String web,@Param("zip") String zip);
	public int getCount();
	public WrAdmaB getObjFully(@Param(value="orgCd") String orgCd);
	public Object[] keyString2Array(String value);
	public String keyArray2String(Object[] array);
	
}
