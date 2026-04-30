import { FileText, Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import {
  useAddDisclaimerMutation,
  useGetPrivacyPolicyQuery,
} from "../../../redux/features/setting/settingApi";
import { toast } from "sonner";
import JoditEditorComponent from "../../Shared/JoditEditorComponent";


const PrivacyPolicy = () => {
  const [content, setContent] = useState("");
  const [isEditingPrivacy, setIsEditingPrivacy] = useState(false);

  const { data: privacyData } = useGetPrivacyPolicyQuery({});
  const [addDisclaimer, { isLoading: addDisclaimerLoading }] =
    useAddDisclaimerMutation();

  useEffect(() => {
    if (privacyData?.content) {
      setContent(privacyData.content);
    }
  }, [privacyData]);

  const handleSavePrivacy = async () => {
    try {
      const response = await addDisclaimer({
        type: "PRIVACY",
        content,
      }).unwrap();

      if (response?.success) {
        toast.success(response?.message || "Privacy policy updated");
        setIsEditingPrivacy(false);
      } else {
        if (response?.error && Array.isArray(response.error)) {
          response.error.forEach((err: { message: string }) => {
            toast.error(err.message, { id: "privacy-policy" });
          });
        } else {
          toast.error(response?.message || "Something went wrong!", {
            id: "privacy-policy",
          });
        }
      }
    } catch (err) {
      console.error("PrivacyPolicy error:", err);
      toast.error("Failed to update privacy policy", { id: "privacy-policy" });
    }
  };

  const handleCancel = () => {
    if (privacyData?.content) setContent(privacyData.content);
    setIsEditingPrivacy(false);
  };

  return (
    <Card className="border-none shadow-sm ">
      <CardContent className="px-8 pb-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Privacy Policy</h2>
            {!isEditingPrivacy && (
              <Button
                onClick={() => setIsEditingPrivacy(true)}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <FileText className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
          </div>

          {/* Edit Mode */}
          {isEditingPrivacy ? (
            <>
              <JoditEditorComponent
                value={content}
                onChange={setContent}
                placeholder="Write your privacy policy here..."
                height={400}
              />

              <div className="flex justify-end gap-3 pt-2">
                <Button
                  onClick={handleSavePrivacy}
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
            /* View Mode — renders saved HTML */
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

export default PrivacyPolicy;