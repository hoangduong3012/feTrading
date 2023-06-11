import React, { useEffect } from 'react';
import { styled } from '@mui/system';
import TablePaginationUnstyled from '@mui/base/TablePaginationUnstyled';
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
const CustomTablePagination = styled(TablePaginationUnstyled)`
  & .MuiTablePaginationUnstyled-toolbar {
    display: flex;
    gap: 10px;
    align-items: center;
  }
`;

export default function UnstyledTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const goldLessionList = useSelector(({ historyTrading }) => historyTrading.goldLessionList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchHistoryTradingList());
  }, []);
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const handleClick = (id) => {
    history.push({
      pathname: `/historyTradingDetail/${id}`,
    });
  };
  return goldLessionList.length > 0 ? (
    <Root>
      <table style={{ minWidth: 500 }} aria-label="custom pagination table">
        <thead>
          <tr>
            <th>TITLE</th>
            <th>DESCRIPTION</th>
            <th>PERSONAL IDEAL</th>
            <th>TYPE</th>
            <th>AUTHOR</th>
            <th>TIME LESSION</th>
            <th>IMAGES</th>
          </tr>
        </thead>
        <tbody>
          {(goldLessionList.length > 0
            ? goldLessionList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : goldLessionList
          ).map((row) => (
            <tr key={row.id} onClick={() => handleClick(row.id)}>
              <td>{row.attributes.title}</td>
              <td style={{ width: 160 }} align="right">
                {row.attributes.description}
              </td>
              <td style={{ width: 160 }} align="right">
                {row.attributes.personal_ideal}
              </td>
              <td style={{ width: 160 }} align="right">
                {row.attributes.type}
              </td>
              <td style={{ width: 160 }} align="right">
                {row.attributes.author}
              </td>
              <td style={{ width: 160 }} align="right">
                {moment(row.attributes.time_lession).format('DD-MM-YYYY HH:MM:ss')}
              </td>
              <td style={{ width: 160 }} align="right">
                {row.attributes.images ? row.attributes.images : ''}
              </td>
            </tr>
          ))}

          {emptyRows > 0 && (
            <tr style={{ height: 41 * emptyRows }}>
              <td colSpan={3} />
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <CustomTablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
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
          </tr>
        </tfoot>
      </table>
    </Root>
  ) : (
    <></>
  );
}
