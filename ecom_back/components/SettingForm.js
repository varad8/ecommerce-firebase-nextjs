import axios from "axios";
import { useState } from "react";

export default function SettingForm({
  name: existingName,
  role: existingRole,
  email: existingEmail,
}) {
  const [name, setName] = useState(existingName || "");
  const [email, setEmail] = useState(existingEmail || "");
  const [role, setRole] = useState(existingRole || "");

  async function saveAdmin(ev) {
    ev.preventDefault();

    const data = {
      role,
    };

    if (email) {
      //Update user role to admin

      await axios.put("/api/users", { ...data, email });
    }
  }

  return (
    <form onSubmit={saveAdmin}>
      <label>Name</label>
      <input
        type="text"
        placeholder="user name"
        value={name}
        onChange={(ev) => setName(ev.target.value)}
      />
      <label>Email</label>
      <input
        type="email"
        placeholder="user email"
        value={email}
        onChange={(ev) => setEmail(ev.target.value)}
      />
      <label>Role</label>
      <select value={role} onChange={(ev) => setRole(ev.target.value)}>
        <option value="user">user</option>
        <option value="admin">admin</option>
      </select>

      <button type="submit" className="btn-primary">
        Save
      </button>
    </form>
  );
}
