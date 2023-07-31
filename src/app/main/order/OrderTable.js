import React, { useEffect } from 'react';
import { styled } from '@mui/system';
import TablePagination from '@mui/material/TablePagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import Typography from '@mui/material/Typography';
import TableHead from '@mui/material/TableHead';
import history from '@history';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { fetchOrderList } from './store/orderSlice';

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
  { id: 'ticket', label: 'TICKET', minWidth: 170 },
  { id: 'description', label: 'DESCRIPTION', minWidth: 100 },
  {
    id: 'type',
    label: 'TYPE',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'order_price',
    label: 'ORDER PRICE',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'stop_loss',
    label: 'STOP LOSS',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'take_profit',
    label: 'TAKE PROFIT',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'volume',
    label: 'VOLUME',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'cut_price',
    label: 'CUT PRICE',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'cut_price',
    label: 'CUT PRICE',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'profit',
    label: 'PROFIT',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  {
    id: 'symbol',
    label: 'SYMBOL',
    minWidth: 170,
    align: 'right',
    format: (value) => value ? value.data.attributes.symbolNm : '',
  },
];
export default function UnstyledTable() {
  // eslint-disable-next-line no-shadow
  const order = useSelector(({ order }) => order);
  const { orderList, pagination, optionPaging } = order;
  const total = pagination?.total ? pagination.total : 0;
  const page = pagination?.page ? pagination.page - 1 : 0;
  const pageSize = pagination?.pageSize ? pagination.pageSize : 10;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchOrderList(optionPaging));
  }, []);
  // Avoid a layout jump when reaching the last page with empty rows.

  const handleChangePage = (event, newPage) => {
    dispatch(
      fetchOrderList({
        ...optionPaging,
        pagination: { page: newPage, pageSize },
      })
    );
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(
      fetchOrderList({
        ...optionPaging,
        pagination: { page: 0, pageSize: event.target.value },
      })
    );
  };
  const handleClick = (id) => {
    history.push({
      pathname: `/orderDetail/${id}`,
    });
  };
  return orderList && orderList.length > 0 ? (
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
            {(orderList.length > 0
              ? orderList.slice(page * pageSize, page * pageSize + pageSize)
              : orderList
            ).map((row) => (
              <TableRow key={row.id} onClick={() => handleClick(row.id)}>
                <TableCell>{row.attributes.ticket}</TableCell>
                <TableCell><Typography
                  variant="body1"
                  dangerouslySetInnerHTML={{
                    __html:
                    row.attributes.description,
                  }}
                /></TableCell>
                <TableCell>{row.attributes.type}</TableCell>
                <TableCell>{row.attributes.order_price}</TableCell>
                <TableCell>{row.attributes.take_profit}</TableCell>
                <TableCell>{row.attributes.stop_loss}</TableCell>
                <TableCell>{row.attributes.volume}</TableCell>
                <TableCell>{row.attributes.cut_price}</TableCell>
                <TableCell>{row.attributes.profit}</TableCell>
                <TableCell>{row.attributes.symbol.data.attributes.symbolNm}</TableCell>
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
