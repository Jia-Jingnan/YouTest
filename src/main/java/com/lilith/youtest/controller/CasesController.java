package com.lilith.youtest.controller;


import com.lilith.youtest.common.CommonResult;
import com.lilith.youtest.entity.ApiRequestParam;
import com.lilith.youtest.entity.CaseParamValue;
import com.lilith.youtest.entity.Cases;
import com.lilith.youtest.service.CaseParamValueService;
import com.lilith.youtest.service.CasesService;
import com.lilith.youtest.vo.ApiVO;
import io.swagger.annotations.ApiOperation;
import org.apache.ibatis.annotations.Case;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author Jingnan
 * @since 2021-05-15
 */
@RestController
@RequestMapping("/cases")
public class CasesController {

    @Autowired
    private CasesService casesService;

    @ApiOperation(value = "添加测试集", httpMethod = "POST")
    @PostMapping("/add")
    public CommonResult add(Cases caseVo, ApiVO apiVO){

        casesService.add(caseVo, apiVO);
        return new CommonResult("1","添加测试集成功");

    }

}
