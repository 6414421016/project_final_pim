import React, { useContext, useState } from "react";
import "../Sidebar/Sidebar.css"; // นำเข้าไฟล์ CSS สำหรับจัดการสไตล์ของ Sidebar
import { assets } from "../../assets/assets"; // นำเข้าทรัพยากร เช่น รูปภาพต่างๆ
import { Context } from "../../context/Context"; // นำเข้า Context เพื่อใช้งานข้อมูลที่แชร์จาก ContextProvider
import { Link } from "react-router-dom"; // นำเข้า Link จาก react-router-dom เพื่อใช้ลิงก์ไปยังหน้าอื่น

export default function Sidebar() {
  const [extended, setExtended] = useState(false); // สร้าง state 'extended' เพื่อควบคุมการแสดง Sidebar แบบขยาย
  const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context); // ดึงค่าต่างๆ และฟังก์ชันจาก Context

  // ฟังก์ชันสำหรับโหลด prompt จากประวัติที่เคยใช้
  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt); // กำหนดค่าของ prompt ล่าสุด
    await onSent(prompt); // ส่ง prompt ที่ต้องการไปที่ฟังก์ชัน onSent เพื่อส่งไปยัง AI
  };

  return (
    <div className="sidebar"> {/* โครงสร้างหลักของ Sidebar */}
      <div className="top"> {/* ส่วนบนของ Sidebar */}
        <img
          className="menu"
          src={assets.menu_icon} // ไอคอนเมนู
          onClick={() => setExtended((prev) => !prev)} // เมื่อคลิกจะสลับสถานะ extended เพื่อแสดง/ซ่อน Sidebar แบบขยาย
        />
        <div className="new-chat" onClick={() => newChat()}> {/* ปุ่มเริ่มแชทใหม่ */}
          <img src={assets.plus_icon} /> {/* ไอคอนบวก */}
          {extended ? <p>เริ่มต้นหัวข้อใหม่</p> : null} {/* แสดงข้อความ "เริ่มต้นหัวข้อใหม่" ถ้า Sidebar ขยาย */}
        </div>
        {extended ? ( // ถ้า Sidebar ขยายจะแสดงส่วนของประวัติการสนทนา
          <div className="recent">
            <p className="recent-title">ประวัติ</p> {/* หัวข้อ "ประวัติ" */}
            {prevPrompts.map((item, index) => { // แสดงรายการประวัติ prompt ที่เคยส่ง
              return (
                <div className="recent-entry" onClick={() => loadPrompt(item)}> {/* เมื่อคลิกจะเรียกใช้ฟังก์ชัน loadPrompt */}
                  <img src={assets.message_icon} /> {/* ไอคอนข้อความ */}
                  <p>{item.slice(0,18)} ...</p> {/* แสดงข้อความ prompt ที่เคยใช้ โดยตัดให้สั้นเหลือ 18 ตัวอักษร */}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
      <div className="bottom"> {/* ส่วนล่างของ Sidebar */}
        <div className="bottom-item recent-entry"> {/* รายการ "About me" */}
          <img src={assets.question_icon} /> {/* ไอคอนคำถาม */}
          {extended ? <p>About me</p> : null} {/* แสดงข้อความ "About me" ถ้า Sidebar ขยาย */}
        </div>
        <div className="bottom-item recent-entry"> {/* รายการ "Back" */}
          <img src={assets.history_icon} /> {/* ไอคอนประวัติ */}
          {extended ? (
            <Link to='/' style={{ color: 'black', textDecoration: 'none' }}> {/* ลิงก์ไปยังหน้าหลัก */}
              Back
            </Link>
          ) : null}
        </div>
        <div className="bottom-item recent-entry"> {/* รายการ "Setting" */}
          <img src={assets.setting_icon} /> {/* ไอคอนการตั้งค่า */}
          {extended ? <p>Setting</p> : null} {/* แสดงข้อความ "Setting" ถ้า Sidebar ขยาย */}
        </div>
      </div>
    </div>
  );
}
