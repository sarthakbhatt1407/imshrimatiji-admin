import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import confirm from "react-alert-confirm";
import "react-alert-confirm/lib/style.css";
import CompLoader from "../Loaders/CompLoader";
const MainBox = styled.div`
  padding: 1rem 2rem;
  height: 93vh;
  position: relative;
`;

const InnerBox = styled.div`
  width: 98%;
  border-radius: 0.4rem;
  background-color: white;
  gap: 1rem;
  padding: 1rem;
  margin: 0 auto;
  position: relative;
`;
const ProductsTable = styled.table`
  height: fit-content;
  width: 100%;
  text-align: center;
  thead {
    background-color: #f1f2f2;
    tr {
      td {
        padding: 0.4rem 1rem;
        color: #5e5e5e;
        text-transform: capitalize;
        font-size: 0.9rem;
        font-weight: bold;
        &:first-child {
          text-align: center;
        }
        @media only screen and (max-width: 1220px) {
          font-size: 0.8rem;
        }
      }
    }
  }
  tbody {
    tr {
      td {
        padding: 0.8rem 1rem;

        font-size: 1rem;
        color: #4f4f4f;
        border-bottom: 1px solid #f2f2f2;
        a {
          color: black;
          text-decoration: none;
        }
      }
    }
  }
`;

const ProductImgTextBox = styled.div`
  margin: auto;
  width: 80%;
  display: flex;
  align-items: center;
  color: #4f4f4f;
  gap: 1rem;
  div {
    font-size: 1rem;
    p {
      font-size: 0.9rem;
    }
  }
  img {
    width: 5rem;
    border-radius: 0.3rem;
    display: inline;
    margin-right: 0.8rem;
  }
  p {
    text-transform: capitalize;
    display: inline;
    font-size: 1.2rem;
    font-weight: bold;
    div {
      span {
        font-size: 0.9rem;
      }
    }
  }
  @media only screen and (max-width: 1220px) {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.4rem;
    text-align: center;

    p {
      font-size: 1.25rem;
    }
    img {
      width: 7rem;
      margin-right: 0;
    }
  }
`;

const NoItemsFoundBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color: #f7f5f5; */
  height: 30vh;
  p {
    color: #a6a6a6b7;
    font-size: 1.7rem;
    letter-spacing: 0.2rem;
  }
`;

const ActionButton = styled.button`
  background-color: white;
  border: none;
  width: 2rem;
  height: 2rem;
  border-radius: 0.4rem;
  font-size: 1.2rem;
  transition: all 0.3s;
  margin: 0 0.2rem;
  cursor: pointer;
  &:hover {
    border: 1px solid #3d3d3d77e;
    transform: translateY(-1px);
    box-shadow: 0.1rem 0.1rem 0.5rem #919191;
  }
  &:active {
    transform: translateY(0);
  }
`;

const Modal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  width: 98%;
  /* height: 100%; */
  background-color: #00000038;
  border-radius: 0.4rem;
  padding: 1rem;
`;

const ModalInnerDiv = styled.div`
  width: 98%;
  height: 98%;
  margin: auto;
  background-color: white;
  border-radius: 0.4rem;
`;
const FormBox = styled.div`
  display: grid;
  width: 98%;
  border-radius: 0.4rem;
  background-color: white;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  margin: 0 auto;
  position: relative;
`;

const LabelInpBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  span {
    color: #ff0000ab;
    font-size: 0.8rem;
    margin-left: 0.2rem;
  }
`;
const Label = styled.label`
  font-size: 1.1rem;
  letter-spacing: 0.06rem;
  color: #9e9e9e;
  text-transform: capitalize;
