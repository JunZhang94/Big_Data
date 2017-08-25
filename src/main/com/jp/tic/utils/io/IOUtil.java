package com.jp.tic.utils.io;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileFilter;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.OutputStream;
import java.io.RandomAccessFile;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * IO工具类
 * @author 梁石光
 * @datetime 2013-05-30
 */
public class IOUtil {
	/**
	 * 判断指定目录或文件是否存在
	 * @author tanjianwen
	 */
	public static boolean isExists(String path) {
		File file = new File(path);
		return file.exists();
	}
	
	/**
	 * 获取目录的全部文件
	 * @author tanjianwen
	 * @param dir
	 * @return
	 */
	public static List<File> listFile(File dir) {
		File[] files = dir.listFiles(new FileFilter() {
			public boolean accept(File pathname) {
				return pathname.isFile();
			}
		});
		return new ArrayList<File>(Arrays.asList(files));
	}

	/**
	 * 获取目录的全部文件, 指定扩展名的文件
	 * @author tanjianwen
	 * @param dir
	 * @return
	 */
	public static List<File> listFile(File dir, final String ext) {

		File[] files = dir.listFiles(new FileFilter() {
			public boolean accept(File pathname) {
				return pathname.isFile() && pathname.getName().endsWith(ext);
			}
		});
		return new ArrayList<File>(Arrays.asList(files));
	}

	/**
	 * 递归获取目录的全部文件
	 * @author tanjianwen
	 * @param dir
	 * @return
	 */
	public static List<File> listAll(File dir) {
		List<File> all = listFile(dir);
		File[] subs = dir.listFiles(new FileFilter() {
			public boolean accept(File pathname) {
				return pathname.isDirectory();
			}
		});
		for (File sub : subs) {
			all.addAll(listAll(sub));
		}
		return all;
	}

	/**
	 * 递归获取目录的全部文件, 指定扩展名的文件
	 * @author tanjianwen
	 * @param dir
	 * @return
	 */
	public static List<File> listAll(File dir, String ext) {
		List<File> all = listFile(dir, ext);
		File[] subs = dir.listFiles(new FileFilter() {
			public boolean accept(File pathname) {
				return pathname.isDirectory();
			}
		});
		for (File sub : subs) {
			all.addAll(listAll(sub, ext));
		}
		return all;
	}

	/**
	 * 复制文件
	 * @author tanjianwen
	 * @param from 来源全路径文件名
	 * @param to 复制全路径文件名
	 */
	public static void cp(String from, String to) throws IOException {
		cp(new File(from), new File(to));
	}

	/**
	 * 复制文件
	 * @author tanjianwen
	 * @param from 来源文件
	 * @param to 复制文件
	 */
	public static void cp(File from, File to) throws IOException {
		FileInputStream in = new FileInputStream(from);
		OutputStream out = new FileOutputStream(to);
		cp(in, out);
		in.close();
		out.close();
	}

	/**
	 * 复制文件
	 * @author tanjianwen
	 * @param from 来源文件流
	 * @param to 复制文件流
	 */
	public static void cp(InputStream in, OutputStream out) throws IOException {
		// 1K byte 的缓冲区!
		byte[] buf = new byte[1024];
		int count;
		while ((count = in.read(buf)) != -1) {
			// System.out.println(count);
			out.write(buf, 0, count);
		}
		
		// in.close();
		// out.close();
	}
	
	/**
	 * 复制文件(可以捕抓复制进度)
	 * @author tanjianwen
	 * @param in
	 * @param out
	 * @param sessionID
	 */
	public static Map<String, Integer> currentRemainBytes = new HashMap<String, Integer>();//记载复制进度的map
	public static void cp(InputStream in, OutputStream out, String sessionID) throws IOException {
		currentRemainBytes.put(sessionID, in.available());
		// 1K byte 的缓冲区!
		byte[] buf = new byte[1024];
		int count;
		while ((count = in.read(buf)) != -1) {
			// System.out.println(count);
			out.write(buf, 0, count);
			currentRemainBytes.put(sessionID, in.available());
		}
		currentRemainBytes.put(sessionID, 0);
		// in.close();
		// out.close();
	}

	/**
	 * 从流中读取一行文本, 读取到一行的结束为止
	 * @author tanjianwen
	 * @param in
	 * @return 一行文本
	 */
//	public static String readLine(InputStream in, String charset)
//			throws IOException {
//		byte[] buf = {};
//		int b;
//		while (true) {
//			b = in.read();
//			if (b == '\n' || b == '\r' || b == -1) {// 编码是否是回车换行
//				break;
//			}
//			buf = Arrays.copyOf(buf, buf.length + 1);
//			buf[buf.length - 1] = (byte) b;
//		}
//		if (buf.length == 0 && b == -1)
//			return null;
//		return new String(buf, charset);
//	}

	/**
	 * 读取文件的全部内容到一个byte数组 可以缓存一个"小"文件到堆内存中
	 * @author tanjianwen
	 */
	public static byte[] read(String filename) throws IOException {
		return read(new File(filename));
	}

	/**
	 * 读取文件的全部内容到一个byte数组 可以缓存一个"小"文件到堆内存中
	 * @author tanjianwen
	 */
	public static byte[] read(File file) throws IOException {
		// 用RAF打开文件
		RandomAccessFile raf = new RandomAccessFile(file, "r");
		// 安装文件的长度开辟 缓冲区数组(byte数组)
		byte[] buf = new byte[(int) raf.length()];
		// 读取文件的缓冲区
		raf.read(buf);
		// 关闭文件(RAF)
		raf.close();
		// 返回缓冲区数组引用.
		return buf;
	}

