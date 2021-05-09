package com.lilith.youtest.mapper;

import com.lilith.youtest.entity.Api;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.lilith.youtest.vo.ApiListVO;
import com.lilith.youtest.vo.ApiVO;
import org.apache.ibatis.annotations.Many;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
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

    @Select("SELECT t1.*,t2.NAME classificationName FROM api t1, api_classification t2 WHERE t2.id = #{apiClassificationId} AND t1.api_classification_id = t2.id")
    List<ApiListVO> showApiListByApiClassification(Integer apiClassificationId);

    @Select("SELECT t1.*, t2.username createUsername from api t1, user t2 where t1.create_user = t2.id and t1.id = #{apiId}")
    @Results({
            @Result(property = "id", column = "id"),
            @Result(property = "requestParams", column = "id", many = @Many(select="com.lilith.youtest.mapper.ApiRequestParamMapper.findAll"))
    })
    ApiVO findApiViewVO(Integer apiId);

}
