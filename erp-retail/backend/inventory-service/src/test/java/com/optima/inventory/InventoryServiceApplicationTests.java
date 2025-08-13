package com.optima.inventory;

import cn.hutool.core.lang.Snowflake;
import cn.hutool.core.util.IdUtil;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Date;

@SpringBootTest
class InventoryServiceApplicationTests {

	@Test
	void generateCurrentYearSnowflake() {
		// workerId=1, datacenterId=1
		Snowflake snowflake = IdUtil.getSnowflake(1, 1);

		long id = 1949523265442983936L;
		long ts = snowflake.getGenerateDateTime(id);

		System.out.println("Generated ID: " + id);
		System.out.println("Decoded Date: " + new Date(ts));
	}
}