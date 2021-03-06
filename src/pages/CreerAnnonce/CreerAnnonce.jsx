import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthContext } from "../../auth/auth";

const url = `${process.env.REACT_APP_API_URL}/api/article/create`;
const schema = yup.object().shape({
  title: yup
    .string()
    .min(3, "Le titre doit contenir au moins 3 caracteres")
    .max(25, "Le titre ne doit pas contenir plus de 25 caracteres")
    .required("Ce champ est obligatoire"),
  // categoryId: yup.string().required("Ce champ est obligatoire"),
  // valueId: yup.string().required("Ce champ est obligatoire"),
  // ageRangeId: yup.string().required("Ce champ est obligatoire"),
  condition: yup
    .string()
    .max(15, "etat du jouet trop long")
    .required("Ce champ est obligatoire"),
  description: yup.string().max(150, "votre description est trop longue"),
});
const CreerAnnonce = () => {
  const { authState } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [categoryFromAPI, setCategoryFromAPI] = useState();
  const [valueFromAPI, setValueFromAPI] = useState();
  const [ageRangeFromAPI, setAgeRangeFromAPI] = useState();
  const [articleImage, setArticleImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ageRangeId, setAgeRangeId] = useState("");
  const [userId, setUserId] = useState("");
  const [condition, setCondition] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [valueId, setValueId] = useState("");

  const [Value, setValue] = useState([
    {
      name: "",
      id: "",
    },
  ]);
  const [category, setCategory] = useState([
    {
      name: "",
      id: "",
    },
  ]);

  const [ageRange, setAgeRange] = useState([
    {
      range: "",
      id: "",
    },
  ]);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // const onSubmit = async (data) => {
  //   await axios
  //     .post(url, data, {
  //       headers: {
  //         // Accept: "application/json",
  //         // "Content-Type": "multipart/form-data",
  //         accessToken: localStorage.getItem("accessToken"),
  //       },
  //     })
  //     .then((res) => {
  //       console.log("res.data :>> ", res.data);
  //       navigate("/mesannonces", { replace: true });
  //     })
  //     .catch((err) => {
  //       console.log("err :>> ", err);
  //     });
  // };
  useEffect(() => {
    setUserId(authState.id);
    console.log("i wanna see the authstate id you know :>> ", authState.id);
  }, []);

  const addArticleHandler = async () => {
    //e.preventDefault();

    const formData = new FormData();
    formData.append("image", articleImage);
    formData.append("title", title);
    formData.append("valueId", valueId);
    formData.append("description", description);
    formData.append("categoryId", categoryId);
    formData.append("ageRangeId", ageRangeId);
    formData.append("condition", condition);
    formData.append("userId", userId);

    console.log("formData :>> ", formData);
    await axios.post(url, formData);
    navigate(`/mesannonces/${authState.id}`, { replace: true });
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/category/all`)
      .then((res) => {
        setCategoryFromAPI(res.data);
        console.log("category from api:>> ", res.data);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/value/all`)
      .then((res) => {
        setValueFromAPI(res.data.allValues);
        console.log("jvalues from api:>> ", res.data.allValues);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/agerange/all`)
      .then((res) => {
        setAgeRangeFromAPI(res.data);
        console.log("jage range from api:>> ", res.data);
      })
      .catch((err) => {
        console.log("err :>> ", err);
      });
  }, []);

  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      borderBottom: "1px dotted #F6F6F6",
      color: state.isSelected ? "#6935d7" : "black",
      padding: 20,
      background: "white",
      borderRadius: "0.625rem",
      "&:hover": {
        background: "#F6F6F6",
      },
    }),

    indicatorSeparator: () => ({
      border: "none",
    }),

    indicatorsContainer: () => ({
      borderLeft: "1px solid #f1f1f1",
      // padding: "10px",
      marginRight: "2px",
      cursor: "pointer",
    }),

    control: () => ({
      // none of react-select's styles are passed to <Control />
      display: "flex",
      width: 236,
      marginTop: "0.5rem",
      height: 40,
      border: "1px solid #DADBDC",
      borderRadius: 10,
      backgroundColor: "white",
    }),
    singleValue: (provided, state) => {
      const opacity = state.isDisabled ? 0.5 : 1;
      const transition = "opacity 300ms";

      return { ...provided, opacity, transition };
    },
  };

  const handleCategory = (obj, index) => {
    console.log("obj :>> ", obj);
    const { name, value, id } = obj;
    const list = [...category];
    list[index][name] = value;
    // list[index]["id"] = id;
    console.log('list[index]["id"] = id; :>> ', (list[index]["id"] = id));
    setCategory(list);
    setCategoryId(obj.id);
    console.log("ID???category :>> ", obj.id);
  };

  const handleValue = (obj, index) => {
    console.log("obj :>> ", obj);
    const { name, value, id } = obj;
    const list = [...Value];
    list[index][name] = value;
    // list[index]["id"] = id;
    console.log('list[index]["id"] = id; :>> ', (list[index]["id"] = id));
    setValue(list);
    setValueId(obj.id);
    console.log("VAlueIDDDDD:>> ", obj.id);
  };

  const handleAgeRange = (obj, index) => {
    console.log("obj :>> ", obj);
    const { range, value, id } = obj;
    const list = [...ageRange];
    list[index][range] = value;
    // list[index]["id"] = id;
    console.log('list[index]["id"] = id; :>> ', (list[index]["id"] = id));
    setAgeRange(list);
    setAgeRangeId(obj.id);
    console.log("age range id>> ", obj.id);
  };

  return (
    <section className="section-creer-annonce">
      <div className="container-create-article">
        <h1>Creer une annonce</h1>
        <p>
          Creer votre annonce pour que les autres utilisateurs puissent vous
          proposer un ??change. <br />
          Cela vous permet aussi de proposer un ??change avec un jouet de m??me
          cat??gorie.
        </p>
        <div className="container-form">
          <form
            onSubmit={handleSubmit(addArticleHandler)}
            method="POST"
            encType="multipart/form-data"
          >
            <section className="section-form">
              <div className="left-form">
                <label htmlFor="title">Nom du jouet</label>
                <input
                  className="input"
                  {...register("title", {
                    required: "Required",
                  })}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
                <span className="warning-msg">
                  {errors.title && errors.title.message}
                </span>
                {Value.map((el, index) => {
                  const options =
                    valueFromAPI &&
                    valueFromAPI.map((el) => {
                      return {
                        value: el.name,
                        label: el.name,
                        name: "value",
                        id: el.id,
                      };
                    });
                  return (
                    <div className="select-container" key={index}>
                      <label htmlFor="value">Valeur</label>
                      <Select
                        className="select-value"
                        // {...register("valueId", {
                        //   required: "Required",
                        // })}
                        options={options}
                        styles={customStyles}
                        placeholder="Valeur"
                        onChange={(obj) => handleValue(obj, index)}
                        name="valueId"
                      />
                      <span className="warning-msg">
                        {errors.valueId && errors.valueId.message}
                      </span>
                    </div>
                  );
                })}

                {category.map((el, index) => {
                  const option =
                    categoryFromAPI &&
                    categoryFromAPI.map((el) => {
                      return {
                        value: el.name,
                        label: el.name,
                        name: "category",
                        id: el.id,
                      };
                    });
                  return (
                    <div className="select-container" key={index}>
                      <label htmlFor="condition">Cat??gorie</label>
                      <Select
                        className="select-type"
                        data-testid="input"
                        // {...register("categoryId", {
                        //   required: "Required",
                        // })}
                        options={option}
                        styles={customStyles}
                        placeholder="Categorie"
                        onChange={(obj) => handleCategory(obj, index)}
                        name="categoryId"
                      />
                      <span className="warning-msg">
                        {errors.categoryId && errors.categoryId.message}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="right-form">
                <label htmlFor="image">Image</label>
                <input
                  id="choose-file"
                  className="custom-image-input"
                  type="file"
                  name="image"
                  onChange={(e) => setArticleImage(e.target.files[0])}
                  accept="image/*"
                />

                <label htmlFor="condition">Etat</label>
                <input
                  className="input"
                  {...register("condition", {
                    required: "Required",
                  })}
                  value={condition}
                  onChange={(e) => setCondition(e.target.value)}
                ></input>
                <span className="warning-msg">
                  {errors.condition && errors.condition.message}
                </span>

                {ageRange.map((el, index) => {
                  const options =
                    ageRangeFromAPI &&
                    ageRangeFromAPI.map((el) => {
                      return {
                        value: el.range,
                        label: el.range,
                        name: "ageRange",
                        id: el.id,
                      };
                    });
                  return (
                    <div className="select-container" key={index}>
                      <label htmlFor="ageRange">Tranche d'??ge</label>
                      <Select
                        className="select-agerange"
                        // {...register("ageRangeId", {
                        //   required: "Required",
                        // })}
                        options={options}
                        styles={customStyles}
                        placeholder="Tranche d'??ge"
                        onChange={(obj) => handleAgeRange(obj, index)}
                        name="ageRangeId"
                      />
                      <span className="warning-msg">
                        {errors.ageRangeId && errors.ageRangeId.message}
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>
            <div className="bottom-form">
              <label htmlFor="description">Description</label>
              <input
                className="description-annonce"
                {...register("description", {
                  required: "Required",
                })}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></input>
              <span className="warning-msg">
                {errors.description && errors.description.message}
              </span>
              <div className="div-btn-submit">
                <button className="button" type="submit">
                  Creer une annonce
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default CreerAnnonce;
