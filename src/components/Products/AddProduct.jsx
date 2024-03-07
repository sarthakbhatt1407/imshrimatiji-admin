import React, { useState } from "react";
import styled from "styled-components";

const MainBox = styled.div`
  background-color: #f5f5f5;
  padding: 1rem 2rem;
  height: 93vh;
`;

const FormBox = styled.div`
  display: grid;
  width: 95%;
  border-radius: 0.4rem;
  background-color: white;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  padding: 1rem;
  margin: 0 auto;
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

const AddProduct = () => {
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

  const defulatFields = {
    title: "",
    desc: "",
    category: "",
    price: "",
    fabric: "",
    discount: "",
    slug: "",
    metaTitle: "",
    metaDesc: "",
    metaKeywords: "",
    color: "",
    stock: [{ xxl: 0 }, { xl: 0 }, { l: 0 }, { m: 0 }, { s: 0 }],
  };
  const [images, setImages] = useState([]);

  const [inpField, setInpFields] = useState(defulatFields);

  const onChangeHandler = (e) => {
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
    console.log(JSON.stringify(inpField.stock));
    // return;
    const ele = document.querySelector("#img");
    if (images.length < 1) {
      setImgErr(true);
      ele.style.border = "1px solid red";
      return;
    }
    const formData = new FormData();
    formData.append("title", inpField.title);
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
      `${process.env.REACT_APP_BASE_URL}/product/create-new-product`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    console.log(data);
  };

  return (
    <MainBox>
      <FormBox>
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
          {/* <Input
            required
            type="text"
            name="category"
            id="category"
            placeholder="enter category"
            onChange={onChangeHandler}
            onBlur={onBlurHandler}
            value={inpField.category}
          /> */}
          <Select name="category" id="category" onChange={onChangeHandler}>
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
          {discountErr && <span data-aos="fade-in">Invalid discount</span>}
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
            <tr>
              <td>S</td>
              <td style={{ display: "flex", flexDirection: "column" }}>
                <Input
                  type="number"
                  id="s"
                  onChange={onChangeHandler}
                  onBlur={onBlurHandler}
                />
                {smallErr && <span data-aos="fade-in">Invalid number</span>}
              </td>
            </tr>
            <tr>
              <td>M</td>
              <td style={{ display: "flex", flexDirection: "column" }}>
                <Input
                  type="number"
                  id="m"
                  onChange={onChangeHandler}
                  onBlur={onBlurHandler}
                />
                {mediumErr && <span data-aos="fade-in">Invalid number</span>}
              </td>
            </tr>
            <tr>
              <td>L</td>
              <td style={{ display: "flex", flexDirection: "column" }}>
                <Input
                  type="number"
                  id="l"
                  onChange={onChangeHandler}
                  onBlur={onBlurHandler}
                />
                {lErr && <span data-aos="fade-in">Invalid number</span>}
              </td>
            </tr>
            <tr>
              <td>XL</td>
              <td style={{ display: "flex", flexDirection: "column" }}>
                <Input
                  type="number"
                  id="xl"
                  onChange={onChangeHandler}
                  onBlur={onBlurHandler}
                />
                {xlErr && <span data-aos="fade-in">Invalid number</span>}
              </td>
            </tr>
            <tr>
              <td>XXL</td>
              <td style={{ display: "flex", flexDirection: "column" }}>
                <Input
                  type="number"
                  id="xxl"
                  onChange={onChangeHandler}
                  onBlur={onBlurHandler}
                />
                {xxlErr && <span data-aos="fade-in">Invalid number</span>}
              </td>
            </tr>
          </tbody>
        </Table>
        <LabelInpBox>
          <Label htmlFor="">Product Images</Label>
          <Input type="file" name="" id="img" multiple onChange={imgHanlder} />
          {imgErr && <span data-aos="fade-in">Select images.</span>}
          <ImgBox id="imgbox"></ImgBox>
        </LabelInpBox>
      </FormBox>{" "}
      <button onClick={click}>Submit</button>
    </MainBox>
    // <div>
    //   {/* <input type="file" name="" id="img" multiple onChange={onChangeHandler} />
    //   <button onClick={click}>submit</button> */}
    // </div>
  );
};

export default AddProduct;
