package com.optima.backend.POS_Service.order.application.utils;

import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.IdentifierGenerator;

import java.io.Serializable;

public class SnowflakeIdGenerator implements IdentifierGenerator {
    private static final Long EPOCH = 1609459200000L;
    private static  Long SEQUENCE = 0L;
    private static final Long MACHINE_ID = 1L;
    public static synchronized Long genarateId(){
        long timestamp = System.currentTimeMillis() - EPOCH;
        SEQUENCE = (SEQUENCE + 1)&4095;
        return (timestamp << 22) |(MACHINE_ID<<12)| SEQUENCE;
    }
    @Override
    public Serializable generate(SharedSessionContractImplementor session,Object object){
        return genarateId();
    }
}
