// 引入Appwrite SDK（无需修改）
import { Client, Account, Databases } from "https://cdn.jsdelivr.net/npm/appwrite@11.0.0";

// 初始化客户端（填你的API密钥）
const client = new Client();
client
  .setEndpoint('https://sgp.cloud.appwrite.io/v1')
  .setProject('6905e79900302369f9c6')
  .setKey('standard_43ae2735c77e33e0f0b04c60a35e84511839b5ec22dec5f2a119d98ca6402e7163f0e9140081d77c78cb31bf79af97f54f12eef91e290d70f7e98181f77455b8eb415b2f9747b129865bd5a8fa38a1b62d54788f68e21c1e496006ef885fb035a1d15836a80956b9813f58358f5ded4310ca837554a371bb1da63e3019cd6d39'); // 【必须替换】填你在Appwrite创建的API密钥

// 初始化服务（必须暴露account）
const account = new Account(client);
const databases = new Databases(client);

// 生成十六进制ID
async function generateHexId() {
  try {
    const response = await databases.listDocuments('cait_users', 'users');
    return '0x' + (response.total + 1).toString(16).padStart(8, '0');
  } catch (error) {
    return '0x00000001';
  }
}

// 暴露到window，供auth.html调用
window.appwrite = { account, databases, generateHexId, dbId: 'cait_users', collId: 'users' };
