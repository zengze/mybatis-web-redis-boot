package prj.projectname.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

/**
 * Created by bryan on 2017/8/1.
 */
@Configuration
@ConfigurationProperties(prefix = "token")
public class JWTConfig {

    private String secretKey;

    private int tokenExpires;

    private int tokenRefreshTTL;

    public int getTokenRefreshTTL() {
        return tokenRefreshTTL;
    }

    public void setTokenRefreshTTL(int tokenRefreshTTL) {
        this.tokenRefreshTTL = tokenRefreshTTL;
    }

    public String getSecretKey() {
        return secretKey;
    }

    public void setSecretKey(String secretKey) {
        this.secretKey = secretKey;
    }

    public int getTokenExpires() {
        return tokenExpires;
    }

    public void setTokenExpires(int tokenExpires) {
        this.tokenExpires = tokenExpires;
    }

    @Override
    public String toString() {
        return "JWTConfig{" +
                "secretKey='" + secretKey + '\'' +
                ", tokenExpires=" + tokenExpires +
                ", tokenRefreshTTL=" + tokenRefreshTTL +
                '}';
    }
}
