package com.lilith.youtest.service;

import com.lilith.youtest.entity.Api;
import com.baomidou.mybatisplus.extension.service.IService;
import com.lilith.youtest.vo.ApiListVO;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author Jingnan
 * @since 2021-05-03
 */
public interface ApiService extends IService<Api> {

    List<ApiListVO> showApiListByProject(Integer projectId);
}
