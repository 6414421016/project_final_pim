import React, { createContext, useState } from "react";
import runChat from "../config/gemini";

// สร้าง Context เพื่อแชร์ข้อมูลระหว่างคอมโพเนนต์
export const Context = createContext();

export default function ContextProvider(props) {
  // สร้าง state เพื่อเก็บค่าข้อมูลต่างๆ
  const [input, setInput] = useState(""); // เก็บข้อมูล input จากผู้ใช้
  const [recentPrompt, setRecentPrompt] = useState(""); // เก็บ prompt ล่าสุดที่ส่งไปยังโมเดล
  const [prevPrompts, setPrevPropmts] = useState([]); // เก็บ prompt ทั้งหมดที่เคยส่งไป
  const [showResult, setShowResult] = useState(false); // เก็บสถานะว่าจะแสดงผลหรือไม่
  const [loading, setLoading] = useState(false); // เก็บสถานะว่ากำลังโหลดอยู่หรือไม่
  const [resultData, setResultData] = useState(""); // เก็บผลลัพธ์ที่ได้จากโมเดล
  
  // ฟังก์ชันหน่วงเวลาการแสดงผลทีละคำ
  const delayPara = (index, nextWord) => {
    setTimeout(function () {
      setResultData((prev) => prev + nextWord); // แสดงผลลัพธ์ทีละคำ
    }, 75 * index); // ตั้งเวลาหน่วงเพื่อทำให้การแสดงผลลื่นไหลขึ้น
  };

  // ฟังก์ชันสำหรับเริ่มต้นการแชทใหม่
  const newChat = () => {
    setLoading(false); // ตั้งค่าการโหลดเป็น false
    setShowResult(false); // ซ่อนผลลัพธ์
  };

  // ฟังก์ชันที่ทำงานเมื่อมีการส่ง prompt
  const onSent = async (prompt) => {
    setResultData(""); // รีเซ็ตข้อมูลผลลัพธ์
    setLoading(true); // แสดงสถานะกำลังโหลด
    setShowResult(true); // แสดงผลลัพธ์
    let response;
    
    // ตรวจสอบว่ามี prompt ส่งเข้ามาหรือไม่
    if (prompt !== undefined) {
      response = await runChat(prompt); // เรียกใช้โมเดล AI ด้วย prompt ที่ส่งเข้ามา
      setRecentPrompt(prompt); // ตั้งค่า prompt ล่าสุด
    } else {
      setPrevPropmts((prev) => [...prev, input]); // เก็บ input ไว้ในรายการ prompt ที่เคยส่งไป
      setRecentPrompt(input); // ตั้งค่า input ล่าสุด
      response = await runChat(input); // เรียกใช้โมเดล AI ด้วย input ที่ส่งเข้ามา
    }

    // แปลงข้อความใน response ให้สามารถแสดงเน้นคำด้วย HTML
    let responseArray = response.split("**");
    let newResponse = "";
    for (let i = 0; i < responseArray.length; i++) {
      if (i === 0 || i % 2 !== 1) {
        newResponse += responseArray[i]; // ถ้าข้อความอยู่ในตำแหน่งปกติ ให้นำมารวมเข้าด้วยกัน
      } else {
        newResponse += "<b>" + responseArray[i] + "</b>"; // ถ้าข้อความอยู่ระหว่างเครื่องหมาย ** ให้แสดงเป็นตัวหนา
      }
    }
    // แปลง * เป็นการขึ้นบรรทัดใหม่
    let newResponse2 = newResponse.split("*").join("</br>");
    // แยกข้อความออกเป็นคำ เพื่อแสดงทีละคำ
    let newResponseArray = newResponse2.split(" ");
    for (let i = 0; i < newResponseArray.length; i++) {
      const nextWord = newResponseArray[i]; // ดึงคำถัดไป
      delayPara(i, nextWord + " "); // แสดงคำถัดไปพร้อมหน่วงเวลา
    }

    setLoading(false); // ตั้งค่าสถานะการโหลดเป็น false เมื่อโหลดเสร็จ
    setInput(""); // รีเซ็ต input
  };

  // สร้างค่า context เพื่อแชร์ข้อมูลระหว่างคอมโพเนนต์ลูก
  const contextValue = {
    prevPrompts, // prompt ที่เคยส่งไป
    setPrevPropmts, // ฟังก์ชันอัพเดท prompt
    onSent, // ฟังก์ชันเมื่อมีการส่ง prompt
    setRecentPrompt, // ฟังก์ชันอัพเดท prompt ล่าสุด
    recentPrompt, // prompt ล่าสุดที่ส่ง
    showResult, // สถานะการแสดงผล
    loading, // สถานะการโหลด
    resultData, // ข้อมูลผลลัพธ์ที่ได้จากโมเดล
    input, // input จากผู้ใช้
    setInput, // ฟังก์ชันอัพเดท input
    newChat // ฟังก์ชันเริ่มต้นการแชทใหม่
  };

  // ส่งออก Context.Provider เพื่อแชร์ข้อมูลและฟังก์ชันให้กับคอมโพเนนต์ลูก
  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
}
