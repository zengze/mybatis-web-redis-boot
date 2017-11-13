package prj.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import prj.user.dao.HwUserDao;

/**
 * Created by bryan on 2017/8/1.
 */
public class HwUserService {

    @Autowired
    HwUserDao hwUserDao;

    public static boolean hasAuthorization(){

        return true;
    }

}
