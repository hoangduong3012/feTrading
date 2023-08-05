import React, { useEffect } from "react";
import { styled } from "@mui/system";
import TablePagination from "@mui/material/TablePagination";
import Table from "@mui/material/Table";
import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableContainer from "@mui/material/TableContainer";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import Typography from "@mui/material/Typography";
import TableHead from "@mui/material/TableHead";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import history from "@history";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { fetchPlanList, deletePlan } from "./store/planSlice";
import { closeDialog, openDialog } from 'app/store/fuse/dialogSlice';

const Root = styled("div")`
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
  { id: "title", label: "TITLE", minWidth: 170 },
  {
    id: "planDate",
    label: "Plan Date",
    minWidth: 170,
    align: "right",
    format: (value) => moment(value).format("YYYY/MM/DD"),
  },
  {
    id: "symbol",
    label: "Symbol",
    minWidth: 170,
    align: "right",
    format: (value) => value.data.attributes.symbolNm,
  },
  {
    id: "comments",
    label: "COMMENT",
    minWidth: 170,
    align: "right",
    format: (value) => value.map((v) => v.data.attributes.comment),
  },
  {
    id: "action",
    label: "ACTION",
    minWidth: 170,
  },
];
export default function UnstyledTable() {
  // eslint-disable-next-line no-shadow
  const plan = useSelector(({ plan }) => plan);
  const { planList, pagination, optionPaging, plan: detail } = plan;
  const total = pagination?.total ? pagination.total : 0;
  const page = pagination?.page ? pagination.page - 1 : 0;
  const pageSize = pagination?.pageSize ? pagination.pageSize : 10;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPlanList(optionPaging));
  }, []);
  // Avoid a layout jump when reaching the last page with empty rows.

  const handleChangePage = (event, newPage) => {
    dispatch(
      fetchPlanList({
        ...optionPaging,
        pagination: { page: newPage, pageSize },
      })
    );
  };

  const handleChangeRowsPerPage = (event) => {
    dispatch(
      fetchPlanList({
        ...optionPaging,
        pagination: { page: 0, pageSize: event.target.value },
      })
    );
  };
  const handleClick = (id) => {
    history.push({
      pathname: `/planDetail/${id}`,
    });
  };
  const handleDelete= (id) => {
    dispatch(
      openDialog({
        children: (
          <>
            <DialogTitle id="alert-dialog-title">Xác nhận xóa plan</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Có chắc bạn muốn xóa không?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => closePlanDialog()}
                color="primary"
              >
                Không đồng ý
              </Button>
              <Button
                onClick={() => deleteChoosePlan(id)}
                color="primary"
                autoFocus
              >
                Đồng ý
              </Button>
            </DialogActions>
          </>
        )
      })
    )
  };
  const closePlanDialog = () => {
    dispatch(closeDialog());
  };
  const deleteChoosePlan = (id) => {
    dispatch(deletePlan(id));
    closePlanDialog();
  };
  return planList && planList.length > 0 ? (
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
            {(planList.length > 0
              ? planList.slice(page * pageSize, page * pageSize + pageSize)
              : planList
            ).map((row) => (
              <TableRow key={row.id} >
                <TableCell onClick={() => handleClick(row.id)}>{row.attributes.title}</TableCell>
                {/* <TableCell>
                  <Typography
                    variant="body1"
                    dangerouslySetInnerHTML={{
                      __html: row.attributes.description,
                    }}
                  />
                </TableCell> */}
                <TableCell>
                  {row.attributes.planDate &&
                    moment(row.attributes.planDate).format(
                      "DD-MM-YYYY HH:mm:ss"
                    )}
                </TableCell>
                <TableCell>
                  {row.attributes.symbol.data?.attributes?.symbolNm}
                </TableCell>
                <TableCell>
                  <Timeline position="left">
                    {row.attributes.comments.data &&
                      row.attributes.comments.data.map((c) => (
                        <TimelineItem>
                          <TimelineOppositeContent
                            sx={{ m: "auto 0" }}
                            align="right"
                            variant="body2"
                            color="text.secondary"
                          >
                            <div>
                              {moment(c.attributes.commentDate).format(
                                "DD-MM-YYYY"
                              )}
                            </div>
                            <div>
                              {moment(c.attributes.commentDate).format(
                                "HH:mm:ss"
                              )}
                            </div>
                          </TimelineOppositeContent>
                          <TimelineSeparator>
                            <TimelineDot>
                              <LaptopMacIcon />
                            </TimelineDot>
                            <TimelineConnector />
                          </TimelineSeparator>
                          <TimelineContent>
                            {c.attributes.comment}
                          </TimelineContent>
                        </TimelineItem>
                      ))}
                  </Timeline>
                </TableCell>
                <TableCell>
                  <DeleteOutlinedIcon onClick={() => handleDelete(row.id)}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
        component="div"
        count={total}
        rowsPerPage={pageSize}
        page={page}
        componentsProps={{
          select: {
            "aria-label": "rows per page",
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
