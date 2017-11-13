package prj.projectname.camel;

import org.apache.camel.ExchangeProperties;

import java.util.Map;

/**
 * 动态路由器
 */
public class MessageSwitcher {
    /**
     *
     * @param body 消息体
     * @param properties 消息体的属性
     * @return 路由的名字
     */
    public String slip(String body, @ExchangeProperties Map<String, Object> properties) {
        String target = (String)properties.get("target");
//        if (invoked == 1) {
//            return "mock:a";
//        } else if (invoked == 2) {
//            return "mock:b,mock:c";
//        } else if (invoked == 3) {
//            return "direct:foo";
//        } else if (invoked == 4) {
//            return "mock:result";
//        }
        //ex: direct-vm:source
        return target;
    }
}
