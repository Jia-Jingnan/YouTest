package com.lilith.youtest.util;

import com.lilith.youtest.BaseTest;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;

import java.io.PrintStream;

import static org.junit.Assert.*;

/**
 * @Author:JiaJingnan
 * @Date: 上午1:02 2021/7/16
 */
public class JasyptUtilTest extends BaseTest {

    @Autowired
    JasyptUtil jasyptUtil;

    @Test
    public void getEncryptResult() {

        String user = jasyptUtil.getEncryptResult("youtest");
        System.out.println(user);
        String password = jasyptUtil.getEncryptResult("youtest");
        System.out.println(password);
    }

    @Test
    public void getDecryptResult() {
    }
}