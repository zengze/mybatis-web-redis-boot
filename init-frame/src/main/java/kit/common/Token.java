package kit.common;

/**
 * Created by bryan on 2017/8/1.
 */
public class Token {

    private String token;
    private int expireTime;

    public Token(String token, int expireTime) {
        this.token = token;
        this.expireTime = expireTime;
    }

    public int getExpireTime() {
        return expireTime;
    }

    public void setExpireTime(int expireTime) {
        this.expireTime = expireTime;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }



    @Override
    public String toString() {
        return "Token{" +
                "token='" + token + '\'' +
                ", expireTime=" + expireTime +
                '}';
    }
}
