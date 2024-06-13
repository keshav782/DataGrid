import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { Box, TextField } from "@mui/material";
import { Button } from "@mui/base";

function User() {
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "fullname",
      headerName: "Full name",
      width: 150,
    },
    {
      field: "join_date",
      headerName: "Join Date",
      width: 150,
    },
    {
      field: "chirpiness",
      headerName: "Chirpiness",
      width: 130,
    },
    {
      field: "friends",
      headerName: "Friends",
      width: 120,
    },
    {
      field: "influence",
      headerName: "Influence",
      width: 120,
    },
    {
      field: "total",
      headerName: "Total",
      width: 120,
    },
    {
      field: "action",
      headerName: "Remove",
      width: 150,
      renderCell: (params) => (
        console.log("Button clicked for row:", params.row.image),
        <Button
          style={{cursor:'pointer'}}
          variant="contained"
          color="primary"
          onClick={() => handleButtonClick(params.row)}
        >
          Remove Rows
        </Button>
      ),
    },
    {
        field:"image",
        width:350,
        renderCell:(params)=>{
             return <img src={params.row.image} alt={params.row.username} style={{ width: '50px' ,borderRadius:'50%',height:'50px'}}/>
        }
    }
  ];
  const columnGroupingModel = [
    {
      groupId: "twubric",
      children: [
        {
          field: "chirpiness",
        },
        {
          field: "friends",
        },
        {
          field: "influence",
        },
        {
          field: "total",
        },
      ],
    },
  ];
  const [Data, setData] = useState([]);
  
  const URL =
    "https://gist.githubusercontent.com/pandemonia/21703a6a303e0487a73b2610c8db41ab/raw/82e3ef99cde5b6e313922a5ccce7f38e17f790ac/twubric.json";
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(URL);
    //   console.log(result.data);

      const transformedData = result.data.map((user) => ({
        id: user.uid,
        image: user.image,
        username: user.username,
        fullname: user.fullname,
        join_date: formatDate(user.join_date),
        chirpiness: user.twubric.chirpiness,
        friends: user.twubric.friends,
        influence: user.twubric.influence,
        total: user.twubric.total,
      }));
      setData(transformedData);
    };
    fetchData();
  }, []);
  const handleButtonClick = (row) => {
    console.log("Button clicked for row:", row);
    const value = Data.filter((item) => item.id !== row.id);
    setData(value);
    // transformedData=value;
  };

  function formatDate(unixTimestamp) {
    const date = new Date(unixTimestamp * 1000); // convert to milliseconds
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    return `${day}/${month}/${year}`;
  }

//   console.log("he",Data);

  // console.log("hello",transformedData)

  return (
    <>
    <h1 style={{display:'flex',justifyContent:'center'}} >Twitter Data</h1>
    
    <Box sx={{ height: "100%", width: "100%" }}>
      <DataGrid
        style={{margin:'20px 20px'}}
        rows={Data}
        autoHeight
        columns={columns}
        columnGroupingModel={columnGroupingModel}
      />
    </Box>
    </>
  );
}
export default User;
