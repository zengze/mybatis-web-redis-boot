package prj.projectname.interceptor;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import prj.user.interceptor.AuthInterceptor;
import prj.user.interceptor.RoleInterceptor;

import java.util.HashSet;
import java.util.Set;

/**
 * com.ssx.shop.interceptor  -  Created by gaopeng on 2017/6/28.
 */
@Configuration
public class InterceptorConfig extends WebMvcConfigurerAdapter {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {

        Set<String> excludePathSet = new HashSet<>();
        excludePathSet.add("/prj_user/login");
        excludePathSet.add("/prj_user/login/test");
        excludePathSet.add("/prject_name/");
        excludePathSet.add("/prject_name/wradmab");
//        excludePathSet.add("/api/refreshToken");
//        excludePathSet.add("/api/test");
//        excludePathSet.add("/api/update");
//        excludePathSet.add("/error");

        // 多个拦截器组成一个拦截器链
        // addPathPatterns 用于添加拦截规则
        // excludePathPatterns 用户排除拦截
        registry.addInterceptor(authInterceptor()).addPathPatterns("/**")
                .excludePathPatterns(excludePathSet.toArray(new String[excludePathSet.size()]));
        registry.addInterceptor(roleInterceptor()).addPathPatterns("/**")
                .excludePathPatterns(excludePathSet.toArray(new String[excludePathSet.size()]));
        super.addInterceptors(registry);
    }

    @Bean
    public AuthInterceptor authInterceptor(){
        return new AuthInterceptor();
    }

    @Bean
    public RoleInterceptor roleInterceptor(){
        return new RoleInterceptor();
    }
}
