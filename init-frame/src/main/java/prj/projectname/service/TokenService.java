package prj.projectname.service;

import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.exceptions.SignatureVerificationException;
import com.auth0.jwt.exceptions.TokenExpiredException;
import com.auth0.jwt.interfaces.DecodedJWT;
import kit.common.JWTUtil;
import kit.common.Token;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import prj.projectname.config.JWTConfig;

import java.io.UnsupportedEncodingException;

/**
 * Created by bryan on 2017/8/1.
 */
@Service
public class TokenService {

    @Autowired
    JWTConfig jwtConfig;


    public DecodedJWT parseToken(String token) throws UnsupportedEncodingException, SignatureVerificationException, TokenExpiredException, JWTVerificationException {
        return JWTUtil.verifyJWT(token, jwtConfig.getSecretKey());
    }


    public Token ceateToken(String subject) {
        try {
            Token token = JWTUtil.creatJwtStr(subject, jwtConfig.getSecretKey(), jwtConfig.getTokenExpires());
            return token;
        } catch (Exception e) {
            return null;
        }
    }


    public Token refreshToken(String oldToken) throws Exception {
        try {
            Token token = JWTUtil.refreshToken(oldToken, jwtConfig.getSecretKey(), jwtConfig.getTokenExpires(), jwtConfig.getTokenRefreshTTL());
            return token;
        } catch (Exception e) {
            return null;
        }

    }
}
