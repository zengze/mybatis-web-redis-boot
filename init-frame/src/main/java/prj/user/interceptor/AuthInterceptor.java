package prj.user.interceptor;

import com.alibaba.fastjson.JSONObject;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static kit.common.JsonResult.error;

/**
 * com.ssx.shop.interceptor  -  Created by gaopeng on 2017/6/28.
 */
public class AuthInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if(request.getMethod().equals("OPTIONS"))
            return true;
        String authorization = request.getHeader("Authorization");
        if (authorization != null )
            return Boolean.TRUE;

        response.setStatus(401);
        response.getWriter().print(JSONObject.toJSON(error("Unauthorized")));
        // TODO 返回错误信息
        return Boolean.FALSE;

    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }
}
