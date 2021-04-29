package com.lilith.youtest.swagger;

/**
 * @Author:JiaJingnan
 * @Date: 下午9:05 2021/4/29
 */
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.web.context.WebServerInitializedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import java.net.Inet4Address;
import java.net.InetAddress;
import java.net.UnknownHostException;

/**
 * 控制台输出Swagger文档地址
 */
@Component
@Slf4j
public class SwaggerConfig implements ApplicationListener<WebServerInitializedEvent> {

    private int serverPort;

    @Override
    public void onApplicationEvent(WebServerInitializedEvent event) {
        try {
            // 获取应用名
            String appName = event.getApplicationContext().getApplicationName();
            InetAddress inetAddress = Inet4Address.getLocalHost();
            this.serverPort = event.getWebServer().getPort();
            log.info("YouTest启动成功！Swagger: http://"+inetAddress.getHostAddress()+":"+serverPort+ appName +"/swagger-ui.html");
        } catch (UnknownHostException e) {
            e.printStackTrace();
        }
    }
}
