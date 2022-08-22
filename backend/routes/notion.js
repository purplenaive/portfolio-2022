const express = require("express");
const router = express.Router();
const axios = require("axios");

const options = {
  access_key: "secret_QEaI6MPUF0jvojsltXj9lCmCcjfJznR1xwIUURiubXc",
  project_token: "bb8c08d768a2428990305d0427d63665",
  note_token: "d1619275de714a158cc8d90bef99ddb4",
  createOptions(target, date, size, filter) {
    const url = this[target + "_token"];
    
    return {
      method: "POST",
      url: `https://api.notion.com/v1/databases/${url}/query`,
      headers: {
        Accept: "application/json",
        "Notion-Version": date,
        Authorization: `Bearer ${this.access_key}`,
      },
      data: {page_size: size, filter},
    }
  },
}


const project_options = options.createOptions("project", "2022-02-22", 20);
const note_options = options.createOptions("note", "2022-02-22", 100, {
  "and": [
    {
      "property": "view",
      "checkbox": {
        "equals": true
      }
    }
  ]
});

router.get("/api/project", async (req, res, next) => {
  let projects = [];
  
  await axios.request(project_options)
    .then(res => {
      projects = res.data.results;
    })
    .catch(err => {
      console.log("notion get projects error: ", err);
    });

    res.send(projects);
})

router.get("/api/note", async (req, res, next) => {
  let notes = [];

  await axios.request(note_options)
    .then(res => {
      notes = res.data.results;
    })
    .catch(err => {
      console.log("notion get notes error: ", err);
    });

    res.send(notes);
})

module.exports = router;