import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import TextArea from "../../../components/forms/TextArea";
import SelectField from "../../../components/forms/SelectField";
import Button from "../../../components/common/Button";
import Loader from "../../../components/common/Loader";
import { getLegal } from "../../../api/legal.api";
import { updateLegal } from "../../../api/legal.api";
import { useTheme } from "../../../context/ThemeContext";

const LegalPages = () => {
  const [privacy, setPrivacy] = useState({ content: "", status: "", updatedAt: "" });
  const [terms, setTerms] = useState({ content: "", status: "", updatedAt: "" });
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();
  useEffect(() => {
    Promise.all([
      getLegal("privacy").then((res) => setPrivacy(res.data.legal)),
      getLegal("terms").then((res) => setTerms(res.data.legal))
    ]).finally(() => setLoading(false));
  }, []);

const updatePrivacy = async () => {
  try {
    await updateLegal("privacy", privacy);
    toast.success("Privacy Policy updated successfully");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update Privacy Policy");
  }
};

const updateTerms = async () => {
  try {
    await updateLegal("terms", terms);
    toast.success("Terms & Conditions updated successfully");
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update Terms & Conditions");
  }
};


  return (
    <div className="space-y-10">
      <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>Legal Pages</h2>

      {loading ? (
        <Loader />
      ) : (
        <>
          {/* PRIVACY POLICY */}
          {privacy && (
      <section className={`rounded-lg p-6 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Privacy Policy</h3>
          <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
            Last updated: {privacy.updatedAt}
          </span>
        </div>

        <div className="space-y-4">
          <TextArea
            label="Privacy Policy Content"
            value={privacy.content}
            onChange={(e) =>
              setPrivacy({ ...privacy, content: e.target.value })
            }
          />

          <SelectField
            label="Status"
            value={privacy.status}
            onChange={(e) =>
              setPrivacy({ ...privacy, status: e.target.value })
            }
            options={[
              { label: "Active", value: "Active" },
              { label: "Draft", value: "Draft" },
            ]}
          />

          <div className="flex justify-end gap-3 items-center">
            <Button onClick={updatePrivacy}>Update Privacy Policy</Button>
          </div>
        </div>
      </section>
      )}

      {/* TERMS & CONDITIONS */}
      {terms && (
      <section className={`rounded-lg p-6 border ${isDark ? 'bg-slate-800 border-slate-700' : 'bg-white border-gray-200 shadow-sm'}`}>
        <div className="flex justify-between items-center mb-4">
          <h3 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>Terms & Conditions</h3>
          <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
            Last updated: {terms.updatedAt}
          </span>
        </div>

        <div className="space-y-4">
          <TextArea
            label="Terms & Conditions Content"
            value={terms.content}
            onChange={(e) =>
              setTerms({ ...terms, content: e.target.value })
            }
          />

          <SelectField
            label="Status"
            value={terms.status}
            onChange={(e) =>
              setTerms({ ...terms, status: e.target.value })
            }
            options={[
              { label: "Active", value: "Active" },
              { label: "Draft", value: "Draft" },
            ]}
          />

          <div className="flex justify-end gap-3 items-center">
            <Button onClick={updateTerms}>Update Terms & Conditions</Button>
          </div>
        </div>
      </section>
      )}
        </>
      )}
    </div>
  );
};

export default LegalPages;
