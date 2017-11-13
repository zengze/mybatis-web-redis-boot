package kit.common;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;

import java.io.UnsupportedEncodingException;
import java.util.*;

/**
 * Created by bryan on 2017/8/1.
 */
public class JWTUtil {

    public static final String ISSUER = "com.ssx";

    public static Token creatJwtStr(String subject, String secretKey, int expireTime) throws UnsupportedEncodingException {
        Map<String,Object> headerClaims = new HashMap<>();

        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        String token = JWT.create()
                .withIssuer(JWTUtil.ISSUER)
                .withExpiresAt(JWTUtil.getExpiryDate(expireTime))
                .withSubject(subject)
                .withHeader(headerClaims)
                .withJWTId(getJWTId())
                .sign(algorithm);

        return new Token(token, expireTime);

    }

    public static Date getExpiryDate(int minutes) {
        // 根据当前日期，来得到到期日期
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(new Date());
        calendar.add(Calendar.MINUTE, minutes);
        return calendar.getTime();
    }

    public static DecodedJWT verifyJWT(String JWTStr, String secretKey) throws UnsupportedEncodingException,SignatureVerificationException,TokenExpiredException, JWTVerificationException {
        Algorithm algorithm = Algorithm.HMAC256(secretKey);
        JWTVerifier verifier = JWT.require(algorithm)
                .withIssuer(JWTUtil.ISSUER)
                .build(); //Reusable verifier instance
        System.out.println(JWTStr);
        DecodedJWT jwt = verifier.verify(JWTStr);
        return jwt;
    }

    /**
     * 刷新token
     * @param oldToken 过期的token
     * @param secretKey 秘钥
     * @param refresh_ttl 刷新时间
     * @return
     */
    public static Token refreshToken(String oldToken, String secretKey, int expireTime,  int refresh_ttl) throws Exception {

        DecodedJWT jwt = JWT.decode(oldToken);
        Date tokenExAt = jwt.getExpiresAt();
        String subject = jwt.getSubject();
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(tokenExAt);
        calendar.add(Calendar.MINUTE, refresh_ttl);
        if(new Date().after(calendar.getTime()))
            //TODO 超过过期时间
            throw new Exception("超过token的刷新时间，请重新登录");

        return JWTUtil.creatJwtStr(subject, secretKey, expireTime);
    }

    /**
     * 生成主键(16位数字)
     * 主键生成方式,年月日时分秒毫秒的时间戳+四位随机数保证不重复
     */
    public static  String getJWTId() {
        //当前系统时间戳精确到毫秒
        Long simple=System.currentTimeMillis();
        //三位随机数
        int random=new Random().nextInt(900)+100;//为变量赋随机值100-999;
        return simple.toString()+random;
    }
}
