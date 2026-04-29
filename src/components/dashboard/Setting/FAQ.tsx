import { ChevronDown, ChevronUp, Loader2, Pencil, Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";

import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";

import {
  useAddFAQMutation,
  useDeleteFAQMutation,
  useGetFAQQuery,
  useUpdateFAQMutation,
} from "../../../redux/features/setting/settingApi";

import { toast } from "sonner";
import Swal from "sweetalert2";

interface FAQ {
  _id: string;
  question: string;
  answer: string;
}

interface FAQFormState {
  question: string;
  answer: string;
}

const emptyForm: FAQFormState = { question: "", answer: "" };

const FAQ = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState<FAQFormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<FAQFormState>(emptyForm);

  const { data: faqData, refetch } = useGetFAQQuery({});
  const [addFAQ, { isLoading: isAdding }] = useAddFAQMutation();
  const [updateFAQ, { isLoading: isUpdating }] = useUpdateFAQMutation();
  const [deleteFAQ, { isLoading: isDeleting }] = useDeleteFAQMutation();

  const faqs: FAQ[] = faqData?.data || faqData || [];

  const handleAdd = async () => {
    if (!addForm.question.trim() || !addForm.answer.trim()) {
      toast.error("Please fill in both question and answer");
      return;
    }
    try {
      const response = await addFAQ(addForm).unwrap();
      if (response?.success) {
        toast.success(response?.message || "FAQ added successfully");
        setAddForm(emptyForm);
        setShowAddForm(false);
        refetch();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to add FAQ");
    }
  };

  const handleEditStart = (faq: FAQ) => {
    setEditingId(faq._id);
    setEditForm({ question: faq.question, answer: faq.answer });
    setExpandedId(faq._id);
  };

  const handleEditSave = async (id: string) => {
    if (!editForm.question.trim() || !editForm.answer.trim()) {
      toast.error("Please fill in both question and answer");
      return;
    }
    try {
      const response = await updateFAQ({ id, ...editForm }).unwrap();
      if (response?.success) {
        toast.success(response?.message || "FAQ updated successfully");
        setEditingId(null);
        refetch();
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update FAQ");
    }
  };


  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await deleteFAQ(id).unwrap();

        if (response?.success) {
          toast.success(response?.message || "FAQ deleted successfully");

          if (expandedId === id) setExpandedId(null);
          refetch();

          Swal.fire({
            title: "Deleted!",
            text: "FAQ has been deleted.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
        }
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to delete FAQ");
      }
    }
  };

  const toggleExpand = (id: string) => {
    if (editingId === id) return;
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <Card className="border-none shadow-sm max-w-6xl mx-auto">
      <CardContent className="px-8 pb-8">
        <div className="space-y-6">

          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
            {!showAddForm && (
              <Button
                onClick={() => setShowAddForm(true)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add FAQ
              </Button>
            )}
          </div>

          {/* Add FAQ Form */}
          {showAddForm && (
            <div className="border border-dashed border-red-300 rounded-lg p-5 space-y-4 bg-red-50/40">
              <h3 className="font-semibold text-gray-800">New FAQ</h3>
              <div className="space-y-3">
                <Input
                  placeholder="Question"
                  value={addForm.question}
                  onChange={(e) =>
                    setAddForm((prev) => ({ ...prev, question: e.target.value }))
                  }
                />
                <Textarea
                  placeholder="Answer"
                  value={addForm.answer}
                  onChange={(e) =>
                    setAddForm((prev) => ({ ...prev, answer: e.target.value }))
                  }
                  className="min-h-[120px]"
                />
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={handleAdd}
                  disabled={isAdding}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  {isAdding ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save FAQ
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddForm(false);
                    setAddForm(emptyForm);
                  }}
                  disabled={isAdding}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {/* FAQ List */}
          {faqs.length === 0 ? (
            <p className="text-gray-500 text-sm">No FAQs added yet.</p>
          ) : (
            <div className="space-y-3">
              {faqs.map((faq) => {
                const isExpanded = expandedId === faq._id;
                const isBeingEdited = editingId === faq._id;

                return (
                  <div
                    key={faq._id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    {/* Question Row */}
                    <div
                      className="flex items-center justify-between px-5 py-4 bg-white cursor-pointer hover:bg-gray-50 transition-colors"
                      onClick={() => toggleExpand(faq._id)}
                    >
                      {isBeingEdited ? (
                        <Input
                          value={editForm.question}
                          onChange={(e) =>
                            setEditForm((prev) => ({
                              ...prev,
                              question: e.target.value,
                            }))
                          }
                          onClick={(e) => e.stopPropagation()}
                          className="mr-4"
                        />
                      ) : (
                        <span className="font-medium text-gray-800">
                          {faq.question}
                        </span>
                      )}

                      <div
                        className="flex items-center gap-2 shrink-0 ml-4"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {isBeingEdited ? (
                          <>
                            <Button
                              size="sm"
                              onClick={() => handleEditSave(faq._id)}
                              disabled={isUpdating}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              {isUpdating ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <Save className="h-3.5 w-3.5" />
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingId(null)}
                              disabled={isUpdating}
                            >
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditStart(faq)}
                              className="text-gray-500 hover:text-gray-800"
                            >
                              <Pencil className="h-3.5 w-3.5" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDelete(faq._id)}
                              disabled={isDeleting}
                              className="text-gray-500 hover:text-red-600"
                            >
                              {isDeleting ? (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              ) : (
                                <Trash2 className="h-3.5 w-3.5" />
                              )}
                            </Button>
                          </>
                        )}

                        <span className="text-gray-400 ml-1">
                          {isExpanded ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </span>
                      </div>
                    </div>

                    {/* Answer Row */}
                    {isExpanded && (
                      <div className="px-5 py-4 bg-gray-50 border-t border-gray-200">
                        {isBeingEdited ? (
                          <Textarea
                            value={editForm.answer}
                            onChange={(e) =>
                              setEditForm((prev) => ({
                                ...prev,
                                answer: e.target.value,
                              }))
                            }
                            className="min-h-[120px]"
                          />
                        ) : (
                          <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                            {faq.answer}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FAQ;