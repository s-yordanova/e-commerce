import { Publish } from "@mui/icons-material";
import { useState } from "react";
import "./newProduct.css";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { addProducts } from "../../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/message/Message";

const NewProduct = () => {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [categ, setCateg] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [img, setImg] = useState();
  const { isFetching, error, success } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleCateg = (e) => {
    setCateg(e.target.value.split(","));
  };

  const handleSize = (e) => {
    setSize(e.target.value.split(","));
  };

  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, file);

    // Register three observers:
    // 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
    // 3. Completion observer, called on successful completion
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {
            ...inputs,
            img: downloadURL,
            categories: categ,
            size: size,
            color: color,
          };
          addProducts(product, dispatch);
        });
      }
    );
  };

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form action="" className="productForm">
        <div className="productFormLeft">
          <label htmlFor="">Title</label>
          <input
            name="title"
            type="text"
            placeholder="Jeans"
            onChange={handleChange}
          />
          <label htmlFor="">Description</label>
          <input
            name="desc"
            type="text"
            placeholder="Description..."
            onChange={handleChange}
          />
          <label htmlFor="">Price</label>
          <input
            name="price"
            type="number"
            placeholder="100"
            onChange={handleChange}
          />
          <label htmlFor="">Categories</label>
          <input type="text" placeholder="jeans, men" onChange={handleCateg} />
          <label htmlFor="">Size</label>
          <input type="text" placeholder="S, M, L" onChange={handleSize} />
          <label htmlFor="">Color</label>
          <input type="text" placeholder="red, blue" onChange={handleColor} />
          <label htmlFor="">Stock</label>
          <select name="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <label htmlFor="">Quantity</label>
            <input
              name="quantity"
              type="number"
              placeholder="10"
              onChange={handleChange}
            />
        </div>
        <div className="productFormRight">
          <div className="productUpload">
            <img
              src={
                img ||
                "https://www.odoo.com/web/image/res.users/1072846/image_1024?unique=3f33558"
              }
              alt=""
              className="productUploadImg"
            />
            <label htmlFor="file">
              <Publish />
            </label>
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={(e) => {
                setFile(e.target.files[0]);
                const [filei] = e.target.files;
                setImg(URL.createObjectURL(filei));
              }}
            />
          </div>
          <button onClick={handleClick} className="productButton">
            Create
          </button>
          {error ? (
              <Message variant={"error"} children={"Нещо се обърка.."} />
            ) : null}
            {success ? (
              <Message variant={"success"} children={"Успешно добавяне!"} />
            ) : null}
        </div>
      </form>
    </div>
  );
};

export default NewProduct;
