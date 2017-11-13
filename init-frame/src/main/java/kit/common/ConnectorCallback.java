package kit.common;

import java.util.Map;

/**
 * Created by Administrator on 2017/6/3.
 */
public interface ConnectorCallback {
    void process(Object msg, Map<String, Object> attribs);
}
