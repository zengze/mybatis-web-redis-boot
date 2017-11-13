package prj.user.interceptor;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import prj.projectname.service.TokenService;
import prj.user.dao.HwUserDao;
import prj.user.dao.HwViewDao;
import prj.user.model.HwUser;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static kit.common.JsonResult.error;

/**
 * com.ssx.shop.interceptor  -  Created by gaopeng on 2017/6/28.
 */
public class RoleInterceptor implements HandlerInterceptor {

    @Autowired
    TokenService tokenService;
    @Autowired
    HwUserDao hwUserDao;
    @Autowired
    HwViewDao hwViewDao;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//
        if(request.getMethod().equals("OPTIONS"))
            return true;
        String authorization = request.getHeader("Authorization");
        String method=request.getMethod();
        if(authorization != null && authorization.startsWith("Bearer ")){
            String token = authorization.replace("Bearer ", "");
            try {

                DecodedJWT decodedJWT = tokenService.parseToken(token);
                HwUser hwUser = JSONObject.parseObject(decodedJWT.getSubject(),HwUser.class);
//                String username=decodedJWT.getSubject();
                boolean res = hasAuthorization(request.getServletPath(),method,hwUser.getTokenOfRole());
                if(!res){
                    //权限验证没有通过
                    response.getWriter().print(error("user do not have permission"));
                    return false;
                }
                return true;
            }
            catch (TokenExpiredException e){
                //token过期
                response.setStatus(401);
                response.getWriter().print(error("token expired"));
                return false;
            }
            catch (Exception e){
                e.printStackTrace();
                //token验证失败
                response.setStatus(401);
                response.getWriter().print(error("token check error"));
                return false;
            }
        }
        return false;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }

 private boolean hasAuthorization(String path,String method,String tokenOfRole){

//        if(path.equals("/error")){
//            return false;
//        }
//        String[] strs=path.split("/");
//        HwView hwView=hwViewDao.searchOne(null,null,null,null,tokenOfRole,null);
//        if(hwView == null) return false;
//        JSONObject jsonObject= JSON.parseObject(hwView.getJson());
//        if(jsonObject.get("permission")==null){
//            return false;
//        }
        return true;
        //return checkRight(method,jsonObject,strs);
    }

    private boolean checkRight(String method, JSONObject jsonObject, String[] path) {
        JSONArray permission=(JSONArray) ((JSONObject)jsonObject.get("permission")).get(path[2]);
        if(permission==null){
            return false;
        }
        if(path.length==4){
            if(path[3].equals("delete")){
                if(permission.contains("delete")){//删除多个
                    return true;
                }
            }else if(path[3].equals("list")){//根据条件查询
                if(permission.contains("query")){
                    return true;
                }
            }else if(method.equals("DELETE")){//删除单个
                if(permission.contains("delete")){
                    return true;
                }
            }else if(method.equals("GET")){//查询单个
                if(permission.contains("query")){
                    return true;
                }
            }
        }else if(path.length==3){
            if(method.equals("POST")){
                if(permission.contains("add")){//添加
                    return true;
                }
            }else if(method.equals("PUT")){
                if(permission.contains("update")){//修改
                    return true;
                }
            }else if(method.equals("GET")){
                if(permission.contains("query")){//查询列表
                    return true;
                }
            }
        }
        return false;

    }
}
