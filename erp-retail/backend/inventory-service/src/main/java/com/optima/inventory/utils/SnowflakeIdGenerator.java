package com.optima.inventory.utils;

import cn.hutool.core.lang.Snowflake;
import cn.hutool.core.util.IdUtil;

public class SnowflakeIdGenerator {
    private static final Snowflake snowflake = IdUtil.getSnowflake(1, 1);

    public static long nextId() {
        return snowflake.nextId();
    }
}
