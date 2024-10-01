// นำเข้า GoogleGenerativeAI และหมวดหมู่เนื้อหาที่เป็นอันตราย
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// ชื่อโมเดลที่ใช้เป็น gemini-1.0-pro
const MODEL_NAME = "gemini-1.0-pro";
// API Key สำหรับเชื่อมต่อกับ Google Generative AI
const API_KEY = "AIzaSyC_kPQ01dkESQ7s2-uACYOAKxiftDkeUVw";

// ฟังก์ชันหลักที่ใช้ในการแชทกับโมเดล AI
async function runChat(prompt) {
  // สร้างอินสแตนซ์ของ GoogleGenerativeAI โดยใช้ API Key
  const genAI = new GoogleGenerativeAI(API_KEY);
  // ดึงโมเดลที่ต้องการใช้งานตาม MODEL_NAME ที่กำหนด
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  // การตั้งค่าการสร้างคำตอบจากโมเดล
  const generationConfig = {
    temperature: 0.9, // ความหลากหลายของคำตอบ ยิ่งสูงยิ่งสุ่มมากขึ้น
    topK: 1, // จำกัดจำนวนคำที่สามารถเลือกได้ในแต่ละขั้นตอน
    topP: 1, // คำตอบจะเลือกจากกลุ่มคำที่มีความน่าจะเป็นรวมไม่เกิน topP
    maxOutputTokens: 2048, // จำนวนคำตอบสูงสุดที่โมเดลสามารถให้ได้
  };

  // การตั้งค่าการบล็อกเนื้อหาที่เป็นอันตรายตามหมวดหมู่ที่กำหนด
  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT, // บล็อกเนื้อหาการคุกคาม
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE, // บล็อกระดับกลางขึ้นไป
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, // บล็อกเนื้อหาคำพูดแสดงความเกลียดชัง
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, // บล็อกเนื้อหาทางเพศที่ชัดเจน
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, // บล็อกเนื้อหาที่เป็นอันตราย
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  // เริ่มต้นการแชทใหม่กับโมเดล โดยใช้การตั้งค่าต่างๆ และประวัติการสนทนาที่ว่างเปล่า
  const chat = model.startChat({
    generationConfig, // ส่งค่าการตั้งค่าของโมเดล
    safetySettings, // ส่งค่าการบล็อกเนื้อหาที่ไม่เหมาะสม
    history: [
      // ประวัติการสนทนา (ตอนเริ่มใหม่ ไม่มีประวัติ)
    ],
  });

  // ส่งข้อความไปยังโมเดลโดยใช้ prompt ที่ผู้ใช้ป้อนเข้ามา
  const result = await chat.sendMessage(prompt);
  const response = result.response;
  console.log(response.text()); // แสดงผลลัพธ์คำตอบในคอนโซล
  return response.text(); // คืนค่าข้อความตอบกลับ
}

// ส่งออกฟังก์ชัน runChat เพื่อให้ไฟล์อื่นสามารถเรียกใช้งานได้
export default runChat;
