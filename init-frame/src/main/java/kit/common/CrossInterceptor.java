package kit.common;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by bryan on 2017/3/27.
 */
public class CrossInterceptor extends HandlerInterceptorAdapter {
    /**
     * 此方法用于跨域，post+json方式的请求不能通过此方法跨域
     * @param request
     * @param response
     * @param handler
     * @return
     * @throws Exception
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        response.setHeader("Access-Control-Allow-Origin",request.getHeader("Origin"));
        response.setHeader("Access-Control-Allow-Methods","GET,POST,PUT,DELETE");
        response.setHeader("Access-Control-Max-Age","100");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type，Authorization");
        response.setHeader("Access-Control-Allow-Credentials","true");
        return super.preHandle(request, response, handler);
    }
}
