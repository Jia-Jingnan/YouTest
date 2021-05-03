package com.lilith.youtest.service;

import com.lilith.youtest.entity.ApiClassification;
import com.baomidou.mybatisplus.extension.service.IService;
import com.lilith.youtest.vo.ApiClassificationVO;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author Jingnan
 * @since 2021-05-03
 */
public interface ApiClassificationService extends IService<ApiClassification> {

    List<ApiClassificationVO> getWithApi(Integer projectId);
}
