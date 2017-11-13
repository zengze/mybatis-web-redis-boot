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
* 映射接口类 HwUserDao
* happy-generator 1.0.0 生成于 2017-08-22 11:41:24
*/
@Mapper
@UserDataBase
public interface HwUserDao {
	public long insert(HwUser HwUser);
	public int delete(@Param(value="token") String token);
	public int update(HwUser HwUser);
	public HwUser getObj(@Param(value="token") String token);
	public PageMyBatis<HwUser> queryListByPageFully(PagingCriteria pagingCriteria);
	
	public List<HwUser> queryList();
	public List<HwUser> queryListFully();
	public HwUser searchOne(@Param("alias") String alias,@Param("nt") String nt,@Param("password") String password,@Param("tokenOfRole")String tokenOfRole,@Param("state") Integer state,@Param("token") String token,@Param("username") String username);
	public List<HwUser> searchList(@Param("alias") String alias,@Param("nt") String nt,@Param("password") String password,@Param("tokenOfRole")String tokenOfRole,@Param("state") Integer state,@Param("token") String token,@Param("username") String username);
	public int getCount();
	public HwUser getObjFully(@Param(value="token") String token);
	public Object[] keyString2Array(String value);
	public String keyArray2String(Object[] array);
	
}
