package com.lilith.youtest.controller;

import com.lilith.youtest.BaseTest;
import com.lilith.youtest.common.CommonResult;
import com.lilith.youtest.entity.ApiClassification;
import com.lilith.youtest.mapper.ApiClassificationMapper;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.junit.Assert.*;

/**
 * @Author:JiaJingnan
 * @Date: 下午1:38 2021/5/4
 */
public class ApiClassificationControllerTest extends BaseTest {

    @Autowired
    private ApiClassificationController apiClassificationController;

    @Test
    public void getWithApi() {
        CommonResult result = apiClassificationController.getWithApi(1, 1);
        List<ApiClassification> apiClassificationList = (List<ApiClassification>)result.getData();
        assertEquals(4,apiClassificationList.size());
        for (ApiClassification apiClassification : apiClassificationList) {
            System.out.println(apiClassification);
        }

    }
}