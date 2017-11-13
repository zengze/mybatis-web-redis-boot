package kit.common;

import java.beans.PropertyEditorSupport;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateTimeEditor  extends PropertyEditorSupport  {
	 public String getAsText() {
		 Date value = (Date) this.getSource();
		  if(null == value){
		   value = new Date();
		  }

		  SimpleDateFormat df =new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		  return df.format(value);
		 }
		 public void setAsText(String text) throws IllegalArgumentException {
		  Date value = null;
		  
		  if(null != text && !text.equals("")){
		   SimpleDateFormat df =new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		   try{
			 value = df.parse(text);
		   }
		   catch(ParseException e){
			   try{
				   df =new SimpleDateFormat("yyyy-MM-dd");
				   value = df.parse(text);
			   }
			   catch(Exception e1){
			   e.printStackTrace();
			   }
		   }
		  }
		  setValue(new Timestamp(value.getTime()));
		 }}
