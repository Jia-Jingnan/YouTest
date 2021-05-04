package com.lilith.youtest.controller;


import com.lilith.youtest.common.CommonResult;
import com.lilith.youtest.service.ApiClassificationService;
import com.lilith.youtest.vo.ApiClassificationVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author Jingnan
 * @since 2021-05-03
 */
@RestController
@RequestMapping("/apiClassification")
public class ApiClassificationController {

    @Autowired
    private ApiClassificationService apiClassificationService;

    public CommonResult getWithApi(Integer projectId, Integer tab) {
        CommonResult commonResult = null;
        if (tab == 1) {
            // 接口列表
            List<ApiClassificationVO> list = apiClassificationService.getWithApi(projectId);
            commonResult = new CommonResult("1", list, "查询分类同时延迟加载API列表");
        } else {
            // 测试集合

        }
        return commonResult;
    }

}
