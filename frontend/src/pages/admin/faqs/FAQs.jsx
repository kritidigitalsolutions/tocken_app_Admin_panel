import { useEffect, useState } from "react";
import {
  fetchFAQs,
  createFAQ,
  updateFAQ,
  deleteFAQ,
} from "../../../api/faq.api";
import { useTheme } from "../../../context/ThemeContext";

import Button from "../../../components/common/Button";
import Modal from "../../../components/modals/Modal";
import InputField from "../../../components/forms/InputField";
import TextArea from "../../../components/forms/TextArea";
import Loader from "../../../components/common/Loader";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const FAQs = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isDark } = useTheme();

  const [expanded, setExpanded] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [selectedFaq, setSelectedFaq] = useState(null);
  const [form, setForm] = useState({
    question: "",
    answer: "",
    order: 0,
  });

  // 🔄 Load FAQs
  const loadFAQs = async () => {
    try {
      const res = await fetchFAQs();
      setFaqs(res.data.faqs);
    } catch (err) {
      toast.error("Failed to load FAQs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFAQs();
  }, []);

  // ➕ ADD FAQ
  const handleAdd = async () => {
    try {
      await createFAQ(form);
      toast.success("FAQ added");
      setOpenAdd(false);
      setForm({ question: "", answer: "", order: 0 });
      loadFAQs();
    } catch (err) {
      toast.error("Create failed");
    }
  };

  // ✏️ EDIT FAQ
  const handleEdit = async () => {
    try {
      await updateFAQ(selectedFaq._id, form);
      toast.success("FAQ updated");
      setOpenEdit(false);
      loadFAQs();
    } catch (err) {
      toast.error("Update failed");
    }
  };

  // 🗑️ DELETE FAQ
  const handleDelete = async () => {
    try {
      await deleteFAQ(selectedFaq._id);
      toast.success("FAQ deleted");
      setOpenDelete(false);
      loadFAQs();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <Toaster position="top-right" />
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>FAQs</h2>
        <Button onClick={() => setOpenAdd(true)}>+ Add FAQ</Button>
      </div>

      {/* FAQ LIST */}
      <div className="space-y-4">
        {faqs.map((faq) => (
          <div
            key={faq._id}
            className={`rounded-lg border transition-all duration-200 ${isDark ? 'bg-slate-800 border-slate-700 hover:border-slate-600' : 'bg-white border-gray-200 shadow-sm hover:border-gray-300'}`}
          >
            {/* QUESTION BAR */}
            <div
              className="flex justify-between items-center p-4 cursor-pointer"
              onClick={() =>
                setExpanded(expanded === faq._id ? null : faq._id)
              }
            >
              <h4 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{faq.question}</h4>

              <div className="flex gap-2">
                <Button
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFaq(faq);
                    setForm({
                      question: faq.question,
                      answer: faq.answer,
                      order: faq.order,
                    });
                    setOpenEdit(true);
                  }}
                >
                  Edit
                </Button>

                <Button
                  variant="danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFaq(faq);
                    setOpenDelete(true);
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>

            {/* ANSWER */}
            {expanded === faq._id && (
              <div className={`px-4 pb-4 text-sm ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ADD MODAL */}
      <Modal
        open={openAdd}
        title="Add FAQ"
        onClose={() => setOpenAdd(false)}
      >
        <div className="space-y-4">
          <InputField
            label="Question"
            value={form.question}
            onChange={(e) =>
              setForm({ ...form, question: e.target.value })
            }
          />
          <TextArea
            label="Answer"
            value={form.answer}
            onChange={(e) =>
              setForm({ ...form, answer: e.target.value })
            }
          />
          <InputField
            label="Order"
            type="number"
            value={form.order}
            onChange={(e) =>
              setForm({ ...form, order: e.target.value })
            }
          />
          <Button onClick={handleAdd}>Add FAQ</Button>
        </div>
      </Modal>

      {/* EDIT MODAL */}
      <Modal
        open={openEdit}
        title="Edit FAQ"
        onClose={() => setOpenEdit(false)}
      >
        <div className="space-y-4">
          <InputField
            label="Question"
            value={form.question}
            onChange={(e) =>
              setForm({ ...form, question: e.target.value })
            }
          />
          <TextArea
            label="Answer"
            value={form.answer}
            onChange={(e) =>
              setForm({ ...form, answer: e.target.value })
            }
          />
          <InputField
            label="Order"
            type="number"
            value={form.order}
            onChange={(e) =>
              setForm({ ...form, order: e.target.value })
            }
          />
          <Button onClick={handleEdit}>Update FAQ</Button>
        </div>
      </Modal>

      {/* DELETE MODAL */}
      <Modal
        open={openDelete}
        title="Delete FAQ"
        onClose={() => setOpenDelete(false)}
      >
        <p className={`mb-4 text-sm ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
          Are you sure you want to delete this FAQ?
        </p>
        <div className="flex justify-end gap-2">
          <Button
            variant="secondary"
            onClick={() => setOpenDelete(false)}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default FAQs;
