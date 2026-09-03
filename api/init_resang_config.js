// api/init_resang_config.js

module.exports = (req, res) => {
    // 1. 处理跨域 (CORS) - 允许 App 访问
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // 处理预检请求 (Preflight)
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // 2. 仅处理 POST 请求
    if (req.method === 'POST') {

        // 获取 POST 参数 (对应 PHP 的 $_POST)
        const { name, platform, market, language, device } = req.body;

        // 3. 设置默认配置 (对应 PHP 的 $config 数组)
        let config = {
            domain: "http://board.mzmjapp.com",
            showprivacywin: "Y",
            agreepolicy: "Y",
            showwechat: "Y",
            showali: "Y",
            showgoogle: "N",
            needreg: "Y",
            switchlang: "N",
            weburl: "",
            webiconurl: "",
            webtitle: "",
            aiurl: "",
            aititle: ""
        };

        // 4. 根据 market 参数进行逻辑判断 (对应 PHP 的 if/else)
        if (market === 'google') {
            config.showprivacywin = 'N';
            config.showgoogle = "Y";
            config.showwechat = "Y";
            config.showali = "Y";
            config.domain = "http://board.mzmjapp.com";
            config.needreg = "Y";
            config.switchlang = "Y";
            config.agreepolicy = "N";
            config.aiurl = `http://aivocal.mzmjapp.com/?from=android&app_userid={userid}&lang=${language}&market=${market}`;
            config.aititle = "AI 学唱歌";
            if (language && language.includes("en")) {
                config.aititle = "AI sing";
            }
        } else if (market === 'huawei') {
            config.showgoogle = "N";
            config.showwechat = "Y";
            config.showprivacywin = "N";
            config.domain = "http://www.edragongame.com";
            config.needreg = "Y";
            config.agreepolicy = "Y";
            config.switchlang = "Y";
        } else if (market === 'samsung') {
            config.aiurl = `http://aivocal.mzmjapp.com/?from=android&app_userid={userid}&lang=${language}&market=${market}`;
            config.aititle = "AI 学唱歌";
            config.showprivacywin = 'N';
            config.showgoogle = "Y";
            config.showwechat = "Y";
            config.showali = "Y";
            config.domain = "http://board.mzmjapp.com";
            config.needreg = "Y";
            config.switchlang = "Y";
            config.agreepolicy = "N";
        }

        // 5. 最终覆盖 (对应 PHP 代码末尾的两行)
        // ⚠️ 注意：你的原始 PHP 代码在这里会无条件清空 aiurl 和 aititle
        // 如果这是你期望的行为，请保留。如果不需要，请删除下面这两行。
        config.aiurl = "";
        config.aititle = "";

        // 6. 构建最终返回对象 (对应 PHP 的 $arr=array('config'=>$config))
        const responseObj = {
            config: config
        };

        // 7. 返回 JSON 数据 (对应 PHP 的 echo json_encode($arr))
        return res.status(200).json(responseObj);
    }

    // 如果不是 POST 请求，返回 405 错误
    return res.status(405).json({ error: 'Method Not Allowed' });
};