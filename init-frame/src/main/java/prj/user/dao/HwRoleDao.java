package prj.user.dao;
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
import prj.user.model.*;
/**
* 映射接口类 HwRoleDao
* happy-generator 1.0.0 生成于 2017-08-22 11:41:24
*/
@Mapper
@UserDataBase
public interface HwRoleDao {
	public long insert(HwRole HwRole);
	public int delete(@Param(value="token") String token);
	public int update(HwRole HwRole);
	public HwRole getObj(@Param(value="token") String token);
	public PageMyBatis<HwRole> queryListByPageFully(PagingCriteria pagingCriteria);
	
	public List<HwRole> queryList();
	public List<HwRole> queryListFully();
	public HwRole searchOne(@Param("tokenOfModel")String tokenOfModel,@Param("name") String name,@Param("nt") String nt,@Param("token") String token,@Param("type") String type);
	public List<HwRole> searchList(@Param("tokenOfModel")String tokenOfModel,@Param("name") String name,@Param("nt") String nt,@Param("token") String token,@Param("type") String type);
	public int getCount();
	public HwRole getObjFully(@Param(value="token") String token);
	public Object[] keyString2Array(String value);
	public String keyArray2String(Object[] array);
	
}
