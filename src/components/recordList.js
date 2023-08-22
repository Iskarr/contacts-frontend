import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "./Loader";
import "./styles.css";
import "./loader.scss";

const Record = (props) => (
  <tr>
    <td>{props.record.firstName}</td>
    <td>{props.record.lastName}</td>
    <td>{props.record.email}</td>
    <td>{props.record.favoriteColor}</td>
    <td>{props.record.birthday}</td>
    <td>{props.record.favoriteSport}</td>
    <td>{props.record.musicGenre}</td>
    <td>{props.record.currentCollege}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.record._id}`}>
        Edit
      </Link>{" "}
      |
      <button
        className="btn btn-link"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function RecordList() {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);

  // This method fetches the records from the database.
  useEffect(() => {
    setLoading(true);
    async function getRecords() {
      const response = await fetch(`https://contact-app.onrender.com/contacts`);
      console.log(response);
      setLoading(false);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();

      setRecords(records);
    }

    getRecords();

    return;
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`https://contact-app.onrender.com/contacts/${id}`, {
      method: "DELETE",
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <div>
      <h3 className="contact-title">Contact List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Favorite Color</th>
            <th>Birthday</th>
            <th>Favorite Sport</th>
            <th>Music Genre</th>
            <th>Current College</th>
          </tr>
        </thead>
        {/* <tbody>{loading ? <Loader /> : recordList()}</tbody> */}
        <tbody>
          <Loader />
          <p className="loader-text">Loading...</p>
        </tbody>
      </table>
    </div>
  );
}
