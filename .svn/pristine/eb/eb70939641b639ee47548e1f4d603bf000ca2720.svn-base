package com.jp.tic.analyze.service.impl;

import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.jp.tic.analyze.service.DealProcessService;

@Service
public class DealProcessServiceImpl implements DealProcessService {

	@Async
    public void asyncMethod(){
        try {
            //让程序暂停100秒，相当于执行一个很耗时的任务
            Thread.sleep(10000);
            System.out.println("最后进入------------------");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}
