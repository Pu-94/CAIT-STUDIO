
// 引入Appwrite SDK（CDN方式，无需下载）
import { Client, Account, Databases } from "https://cdn.jsdelivr.net/npm/appwrite@11.0.0";

// 初始化Appwrite客户端
const client = new Client();
client
  .setEndpoint('https://sgp.cloud.appwrite.io/v1') // 新加坡端点（固定）
  .setProject('6905e79900302369f9c6') // 你的项目ID（固定）
  .setKey('standard_43ae2735c77e33e0f0b04c60a35e84511839b5ec22dec5f2a119d98ca6402e7163f0e9140081d77c78cb31bf79af97f54f12eef91e290d70f7e98181f77455b8eb415b2f9747b129865bd5a8fa38a1b62d54788f68e21c1e496006ef885fb035a1d15836a80956b9813f58358f5ded4310ca837554a371bb1da63e3019cd6d39'); // 【重要】填你之前创建的API密钥

// 初始化核心服务
const account = new Account(client);
const databases = new Databases(client);

// 生成十六进制ID（从0x00000001开始，自动计数）
async function generateHexId() {
  try {
    // 查询已有用户数量，作为ID计数依据
    const response = await databases.listDocuments(
      'cait_users', // 数据库ID（和你在Appwrite创建的一致）
      'users'       // 集合ID（和你在Appwrite创建的一致）
    );
    const lastId = response.total; // 已有用户数 = 最后一个ID
    const newId = lastId + 1;
    return '0x' + newId.toString(16).padStart(8, '0'); // 转十六进制（补0到8位）
  } catch (error) {
    return '0x00000001'; // 出错时默认第一个ID
  }
}

// 暴露给其他页面调用（挂载到window）
window.appwrite = {
  client,
  account,
  databases,
  generateHexId,
  dbId: 'cait_users', // 数据库ID（固定）
  collId: 'users'     // 集合ID（固定）
};