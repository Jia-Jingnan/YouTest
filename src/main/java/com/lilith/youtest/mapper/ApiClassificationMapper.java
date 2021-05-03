package com.lilith.youtest.mapper;

import com.lilith.youtest.entity.ApiClassification;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author Jingnan
 * @since 2021-05-03
 */
public interface ApiClassificationMapper extends BaseMapper<ApiClassification> {

    // 两表 延迟加载 先查询分类信息，
}
