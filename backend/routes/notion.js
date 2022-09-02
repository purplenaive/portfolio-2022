const express = require("express");
const router = express.Router();
const axios = require("axios");

const options = {
  access_key: "secret_QEaI6MPUF0jvojsltXj9lCmCcjfJznR1xwIUURiubXc",
  project_token: "bb8c08d768a2428990305d0427d63665",
  note_token: "d1619275de714a158cc8d90bef99ddb4",
  createOptions(target, date, page_size, filter, sorts) {
    const url = this[target + "_token"];
    const filter_length = Object.keys(filter).length;
    const sort_length = sorts.length;
    let data = {};

    if(filter_length + sort_length) {
      data = filter_length ? {page_size, filter} : {page_size, sorts};
    } else {
      data = {page_size};
    }

    return {
      method: "POST",
      url: `https://api.notion.com/v1/databases/${url}/query`,
      headers: {
        Accept: "application/json",
        "Notion-Version": date,
        Authorization: `Bearer ${this.access_key}`,
        "Content-Type": "application/json",
      },
      data,
    }
  },
}

const project_options = options.createOptions("project", "2022-02-22", 30, {}, [
  {
    "property": "category",
    "direction": "descending",
  }
]);
const note_options = options.createOptions("note", "2022-02-22", 30, {
  "and": [
    {
      "property": "view",
      "checkbox": {
        "equals": true
      }
    }
  ]
}, []);

// project data
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
// note data
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