`;
const Input = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 0.6rem;
  outline: none;
  border: 1px solid #d7d7d7;

  &::placeholder {
    color: #d4cdcd;
    letter-spacing: 0.09rem;
    text-transform: capitalize;
  }
  &:focus {
    border: 1px solid #c0c0c0;
    box-shadow: 0.1rem 0.1rem 0.5rem #c0c0c0;
  }
  &::-webkit-datetime-edit-month-field,
  &::-webkit-datetime-edit-day-field,
  &::-webkit-datetime-edit-year-field,
  &::-webkit-datetime-edit-fields-wrapper {
    color: #d4cdcd;
  }
`;
const Select = styled.select`
  padding: 0.4rem 1rem;
  border: none;
  color: #777;
  background-color: white;
  border-radius: 0.6rem;
  font-size: 1rem;
  font-weight: bold;
  letter-spacing: 0.04rem;
  border: 1px solid #777;
  border-style: dotted;
  text-transform: capitalize;
  &:focus {
    outline: none;
    border: none;
    border: 1px solid #777;
    border-style: dotted;
  }
  @media only screen and (max-width: 1099px) {
    padding: 1rem 0;
  }
`;
const Option = styled.option`
  color: #777;
  font-weight: bold;
  text-transform: capitalize;
`;

const Table = styled.table`
  /* background-color: red; */
  /* grid-area: 4 / 2 / 4 / 2; */
  font-size: 1.1rem;
  letter-spacing: 0.06rem;
  color: #9e9e9e;
  thead {
    text-align: center;
  }
  tbody {
    color: #393939a6;
    text-align: center;
    tr {
      td {
        span {
          font-size: 0.7rem;
          text-align: start;
          color: red;
        }
      }
    }
  }
`;

const ImgBox = styled.div`
  display: flex;
  padding: 1rem;
  border-radius: 0.6rem;
  outline: none;
  flex-wrap: wrap;

  gap: 1rem;
  img {
    width: 3rem;
  }
`;
const BtnDiv = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  button {
    background-color: #3d9cfb;
    color: white;
    border: none;
    padding: 0.8rem 2rem;
    border-radius: 0.4rem;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;
    letter-spacing: 0.09rem;
  }
