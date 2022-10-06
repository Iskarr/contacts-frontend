import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";

export default function Edit() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    favoriteColor: "",
    birthday: "",
    favoriteSport: "",
    musicGenre: "",
    currentCollege: "",
    records: [],
  });
  const params = useParams();
  const navigate = useNavigate();

  // test line.

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(
        `https://contact-app.onrender.com/contacts/${params.id.toString()}`
      );

      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }

      setForm(record);
    }

    fetchData();

    return;
  }, [params.id, navigate]);

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  async function onSubmit(e) {
    e.preventDefault();
    const editedPerson = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      favoriteColor: form.favoriteColor,
      birthday: form.birthday,
    };

    // This will send a post request to update the data in the database.
    await fetch(`https://contact-app.onrender.com/contacts/${params.id}`, {
      method: "PUT",
      body: JSON.stringify(editedPerson),
      headers: {
        "Content-Type": "application/json",
      },
    });

    navigate("/");
  }

  // This following section will display the form that takes input from the user to update the data.
  return (
    <div>
      <h3>Update Record</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name: </label>
          <input
            type="text"
            className="form-control"
            id="firstName"
            value={form.firstName}
            onChange={(e) => updateForm({ firstName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name: </label>
          <input
            type="text"
            className="form-control"
            id="lastName"
            value={form.lastName}
            onChange={(e) => updateForm({ lastName: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            className="form-control"
            id="email"
            value={form.email}
            onChange={(e) => updateForm({ email: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="favoriteColor">Favorite Color: </label>
          <input
            type="text"
            className="form-control"
            id="favoriteColor"
            value={form.favoriteColor}
            onChange={(e) => updateForm({ favoriteColor: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="birthday">Birthday: </label>
          <input
            type="text"
            className="form-control"
            id="birthday"
            value={form.birthday}
            onChange={(e) => updateForm({ birthday: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="favoriteSport">Favorite Sport</label>
          <input
            type="text"
            className="form-control"
            id="favoriteSport"
            value={form.favoriteSport}
            onChange={(e) => updateForm({ favoriteSport: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="musicGenre">Music Genre</label>
          <input
            type="text"
            className="form-control"
            id="musicGenre"
            value={form.musicGenre}
            onChange={(e) => updateForm({ musicGenre: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="currentCollege">Current College</label>
          <input
            type="text"
            className="form-control"
            id="currentCollege"
            value={form.currentCollege}
            onChange={(e) => updateForm({ currentCollege: e.target.value })}
          />
        </div>

        <br />
        <div className="form-group">
          <input
            type="submit"
            value="Update Record"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
