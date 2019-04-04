
import com.alibaba.fastjson.JSONObject;
import com.fanxb.backservice.exception.CustomException;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

/**
 * 类功能简述：
 * 类功能详述：
 *
 * @author fanxb
 * @date 2019/4/4 15:53
 */
public class HttpUtil {
    public static final OkHttpClient CLIENT = new OkHttpClient();

    public static JSONObject get(Request request) {
        try (Response res = CLIENT.newCall(request).execute()) {
            String str = res.body().string();
            return JSONObject.parseObject(str);
        } catch (Exception e) {
            throw new CustomException("登陆微信服务器失败", e);
        }
    }
}


