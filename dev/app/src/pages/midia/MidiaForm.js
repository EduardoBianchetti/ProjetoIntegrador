import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { Calendar } from "primereact/calendar";
import { AutoComplete } from "primereact/autocomplete";
import TipoMidiaSrv from "../tipoMidia/TipoMidiaSrv";
import AutorSrv from "../autor/AutorSrv";
import GeneroSrv from "../genero/GeneroSrv";

const MidiaForm = (props) => {
  const [tiposMidias, setTiposMidias] = useState([]);
  const [autores, setAutores] = useState([]);
  const [generos, setGeneros] = useState([]);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    props.setMidia({ ...props.midia, [name]: value });
  };

  useEffect(() => {
    onClickAtualizarAutor();
    onClickAtualizarGenero();
    onClickAtualizarTipoMidia();
  }, []);

  const onClickAtualizarAutor = () => {
    AutorSrv.listar()
      .then((response) => {
        setAutores(response.data);
      })
      .catch((e) => {});
  };

  const onClickAtualizarGenero = () => {
    GeneroSrv.listar()
      .then((response) => {
        setGeneros(response.data);
      })
      .catch((e) => {});
  };

  const onClickAtualizarTipoMidia = () => {
    TipoMidiaSrv.listar()
      .then((response) => {
        setTiposMidias(response.data);
      })
      .catch((e) => {});
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    props.salvar();
  };
  const [filteredTiposMidias, setFilteredTiposMidias] = useState(null);
  const [filteredAutores, setFilteredAutores] = useState(null);
  const [filteredGeneros, setFilteredGeneros] = useState(null);

  const searchTipoMidia = (event) => {
    setTimeout(() => {
      let _filteredTiposMidias;
      if (!event.query.trim().length) {
        _filteredTiposMidias = [...tiposMidias];
      } else {
        _filteredTiposMidias = tiposMidias.filter((tipoMidia) => {
          return tipoMidia.nome
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredTiposMidias(_filteredTiposMidias);
    }, 250);
  };
  const searchAutor = (event) => {
    setTimeout(() => {
      let _filteredAutores;
      if (!event.query.trim().length) {
        _filteredAutores = [...autores];
      } else {
        _filteredAutores = autores.filter((autor) => {
          return autor.nome.toLowerCase().startsWith(event.query.toLowerCase());
        });
      }

      setFilteredAutores(_filteredAutores);
    }, 250);
  };

  const searchGenero = (event) => {
    setTimeout(() => {
      let _filteredGeneros;
      if (!event.query.trim().length) {
        _filteredGeneros = [...generos];
      } else {
        _filteredGeneros = generos.filter((genero) => {
          return genero.descricao
            .toLowerCase()
            .startsWith(event.query.toLowerCase());
        });
      }

      setFilteredGeneros(_filteredGeneros);
    }, 250);
  };

  const itemTemplate1 = (item) => {
    return (
      <div>
        <div>{item.descricao}</div>
      </div>
    );
  };
  const itemTemplate2 = (item) => {
    return (
      <div>
        <div>{item.nome}</div>
      </div>
    );
  };
  const itemTemplate3 = (item) => {
    return (
      <div>
        <div>{item.nome}</div>
      </div>
    );
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const imagem = await convertBase64(file);
    props.setMidia({ ...props.midia, imagem });
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div style={{ padding: 15 }}>
        <div>
          <h5 className="textWhite" style={{ textAlign: "center" }}>
            Cadastro de M??dias
          </h5>
          <p />
          <div className="p-fluid grid formgrid" style={{ marginLeft: "40%" }}>
            <div className="field col-4 md:col-4">
              <InputText
                name="titulo"
                placeholder="T??tulo..."
                {...register("titulo", {
                  required: { value: true, message: "O t??tulo ?? obrigat??rio!" },
                  maxLength: {
                    value: 100,
                    message: "O t??tulo pode ter no m??ximo 100 caracteres!",
                  },
                  minLength: {
                    value: 1,
                    message: "O t??tulo deve ter no m??nimo 1 caracteres!",
                  },
                })}
                defaultValue={props.midia.titulo}
                onChange={handleInputChange}
              />
              {errors.titulo && (
                <span style={{ color: "red", fontStyle: "italic" }}>
                  {errors.titulo.message}
                </span>
              )}
            </div>
          </div>
          <br />
          <div className="p-fluid grid formgrid" style={{ marginLeft: "40%" }}>
            <div className="field col-4 md:col-4">
              <InputText
                name="resumo"
                placeholder="Resumo..."
                {...register("resumo", {
                  required: {
                    value: true,
                    message: "O resumo ?? obrigat??rio!",
                  },
                  maxLength: {
                    value: 100,
                    message: "O resumo pode ter no m??ximo 100 caracteres!",
                  },
                  minLength: {
                    value: 2,
                    message: "O resumo deve ter no m??nimo 2 caracteres!",
                  },
                })}
                defaultValue={props.midia.resumo}
                onChange={handleInputChange}
              />
              {errors.resumo && (
                <span style={{ color: "red", fontStyle: "italic" }}>
                  {errors.resumo.message}
                </span>
              )}
            </div>
          </div>
          <br />
          <div className="p-fluid grid formgrid" style={{ marginLeft: "40%" }}>
            <div className="field col-4 md:col-4">
              <InputText
                type="number"
                name="restricaoIdade"
                placeholder="Restri????o de Idade..."
                {...register("restricaoIdade", {
                  required: {
                    value: true,
                    message: "A restri????o de idade ?? obrigat??ria!",
                  },
                  maxLength: {
                    value: 3,
                    message:
                      "A restri????o de idade pode ter no m??ximo 3 caracteres!",
                  },
                  minLength: {
                    value: 1,
                    message:
                      "A restri????o de idade deve ter no m??nimo 1 caractere!",
                  },
                })}
                defaultValue={props.midia.restricaoIdade}
                onChange={handleInputChange}
              />
              {errors.restricaoIdade && (
                <span style={{ color: "red", fontStyle: "italic" }}>
                  {errors.restricaoIdade.message}
                </span>
              )}
            </div>
          </div>
          <br />
          <div className="p-fluid grid formgrid" style={{ marginLeft: "40%" }}>
            <div className="field col-4 md:col-4">
              <Calendar
                name="dataLancamento"
                placeholder="Data de Lan??amento..."
                value={props.midia.dataLancamento}
                onChange={handleInputChange}
                dateFormat="dd/mm/yy"
                showIcon
                required
              />
            </div>
          </div>
          <br />
          <div className="p-fluid grid formgrid" style={{ marginLeft: "40%" }}>
            <div className="field col-4 md:col-4">
              <InputText
                type="number"
                name="numeroCronologico"
                placeholder="N??mero Cronol??gico..."
                {...register("numeroCronologico", {
                  required: {
                    value: true,
                    message: "O n??mero cronol??gico ?? obrigat??rio!",
                  },
                  maxLength: {
                    value: 3,
                    message:
                      "O n??mero cronol??gico pode ter no m??ximo 3 caracteres!",
                  },
                  minLength: {
                    value: 1,
                    message:
                      "O n??mero cronol??gico deve ter no m??nimo 1 caractere!",
                  },
                })}
                defaultValue={props.midia.numeroCronologico}
                onChange={handleInputChange}
              />
              {errors.numeroCronologico && (
                <span style={{ color: "red", fontStyle: "italic" }}>
                  {errors.numeroCronologico.message}
                </span>
              )}
            </div>
          </div>
          <br />
          <div className="p-fluid grid formgrid" style={{ marginLeft: "40%" }}>
            <div
              className="field col-4 md:col-4"
              style={{ textAlign: "center" }}
            >
              <AutoComplete
                name="tipoMidia"
                value={props.midia.tipoMidia}
                suggestions={filteredTiposMidias}
                completeMethod={searchTipoMidia}
                onChange={handleInputChange}
                field="nome"
                dropdown
                forceSelection
                itemTemplate={itemTemplate2}
                placeholder="Tipo de M??dia..."
                required
              />
            </div>
          </div>
          <br />
          <div className="p-fluid grid formgrid" style={{ marginLeft: "40%" }}>
            <div
              className="field col-4 md:col-4"
              style={{ textAlign: "center" }}
            >
              <AutoComplete
                name="autor"
                value={props.midia.autor}
                suggestions={filteredAutores}
                completeMethod={searchAutor}
                onChange={handleInputChange}
                field="nome"
                dropdown
                forceSelection
                itemTemplate={itemTemplate3}
                placeholder="Autor..."
                required
              />
            </div>
          </div>
          <br />
          <div className="p-fluid grid formgrid" style={{ marginLeft: "40%" }}>
            <div
              className="field col-4 md:col-4"
              style={{ textAlign: "center" }}
            >
              <AutoComplete
                name="genero"
                value={props.midia.genero}
                suggestions={filteredGeneros}
                completeMethod={searchGenero}
                onChange={handleInputChange}
                field="descricao"
                dropdown
                forceSelection
                itemTemplate={itemTemplate1}
                placeholder="G??nero..."
                required
              />
            </div>
          </div>
          <br />
          <div className="p-fluid grid formgrid" style={{ marginLeft: "40%" }}>
            <div className="field col-4 md:col-4">
              <InputText
                name="notaMedia"
                placeholder="Nota M??dia..."
                defaultValue={props.midia.notaMedia}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <br />
          <div className="p-fluid grid formgrid" style={{ marginLeft: "40%" }}>
            <div className="field col-4 md:col-4">
              <InputText
                type="number"
                name="qtdNotas"
                placeholder="Quantidade de Notas..."
                defaultValue={props.midia.qtdNotas}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <br />
          <div className="p-fluid grid formgrid" style={{ marginLeft: "40%" }}>
            <div
              className="field col-4 md:col-4"
              style={{ textAlign: "center" }}
            >
              <input
                className="textWhite"
                type="file"
                name="imagem"
                id="imagem"
                accept=".jpeg, .png, .jpg"
                onChange={(e) => {
                  uploadImage(e);
                }}
              ></input>
            </div>
          </div>
          <br />
          <div style={{ textAlign: "center" }}>
            <Button
              type="submit"
              icon="pi pi-save"
              className="p-button-rounded"
              label="Salvar"
              style={{
                backgroundColor: "#7B73F1",
                borderColor: "#7B73F1",
              }}
            ></Button>
            <span> </span>
            <Button
              type="button"
              icon="pi pi-undo"
              className="p-button-rounded"
              label="Cancelar"
              onClick={props.cancelar}
              style={{
                backgroundColor: "#7B73F1",
                borderColor: "#7B73F1",
              }}
            ></Button>
          </div>
        </div>
      </div>
    </form>
  );
};
export default MidiaForm;
