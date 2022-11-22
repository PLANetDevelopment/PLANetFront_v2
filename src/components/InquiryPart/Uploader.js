import React, { useState, useRef, } from 'react';
import "./Uploader.css";
import axios from 'axios';
import { AiOutlinePlus } from "react-icons/ai";
// import Slider from "react-slick";
// import { FaAssistiveListeningSystems } from 'react-icons/fa';

const Uploader = (props) => {
  //다중 이미지 업로드
  const [showImages, setShowImages] = useState([]);

  //이미지 상대경로 저장
  const handleAddImages = (e) => {
    const imageLists = e.target.files; //파일리스트(object 형식)
    let imageUrlLists = [...showImages]; //showImages에 저장

    for (let i = 0; i < imageLists.length; i++){
      const currentImageUrl = URL.createObjectURL(imageLists[i]);
      imageUrlLists.push(currentImageUrl);
    }

    if (imageUrlLists.length > 10) {
      imageUrlLists = imageUrlLists.slice(0, 10);
    }

    setShowImages(imageUrlLists);
  };

  //x버튼 삭제
  const handleDeleteImage = (id) => {
    setShowImages(showImages.filter((_, index) => index !== id));
  };
  
  const ref = useRef(null);

  const userId = window.localStorage.getItem("userId");
  
  console.log(props);

  const [image, setImage] = useState({
    image_file: "",
    preview_URL: "img/default_image.png",
  });

  const [loaded, setLoaded] = useState(false);

  let inputRef;

  const saveImage = (e) => {
    // e.preventDefault();
    // const fileReader = new FileReader();
    
    // if(e.target.files[0]){
    //   setLoaded("loading")
    //   fileReader.readAsDataURL(e.target.files[0])
    // }
    // fileReader.onload = () => {
    //   setImage(
    //     {
    //       image_file: e.target.files[0],
    //       preview_URL: fileReader.result
    //     }
    //   )
    //   setLoaded(true);
    // }

    console.log(e.target.files);
    e.preventDefault();
    const fileReader = new FileReader();

    for (var i = 0; i < e.target.files.length; i++){
      if(e.target.files[i]){
      setLoaded("loading")
      fileReader.readAsDataURL(e.target.files[i])
    }
    let file = e.target.files[i];
    fileReader.onload = () => {
      setImage(
        {
          image_file: file,
          preview_URL: fileReader.result
        }
      )
      setLoaded(true);
    }
    }
    
  }

  //흠.. 이미지 삭제 -> 업로드할 때 새로 삭제 안되나? 이미지 쌓이는지 확인하기
  const deleteImage = () => {
    setImage({
      image_file: "",
      preview_URL: "img/default_image.png",
    });
    setLoaded(false);
  }

  //서버로 이미지 보내기
  const sendImageToServer = async () => {

    const formData = new FormData();
    formData.append('file', image.image_file);

    console.log("이미지 : ", image);

    axios({
      method: "POST",
      url: "https://플랜잇.웹.한국:8080/api/image/upload",
      
      headers: {
        userId: userId,
        'Content-Type': 'multipart/form-data', 
      },

      data: formData,
    })
    .then((response) => console.log(response))
    .catch((err) => console.log(err));
  }

  // //이미지 슬라이드 구현...
  // const handleScroll = (e, scroll) => {
  //   switch (scroll) {
  //     case 'start': // 마우스 버튼 누르는 경우
  //       setOriginX(e.clientX); //드래그 시작 지점 위치 저장
  //       setIsScroll(true);
  //       break;
  //     case 'end': // 마우스를 버튼 누르기 중단
  //       setAfterX(position); //드래그 중단 시 마지막 위치 저장
  //       setIsScroll(false);
  //       break;
  //     case 'leave': // 마우스가 영역을 벗어난 경우
  //       setIsScroll(false);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // const handleSlide = e => { //마우스 움직일 때 같이 드래그
  //   const newPosition = e.clientX - originX + afterX;
  //   const hiddenLength = e.currentTarget.offsetWidth - 166 * BOOKS.length;
  //   if (isScroll === false) {
  //     return;
  //   }

  //   newPosition < 10 && newPosition > hiddenLength && setPosition(newPosition);
  // };

  const settings = {
    arrows: false,
    dots: false,
    infinite: false,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="uploader-wrapper">
      <div className="uploader-flex">
        {/* 실제 보여지는 파일 업로드 버튼 */}
        <label for="input_file" onChange={saveImage}>
          <div className="img-upload">
            <AiOutlinePlus />
            <input onChange={handleAddImages}
              className="input-img" type="file" id="input_file" name="input_file" accept="image/*"
              onClick={(e)=>e.target.value = null}
              ref={refParam => inputRef = refParam}
              multiple  />
          </div>
        </label>
      
        {/* <input 
          className="input-img" type="file" id="input-file" name="input-file" accept="image/*"
          onChange={handleAddImages}
          onClick={(e)=>e.target.value = null}
          ref={refParam => inputRef = refParam}
          multiple  /> */}

        <div className="slide-window">
          {/* <Slider {...settings}> */}
            {showImages.map((image, id) => (
              <div className="img-wrapper" key={id}>
                <img src={image} alt={`${image}-${id}`} />
                {/* <Delete onClick={() => handleDeleteImage(id)} /> */}
              </div>
          ))}
          {/* </Slider> */}
        </div>
      </div>

      <div className="upload-button">
        <button color="success" variant="contained" onClick={sendImageToServer}>
          Upload
        </button>
      </div>

    </div>
  );
}

export default Uploader;