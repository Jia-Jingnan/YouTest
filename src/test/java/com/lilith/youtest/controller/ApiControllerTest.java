package com.lilith.youtest.controller;

import com.lilith.youtest.BaseTest;
import com.lilith.youtest.common.CommonResult;
import com.lilith.youtest.vo.ApiListVO;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import static org.junit.Assert.*;

/**
 * @Author:JiaJingnan
 * @Date: 下午11:08 2021/5/6
 */
public class ApiControllerTest extends BaseTest {

    @Autowired
    private ApiController apiController;

    @Test
    public void showApiListByApiClassification() {
        CommonResult commonResult = apiController.showApiListByApiClassification(3);
        List<ApiListVO> data = (List<ApiListVO>) commonResult.getData();
        for (ApiListVO api : data) {
            System.out.println(api);

        }
    }
}