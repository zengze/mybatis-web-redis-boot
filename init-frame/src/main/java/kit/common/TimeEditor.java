package kit.common;

import java.beans.PropertyEditorSupport;
import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.Date;

public class TimeEditor extends PropertyEditorSupport  {
	 public String getAsText() {
		 Date value = (Date)this.getSource();
		  if(null == value){
		   value = new Date();
		  }

		  SimpleDateFormat df =new SimpleDateFormat("HH:mm:ss");
		  return df.format(value);
		 }
		 public void setAsText(String text) throws IllegalArgumentException {
		  Date value = null;
		  
		  if(null != text && !text.equals("")){
		   SimpleDateFormat df =new SimpleDateFormat("HH:mm:ss");
		   try{
			 value = df.parse(text);
		   }catch(Exception e){
		    e.printStackTrace();
		   }
		  }
		  setValue(new Time(value.getTime()));
		 }}
