package prj.user.controller;

import com.alibaba.fastjson.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import kit.common.JWTUtil;
import kit.common.Token;
import prj.projectname.config.JWTConfig;
import prj.user.dao.HwUserDao;
import prj.user.model.HwUser;

import java.io.UnsupportedEncodingException;
import java.util.Map;

import static kit.common.JsonResult.error;
import static kit.common.JsonResult.ok;
/**
 * Created by bryan on 2017/8/1.
 */
@Controller
@RequestMapping(value = "/prj_user/login")
public class LoginController {

    @Autowired
    HwUserDao hwUserDao;
    @Autowired
    JWTConfig jwtConfig;

    @ResponseBody
    @RequestMapping(method= RequestMethod.POST)
    public  Map<String,Object> login(@RequestBody HwUser param) {

        HwUser hwUser=hwUserDao.searchOne(null,null,param.getPassword(),null,null,null,param.getUsername());
        try {
            if(hwUser!=null) {
                Token token = JWTUtil.creatJwtStr(JSONObject.toJSONString(hwUser), jwtConfig.getSecretKey(), jwtConfig.getTokenExpires());
                return ok(token.getToken());
            }
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
            return error("server error");
        }
        return error("username or password error");

    }

    @ResponseBody
    @RequestMapping(value = "/test",method= RequestMethod.GET)
    public  Map<String,Object> test() {
        return error("username or password error");

    }
}
