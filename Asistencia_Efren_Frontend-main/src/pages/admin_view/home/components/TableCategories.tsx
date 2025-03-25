import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModesModel,
  GridRowModes,
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridActionsCellItem,
  GridEventListener,
  GridRowId,
  GridRowModel,
  GridPaginationModel,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import api from '../../../../context/UserContext/API';
import { createTheme } from '@mui/material';

const theme = createTheme();
const MySwal = withReactContent(Swal);

export type Category = {
  id: number;
  categories_name: string;
  visible: boolean;
  isNew: boolean;
};

interface EditToolbarProps {
  setRows: (newRows: (oldRows: Category[]) => Category[]) => void;
  setRowModesModel: (
    newModel: (oldModel: GridRowModesModel) => GridRowModesModel
  ) => void;
  setPaginationModel: React.Dispatch<React.SetStateAction<GridPaginationModel>>;
}

function EditToolbar(props: EditToolbarProps) {
  const { setRows, setRowModesModel, setPaginationModel } = props;
  let id_temp = 0;

  const handleClick = () => {
    setRows((oldRows) => {
      id_temp = oldRows.length > 0 ? oldRows[oldRows.length - 1].id + 1 : 1;
      return [
        { id: id_temp, categories_name: '', visible: false, isNew: true },
        ...oldRows,
      ];
    });

    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id_temp]: { mode: GridRowModes.Edit, fieldToFocus: 'categories_name' },
    }));

    setPaginationModel({ page: 0, pageSize: 5 });
  };

  return (
    <GridToolbarContainer>
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Nueva categoría
      </Button>
    </GridToolbarContainer>
  );
}

export default function TableCategories() {
  const [rows, setRows] = useState<Category[]>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 5,
  });

  const URL_CATEGORIES = '/categories/';

  React.useEffect(() => {
    const getCategoriesData = async () => {
      try {
        const res = await api.get(`${URL_CATEGORIES}`);
        const categories: Category[] = res.data.map(
          (c: { id: number; categories_name: string; visible: boolean }) => ({
            ...c,
            isNew: false,
          })
        );
        setRows(categories);
      } catch (error) {
        console.error(error);
      }
    };
    getCategoriesData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`${URL_CATEGORIES}${id}`);
    } catch (error) {
      console.error(`Error eliminando categoría ${id}:`, error);
    }
  };

  const confirmDelete = (row: GridRowId): Promise<boolean> => {
    return new Promise((resolve) => {
      MySwal.fire({
        title: 'Confirmar eliminación',
        text: `¿Estás seguro de que deseas eliminar la categoría? Esta acción no se puede deshacer.`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
        customClass: {
          popup: 'swal-wide',
          title: 'swal-title',
          htmlContainer: 'swal-html',
          confirmButton: 'swal2-confirm',
          cancelButton: 'swal2-cancel',
        },
        didRender: () => {
          const confirmButton = Swal.getConfirmButton();
          const cancelButton = Swal.getCancelButton();
  
          if (confirmButton) {
            confirmButton.style.backgroundColor = theme.palette.primary.main;
            confirmButton.style.color = '#fff';
          }
  
          if (cancelButton) {
            cancelButton.style.backgroundColor = theme.palette.grey[500];
            cancelButton.style.color = '#fff';
          }
        },
        preConfirm: async () => {
          await handleDelete(Number(row));
          return true; 
        },
      }).then((result) => {
        if (result.isConfirmed) {
          resolve(true);
        } else {
          resolve(false);  
        }
      });
    });
  }; 

  const handleRowEditStop: GridEventListener<'rowEditStop'> = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id: GridRowId) => async () => {
    if(await confirmDelete(id))
      setRows(rows.filter((row) => row.id !== id));
    
  };

  const handleCancelClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = async (newRow: GridRowModel) => {
    let updatedRow: Category = newRow as Category;
    if (newRow.isNew) {
      try {
        const response = await api.post(`${URL_CATEGORIES}`, {
          categories_name: newRow.categories_name,
          visible: newRow.visible,
        });
        updatedRow = { ...updatedRow, id: response.data.data.id, isNew: false };
      } catch (error) {
        console.error(`Error agregando categoría ${newRow.categories_name}:`, error);
      }
    } else {
      try {
        await api.put(`${URL_CATEGORIES}${newRow.id}`, {
          categories_name: newRow.categories_name,
          visible: newRow.visible,
        });
      } catch (error) {
        console.error(`Error actualizando categoría ${newRow.categories_name}:`, error);
      }
    }
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 50, editable: false },
    {
      field: 'categories_name',
      headerName: 'Nombre de la categoría',
      width: 300,
      editable: true,
    },
    {
      field: 'visible',
      headerName: 'Visibilidad',
      type: 'boolean',
      width: 120,
      align: 'center',
      headerAlign: 'center',
      editable: true,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 415,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        components={{
          Toolbar: EditToolbar,
        }}
        componentsProps={{
          toolbar: {
            setRows,
            setRowModesModel,
            setPaginationModel,
          },
        }}
        pagination
        paginationModel={paginationModel}
        onPaginationModelChange={(newModel) => setPaginationModel(newModel)}
      />
    </Box>
  );
}
