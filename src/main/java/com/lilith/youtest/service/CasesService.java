package com.lilith.youtest.service;

import com.lilith.youtest.entity.Cases;
import com.baomidou.mybatisplus.extension.service.IService;
import com.lilith.youtest.vo.ApiVO;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author Jingnan
 * @since 2021-05-15
 */
public interface CasesService extends IService<Cases> {

    void add(Cases caseVo, ApiVO apiVO);
}
