package prj.projectname.config;

import kit.common.CommonDataBase;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.pagination.PaginationInterceptor;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;

import javax.sql.DataSource;
import java.util.Properties;

/**
 * Created by bryan on 2017/7/31.
 */
@Configuration
@ConfigurationProperties(prefix = "mybatis.plugins.commonPageConfig")
@MapperScan(basePackages = "prj.projectname.dao", sqlSessionFactoryRef = "commonSqlSessionFactory", annotationClass = CommonDataBase.class)
public class CommonDataConfiguration {



    @Bean(name = "commonDataSource")
    @ConfigurationProperties("spring.datasource.common")
    public DataSource masterDataSource() {
        return DataSourceBuilder.create().build();
    }

    @Bean(name="commonPageConfig")
    public PaginationInterceptor paginationInterceptor() {
        Properties p=new Properties();
        p.put("dbms",this.getDbms());
        p.put("sqlRegex",this.getSqlRegex());
        PaginationInterceptor page = new PaginationInterceptor();
        page.setProperties(p);
        return page;
    }


    @Bean(name = "commonSqlSessionFactory")
    public SqlSessionFactory sqlSessionFactory(@Qualifier("commonDataSource") DataSource dataSource,@Qualifier("commonPageConfig") PaginationInterceptor pageConfig) throws Exception {
        SqlSessionFactoryBean sessionFactoryBean = new SqlSessionFactoryBean();
        sessionFactoryBean.setDataSource(dataSource);
        sessionFactoryBean.setTypeAliasesPackage("prj.projectname.model");
        Interceptor[] interceptors = {pageConfig};
        sessionFactoryBean.setPlugins(interceptors);
        sessionFactoryBean.setMapperLocations(new PathMatchingResourcePatternResolver().getResources("classpath*:prj/projectname/dao/*.xml"));
        return sessionFactoryBean.getObject();
    }

    @Bean(name = "commonTransactionManager")
    public DataSourceTransactionManager testTransactionManager(@Qualifier("commonDataSource") DataSource dataSource) {
        return new DataSourceTransactionManager(dataSource);
    }


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
}
