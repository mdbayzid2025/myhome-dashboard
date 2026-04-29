import { FileText, Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { Textarea } from "../../ui/textarea";
import {
  useAddDisclaimerMutation,
  useGetPrivacyPolicyQuery,
} from "../../../redux/features/setting/settingApi";
import { toast } from "sonner";

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
      }
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to update privacy policy");
    }
  };

  const handleCancel = () => {    
    setIsEditingPrivacy(false);
  };

  return (
    <Card className="border-none shadow-sm max-w-6xl mx-auto">
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

          {/* Editing Mode */}
          {isEditingPrivacy ? (
            <>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="min-h-[350px] font-mono text-sm"
              />

              <div className="flex gap-3">
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
            /* View Mode */
            <div className="prose max-w-none whitespace-pre-wrap text-gray-700 leading-relaxed">
              {content || "No content yet."}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PrivacyPolicy;