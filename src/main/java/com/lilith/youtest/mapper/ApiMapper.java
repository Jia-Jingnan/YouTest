package com.lilith.youtest.mapper;

import com.lilith.youtest.entity.Api;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author Jingnan
 * @since 2021-05-03
 */
public interface ApiMapper extends BaseMapper<Api> {

    @Select("SELECT * FROM api WHERE api_classification_id = #{apiClassificationId}")
    List<Api> findApi(Integer apiClassificationId);

}
