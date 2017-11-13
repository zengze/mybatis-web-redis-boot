package prj.projectname.config;

import kit.common.UserDataBase;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.pagination.PaginationInterceptor;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.*;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import javax.sql.DataSource;
import java.util.Properties;

/**
 * Created by bryan on 2017/7/31.
 */
@Configuration
@ConfigurationProperties(prefix = "mybatis.plugins.userPageConfig")
@MapperScan(basePackages = "prj.user.dao", sqlSessionFactoryRef = "userSqlSessionFactory",annotationClass =UserDataBase.class )
public class UserDataConfiguration {

    //@ConditionalOnProperty(prefix="mybatis.plugins", name="userPageConfig", havingValue = "true")
    //@ConditionalOnExpression("'${mybatis.plugins.userPageConfig}'=='MYSQL'")


    @Bean(name = "userDataSource")
    @ConfigurationProperties("spring.datasource.user")
    @Primary
    public DataSource masterDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean(name="userPageConfig")
    public PaginationInterceptor paginationInterceptor() {
        Properties p=new Properties();
        p.put("dbms",this.getDbms());
        p.put("sqlRegex",this.getSqlRegex());
        PaginationInterceptor page = new PaginationInterceptor();
        page.setProperties(p);
        return page;
    }

    @Bean(name = "userSqlSessionFactory")
    @Primary
    public SqlSessionFactory sqlSessionFactory(@Qualifier("userDataSource") DataSource dataSource,@Qualifier("userPageConfig") PaginationInterceptor paginationInterceptor) throws Exception {
        SqlSessionFactoryBean sessionFactoryBean = new SqlSessionFactoryBean();
        sessionFactoryBean.setDataSource(dataSource);
        sessionFactoryBean.setTypeAliasesPackage("prj.user.model");
        Interceptor[] plugins={paginationInterceptor};
        sessionFactoryBean.setPlugins(plugins);
        sessionFactoryBean.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath*:prj/user/dao/*.xml"));
        return sessionFactoryBean.getObject();
    }

    @Bean(name = "userTransactionManager")
    @Primary
    public DataSourceTransactionManager testTransactionManager(@Qualifier("userDataSource") DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }

    private String dbms="MYSQL";
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
}
