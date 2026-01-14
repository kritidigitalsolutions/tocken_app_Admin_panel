import { useEffect, useState } from "react";
import { getAllLeads, updateLeadStatus } from "../../../api/admin.lead.api";

const Leads = () => {
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await getAllLeads();
    setLeads(res.data);
  };

  return (
    <div>
      <h2>Leads</h2>

      {leads.map(l => (
        <div key={l._id}>
          {l.buyerName} – {l.phone}
          <select
            value={l.status}
            onChange={e => updateLeadStatus(l._id, e.target.value)}
          >
            <option>NEW</option>
            <option>CONTACTED</option>
            <option>FOLLOW_UP</option>
            <option>CLOSED</option>
            <option>LOST</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default Leads;
