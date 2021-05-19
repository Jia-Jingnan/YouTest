package com.lilith.youtest.service.impl;

import com.lilith.youtest.entity.ApiRequestParam;
import com.lilith.youtest.entity.CaseParamValue;
import com.lilith.youtest.entity.Cases;
import com.lilith.youtest.mapper.CasesMapper;
import com.lilith.youtest.service.CaseParamValueService;
import com.lilith.youtest.service.CasesService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lilith.youtest.vo.ApiVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author Jingnan
 * @since 2021-05-15
 */
@Service
public class CasesServiceImpl extends ServiceImpl<CasesMapper, Cases> implements CasesService {

    @Autowired
    CaseParamValueService caseParamValueService;

    @Override
    public void add(Cases caseVo, ApiVO apiVO) {
        // 添加到cases
        this.save(caseVo);
        //2.批量添加到case_param_value
        List<ApiRequestParam> requestParamList = apiVO.getRequestParams();
        List<CaseParamValue> caseParamValueList = new ArrayList<>();
        for (ApiRequestParam requestParam : requestParamList) {
            CaseParamValue caseParamValue = new CaseParamValue();
            caseParamValue.setCaseId(apiVO.getId());
            caseParamValue.setApiRequestParamId(requestParam.getId());
            caseParamValue.setApiRequestParamValue(requestParam.getValue());
            caseParamValueList.add(caseParamValue);
        }

        caseParamValueService.saveBatch(caseParamValueList);
    }
}
