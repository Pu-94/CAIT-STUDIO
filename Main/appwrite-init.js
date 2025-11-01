
// 等待Appwrite SDK全局加载完成（通过script标签引入，无需import）
window.addEventListener('load', async () => {
    // 确认Appwrite全局对象已存在
    if (!window.Appwrite) {
        console.error('Appwrite SDK加载失败');
        return;
    }

    // 初始化客户端（填你的API密钥）
    const client = new window.Appwrite.Client();
    client
        .setEndpoint('https://sgp.cloud.appwrite.io/v1') // 新加坡端点
        .setProject('6905e79900302369f9c6') // 你的项目ID（正确）
        .setKey('43ae2735c77e33e0f0b04c60a35e84511839b5ec22dec5f2a119d98ca6402e7163f0e9140081d77c78cb31bf79af97f54f12eef91e290d70f7e98181f77455b8eb415b2f9747b129865bd5a8fa38a1b62d54788f68e21c1e496006ef885fb035a1d15836a80956b9813f58358f5ded4310ca837554a371bb1da63e3019cd6d39'); // 替换成你的Appwrite API密钥

    // 初始化核心服务（直接用全局Appwrite对象，无导出问题）
    const account = new window.Appwrite.Account(client);
    const databases = new window.Appwrite.Databases(client);

    // 生成十六进制ID的函数
    async function generateHexId() {
        try {
            const response = await databases.listDocuments(
                'cait_users', // 数据库ID
                'users'       // 表ID
            );
            return '0x' + (response.total + 1).toString(16).padStart(8, '0');
        } catch (error) {
            return '0x00000001';
        }
    }

    // 暴露服务到window，供前端页面调用
    window.appwrite = {
        account: account,
        databases: databases,
        generateHexId: generateHexId,
        dbId: 'cait_users',
        collId: 'users'
    };
});

