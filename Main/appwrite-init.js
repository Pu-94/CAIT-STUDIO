// 引入Appwrite SDK（固定CDN地址，确保加载成功）
import { Client, Account, Databases } from "https://cdn.jsdelivr.net/npm/appwrite@11.0.0";

// 初始化Appwrite客户端（替换成你的真实信息）
const client = new Client();
client
  .setEndpoint('https://sgp.cloud.appwrite.io/v1') // 新加坡端点（固定）
  .setProject('6905e79900302369f9c6') // 你的项目ID（已确认正确）
  .setKey('standard_43ae2735c77e33e0f0b04c60a35e84511839b5ec22dec5f2a119d98ca6402e7163f0e9140081d77c78cb31bf79af97f54f12eef91e290d70f7e98181f77455b8eb415b2f9747b129865bd5a8fa38a1b62d54788f68e21c1e496006ef885fb035a1d15836a80956b9813f58358f5ded4310ca837554a371bb1da63e3019cd6d39'); // 【必须替换】填你在Appwrite创建的API密钥

// 初始化核心服务（关键：确保Account实例正确创建）
const account = new Account(client); // 这行不能漏
const databases = new Databases(client);

// 生成十六进制ID的函数（不变）
async function generateHexId() {
  try {
    const response = await databases.listDocuments(
      'cait_users', // 你的数据库ID（正确）
      'users'       // 你的表ID（正确）
    );
    const lastId = response.total;
    const newId = lastId + 1;
    return '0x' + newId.toString(16).padStart(8, '0');
  } catch (error) {
    return '0x00000001'; // 出错时默认第一个ID
  }
}

// 关键：把服务暴露到window，让auth.html能访问到
window.appwrite = {
  account: account,       // 必须显式暴露account
  databases: databases,   // 必须显式暴露databases
  generateHexId: generateHexId,
  dbId: 'cait_users',
  collId: 'users'
};
