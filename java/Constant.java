import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * 类功能简述： 类功能详述：
 *
 * @author fanxb
 * @date 2019/4/4 16:10
 */
@Component
public class Constant {

    public static String appId;

    public static String secret;

    @Value("${wx.appId}")
    public void setAppId(String appId) {
        Constant.appId = appId;
    }

    @Value("${wx.secret}")
    public void setSecret(String secret) {
        Constant.secret = secret;
    }
}
