package prj.projectname.camel;

import kit.common.ConnectorCallback;

import java.util.Map;

/**
 * Created by Administrator on 2017/6/11.
 */
public interface BeanCallback extends ConnectorCallback {

    @Override
    void process(Object msg, Map<String, Object> attribs);
}
