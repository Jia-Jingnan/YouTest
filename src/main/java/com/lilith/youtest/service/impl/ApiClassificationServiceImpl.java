package com.lilith.youtest.service.impl;

import com.lilith.youtest.entity.ApiClassification;
import com.lilith.youtest.mapper.ApiClassificationMapper;
import com.lilith.youtest.service.ApiClassificationService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.lilith.youtest.vo.ApiClassificationVO;
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
public class ApiClassificationServiceImpl extends ServiceImpl<ApiClassificationMapper, ApiClassification> implements ApiClassificationService {

    @Autowired
    private ApiClassificationMapper apiClassificationMapper;


    @Override
    public List<ApiClassificationVO> getWithApi(Integer projectId) {

        return apiClassificationMapper.getWithApi(projectId);
    }
}