`;

const EditProducts = () => {
  const [products, setProducts] = useState([]);
  const [refresher, setRefresher] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const fetcher = async () => {
    const resProducts = await fetch(
      `${process.env.REACT_APP_BASE_URL}/product/all-items`
    );
    const dataProducts = await resProducts.json();
    // console.log(dataProducts.products);
    setProducts(dataProducts.products);
  };

  useEffect(() => {
    fetcher();
    const intv = setInterval(() => {
      if (showModal) {
        allFieldChecker();
      }
    }, 1000);
    return () => {
      clearInterval(intv);
    };
  }, [refresher, showModal]);

  const [defulatFields, setDefaultField] = useState({
    title: "",
    desc: "",
    category: "saree",
    price: "",
    fabric: "",
    discount: "",
    slug: "",
    metaTitle: "",
    metaDesc: "",
    metaKeywords: "",
    color: "",
    stock: [{ xxl: 0 }, { xl: 0 }, { l: 0 }, { m: 0 }, { s: 0 }],
  });

  const [titleErr, setTitleErr] = useState(false);
  const [descErr, setDescErr] = useState(false);
  const [categoryErr, setCategoryErr] = useState(false);
  const [priceErr, setPriceErr] = useState(false);
  const [fabricErr, setFabricErr] = useState(false);
  const [discountErr, setDiscountErr] = useState(false);
  const [colorErr, setColorErr] = useState(false);
  const [smallErr, setSmallErr] = useState(false);
  const [mediumErr, setMediumErr] = useState(false);
  const [xlErr, setXlErr] = useState(false);
  const [lErr, setLErr] = useState(false);
  const [xxlErr, setXxlErr] = useState(false);
  const [imgErr, setImgErr] = useState(false);
  const [allFieldValid, setAllFieldValid] = useState(false);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inpField, setInpFields] = useState(defulatFields);
  const [state, setState] = React.useState({
    open: false,
    vertical: "top",
    horizontal: "center",
    text: "",
  });
  const { vertical, horizontal, open, text } = state;
  const [err, setErr] = useState(false);

  const allFieldChecker = () => {
    const title = document.querySelector("#title").value;
    const desc = document.querySelector("#desc").value;
    const fabric = document.querySelector("#fabric").value;
    const price = document.querySelector("#price").value;
    const color = document.querySelector("#color").value;
    const discount = document.querySelector("#discount").value;

    if (title.trim().length < 5) {
      return;
    }
    if (desc.trim().length < 30) {
      return;
    }
    if (fabric.trim().length < 1) {
      return;
    }
    if (price <= 0 || price === "") {
      return;
    }
    if (color === "") {
      return;
    }
    if (discount === "") {
      return;
    }
    const s = document.querySelector("#s").value;
    if (s < 0 || s === "") {
      return;
    }
    const m = document.querySelector("#m").value;
    if (m < 0 || m === "") {
      return;
    }
    const l = document.querySelector("#l").value;
    if (l < 0 || l === "") {
      return;
    }
    const xl = document.querySelector("#xl").value;
    if (xl < 0 || xl === "") {
      return;
    }
    const xxl = document.querySelector("#xxl").value;
    if (xxl < 0 || xxl === "") {
      return;
    }

    setAllFieldValid(true);
  };

  const onChangeHandler = (e) => {
    setAllFieldValid(false);
    const id = e.target.id;
    const val = e.target.value;
    if (id === "title") {
      if (val.endsWith("-")) {
        return;
      }
      const ele = document.querySelector(`#${id}`);
      ele.style.border = "1px solid #d7d7d7";
      setTitleErr(false);
      let str;

      str = val.trim().replaceAll(" ", "-");
      setInpFields({ ...inpField, [id]: val, metaTitle: val, slug: str });
      return;
    }
    if (id === "desc") {
      const ele = document.querySelector(`#${id}`);
      ele.style.border = "1px solid #d7d7d7";
      setInpFields({ ...inpField, [id]: val, metaDesc: val });
      setDescErr(false);
      return;
    }
    if (id === "price") {
      const ele = document.querySelector(`#${id}`);
      ele.style.border = "1px solid #d7d7d7";
      setPriceErr(false);
    }
    if (id === "color") {
      const ele = document.querySelector(`#${id}`);
      ele.style.border = "1px solid #d7d7d7";
      setColorErr(false);
    }
    if (id === "category") {
      const ele = document.querySelector(`#${id}`);
      const value = ele.options[ele.selectedIndex].value;
      setInpFields({ ...inpField, [id]: value });
      return;
    }
    if (id === "fabric") {
      const ele = document.querySelector(`#${id}`);
      ele.style.border = "1px solid #d7d7d7";
      setFabricErr(false);
    }
    if (id === "discount") {
      const ele = document.querySelector(`#${id}`);
      ele.style.border = "1px solid #d7d7d7";
      setDiscountErr(false);
    }
    if (id === "s") {
      const ele = document.querySelector(`#${id}`);
      ele.style.border = "1px solid #d7d7d7";
      setSmallErr(false);
      const updatedStock = inpField.stock.map((obj) => {
        for (const key in obj) {
          if (key === id) {
            obj[key] = Number(val);
          }
        }
        return obj;
      });
      console.log(updatedStock);
      setInpFields({ ...inpField, stock: updatedStock });
      return;
    }
    if (id === "m") {
      const ele = document.querySelector(`#${id}`);
      ele.style.border = "1px solid #d7d7d7";
      setMediumErr(false);
      const updatedStock = inpField.stock.map((obj) => {
        for (const key in obj) {
          if (key === id) {
            obj[key] = Number(val);
          }
        }
        return obj;
      });
      setInpFields({ ...inpField, stock: updatedStock });
      return;
    }
    if (id === "l") {
      const ele = document.querySelector(`#${id}`);
      ele.style.border = "1px solid #d7d7d7";
      setLErr(false);
      const updatedStock = inpField.stock.map((obj) => {
        for (const key in obj) {
          if (key === id) {
            obj[key] = Number(val);
          }
        }
        return obj;
      });
      setInpFields({ ...inpField, stock: updatedStock });
      return;
    }
    if (id === "xl") {
      const ele = document.querySelector(`#${id}`);
      ele.style.border = "1px solid #d7d7d7";
      setXlErr(false);
      const updatedStock = inpField.stock.map((obj) => {
        for (const key in obj) {
          if (key === id) {
            console.log(obj);
            obj[key] = Number(val);
          }
        }
        return obj;
      });
      setInpFields({ ...inpField, stock: updatedStock });
      return;
    }
    if (id === "xxl") {
      const ele = document.querySelector(`#${id}`);
      ele.style.border = "1px solid #d7d7d7";
      setXxlErr(false);
      const updatedStock = inpField.stock.map((obj) => {
        for (const key in obj) {
          if (key === id) {
            obj[key] = Number(val);
          }
        }
        return obj;
      });
      setInpFields({ ...inpField, stock: updatedStock });
      return;
    }

    setInpFields({ ...inpField, [id]: val });
  };

  const onBlurHandler = (e) => {
    const id = e.target.id;
    const val = e.target.value;
    const ele = document.querySelector(`#${id}`);
    if (id === "title" && val.trim().length < 5) {
      setTitleErr(true);
      ele.style.border = "1px solid red";
    }
    if (id === "desc" && val.trim().length < 30) {
      setDescErr(true);
      ele.style.border = "1px solid red";
    }

    if (id === "fabric" && val.trim().length < 1) {
      setFabricErr(true);
      ele.style.border = "1px solid red";
    }
    if (id === "price" && (val <= 0 || val === "")) {
      setPriceErr(true);
      ele.style.border = "1px solid red";
    }
    if (id === "color" && val === "") {
      setColorErr(true);
      ele.style.border = "1px solid red";
    }
    if (id === "discount" && val === "") {
      setDiscountErr(true);
      ele.style.border = "1px solid red";
    }
    if (id === "s" && (val < 0 || val === "")) {
      setSmallErr(true);
      ele.style.border = "1px solid red";
    }
    if (id === "m" && (val < 0 || val === "")) {
      setMediumErr(true);
      ele.style.border = "1px solid red";
    }
    if (id === "l" && (val < 0 || val === "")) {
      setLErr(true);
      ele.style.border = "1px solid red";
    }
    if (id === "xl" && (val < 0 || val === "")) {
      setXlErr(true);
      ele.style.border = "1px solid red";
    }
    if (id === "xxl" && (val < 0 || val === "")) {
      setXxlErr(true);
      ele.style.border = "1px solid red";
    }
  };

  const imgReader = (img) => {
    var reader = new FileReader();

    // When the file is loaded, display the image
    reader.onload = function (event) {
      // Get the image data
      var imageData = event.target.result;

      // Create a new image element
      var image = new Image();

      // Set the image src attribute to the image data
      image.src = imageData;

      // Add the image to the document body
      document.querySelector("#imgbox").appendChild(image);
    };

    // Read the image file
    reader.readAsDataURL(img);
  };

  const imgHanlder = (e) => {
    setImgErr(false);
    const ele = document.querySelector(`#${e.target.id}`);
    ele.style.border = "1px solid #d7d7d7";
    document.querySelector("#imgbox").innerHTML = "";
    setImages(e.target.files);
    const arr = [...e.target.files];
    for (const img of arr) {
      imgReader(img);
    }
  };

  const click = async () => {
    // console.log(inpField);
    // return;
    const ele = document.querySelector("#img");
    if (images.length < 1) {
      setImgErr(true);
      ele.style.border = "1px solid red";
      return;
    }
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", inpField.title);
    formData.append("id", inpField.id);
    formData.append("desc", inpField.desc);
    formData.append("category", inpField.category);
    formData.append("price", inpField.price);
    formData.append("fabric", inpField.fabric);
    formData.append("discount", inpField.discount);
    formData.append("slug", inpField.slug);
    formData.append("metaTitle", inpField.metaTitle);
    formData.append("metaDesc", inpField.metaDesc);
    formData.append("metaKeywords", inpField.metaKeywords);
    formData.append("color", inpField.color);
    formData.append("stock", JSON.stringify(inpField.stock));
    for (const file of images) {
      formData.append("image", file);
    }

    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/product/edit-item`,
      {
        method: "PATCH",
        body: formData,
      }
    );
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      setState({ ...state, open: true, text: "Product Added." });
      setInpFields(defulatFields);
      setImages([]);
      setShowModal(false);
    } else {
      setState({ ...state, open: true, text: "Unable to add product." });
      setErr(true);
      setTimeout(() => {
        setErr(false);
      }, 4000);
    }
    setIsLoading(false);
  };
  const handleClose = () => {
    setState({ ...state, open: false });
  };
  function handleClickBasic(id) {
    confirm({
      title: "Do you want to delete product ?",
      language: "en",
      content: <h2> </h2>,
      onOk: async () => {
        const res = await fetch(
          `${process.env.REACT_APP_BASE_URL}/product/delete-restore`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              id: id,
              action: "delete",
            }),
          }
        );
        const data = await res.json();
        console.log(data);
        if (res.ok) {
          setRefresher(refresher + 1);
        }
      },
    });
  }

  return (
    <MainBox>
      <InnerBox>
        {showModal && (
          <Modal>
            <ModalInnerDiv>
              <FormBox data-aos="zoom-in">
                {isLoading && <CompLoader />}
                <LabelInpBox>
                  <Label htmlFor="title">Product Title</Label>
                  <Input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="enter title"
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler}
                    value={inpField.title}
                  />
                  {titleErr && <span data-aos="fade-in">Invalid title</span>}
                </LabelInpBox>
                <LabelInpBox>
                  <Label htmlFor="desc">Description</Label>
                  <Input
                    type="text"
                    name="desc"
                    id="desc"
                    placeholder="enter description"
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler}
                    value={inpField.desc}
                  />
                  {descErr && (
                    <span data-aos="fade-in">
                      Description is too short (Req. length is 30 characters).
                    </span>
                  )}
                </LabelInpBox>
                <LabelInpBox>
                  <Label htmlFor="category">product category</Label>

                  <Select
                    name="category"
                    id="category"
                    onChange={onChangeHandler}
                  >
                    <Option value={"saree"}>saree</Option>;
                    <Option value={"kurti"}>kurti</Option>;
                    <Option value={"frock"}>frock</Option>;
                    <Option value={"suit"}>suit</Option>;
                  </Select>
                </LabelInpBox>
                <LabelInpBox>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    type="number"
                    name="price"
                    id="price"
                    placeholder="enter price"
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler}
                    value={inpField.price}
                  />
                  {priceErr && <span data-aos="fade-in">Invalid price</span>}
                </LabelInpBox>
                <LabelInpBox>
                  <Label htmlFor="color">Color</Label>
                  <Input
                    type="text"
                    name="color"
                    id="color"
                    placeholder="enter color (ex. red, green or hex code)"
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler}
                    value={inpField.color}
                  />
                  {colorErr && <span data-aos="fade-in">Invalid color</span>}
                </LabelInpBox>
                <LabelInpBox>
                  <Label htmlFor="fabric">fabric</Label>
                  <Input
                    type="text"
                    name="fabric"
                    id="fabric"
                    placeholder="enter fabric"
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler}
                    value={inpField.fabric}
                  />
                  {fabricErr && <span data-aos="fade-in">Invalid fabric</span>}
                </LabelInpBox>
                <LabelInpBox>
                  <Label htmlFor="discount">discount(%)</Label>
                  <Input
                    type="number"
                    name="discount"
                    id="discount"
                    placeholder="enter discount (Ex. 0, 5, 10, 15)"
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler}
                    value={inpField.discount}
                  />
                  {discountErr && (
                    <span data-aos="fade-in">Invalid discount</span>
                  )}
                </LabelInpBox>
                <LabelInpBox>
                  <Label htmlFor="">Meta title</Label>
                  <Input
                    type="text"
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler}
                    value={inpField.metaTitle}
                    disabled
                  />
                </LabelInpBox>
                <LabelInpBox>
                  <Label htmlFor="">Slug url</Label>
                  <Input
                    type="text"
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler}
                    value={inpField.slug}
                    disabled
                  />
                </LabelInpBox>
                <LabelInpBox>
                  <Label htmlFor="">Meta Desc</Label>
                  <Input
                    type="text"
                    onChange={onChangeHandler}
                    onBlur={onBlurHandler}
                    value={inpField.metaDesc}
                    disabled
                  />
                </LabelInpBox>
                <div></div>
                <div></div>
                <Table>
                  <thead>
                    <tr>
                      <td>Size</td>
                      <td>Stock</td>
                    </tr>
                  </thead>
                  <tbody>
                    {inpField.stock.map((size) => {
                      for (const key in size) {
                        return (
                          <>
                            <tr>
                              <td>{key}</td>
                              <td
                                style={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                              >
                                <Input
                                  type="number"
                                  id={key}
                                  onChange={onChangeHandler}
                                  onBlur={onBlurHandler}
                                  value={size[key]}
                                />
                              </td>
                            </tr>
                          </>
                        );
                      }
                    })}
                  </tbody>
                </Table>
                <LabelInpBox>
                  <Label htmlFor="">Product Images</Label>
                  <Input
                    type="file"
                    name=""
                    id="img"
                    multiple
                    onChange={imgHanlder}
                  />
                  {imgErr && <span data-aos="fade-in">Select images.</span>}
                  <ImgBox id="imgbox"></ImgBox>
                </LabelInpBox>
                <div></div>
                <div></div>
                <BtnDiv>
                  {allFieldValid && <button onClick={click}>Submit</button>}
                  {!allFieldValid && (
                    <button
                      disabled
                      style={{ backgroundColor: "#eaeaea" }}
                      onClick={() => {
                        console.log(inpField);
                      }}
                    >
                      Submit
                    </button>
                  )}

                  <button
                    style={{ backgroundColor: "#b2b2b2" }}
                    onClick={() => {
                      setShowModal(false);
                    }}
                  >
                    Cancel
                  </button>
                </BtnDiv>
              </FormBox>{" "}
            </ModalInnerDiv>
          </Modal>
        )}
        <ProductsTable>
          <thead>
            <tr>
              <td>Product</td>
              <td>Price</td>
              <td>Category</td>
              <td>Color</td>
              <td>Stock</td>
              <td>Added on</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 &&
              products.map((item) => {
                if (item.status != true) {
                  return <></>;
                }
                return (
                  <tr key={item.id + Math.random() * 20}>
                    <td>
                      <Link
                        to={`${process.env.REACT_APP_DEPLOYED_FRONTEND_URL}/product/${item.category}/${item.slug}/${item.id}`}
                      >
                        <ProductImgTextBox>
                          <img src={item.images.split(" ")[0]} alt="" />
                          <p>
                            <div>
                              <span>{item.title} </span>
                            </div>
                          </p>
                        </ProductImgTextBox>
                      </Link>
                    </td>
                    <td>₹ {Number(item.price).toLocaleString("en-IN")}</td>
                    <td>{item.category}</td>
                    <td>{item.color}</td>
                    <td>
                      {item.stock.map((size) => {
                        for (const key in size) {
                          return (
                            <span>
                              {key.toUpperCase()} : {size[key]} <br />
                            </span>
                          );
                        }
                      })}
                    </td>
                    <td>
                      {item.date} <br /> {item.time}
                    </td>{" "}
                    <td>
                      <ActionButton
                        id={item.id}
                        onClick={(e) => {
                          const id = e.target.id;
                          const pro = products.find((item) => {
                            return item.id === id;
                          });
                          setInpFields(pro);
                          setShowModal(true);
                        }}
                      >
                        &#9998;
                      </ActionButton>
                      <ActionButton
                        id={item.id}
                        onClick={(e) => {
                          handleClickBasic(e.target.id);
                        }}
                      >
                        &#x1F5D1;
                      </ActionButton>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </ProductsTable>
        {products.length === 0 && (
          <NoItemsFoundBox>
            <p>No orders found!</p>
          </NoItemsFoundBox>
        )}
      </InnerBox>
    </MainBox>
  );
};

export default EditProducts;
