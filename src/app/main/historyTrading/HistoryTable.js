import React, { useEffect } from 'react';
import { styled } from '@mui/system';
import TablePagination from '@mui/material/TablePagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import history from '@history';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { fetchHistoryTradingList } from './store/historyTradingSlice';

function createData(name, calories, fat) {
  return { name, calories, fat };
}

const rows = [
  createData('Cupcake', 305, 3.7),
  createData('Donut', 452, 25.0),
  createData('Eclair', 262, 16.0),
  createData('Frozen yoghurt', 159, 6.0),
  createData('Gingerbread', 356, 16.0),
  createData('Honeycomb', 408, 3.2),
  createData('Ice cream sandwich', 237, 9.0),
  createData('Jelly Bean', 375, 0.0),
  createData('KitKat', 518, 26.0),
  createData('Lollipop', 392, 0.2),
  createData('Marshmallow', 318, 0),
  createData('Nougat', 360, 19.0),
  createData('Oreo', 437, 18.0),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const Root = styled('div')`
  table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
  }

  td,
  th {
    border: 1px solid #ddd;
    text-align: left;
    padding: 8px;
  }

  th {
    background-color: #ddd;
  }
`;
const columns = [
  { id: 'title', label: 'TITLE', minWidth: 170 },
  { id: 'description', label: 'DESCRIPTION', minWidth: 100 },
  {
    id: 'personal ideal',
    label: 'PERSONAL IDEAL',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'type',
    label: 'TYPE',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'author',
    label: 'AUTHOR',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'time lession',
    label: 'TIME LESSION',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'images',
    label: 'IMAGES',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];
export default function UnstyledTable() {
  //  const [page, setPage] = React.useState(0);
  // const [rowsPerPage, setRowsPerPage] = React.useState(5);
  // eslint-disable-next-line no-shadow
  const historyTrading = useSelector(({ historyTrading }) => historyTrading);
  const { goldLessionList, pagination, optionPaging } = historyTrading;
  const total = pagination?.total ? pagination.total : 0;
  const page = pagination?.page ? pagination.page - 1 : 0;
  const pageSize = pagination?.pageSize ? pagination.pageSize : 10;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHistoryTradingList(optionPaging));
  }, []);
  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows = page > 0 ? Math.max(0, (1 + page) * pageSize - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    dispatch(
      fetchHistoryTradingList({
        ...optionPaging,
        pagination: { page: newPage, pageSize },
      })
    );
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(
      fetchHistoryTradingList({
        ...optionPaging,
        pagination: { page: 0, pageSize: event.target.value },
      })
    );
  };
  const handleClick = (id) => {
    history.push({
      pathname: `/historyTradingDetail/${id}`,
    });
  };
  return goldLessionList && goldLessionList.length > 0 ? (
    <Root>
      <TableContainer>
        <Table aria-label="custom pagination table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  component="th"
                  scope="row"
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {(goldLessionList.length > 0
              ? goldLessionList.slice(page * pageSize, page * pageSize + pageSize)
              : goldLessionList
            ).map((row) => (
              <TableRow key={row.id} onClick={() => handleClick(row.id)}>
                <TableCell>{row.attributes.title}</TableCell>
                <TableCell>{row.attributes.description}</TableCell>
                <TableCell>{row.attributes.personal_ideal}</TableCell>
                <TableCell>{row.attributes.type}</TableCell>
                <TableCell>{row.attributes.author}</TableCell>
                <TableCell>
                  {moment(row.attributes.time_lession).format('DD-MM-YYYY HH:MM:ss')}
                </TableCell>
                <TableCell>{row.attributes.images ? row.attributes.images : ''}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
        component="div"
        count={total}
        rowsPerPage={pageSize}
        page={page}
        componentsProps={{
          select: {
            'aria-label': 'rows per page',
          },
          actions: {
            showFirstButton: true,
            showLastButton: true,
          },
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Root>
  ) : null;
}
