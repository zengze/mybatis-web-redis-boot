package kit.common;

import org.springframework.validation.Errors;

import java.util.HashMap;

/**
 * Created by bryan on 2017/6/27.
 */
public class JsonResult {
    public static HashMap result(int code, String msg, Object data) {
        return result(code,msg,data,null);
    }
    public static HashMap result(int code, String msg, Object data,Object param) {
        HashMap hashMap = new HashMap();
        hashMap.put("code", code);
        hashMap.put("msg",msg);
        hashMap.put("data",data);
        if(param != null)
        hashMap.put("param",param);
        return hashMap;
    }
    /**
     * 返回错误信息
     * @param errors
     * @return
     */
    public static  HashMap error(Errors errors) {
        return result(500,errors.getAllErrors().get(0).getDefaultMessage(),"");

    }
    public static  HashMap ok() {
        return ok("");
    }

    public static  HashMap ok(Object message) {
        return result(200,"ok",message);
    }
    public static  HashMap ok(String message,Object data) {
        return result(200,message,data);
    }
    public static  HashMap ok(String message,Object data,Object param) {
        return result(200,message,data,param);
    }
    public static  HashMap error(String message,Object data) {
        return result(400,message,data);
    }
    public static  HashMap error(String message) {
        return result(400,message,"");
    }
    public static  HashMap error(Exception error) {
        return result(400,error.getLocalizedMessage(),"");
    }
}
