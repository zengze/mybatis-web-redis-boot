package kit.common;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;

public class DataHelper {
	public static  String toString(Object obj)
	{
		if(obj == null) return null;
		if(obj instanceof Time) return timeToString(obj);
		else if(obj instanceof Date) return dateToString(obj);
		else if(obj instanceof Timestamp) return timestampToString(obj);
		else return obj.toString();
	}
	public static  String timeToString(Object obj)
	{
		TimeEditor editor = new TimeEditor();
		editor.setSource(obj);
		return editor.getAsText();
	}
	public static  String dateToString(Object obj)
	{
		DateEditor editor = new DateEditor();
		editor.setSource(obj);
		return editor.getAsText();
	}
	public static  String timestampToString(Object obj)
	{
		DateTimeEditor editor = new DateTimeEditor();
		editor.setSource(obj);
		return editor.getAsText();
	}

}
