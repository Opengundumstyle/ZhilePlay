import React, { useState,useEffect} from 'react'
import styled from 'styled-components'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
  width:100%;
  height:100%;
  position:fixed;
  top:0;
  left:0;
  background-color:#000000a7;
  display:flex;
  align-items:center;
  justify-content:center;
  z-index: 9999;
  `

const Wrapper = styled.div`
 width:600px;
 height:600px;
 background-color:${({theme})=>theme.bgLighter};
 color:${({theme})=>theme.text};
 padding:20px;
 display:flex;
 flex-direction:column;
 gap:20px;
 position:relative;
 z-index:10;
 border-radius:10px 10px;
 `

const Close = styled.div`
position:absolute;
top:10px;
right:10px;
cursor:pointer;
`

const Title = styled.h1`
  text-align:center;
  `
const Input = styled.input`
  boder:1px solid ${({theme})=>theme.soft};
  color:${({theme})=>theme.text};
  border-radius:3px;
  padding:10px;
  background-color:transparent;

`

const Desc = styled.textarea`
  boder:1px solid ${({theme})=>theme.soft};
  color:${({theme})=>theme.textSoft};
  border-radius:3px;
  padding:10px;
  background-color:transparent;
`

const Button = styled.button`
  border-radius:3px;
  border:none;
  padding:10px 20px;
  font-weight:500;
  cursor:pointer;
  bakground-color:${({theme})=>theme.soft};
  color:${({theme})=>theme.textSoft};
  cursor:pointer;
  &:hover{
    background:#076aed;
    color:white;
    box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
    transition:  0.4s ease;
  }
`

const Label = styled.label`
  font-size:14px;

`


const Upload = ({setOpen}) => {
  const [img,setImg] = useState()
  const [video,setVideo] = useState()
  const [imagePercentage,setImagePercentage] = useState(0)
  const [videoPercentage,setVideoPercentage] = useState(0)
  const [inputs,setInputs] = useState({})
  const [tags,setTags] = useState([])
  const navigate = useNavigate()

  const handleChange = e =>{
      setInputs(prev =>{ return { ...prev,[e.target.name]:e.target.value}
      })
  }

  const handleTags =(e)=>{
      setTags(e.target.value.split(","))
  }

  useEffect(()=>{
      video && uploadFile(video,"videoUrl")
  },[video])

  useEffect(()=>{
    img && uploadFile(img,"imgUrl")
  },[img])


  
  const uploadFile =(file,urlType)=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

// Listen for state changes, errors, and completion of the upload.
uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress =
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      urlType === "imgUrl" ? setImagePercentage(Math.round(progress)) : setVideoPercentage(Math.round(progress));
      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
        default:
          break;
      }
    },
    (error) => {},
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setInputs((prev) => {
          return { ...prev, [urlType]: downloadURL };
        });
      });
    }
  );
};


const handleUpload = async (e)=>{
   e.preventDefault();
   const res  = await axios.post("/videos",{ ...inputs,tags })
   setOpen(false)
   res.status === 200 && navigate(`/video/${res.data._id}`)
}

  return ( 
     <Container>
         <Wrapper>
             <Close onClick={()=>setOpen(false)}>X</Close>
             <Title>Upload a New Video</Title>
             <Label>Video:</Label>
             {videoPercentage > 0 ? ("Uploading " + videoPercentage + '%'):(<Input type="file" accept="video/*" onChange={e=>setVideo(e.target.files[0])}/>)}
             <Input type="text" placeholder='Title' name='title' onChange={handleChange}/>
             <Desc placeholder="Desciption" rows={8} name='desc' onChange={handleChange}/>
             <Input type="text" placeholder="Seperate the tags with commas." onChange={handleTags}/>
             <Label>Image:</Label>
             {imagePercentage > 0 ? ("Uploading " + imagePercentage + '%'):(
             <Input type="file" accept="image/*" onChange={e=>setImg(e.target.files[0])}/>)}
             <Button onClick={handleUpload}>Upload</Button>
         </Wrapper>
     </Container>
  )
}

export default Upload
