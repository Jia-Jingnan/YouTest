package com.lilith.youtest.util;

import lombok.extern.slf4j.Slf4j;
import org.jasypt.encryption.StringEncryptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

/**
 * @Author:JiaJingnan
 * @Date: 下午8:07 2021/6/15
 */
@Slf4j
@Component
public class JasyptUtil {

    @Autowired
    StringEncryptor encryptor;

    // 加密
    public String getEncryptResult(String string) {
        String encryptResult = encryptor.encrypt(string);
        log.info("原字符串：{} ,加密后字符串: {}",string,encryptResult);
        return encryptResult;
    }

    // 解密
    public String getDecryptResult(String string) {
        String decryptResult = encryptor.decrypt(string);
        log.info("加密后字符串：{} ,原字符串: {}",string,decryptResult);
        return decryptResult;
    }

}