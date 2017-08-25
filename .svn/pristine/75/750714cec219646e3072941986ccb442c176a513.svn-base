package com.jp.tic.utils.kaptcha;

import java.awt.Graphics2D;
import java.awt.image.BufferedImage;

import com.google.code.kaptcha.GimpyEngine;
import com.google.code.kaptcha.NoiseProducer;
import com.google.code.kaptcha.util.Configurable;

/**
 * 自定义的验证码实现，去扭曲加噪点
 * @author 梁石光
 * @datetime 2013-05-30
 */
public class NoGimpy4Noise extends Configurable implements GimpyEngine {
	public BufferedImage getDistortedImage(BufferedImage baseImage) {
		NoiseProducer noiseProducer = getConfig().getNoiseImpl();
		BufferedImage distortedImage = new BufferedImage(baseImage.getWidth(), baseImage.getHeight(), 2);

		Graphics2D graph = (Graphics2D) distortedImage.getGraphics();
		graph.drawImage(baseImage, 0, 0, null, null);
		graph.dispose();

		noiseProducer.makeNoise(distortedImage, 0.1F, 0.1F, 0.25F, 0.25F);
		noiseProducer.makeNoise(distortedImage, 0.1F, 0.25F, 0.5F, 0.9F);
		return distortedImage;
	}
}
