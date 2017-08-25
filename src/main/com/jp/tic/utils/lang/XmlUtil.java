package com.jp.tic.utils.lang;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.CompactWriter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.StringWriter;
import java.io.Writer;

/**
 * XML工具类
 *
 * @author 梁石光
 * @datetime 2013-05-30
 */
public class XmlUtil {

    private static Logger logger = LoggerFactory.getLogger(XmlUtil.class);
    //实例化XStream
    public static final XStream xstream = new XStream();

    /**
     * 序列化对象为XML
     */
    public static String toXML(Object reqObj, Boolean isFormat) {
        //xml头部格式
        String xmlHead = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
        xstream.processAnnotations(reqObj.getClass());
        xstream.autodetectAnnotations(true);
        String xmlBody = "";
        try {
            //格式化输出
            if (isFormat) {
                xmlBody = "\n" + xstream.toXML(reqObj);
            } else {
                Writer writer = new StringWriter();
                xstream.marshal(reqObj, new CompactWriter(writer));
                xmlBody = writer.toString();
            }
        } catch (Exception e) {
            logger.error("序列化对象为XML不成功：{}", e);
        }

        logger.info("对象序列化的XML字符串:\n {}", xmlHead + xmlBody);
        return xmlHead + xmlBody;
    }

    /**
     * 根据XML反序列化为对象
     */
    public static <T> T fromXML(String xml, T resObj) {
        xstream.processAnnotations(resObj.getClass());
        xstream.autodetectAnnotations(true);
        try {
            resObj = (T) xstream.fromXML(xml);
        } catch (Exception e) {
            logger.error("XML反序列化为对象不成功：{}", e);
        }
        return resObj;
    }

    public static void main(String[] args) {

    }
}
