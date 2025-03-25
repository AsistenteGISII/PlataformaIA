import { DataGrid, GridColDef} from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';import { Navigate } from 'react-router-dom';

const columns: GridColDef[] = [
  //{ field: 'id', headerName: 'ID', width: 70 },
  { field: 'title', headerName: 'Title', width: 400, sortable:false},
  { field: 'owner', headerName: 'Owner', width: 400, sortable:false },
  { field: 'lastAuthor', headerName: 'Last author', width: 400, sortable:false},
  { field: 'responses', headerName: 'Responses', width: 150},
  { field: 'firstMessage', headerName: 'First message', width: 150},
  { field: 'lastMessage', headerName: 'Last message', width: 150},

];

const rows = [
  {id: 1, title: 'Models creation', owner:'Fabricio Alvarado Alvarado', lastAuthor:'Jordan Guzman Solis', responses:4, firstMessage:'2023-04-02', lastMessage:'2023-05-10'},
  {id: 2, title: 'Website developers', owner:'Efren Jimenez Delgado', lastAuthor:'Abel Mendez Porras', responses:3, firstMessage:'2023-02-20', lastMessage:'2023-03-10'},
  {id: 3, title: 'Teachers in charge', owner:'Abel Mendez Porras', lastAuthor:'Fabricio Alvarado Alvarado', responses:8, firstMessage:'2022-06-02', lastMessage:'2023-07-10'},
  {id: 4, title: 'Used datasets', owner:'Leonardo Viquez Acuña', lastAuthor:'Lorena Valerio Espinoza', responses:9, firstMessage:'2023-01-29', lastMessage:'2023-02-10'},
  {id: 5, title: 'Add a new dataset', owner:'Jordan Guzman Solís', lastAuthor:'Efren Jimenez Delgado', responses:12, firstMessage:'2022-08-02', lastMessage:'2023-09-10'},
];

export default function ThreadTable() {
  const navigate = useNavigate();

  const handleCellClick = (params: { id: number }) => {
    const threadId = params.id;
    navigate(`./thread/${threadId}`);
  };

  return (
    <div style={{ height: 400, width: '90%', margin:'auto', marginTop:'20px'}}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        onCellClick={(params) => handleCellClick(params.row)}
        pageSizeOptions={[5, 10]}

      />
    </div>
  );
}