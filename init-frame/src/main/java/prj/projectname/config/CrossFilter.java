package prj.projectname.config;

import org.springframework.web.context.support.SpringBeanAutowiringSupport;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * Created by bryan on 2017/3/27.
 */
@WebFilter(urlPatterns = "/*", filterName = "crosFilter")
public class CrossFilter implements Filter {

//    /**
//     * 此方法用于post+json请求跨域
//     * @param request
//     * @param response
//     * @param filterChain
//     * @throws ServletException
//     * @throws IOException
//     */
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
//        if (request.getHeader("Access-Control-Request-Method") != null && "OPTIONS".equals(request.getMethod())) {
//            System.out.println("预检");
//            // CORS "pre-flight" request
//
//            response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
//            response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
//            response.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
//            response.setHeader("Access-Control-Max-Age", "1800");//30 min
//            response.setHeader("Access-Control-Allow-Credentials","true");
//            filterChain.doFilter(request, response);
//        }else{
//            // CORS "pre-flight" request
//            response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
//            response.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE");
//            response.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization");
//            response.setHeader("Access-Control-Max-Age", "1800");//30 min
//            response.setHeader("Access-Control-Allow-Credentials","true");
//            request.setCharacterEncoding("utf-8");
//            response.setCharacterEncoding("utf-8");
//
//            String sessionId=request.getHeader("Authorization");
//            System.out.println("Authorization---"+sessionId);
//
//            HttpSession session=request.getSession();
//            String id=session.getId();
//            System.out.println("sessionID---"+id);
//
//            String pageReq = request.getRequestURI();
//            System.out.println(pageReq);
//
//            System.out.println("*******************************************************");
//
//            if(pageReq.contains("/api/login")||pageReq.contains("css")){
//                filterChain.doFilter(request, response);
//            }else{
////                if(sessionId==null||sessionId.equals("")||!sessionId.equals(id)){
////                    JSONObject jsonObject=new JSONObject();
////                    jsonObject.put("code",-1);
////                    jsonObject.put("msg","sessionId timeout");
////                    response.getWriter().write(jsonObject.toJSONString());
////                }else{
////                    HwUser user=(HwUser) session.getAttribute(sessionId);
////                    System.out.println(user);
////                    filterChain.doFilter(request, response);
////                }
//
//                    filterChain.doFilter(request, response);
//
//            }
//        }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        SpringBeanAutowiringSupport.processInjectionBasedOnServletContext(this, filterConfig.getServletContext());
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        HttpServletResponse httpServletResponse = (HttpServletResponse) response;

        httpServletResponse.setCharacterEncoding("UTF-8");
        httpServletResponse.setContentType("application/json; charset=utf-8");
        //这里填写你允许进行跨域的主机ip
        httpServletResponse.setHeader("Access-Control-Allow-Origin", httpServletRequest.getHeader("Origin"));
        //允许的访问方法
        httpServletResponse.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE, PATCH");
        //Access-Control-Max-Age 用于 CORS 相关配置的缓存
        httpServletResponse.setHeader("Access-Control-Max-Age", "3600");
        httpServletResponse.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        httpServletResponse.setHeader("Access-Control-Allow-Credentials","true");
        chain.doFilter(request,response);
    }

    @Override
    public void destroy() {

    }
}
