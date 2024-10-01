import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";

export default function Admin() {
    const [attraction, setAttraction] = useState([])
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true)
        const unsub = onSnapshot(
            collection(db, 'travel'),
            (snapshot) => {
                let list = []
                snapshot.docs.forEach((doc) => {
                    list.push({id: doc.id, ...doc.data()})
                })
                setAttraction(list)
                setLoading(false)
            },(error) => {
                console.log(error)
            }
        )
        return () => {
            unsub();
        }
    },[])   

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure to delete data")) { //กล่องข้อความยืนยัน (window.confirm) ที่ถามผู้ใช้ว่าต้องการลบข้อมูลหรือไม่
          try {
            await deleteDoc(doc(db, "travel", id));  //deleteDoc ถูกเรียกเพื่อลบเอกสารที่มี id เป็น id ที่ถูกส่งเข้ามาจาก Firestore
            setAttraction(attraction.filter((data) => data.id !== id));
          } catch (error) {
            console.log(error);
          }
        }
      };



  return (
    <>
      <div>
        <Navbar />

        {loading ? (<Loading/>) : ''}

        <div class="flex flex-col">
          <div class="overflow-x-auto shadow-md sm:rounded-lg">
            <div class="inline-block min-w-full align-middle">
              <div class="overflow-hidden ">
                <table class="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-700">
                  <thead class="bg-gray-100 dark:bg-gray-700">
                    <tr>
                      <th
                        scope="col"
                        class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Titel name
                      </th>
                      <th
                        scope="col"
                        class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Province
                      </th>
                      <th
                        scope="col"
                        class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      >
                        Image
                      </th>
                      <th
                        scope="col"
                        class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400"
                      ></th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                    
                    {attraction && attraction.map((val, key) => (
                        <tr class="hover:bg-gray-100 dark:hover:bg-gray-700" key={key}>
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {val.title}
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-900 whitespace-nowrap dark:text-white">
                          {val.province}
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-gray-500 whitespace-nowrap dark:text-white">
                          <img style={{maxWidth: '200px', maxHeight: '200px'}} src={val.img_main}/>
                        </td>
                        <td class="py-4 px-6 text-sm font-medium text-right whitespace-nowrap">
                          <a
                            onClick={() => navigate(`/form/${val.id}`)}
                            class="text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                          >
                            Edit
                          </a>
                          <a
                            onClick={() => handleDelete(val.id)}
                            class="text-red-600 dark:text-red-500 hover:underline ml-8 cursor-pointer"
                          >
                            Delete
                          </a>
                        </td>
                      </tr>
                    ))}

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
