package com.jp.tic.common.net.tcp;

import java.io.IOException;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.net.Socket;
import java.net.SocketAddress;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentLinkedQueue;

import com.jp.tic.common.util.ThreadUtils;



public class TCPServer {
	protected String hostIP="127.0.0.1";
	private int port=30000;  
	
	private ServerSocket serverSocket;
	
	private long serverStartTime=0;
	
	private long acceptClientCount=0;
	
	private ITCPClientProcesser clientProcesser=new BaseTCPClientProcesser();
	
	protected Map<String,ConcurrentLinkedQueue<Socket>> clientChannels=new Hashtable<String,ConcurrentLinkedQueue<Socket>>();
	protected Map<String,Long> clientTotalCounts=new Hashtable<String,Long>();
	
	private List<DispacthTCPSocketProcesserEventListiner> listeners=new ArrayList<DispacthTCPSocketProcesserEventListiner>();
	
	protected ListeningThread listeningThread;
	protected List<Thread> clientProcesserThreads=new ArrayList<Thread>();
	
	protected ServerWatchingThread serverWatchingThread;
	protected ClientWatchingThread clientWatchingThread;
	
	public TCPServer(){
	}
	
	public TCPServer(int port){
		this.port=port;
	}
	
	public void setClientProcesser(ITCPClientProcesser clientProcesser) {
		this.clientProcesser = clientProcesser;
	}
	
	public ITCPClientProcesser getClientProcesser() {
		return clientProcesser;
	}

	public void setProtocol(ITCPProtocol protocol){
		if(clientProcesser!=null){
			clientProcesser.setProtocol(protocol);
		}
	}