	/**
	 * 读取文件的全部内容到一个byte数组 可以缓存一个"小"文件到堆内存中 如: 文件内容: ABC中 读取为: {41, 42, 43, d6,
	 * d0}
	 * @author tanjianwen
	 */
	public static byte[] read(InputStream in) throws IOException {
		byte[] ary = new byte[in.available()];
		in.read(ary);
		in.close();
		return ary;
	}

	/**
	 * 连接byte 数组的全部内容为字符串, 以hex(十六进制)形式连接 如: 数组{0x41, 0x42, 0x43, 0xd6, 0xd0}
	 * 结果: "[41, 42, 43, d6, d0]"
	 * @author tanjianwen
	 */
	public static String join(byte[] ary) {
		if (ary == null || ary.length == 0)
			return "[]";
		StringBuilder buf = new StringBuilder();
		buf.append("[").append(
				leftPad(Integer.toHexString(ary[0] & 0xff), '0', 2));
		for (int i = 1; i < ary.length; i++) {
			String hex = Integer.toHexString(ary[i] & 0xff);
			buf.append(",").append(leftPad(hex, '0', 2));
		}
		buf.append("]");
		return buf.toString();
	}

	/**
	 * 返回二进制字符串
	 * @author tanjianwen
	 * @param ary
	 * @return
	 */
	public static String toBinString(byte[] ary) {
		if (ary == null || ary.length == 0)
			return "[]";
		StringBuilder buf = new StringBuilder();
		buf.append("[").append(
				leftPad(Integer.toBinaryString(ary[0] & 0xff), '0', 8));
		for (int i = 1; i < ary.length; i++) {
			String hex = Integer.toBinaryString(ary[i] & 0xff);
			buf.append(",").append(leftPad(hex, '0', 8));
		}
		buf.append("]");
		return buf.toString();
	}

	/**
	 * 实现leftPad功能, 对字符串实现左填充
	 * @author tanjianwen
	 * @param str
	 *            被填充字符串: 5
	 * @param ch
	 *            填充字符: #
	 * @param length
	 *            填充以后的长度: 8
	 * @return "#######5"
	 */
	public static String leftPad(String str, char ch, int length) {
		if (str.length() == length) {
			return str;
		}
		char[] chs = new char[length];
		Arrays.fill(chs, ch);
		System.arraycopy(str.toCharArray(), 0, chs, length - str.length(), str
				.length());
		return new String(chs);
	}

	/**
	 * 切分文件, 如: file.dat 切分为 file.dat.0, file.dat.1 ...
	 * @author tanjianwen
	 * @param file
	 * @param size
	 *            大小, 以KByte为单位
	 */
	public static void split(String file, int size) throws IOException {
		if (size <= 0) {
			throw new IllegalArgumentException("error!");
		}
		int idx = 0;// 文件的序号
		InputStream in = new BufferedInputStream(new FileInputStream(file));
		OutputStream out = new BufferedOutputStream(new FileOutputStream(file
				+ "." + idx++));
		int b;
		int count = 0;
		while ((b = in.read()) != -1) {
			out.write(b);
			count++;
			if (count % (size * 1024) == 0) {
				out.close();
				out = new BufferedOutputStream(new FileOutputStream(file + "."
						+ idx++));
			}
		}
		in.close();
		out.close();
	}

	/**
	 * 将文件进行连接
	 * @author tanjianwen
	 * @param filename
	 *            是第一个文件名,如:file.dat.0
	 */
	public static void join(String file) throws IOException {
		String filename = file.substring(0, file.lastIndexOf("."));
		String num = file.substring(file.lastIndexOf(".") + 1);
		int idx = Integer.parseInt(num);
		OutputStream out = new FileOutputStream(filename);
		File f = new File(filename + "." + idx++);
		while (f.exists()) {
			InputStream in = new FileInputStream(f);
			cp(in, out);
			in.close();
			f = new File(filename + "." + idx++);
		}
		out.close();
	}

	/**
	 * 序列化对象
	 * @author tanjianwen
	 */
	public static byte[] Serialize(Serializable obj) throws IOException {
		ByteArrayOutputStream os = new ByteArrayOutputStream();
		ObjectOutputStream out = new ObjectOutputStream(os);
		out.writeObject(obj);// 对象序列化, foo
		out.close();
		byte[] ary = os.toByteArray();
		return ary;
	}

	/**
	 * 反序列化对象
	 * @author tanjianwen
	 * @param data
	 * @return
	 * @throws IOException
	 * @throws ClassNotFoundException
	 */
	public static Object Unserialize(byte[] data) throws IOException,
			ClassNotFoundException {
		ObjectInputStream in = new ObjectInputStream(new ByteArrayInputStream(
				data));
		Object o = in.readObject();// 反序列化
		in.close();
		return o;
	}

	/**
	 * 对象的深层赋值(克隆)
	 * @author tanjianwen
	 * @param obj
	 * @return 对象的副本
	 * @throws ClassNotFoundException
	 */
	public static Object clone(Serializable obj) throws IOException,
			ClassNotFoundException {
		return Unserialize(Serialize(obj));
	}

}
