package kit.common;

import com.google.common.collect.Lists;
import org.mybatis.pagination.dto.PageMyBatis;
import org.mybatis.pagination.dto.datatables.PagingCriteria;
import org.mybatis.pagination.dto.datatables.SearchField;
import org.mybatis.pagination.dto.datatables.SortField;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.support.RequestContextUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.LinkedList;
import java.util.List;
import java.util.Locale;

public abstract class BaseController {

    @Autowired
    protected HttpServletRequest request;

    @Autowired
    protected ResourceBundleMessageSource _res;

    //@Autowired
    //protected AuthorizeHandle authorizeHandle;

    @InitBinder
    protected void initBinder(HttpServletRequest request, ServletRequestDataBinder binder) throws Exception {
        binder.registerCustomEditor(java.sql.Time.class, new TimeEditor());
        binder.registerCustomEditor(java.sql.Date.class, new DateEditor());
        binder.registerCustomEditor(java.sql.Timestamp.class, new DateTimeEditor());
    }

//    @ModelAttribute("view")//向模型对象中添加一个名为view的属性,这个对象保存着每个用户的视图属性
//    public Object getViewObj() {
//
//        return authorizeHandle.getViewObj(this.request);
//    }

//    @ModelAttribute("model")//向模型对象中添加一个名为model的属性,这个对象保存着每个用户的模型属性
//    public Object getModelObj() {
//        return authorizeHandle.getModelObj(this.request);
//    }
//
//    protected ModelAndView ajaxDone(int statusCode, String message, String forwardUrl) {
//        ModelAndView mav = new ModelAndView("ajaxDone");
//        mav.addObject("statusCode", statusCode);
//        mav.addObject("message", message);
//        mav.addObject("forwardUrl", forwardUrl);
//        return mav;
//    }

    protected List<Object> toList(PageMyBatis<?> objList) {
        List<Object> list = new LinkedList<Object>();
        for (Object obj : objList)
            list.add(obj);
        return list;

    }

    protected List<Object> toList(List<?> objList) {
        List<Object> list = new LinkedList<Object>();
        for (Object obj : objList)
            list.add(obj);
        return list;

    }

    /**
     * 简化查询方法的代码
     */
    protected PagingCriteria fillPagingCriteria(String pageNum, String numPerPage, String field, String keywords, String orderField, String orderDirection) {
        int intPage = Integer.parseInt(pageNum);
        int intPageSize = Integer.parseInt(numPerPage);
        int start = (intPage - 1) * intPageSize;

        List<SortField> sortFields = Lists.newArrayList();
        if (StringUtils.hasText(orderField))
            //这种大小写转换的规则，对于关联表的描述字段不适用
            //sortFields.add(new SortField(FormatSqlFieldName(orderField),orderDirection));
            sortFields.add(new SortField(orderField, orderDirection));

        List<SearchField> searchFields = Lists.newArrayList();
        if (StringUtils.hasText(field) && StringUtils.hasText(keywords))
            //这种大小写转换的规则，对于关联表的描述字段不适用
            //searchFields.add(new SearchField(FormatSqlFieldName(field), false,false, keywords));
            searchFields.add(new SearchField(field, false, false, keywords));
        PagingCriteria pc = PagingCriteria.createCriteriaWithAllParamter(start, intPageSize, intPage - 1, sortFields, searchFields);
        return pc;
    }

//    protected ModelAndView ajaxDoneSuccess(String message) {
//        return ajaxDone(200, message, "");
//    }
//
//    protected ModelAndView ajaxDoneError(String message) {
//        return ajaxDone(300, message, "");
//    }
//
//    protected ModelAndView ajaxDoneError(DataAccessException e) {
//        if (e instanceof DuplicateKeyException) {
//            return ajaxDone(300, getMessage("msg.db.duplicate"), "");
//        }
//        else {
//            return ajaxDone(300, e.getMessage(), "");
//        }
//
//    }

    protected String getMessage(String code) {
        return this.getMessage(code, new Object[]{});
    }

    protected String getMessage(String code, Object arg0) {
        return getMessage(code, new Object[]{arg0});
    }

    protected String getMessage(String code, Object arg0, Object arg1) {
        return getMessage(code, new Object[]{arg0, arg1});
    }

    protected String getMessage(String code, Object arg0, Object arg1, Object arg2) {
        return getMessage(code, new Object[]{arg0, arg1, arg2});
    }

    protected String getMessage(String code, Object arg0, Object arg1, Object arg2, Object arg3) {
        return getMessage(code, new Object[]{arg0, arg1, arg2, arg3});
    }

    protected String getMessage(String code, Object[] args) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        LocaleResolver localeResolver = RequestContextUtils.getLocaleResolver(request);
        Locale locale = localeResolver.resolveLocale(request);
        return _res.getMessage(code, args, locale);
    }

    static public String camelNameSqlName(String camelName) {
        StringBuffer sqlName = new StringBuffer();
        char curChar;
        for (int i = 0; i < camelName.length(); i++) {
            curChar = camelName.charAt(i);
            if (isUpperCase(curChar) && (i != 0)) {
                sqlName.append('_');
            }
            sqlName.append(curChar);
        }
        return sqlName.toString().toUpperCase();
    }

    public static boolean isUpperCase(char curChar) {
        if (curChar >= 'A' && curChar <= 'Z')
            return true;
        return false;
    }

    public static boolean isLowerCase(char curChar) {
        if (curChar >= 'a' && curChar <= 'z')
            return true;
        return false;
    }

    static public String FormatSqlFieldName(String field) {
        String[] secs = field.split("-");
        StringBuffer sqlFieldName = new StringBuffer();
        for (int i = 0; i < secs.length; i++) {
            if (i != 0)
                sqlFieldName.append('.');
            sqlFieldName.append(camelNameSqlName(secs[i]));


        }
        return sqlFieldName.toString();
    }
}
