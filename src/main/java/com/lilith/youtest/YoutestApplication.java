package com.lilith.youtest;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@SpringBootApplication
@EnableSwagger2
@MapperScan(basePackages = "com.lilith.youtest.mapper")
@EnableTransactionManagement
public class YoutestApplication {

    public static void main(String[] args) {
        SpringApplication.run(YoutestApplication.class, args);
    }

}
