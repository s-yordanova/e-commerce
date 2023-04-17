import { Link, useLocation } from "react-router-dom";
import Chart from "../../components/chart/Chart";
import "./product.css";
import { Publish } from "@mui/icons-material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
import { updateProducts } from "../../redux/apiCalls";
import Message from "../../components/message/Message";

const Product = () => {
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [categ, setCateg] = useState([]);
  const [size, setSize] = useState([]);
  const [color, setColor] = useState([]);
  const [img, setImg] = useState();
  const dispatch = useDispatch();

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });

        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

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

  const { isFetching, error, success } = useSelector((state) => state.product);

  const handleClick = (e) => {
    e.preventDefault();
    if (inputs || categ || file) {
      if (file) {
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
              const upadtedProduct = {
                ...product,
                ...inputs,
                img: downloadURL,
                categories: categ.length > 0 ? categ : product.categories,
                size: size.length > 0 ? size : product.size,
                color: color.length > 0 ? color : product.color,
              };
              updateProducts(product._id, upadtedProduct, dispatch);
            });
          }
        );
      } else {
        const upadtedProduct = {
          ...product,
          ...inputs,
          categories: categ.length > 0 ? categ : product.categories,
          size: size.length > 0 ? size : product.size,
          color: color.length > 0 ? color : product.color,
        };
        updateProducts(product._id, upadtedProduct, dispatch);
      }
    }
  };

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newProduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="produtcInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id: </span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales: </span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock: </span>
              <span className="productInfoValue">{product.inStock? "Yes" : "No"} </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form action="" className="productForm">
          <div className="productFormLeft">
            <label htmlFor="">Title</label>
            <input
              name="title"
              type="text"
              placeholder={product.title}
              onChange={handleChange}
            />
            <label htmlFor="">Product Description</label>
            <input
              name="desc"
              type="text"
              placeholder={product.desc}
              onChange={handleChange}
            />
            <label htmlFor="">Product Price</label>
            <input
              name="price"
              type="number"
              placeholder={product.price}
              onChange={handleChange}
            />
            <label htmlFor="">Categories</label>
            <input
              type="text"
              placeholder={product.categories}
              onChange={handleCateg}
            />
            <label htmlFor="">Size</label>
            <input
              type="text"
              placeholder={product.size}
              onChange={handleSize}
            />
            <label htmlFor="">Color</label>
            <input
              type="text"
              placeholder={product.color}
              onChange={handleColor}
            />
            <label htmlFor="">In Stock</label>
            <select name="inStock" id="inStock" onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <label htmlFor="">On Sale</label>
            <select name="onSale" id="onSale" onChange={handleChange}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
            <label htmlFor="">Quantity</label>
            <input
              name="quantity"
              type="number"
              placeholder={product.quantity}
              onChange={handleChange}
            />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img
                src={
                  img ||
                  product.img ||
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
            <button
              onClick={handleClick}
              className="productButton"
              disabled={isFetching}
            >
              Update
            </button>
            {error ? (
              <Message variant={"error"} children={"Нещо се обърка.."} />
            ) : null}
            {success ? (
              <Message variant={"success"} children={"Успешно обновяване!"} />
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Product;
