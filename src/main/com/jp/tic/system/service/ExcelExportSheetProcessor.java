package com.jp.tic.system.service;

import java.util.List;

import jxl.write.WritableSheet;


public interface ExcelExportSheetProcessor{
    
    public void process(WritableSheet sheet,List data ) throws Exception;
    
    
}
