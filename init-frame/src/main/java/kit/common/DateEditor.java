package kit.common;

import java.beans.PropertyEditorSupport;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateEditor extends PropertyEditorSupport {
	 public String getAsText() {
	  Date value = (Date)this.getSource();
	  if(null == value){
	   value = new Date();
	  }

	  SimpleDateFormat df =new SimpleDateFormat("yyyy-MM-dd");
	  return df.format(value);
	 }
	 public void setAsText(String text) throws IllegalArgumentException {
	  Date value = null;
	  
	  if(null != text && !text.equals("")){
	   SimpleDateFormat df =new SimpleDateFormat("yyyy-MM-dd");
	   try{
		 value = df.parse(text);
	   }catch(Exception e){
	    e.printStackTrace();
	   }
	  }
	  setValue(new java.sql.Date(value.getTime()));
	 }
}

