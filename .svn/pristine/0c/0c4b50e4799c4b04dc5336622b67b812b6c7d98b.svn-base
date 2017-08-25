package com.jp.tic.common.modal.oc;

import java.util.ArrayList;
import java.util.List;

import com.jp.tic.common.modal.IRunner;

public class OcModal {
	private List<IOcResource> resources=new ArrayList<IOcResource>();
	
	public void addResource(IOcResource resource){
		resources.add(resource);
	}
	
	public void run(IRunner runner){
		for(int i=0;i<resources.size();i++){
			resources.get(i).openResource();
		}
		
		runner.run();
		
		for(int i=0;i<resources.size();i++){
			resources.get(i).closeResource();
		}
	}
}
