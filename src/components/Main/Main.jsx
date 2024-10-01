import React, { useContext, useState } from "react";
import "../Main/Main.css"; // นำเข้าไฟล์ CSS สำหรับการจัดการสไตล์
import { assets } from "../../assets/assets"; // นำเข้าทรัพยากรต่างๆ เช่น รูปภาพ
import { Context } from "../../context/Context"; // นำเข้า Context เพื่อใช้ข้อมูลที่แชร์จาก ContextProvider

export default function Main() {
  // นำเข้าฟังก์ชันและ state จาก Context ที่ได้แชร์ไว้
  const {
    onSent, // ฟังก์ชันส่ง prompt ไปยัง AI
    recentPrompt, // prompt ล่าสุดที่ผู้ใช้เลือกหรือส่งไป
    showResult, // สถานะว่าจะแสดงผลลัพธ์หรือไม่
    loading, // สถานะการโหลดผลลัพธ์
    resultData, // ข้อมูลผลลัพธ์ที่ได้จาก AI
    setInput, // ฟังก์ชันอัพเดทค่าของ input
    input, // ค่า input ที่ผู้ใช้กรอก
  } = useContext(Context);

  // ฟังก์ชันสำหรับกำหนดค่าของ prompt เมื่อผู้ใช้กดที่การ์ด
  const valueCard = (value) => {
    let prompt;
    // ตรวจสอบว่าผู้ใช้กดการ์ดไหน และกำหนดข้อความ prompt ที่เหมาะสม
    if (value === 0) {
      prompt = "แนะนำร้านอาหารที่นิยมในจันทบุรี";
    } else if (value === 1) {
      prompt = "แนะนำที่พักในจันทบุรีในตัวเมือง";
    } else if (value === 2) {
      prompt = "แนะนำกิจกรรมพิเศษที่ควรทำเมื่อมาเที่ยวจันทบุรี";
    } else if (value === 3) {
      prompt = "แนะนำเทศกาลและกิจกรรมพิเศษที่มีในจันทบุรี";
    }

    setInput(prompt); // กำหนดค่า input ให้ตรงกับ prompt ที่เลือก
    onSent(prompt); // ส่ง prompt ที่ต้องการไปที่ฟังก์ชัน onSent เพื่อเรียกใช้งาน AI
  };

  return (
    <div className="main"> {/* โครงสร้างหลักของคอมโพเนนต์ */}
      <div className="nav"> {/* ส่วนแถบนำทาง (navigation bar) */}
        <p>แชทบอทแนะนำการท่องเที่ยว</p>
        <img src={assets.user_icon} /> {/* รูปภาพไอคอนของผู้ใช้ */}
      </div>
      <div className="main-container"> {/* ส่วนคอนเทนเนอร์หลัก */}

        {!showResult ? (  // แสดงการ์ดเลือก prompt ถ้ายังไม่มีผลลัพธ์
          <>
            <div className="greet"> {/* ข้อความต้อนรับ */}
              <p>
                <span>ฉันจะคอยให้คำแนะนำการท่องเที่ยวและการเดินทาง. </span>
              </p>
              <p>บอกฉันมาได้เลยว่าคุณต้องการให้ช่วยอะไร</p>
            </div>
            <div className="cards"> {/* การ์ดสำหรับให้ผู้ใช้เลือกหัวข้อ */}
              <div className="card" onClick={() => valueCard(0)}>
                <p>แนะนำร้านอาหารที่นิยมในจันทบุรี</p>
              </div>
              <div className="card" onClick={() => valueCard(1)}>
                <p>แนะนำที่พักในจันทบุรีในตัวเมือง</p>
              </div>
              <div className="card" onClick={() => valueCard(2)}>
                <p>แนะนำกิจกรรมพิเศษที่ควรทำเมื่อมาเที่ยวจันทบุรี</p>
              </div>
              <div className="card" onClick={() => valueCard(3)}>
                <p>แนะนำเทศกาลและกิจกรรมพิเศษที่มีในจันทบุรี</p>
              </div>
            </div>
          </>
        ) : (
          <div className="result"> {/* ส่วนแสดงผลลัพธ์เมื่อมีการส่ง prompt แล้ว */}
            <div className="result-title"> {/* หัวข้อผลลัพธ์ */}
              <img src={assets.user_icon} /> {/* ไอคอนผู้ใช้ */}
              <p>{recentPrompt}</p> {/* แสดง prompt ล่าสุดที่ผู้ใช้ส่ง */}
            </div>
            <div className="result-data"> {/* ข้อมูลผลลัพธ์ที่ได้จาก AI */}
              {loading ? (  // ถ้ายังอยู่ในสถานะกำลังโหลดจะแสดง loader
                <>
                  <div className="loader"> {/* สัญลักษณ์กำลังโหลด */}
                    <hr />
                    <hr />
                    <hr />
                  </div>
                </>
              ) : (
                <p dangerouslySetInnerHTML={{ __html: resultData }}></p> // แสดงผลลัพธ์ที่ได้ โดยใช้ dangerouslySetInnerHTML เพื่อแปลง HTML
              )}
            </div>
          </div>
        )}
        
        <div className="main-bottom"> {/* ส่วนด้านล่างของคอมโพเนนต์ */}
          <div className="search-box"> {/* กล่องสำหรับกรอกข้อความ */}
            <input
              type="text"
              placeholder="Enter a prompt here" // ข้อความ placeholder ในกล่อง input
              onChange={(e) => setInput(e.target.value)} // อัพเดทค่าของ input เมื่อผู้ใช้พิมพ์
              value={input} // แสดงค่าปัจจุบันของ input
            />
            <div>
              {input ? (  // ถ้ามีค่า input ให้แสดงไอคอนส่ง
                <img src={assets.send_icon} onClick={() => onSent()} /> // เมื่อคลิกไอคอนส่ง จะเรียกฟังก์ชัน onSent
              ) : null}
            </div>
          </div>
          <p className="bottom-info"> {/* ข้อความด้านล่างสำหรับอธิบาย */}
            ช่วยให้คำแนะนำเกี่ยวกับการท่องเที่ยวและวางแผนในการเดินทาง.
          </p>
        </div>
      </div>
    </div>
  );
}
