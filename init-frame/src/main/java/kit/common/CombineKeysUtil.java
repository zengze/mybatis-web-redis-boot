package kit.common;

public class CombineKeysUtil {
	private static final String SPLIT_EXP = "---";
	private static final String TOKEN_BREAK = "---";
	public static String[] splitKey(String keys) {
		return keys.split(SPLIT_EXP);
	}
	public static Object getBreak() {
		return TOKEN_BREAK;
	}

}
