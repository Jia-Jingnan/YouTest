package com.lilith.youtest.swagger;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * @Author:JiaJingnan
 * @Date: 下午8:59 2021/4/29
 */
@Configuration
@EnableSwagger2
public class SwaggerConfiguration {
    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .apiInfo(buildApiInfo())
                .select()
                // 指定package下的接口显示在接口文档中
                .apis(RequestHandlerSelectors.basePackage("com.lilith.youtest.controller"))
                .paths(PathSelectors.any())
                .build();
    }

    private ApiInfo buildApiInfo() {
        return new ApiInfoBuilder()
                .title("YouTest接口文档")
                .contact(new Contact("贾敬楠", null, "875480307@qq.com"))
                .description("YouTest测试平台接口文档")
                .termsOfServiceUrl("https://github.com/Jia-Jingnan/YouTest")
                .version("0.0.1-SNAPSHOT")
                .build();
    }
}

