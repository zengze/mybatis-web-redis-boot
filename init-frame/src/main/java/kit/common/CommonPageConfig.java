package kit.common;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

/**
 * Created by bryan on 2017/8/2.
 */
//@Configuration
//@ConfigurationProperties(prefix = "mybatis.plugins.commonPageConfig")
public class CommonPageConfig {

    private String dbms;
    private String sqlRegex;

    public String getDbms() {
        return dbms;
    }

    public void setDbms(String dbms) {
        this.dbms = dbms;
    }

    public String getSqlRegex() {
        return sqlRegex;
    }

    public void setSqlRegex(String sqlRegex) {
        this.sqlRegex = sqlRegex;
    }

    @Override
    public String toString() {
        return "CommonPageConfig{" + "dbms='" + dbms + '\'' + ", sqlRegex='" + sqlRegex + '\'' + '}';
    }
}
