package prj.projectname.camel;

import org.apache.camel.Exchange;
import org.apache.camel.Processor;
import org.apache.camel.builder.RouteBuilder;
import org.apache.camel.model.ModelCamelContext;
import org.apache.camel.spi.Registry;
import org.springframework.stereotype.Component;

import static java.rmi.registry.LocateRegistry.getRegistry;

/**
 * Created by Administrator on 2017/6/3.
 */
@Component("mainRoute")
public class MainRouteBuilder extends RouteBuilder {
    public MainRouteBuilder()
    {
        log.info("MainRouteBuilder");
    }
    @Override
    public void configure() throws Exception {
        //通过查看netty4文档发现,from的数据是consumer产生的,而producer则是只to
        //http://www.2cto.com/kf/201409/331438.html
        //netty4的例子
        //https://github.com/apache/camel/blob/master/components/camel-netty4/src/main/java/org/apache/camel/component/netty4/NettyProducer.java

        from("direct-vm:messageInput")
                .dynamicRouter(method(MessageSwitcher.class, "slip"));

        from("direct-vm:source").process(new Processor() {
            @Override
            public void process(Exchange exchange) throws Exception {
                exchange.getOut().setBody("hello");
            }
        }).to("log:msg");
    }
}
