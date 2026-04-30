import { useEffect, useState } from "react";
import { FileText, Loader2, Save } from "lucide-react";

import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";


import {
  useAddDisclaimerMutation,
  useGetTermsConditionQuery,
} from "../../../redux/features/setting/settingApi";

import { toast } from "sonner";
import JoditEditorComponent from "../../Shared/JoditEditorComponent";

const TermsCondition = () => {
  const [content, setContent] = useState("");
  const [isEditingTerms, setIsEditingTerms] = useState(false);

  const { data: termsData } = useGetTermsConditionQuery({});
  const [addDisclaimer, { isLoading: addDisclaimerLoading }] =
    useAddDisclaimerMutation();

  useEffect(() => {
    if (termsData?.content) {
      setContent(termsData.content);
    }
  }, [termsData]);

  const handleSaveTerms = async () => {
    try {
      const response = await addDisclaimer({
        type: "TERMS",
        content,
      }).unwrap();

      if (response?.success) {
        toast.success(response?.message || "Terms & conditions updated");
        setIsEditingTerms(false);
      } else {
        if (response?.error && Array.isArray(response.error)) {
          response.error.forEach((err: { message: string }) => {
            toast.error(err.message, { id: "terms-condition" });
          });
        } else {
          toast.error(response?.message || "Something went wrong!", {
            id: "terms-condition",
          });
        }
      }
    } catch (err) {
      console.error("TermsCondition error:", err);
      toast.error("Failed to update terms & conditions", {
        id: "terms-condition",
      });
    }
  };

  const handleCancel = () => {
    if (termsData?.content) setContent(termsData.content);
    setIsEditingTerms(false);
  };

  return (
    <Card className="border-none shadow-sm ">
      <CardContent className="px-8 pb-8">
        <div className="space-y-6">

          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Terms & Conditions</h2>

            {!isEditingTerms && (
              <Button
                onClick={() => setIsEditingTerms(true)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <FileText className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
          </div>

          {/* Edit Mode */}
          {isEditingTerms ? (
            <>
              <JoditEditorComponent
                value={content}
                onChange={setContent}
                placeholder="Write your terms & conditions here..."
                height={400}
              />

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleSaveTerms}
                  disabled={addDisclaimerLoading}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  {addDisclaimerLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>

                <Button
                  onClick={handleCancel}
                  variant="outline"
                  disabled={addDisclaimerLoading}
                >
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            /* View Mode */
            <div
              className="prose prose-sm max-w-none text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: content || "<p>No content yet.</p>",
              }}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TermsCondition;