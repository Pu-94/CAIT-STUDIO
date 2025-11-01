// 正确引入Appwrite v14版本（核心修改：从'appwrite'模块解构）
import { Client } from "https://cdn.jsdelivr.net/npm/appwrite@14.0.1";
import { Account } from "https://cdn.jsdelivr.net/npm/appwrite@14.0.1/account";
import { Databases } from "https://cdn.jsdelivr.net/npm/appwrite@14.0.1/databases";

// 初始化客户端（填你的API密钥）
const client = new Client();
client
  .setEndpoint('https://sgp.cloud.appwrite.io/v1') // 新加坡端点
  .setProject('6905e79900302369f9c6') // 你的项目ID（正确）
  .setKey('43ae2735c77e33e0f0b04c60a35e84511839b5ec22dec5f2a119d98ca6402e7163f0e9140081d77c78cb31bf79af97f54f12eef91e290d70f7e98181f77455b8eb415b2f9747b129865bd5a8fa38a1b62d54788f68e21c1e496006ef885fb035a1d15836a80956b9813f58358f5ded4310ca837554a371bb1da63e3019cd6d39'); // 替换成你的Appwrite API密钥

// 初始化服务（现在不会报Account未导出了）
const account = new Account(client);
const databases = new Databases(client);

// 生成十六进制ID的函数（不变）
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

// 暴露到window供前端调用
window.appwrite = { account, databases, generateHexId, dbId: 'cait_users', collId: 'users' };
