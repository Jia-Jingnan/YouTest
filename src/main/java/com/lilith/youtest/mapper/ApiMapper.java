package com.lilith.youtest.mapper;

import com.lilith.youtest.entity.Api;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.lilith.youtest.vo.ApiListVO;
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

    @Select("SELECT t1.*,t2.NAME classificationName FROM api t1, api_classification t2 WHERE t1.api_classification_id = t2.id AND t2.project_id = #{projectId}")
    List<ApiListVO> showApiListByProject(Integer projectId);

}