	public void start() throws IOException{
		try {
			try{
				this.addEventListener(new DispacthTCPSocketProcesserEventListiner(){
					public void onAddClient(TCPServer sender, String clientName) {
						addProcessThreadForClient(clientName);
					}
		
					public void onRemoveClient(TCPServer sender, String clientName) {
					}
				});
			}
			catch(Exception ex){
				ex.printStackTrace();
			}
			
			serverSocket=new ServerSocket(port);   
			
			String localIP=InetAddress.getLocalHost().getHostAddress();
			
			listeningThread=new ListeningThread(this);
			listeningThread.setName(localIP+"_"+port+"-listening");
			listeningThread.setPriority(ThreadUtils.MAX_PRIORITY);
			listeningThread.setUncaughtExceptionHandler(ThreadUtils.LOG_UNCAUGHT_EXCEPTION_HANDLER);
			listeningThread.start();
			
			serverWatchingThread=new ServerWatchingThread(this);
			serverWatchingThread.setName(localIP+"_"+port+"-serverwatching");
			serverWatchingThread.setPriority(ThreadUtils.MIN_PRIORITY);
			serverWatchingThread.start();
			
			
			clientWatchingThread=new ClientWatchingThread(this);
			clientWatchingThread.setName(localIP+"_"+port+"-clientwatching");
			clientWatchingThread.setPriority(ThreadUtils.MIN_PRIORITY);
			clientWatchingThread.start();
			
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public void stop() {
		try {
			try{
				for(int threadIndex=0;threadIndex<this.clientProcesserThreads.size();threadIndex++){
					this.clientProcesserThreads.get(threadIndex).interrupt();
				}
			}
			catch(Exception ex){
				ex.printStackTrace();
			}
			
			clientWatchingThread.interrupt();
			
			serverWatchingThread.interrupt();
			
			listeningThread.interrupt();
			
			serverSocket.close();
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public void addEventListener(DispacthTCPSocketProcesserEventListiner listener){
		this.listeners.add(listener);
	}
	
	protected void process(Socket client) {
		final TCPServer self=this;
		final String key=client.getInetAddress().getHostAddress();
		if(key!=null){
			ConcurrentLinkedQueue<Socket> clients=clientChannels.get(key);
			if(clients==null){
				clients=new ConcurrentLinkedQueue<Socket>();
				clientChannels.put(key, clients);
				new Thread(new Runnable() {
					public void run() {
						for(int i=0;i<listeners.size();i++){
							listeners.get(i).onAddClient(self,key);
						}
					}
				}).start();
			}
			clients.add(client);
			
			this.increaseTotal4Client(key);
		}
		else{
			//ignore the client
			SocketAddress clientAddress=client.getRemoteSocketAddress();   
			System.out.println("server ignore the packet from "+clientAddress+":"+client.getPort()+".");
		}
	}
	
	private synchronized void increaseTotal4Client(String clientName){
		Long count=clientTotalCounts.get(clientName);
		if(count==null){
			count=new Long(0);
		}
		count++;
		clientTotalCounts.put(clientName, count);
		
		if(count%500<10){
			System.out.println(this.getClass()+":"+"total count of client "+clientName+" is "+count);
		}
	}
	
	protected void addProcessThreadForClient(String clientName){
		ClientProcessThread clientProcessThread=new ClientProcessThread(this,clientName);
		clientProcessThread.setName(Thread.currentThread().getName()+"-"+clientName);
		clientProcessThread.setPriority(ThreadUtils.MAX_PRIORITY);
		clientProcessThread.setUncaughtExceptionHandler(ThreadUtils.LOG_UNCAUGHT_EXCEPTION_HANDLER);
		clientProcessThread.start();
		clientProcesserThreads.add(clientProcessThread);
		System.out.println("add process thread for client:"+clientName);
	}
	
	private static class ListeningThread extends Thread{
		private TCPServer server;
		private int tempAcceptCount=0;
		
		public ListeningThread(TCPServer server){
			this.server=server;
		}
		public void run(){ 
			try{
				while (true && isInterrupted()==false) {
					
					Socket client=server.serverSocket.accept();   
		            
					if(client!=null&&client.isConnected()){
						if(server.serverStartTime==0){
							server.serverStartTime=Calendar.getInstance().getTimeInMillis();
						}
						server.acceptClientCount++;
						tempAcceptCount++;
						if(tempAcceptCount>100){
							tempAcceptCount=0;
			            	System.out.println(this.getClass()+":"+"Client Count="+server.acceptClientCount+" "+Calendar.getInstance().getTimeInMillis()+"-"+server.serverStartTime);  
			            }
						
						server.process(client);
					}
				}
			}
			catch(Exception ex){
				ex.printStackTrace();
			}
		}
	}
	
	private static class ClientProcessThread extends Thread{
		private String clientName;
		private TCPServer server;
		private int processedCount=0;
		private ITCPClientProcesser processer;
		private ConcurrentLinkedQueue<Socket> packetList;
		public ClientProcessThread(TCPServer server,String clientName){
			this.clientName=clientName;
			this.server=server;
			this.processer=server.clientProcesser;
			this.packetList=server.clientChannels.get(clientName);
		}
		public void run(){ 
			try{
				if(processer!=null){
					while (true && isInterrupted()==false) {
						while(packetList.size()>0){
							final Socket socket = packetList.poll();
							
							try{
								if(socket!=null && processer!=null){
									new Thread(new Runnable(){
										@Override
										public void run() {
											processer.process(socket, clientName);
										}
										
									}).start();
									
									processedCount++;
									if(processedCount%500==0){
										System.out.println(this.getClass()+":"+server.port+"---"+"client processed Count:"+processedCount+" left packet count:"+packetList.size());
									}
								}
							}
							catch(Exception ex){
								ex.printStackTrace();
							}
						}
						Thread.sleep(100);
					}
				}
			}
			catch(Exception ex){
				ex.printStackTrace();
			}
		}
	}
	
	private static class ServerWatchingThread extends Thread{
		private TCPServer server;
		private Calendar lastGCDate;
		private long lastCount=0;
		private SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		public ServerWatchingThread(TCPServer server){
			this.server=server;
			this.lastGCDate=Calendar.getInstance();
		}
		public void run(){ 
			try{
				if(server!=null){
					while (true && isInterrupted()==false) {
						long count=server.acceptClientCount;
						if(count-lastCount>=200){
							lastCount=count;
							System.out.println(this.getClass()+":"+"gc mannually at recievedPacketCount:"+server.acceptClientCount);
							System.gc();
						}
						
						Calendar now=Calendar.getInstance();
						if(now.compareTo(lastGCDate)>1000*2){
							System.out.println(this.getClass()+":"+"gc mannually at time:"+dateFormat.format(now));
							System.gc();
							lastGCDate=now;
						}
						
						ThreadUtils.tryRestartThread(server.listeningThread);
						ThreadUtils.tryRestartThread(server.clientWatchingThread);
						Thread.sleep(1000);
					}
				}
			}
			catch(Exception ex){
				ex.printStackTrace();
			}
		}
	}
	
	private static class ClientWatchingThread extends Thread{
		private TCPServer server;
		protected Map<String,ConcurrentLinkedQueue<Socket>> clientChannels;
		protected Map<String,Calendar> dates=new Hashtable<String,Calendar>();
		protected Map<String,Integer> counts=new Hashtable<String,Integer>();
		private SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		
		public ClientWatchingThread(TCPServer server){
			this.server=server;
			this.clientChannels=server.clientChannels;
			reloadClient();
		}
		
		private void reloadClient(){
			this.dates.clear();
			
			Set<String> keySet=clientChannels.keySet();
			for(String key:keySet){
				this.dates.put(key, Calendar.getInstance());
			}
			
			this.counts.clear();
			for(String key:keySet){
				this.counts.put(key, new Integer(0));
			}
		}
		
		public void run(){ 
			try{
				while (true) {
					while(clientChannels.size()>0){
						List<String> keySet=new ArrayList<String>();
						keySet.addAll(clientChannels.keySet());
						for(String key:keySet){
							if(counts.get(key)==null||dates.get(key)==null){
								//init client status
								counts.put(key, clientChannels.get(key).size());
								dates.put(key, Calendar.getInstance());
							}							
							else if(counts.get(key)==clientChannels.get(key).size()&&Calendar.getInstance().compareTo(dates.get(key))>1000*100){
								//trigger client off line
								System.out.println(this.getClass()+":"+"client:"+key+" is off line. no packet recieved from "+dateFormat.format(dates.get(key)));
							}
							else{
								int count=clientChannels.get(key).size();
								//System.out.println(this.getClass()+":"+" update client status for client:"+key+" recievedPacketCount:"+count);
								
								//update client status
								counts.put(key, count);
								dates.put(key, Calendar.getInstance());
							}
							
							if(clientChannels.get(key).size()>0){
								boolean isThreadCreated=false;
								
								List<Thread> removingThreads=new ArrayList<Thread>();
								for(int threadIndex=0;threadIndex<server.clientProcesserThreads.size();threadIndex++){
									
									if(server.clientProcesserThreads.get(threadIndex).getName().contains(key)){
										isThreadCreated=true;
										
										if(server.clientProcesserThreads.get(threadIndex).isAlive()==false){
											server.clientProcesserThreads.get(threadIndex).interrupt();
											Thread tempThread=server.clientProcesserThreads.get(threadIndex);
											removingThreads.add(tempThread);
											System.out.println(this.getClass()+":"+"Thread for client "+key+" is not actived and will be interrupted and recreated.its state is "+tempThread.getState().name());
											
											isThreadCreated=false;
										}
									}
								}
								server.clientProcesserThreads.removeAll(removingThreads);
								
								if(isThreadCreated==false){
									System.out.println(this.getClass()+":"+"Thread for client "+key+" is not created and will be created. client packet size is "+clientChannels.get(key).size());
									server.addProcessThreadForClient(key);
								}
							}
						}
					}
					Thread.sleep(10000);
				}
			}
			catch(Exception ex){
				ex.printStackTrace();
			}
		}
	}
	public interface DispacthTCPSocketProcesserEventListiner{
		public void onAddClient(TCPServer sender,String clientName);
		public void onRemoveClient(TCPServer sender,String clientName);
	}
}
