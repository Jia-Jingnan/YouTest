package com.lilith.youtest.service.impl;

import com.lilith.youtest.entity.Api;
import com.lilith.youtest.mapper.ApiMapper;
import com.lilith.youtest.service.ApiService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lilith.youtest.vo.ApiListVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author Jingnan
 * @since 2021-05-03
 */
@Service
public class ApiServiceImpl extends ServiceImpl<ApiMapper, Api> implements ApiService {

    @Autowired
    private ApiMapper apiMapper;

    @Override
    public List<ApiListVO> showApiListByApiClassification(Integer apiClassificationId) {
        return apiMapper.showApiListByApiClassification(apiClassificationId);
    }

    @Override
    public List<ApiListVO> showApiListByProject(Integer projectId) {

        return apiMapper.showApiListByProject(projectId);
    }
}
