package com.lilith.youtest.mapper;

import com.lilith.youtest.entity.ApiRequestParam;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author Jingnan
 * @since 2021-05-07
 */
public interface ApiRequestParamMapper extends BaseMapper<ApiRequestParam> {

    @Select("SELECT * FROM api_request_param WHERE api_id = #{apiId}")
    List<ApiRequestParam> findAll(Integer apiId);

}
