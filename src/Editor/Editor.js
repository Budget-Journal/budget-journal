import React from "react";
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";

import "react-quill/dist/quill.snow.css";
import "./styles.css";

export const Editor = () => {
  const [state, setState] = React.useState({ value: null });
  const handleChange = (value) => {
    setState({ value });

    // const addRow = () => {
        
        
    //   };
  };
  return (
    <div className="text-editor">
      <EditorToolbar />
      <ReactQuill
        theme="snow"
        value={state.value}
        onChange={handleChange}
        placeholder={
          "What are your Key Motivations for achieving this goal? What steps do you need to achieve this goal? What's your Reward?"
        }
        modules={modules}
        formats={formats}
      />
      <table>
        <tr>
          <th>Expense</th>
          <th>Price</th>
          <th>Notes</th>

          
        </tr>
        <td><TextField></TextField></td>
        <td><TextField></TextField></td>
        <td><TextField></TextField></td>
        <td><Button size="small"variant="contained">Add Row</Button></td>
      </table>

      <Card>
            <CardContent>
                <Typography className="recentlistings" variant="h5" component="h3">Feed to Display Posts for Goal...</Typography>
            </CardContent>

        </Card>

        
      
    </div>
  );
};

export default Editor;
