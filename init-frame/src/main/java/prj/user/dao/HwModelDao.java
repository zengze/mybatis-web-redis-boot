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
* 映射接口类 HwModelDao
* happy-generator 1.0.0 生成于 2017-08-22 11:41:24
*/
@Mapper
@UserDataBase
public interface HwModelDao {
	public long insert(HwModel HwModel);
	public int delete(@Param(value="token") String token);
	public int update(HwModel HwModel);
	public HwModel getObj(@Param(value="token") String token);
	public PageMyBatis<HwModel> queryListByPageFully(PagingCriteria pagingCriteria);
	
	public List<HwModel> queryList();
	public List<HwModel> queryListFully();
	public HwModel searchOne(@Param("json") String json,@Param("name") String name,@Param("nt") String nt,@Param("token") String token);
	public List<HwModel> searchList(@Param("json") String json,@Param("name") String name,@Param("nt") String nt,@Param("token") String token);
	public int getCount();
	public HwModel getObjFully(@Param(value="token") String token);
	public Object[] keyString2Array(String value);
	public String keyArray2String(Object[] array);
	
}
