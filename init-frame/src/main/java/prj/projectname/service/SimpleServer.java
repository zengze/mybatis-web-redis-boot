package prj.projectname.service;

import org.apache.camel.Produce;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.stereotype.Component;
import prj.projectname.camel.BeanCallback;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

/**
 *
 */
@Component("simpleServer")
@EnableAutoConfiguration
public class SimpleServer{
    //可以通过这个接口直接把数据传递给camel
    @Produce(uri = "direct-vm:source")
    BeanCallback beanCallback;


    //@PostConstruct
    public void init() throws Exception {

    }
    //@PreDestroy
    public void destory() {

    }
    @Value("${spring.profiles.active}")
    public void setPort(String profile) {


    }

}
