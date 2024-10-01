import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import '../home/home.css'
import { collection, doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';
import Loading from '../../components/Loading/Loading';
import Footer from '../../components/Footer/Footer';

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [attraction, setAttraction] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showImage, setShowImage] = useState(null);

  const itemsPerPage = 2;

  const handleClickImg = (img_1) => {
    setShowImage(img_1);
  }
  const closeModal = () => {
    setShowImage(null);
  };


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
      },
      (error) => {
        console.log(error)
      }
    )
    return () => {
      unsub();
    }
  },[])

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = attraction.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(attraction.length / itemsPerPage);

  console.log("Data", currentItems)

  return (
    <>
     <div>
    <Navbar/>
        <div className='home-container'>
          <div className='home-title'>
            <h1 style={{fontSize: '25px'}}>สถานที่เที่ยวที่นิยม</h1>
            <p>จันทบุรี</p>
          </div>

          <div className='home-navbar'>
            <h3>Recommended tourist attractions website</h3>
          </div>

         {loading ? (<Loading/>) : ''}

          <div>
          {currentItems && currentItems.map((val, key) => (
            <div className='home-details' key={key}>
            <div className='home-detail-content'>
              <img style={{width: '600px', height: '400px', padding: '1rem', objectFit: 'cover'}} src={val.img_main}/>
              <h4>{val.province}</h4>
              <h2>{val.title}</h2>
              <p>{val.details}</p>
            </div>

            <div className='home-detail-img'>
              <p>images</p>
              <div className='img-grid'>
                <img onClick={() => handleClickImg(val.img_1)} style={{width: '100px', height: '100px', objectFit: 'cover'}} src={val.img_1}/>
                <img onClick={() => handleClickImg(val.img_2)} style={{width: '100px', height: '100px', objectFit: 'cover'}} src={val.img_2}/>
                <img onClick={() => handleClickImg(val.img_3)} style={{width: '100px', height: '100px', objectFit: 'cover'}} src={val.img_3}/>
                <img onClick={() => handleClickImg(val.img_4)} style={{width: '100px', height: '100px', objectFit: 'cover'}} src={val.img_4}/>
                <img onClick={() => handleClickImg(val.img_5)} style={{width: '100px', height: '100px', objectFit: 'cover'}} src={val.img_5}/>
                <img onClick={() => handleClickImg(val.img_6)} style={{width: '100px', height: '100px', objectFit: 'cover'}} src={val.img_6}/>
                <img onClick={() => handleClickImg(val.img_7)} style={{width: '100px', height: '100px', objectFit: 'cover'}} src={val.img_7}/>
                <img onClick={() => handleClickImg(val.img_8)} style={{width: '100px', height: '100px', objectFit: 'cover'}} src={val.img_8}/>
                <img onClick={() => handleClickImg(val.img_9)} style={{width: '100px', height: '100px', objectFit: 'cover'}} src={val.img_9}/>
              </div>
              <div className='google-map'>
                <a href={val.map} target="_blank">Google Map</a>
              </div>
            </div>
          </div>
          ))}
          </div>


          {showImage && (
        <div className='modal' onClick={closeModal}>
          <div className='modal-content' onClick={(e) => e.stopPropagation()}>
            <img src={showImage} alt="Full-sized" style={{ width: '100%', height: 'auto' }} />
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}


          <div className='home-next-details'>
            {Array.from({ length: totalPages }, (_, index) => (
              <button key={index + 1} onClick={() => handlePageChange(index + 1)}>{index + 1}</button>
            ))}
            {currentPage < totalPages && (
              <button onClick={() => handlePageChange(currentPage + 1)}>Next</button>
            )}
          </div>
        </div>
     </div>
    </>
  )
}
