//1. Import Area
import { useState } from 'react';
import swal from 'sweetalert';
import axios from 'axios';
import './App.css';

//2. Defination Area
function App() {  
  //2.1 Hook Area
  const [file,setFile] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);


  //2.2 Function Defination Area
  let handleChange = (e)=>{
    //alert("okokok")
    let img = document.getElementById("imgPreview")
    console.log(e.target.files[0]);
    let file = e.target.files[0];
    setFile(file);
    if(file.type === 'image/jpeg' || file.type === 'image/png'){
     // alert('I can upload the file')
      img.src = URL.createObjectURL(file);//'https://www.datocms-assets.com/45470/1631110818-logo-react-js.png';
    }else{
      alert('Please upload image only');
    }
  }

  let handleUpload = (e)=>{
    //alert("hye")

    const formData = new FormData();
    formData.append('files', file);

    axios.post('http://localhost:1337/api/upload', formData,{
      headers:{
        "Content-Type" : "multipart/form-data",
      },
      onUploadProgress : (progressEvent) => {
        var progress = parseInt(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        console.log(progress);
        setUploadPercentage(progress);
        // Update state here
        //onUploadProgress(progress);
        if(progress === 100){
          //setUploadPercentage(0);
          swal("Good job!", "Image uploaded successfully!", "success");
        }
      }
    });

  }


  //2.3 Return Statement
  return (
    <div className="App">
        <form>
          <input type="file" name="files" onChange={(e)=>{ handleChange(e) }} />
          <input type="button" value="Upload" onClick={handleUpload} />
        </form>

        <br />
        <img src="" id="imgPreview" />
        {
          uploadPercentage > 0 &&
        <div className="progress w-50 offset-3" role="progressbar" aria-label="Success striped example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
          <div className="progress-bar progress-bar-striped bg-success" style={{width: uploadPercentage+"%"}}></div>
        </div>
        }
    </div>
  );
}

//3. Export Area
export default App;
