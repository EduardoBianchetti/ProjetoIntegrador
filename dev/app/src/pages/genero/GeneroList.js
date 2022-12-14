import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "../../css/visual.css";

const GeneroList = (props) => {

  return (
    <div className="App">
      <h4 className="textWhite">Listagem de Gêneros</h4>
      <div style={{ margin: "10px" }}>
        <Button
          type="button"
          icon="pi pi-refresh"
          className="p-button-rounded"
          onClick={props.onClickAtualizar}
          style={{
            backgroundColor: "#7B73F1", 
            borderColor: "#7B73F1"
          }}
        ></Button>
        <span> </span>
        <Button
          type="button"
          icon="pi pi-plus-circle"
          className="p-button-rounded"
          onClick={props.inserir}
          style={{
            backgroundColor: "#7B73F1", 
            borderColor: "#7B73F1"
          }}
        ></Button>
      </div>

      <div className="card removeBorda">
        <DataTable
          value={props.generos}
          paginator
          responsiveLayout="scroll"
          paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
          currentPageReportTemplate="Mostrando de {first} a {last} de {totalRecords}"
          rows={5}
          rowsPerPageOptions={[5, 10, 20, 50]}
          selectionMode="single"
          selection={props.genero}
          onSelectionChange={(e) => props.setGenero(e.value)}
        >
          <Column field="descricao" header="Descrição" sortable filter></Column>
          <Column
            header="Operações"
            body={(row) => {
              return (
                <>
                  <Button
                    type="button"
                    icon="pi pi-pencil"
                    className="p-button-rounded"
                    onClick={() => props.editar(row._id)}
                    style={{
                      backgroundColor: "#7B73F1", 
                      borderColor: "#7B73F1"
                    }}
                  ></Button>
                  <span> </span>
                  <Button
                    type="button"
                    icon="pi pi-trash"
                    className="p-button-rounded"
                    onClick={() => props.excluir(row._id)}
                    style={{
                      backgroundColor: "#7B73F1", 
                      borderColor: "#7B73F1"
                    }}
                  ></Button>
                </>
              );
            }}
          ></Column>
        </DataTable>
      </div>
    </div>
  );
};
export default GeneroList;
