// pages/settings/CommissionManage.tsx
import { AlertCircle, DollarSign, Loader2, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetCommissionQuery, usePostCommissionMutation } from "../../../redux/features/setting/settingApi";
import { Button } from "../../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
// import { useUpdateCommissionMutation } from ... (add when you have it)

const CommissionManage = () => {
    const {
        data: commission,
        isLoading: isFetching,
    } = useGetCommissionQuery(undefined);
    const [postCommission] = usePostCommissionMutation();

    console.log("commission", commission);
    
    
    const [form, setForm] = useState({
        platformFee: "",
        hostCommission: "",
        adminCommission: "",
    });

    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

    useEffect(() => {
        if (commission) {
            setForm({
                platformFee: commission.platformFee?.toString() || "0",
                hostCommission: commission.hostCommission?.toString() || "0",
                adminCommission: commission.adminCommission?.toString() || "0",
            });
        }
    }, [commission]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Only allow valid number input (including decimal)
        if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    };

    // ────────────────────────────────────────────────
    //  Validation: must be numbers + sum === 100
    // ────────────────────────────────────────────────
    const values = {
        platform: Number(form.platformFee) || 0,
        host: Number(form.hostCommission) || 0,
        admin: Number(form.adminCommission) || 0,
    };

    const allAreNumbers =
        form.platformFee !== "" &&
        form.hostCommission !== "" &&
        form.adminCommission !== "" &&
        !isNaN(values.platform) &&
        !isNaN(values.host) &&
        !isNaN(values.admin);

    const sum = values.platform + values.host + values.admin;
    const isValidSum = Math.abs(sum - 100) < 0.01; // small tolerance for float

    const canSave = allAreNumbers && isValidSum && !saving;

    const getSumStatus = () => {
        if (!allAreNumbers) return { color: "text-gray-500", text: "Enter all three values" };
        if (!isValidSum) return { color: "text-red-600 font-medium", text: `Total: ${sum.toFixed(2)}% (must be 100%)` };
        return { color: "text-green-600 font-medium", text: "Total: 100% ✓" };
    };

    const sumStatus = getSumStatus();

    const handleSave = async () => {
        if (!canSave) return;

        setSaving(true);
        setMessage(null);

        try {
            const payload = {
                platformFee: values.platform,
                hostCommission: values.host,
                adminCommission: values.admin,
            };

            const response = await postCommission(payload)?.unwrap();
            if (response?.success) {
                setMessage({
                    type: "success",
                    text: response?.message
                });
            }

        } catch (err: any) {
            setMessage({
                type: "error",
                text: err?.data?.message || "Failed to save settings"
            });
        } finally {
            setSaving(false);
        }
    };

    if (isFetching) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }


    return (
        <Card className="border-none shadow-sm max-w-4xl mx-auto">
            <CardHeader>
                <div className="flex items-center gap-3">
                    <DollarSign className="h-7 w-7 text-primary" />
                    <div>
                        <CardTitle className="text-2xl">Commission & Fee Structure</CardTitle>
                        <CardDescription>
                            Percentages must add up to exactly 100%
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-8">
                {message && (
                    <div className={`p-4 rounded-lg border ${message.type === "success"
                            ? "bg-green-50 border-green-200 text-green-800"
                            : "bg-red-50 border-red-200 text-red-800"
                        }`}>
                        {message.text}
                    </div>
                )}

                <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                        <Label htmlFor="hostCommission">Host Receives (%)</Label>
                        <Input
                            id="hostCommission"
                            name="hostCommission"
                            type="text" // using text + regex for better control
                            value={form.hostCommission}
                            onChange={handleChange}
                            placeholder="80"
                            className="h-11"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="platformFee">Platform Fee (%)</Label>
                        <Input
                            id="platformFee"
                            name="platformFee"
                            type="text"
                            value={form.platformFee}
                            onChange={handleChange}
                            placeholder="2"
                            className="h-11"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="adminCommission">Admin / Company (%)</Label>
                        <Input
                            id="adminCommission"
                            name="adminCommission"
                            type="text"
                            value={form.adminCommission}
                            onChange={handleChange}
                            placeholder="18"
                            className="h-11"
                        />
                    </div>
                </div>

                <div className="pt-6 border-t">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className={`text-sm flex items-center gap-2 ${sumStatus.color}`}>
                            {allAreNumbers && !isValidSum && <AlertCircle className="h-4 w-4" />}
                            {sumStatus.text}
                        </div>

                        <Button
                            onClick={handleSave}
                            disabled={!canSave}
                            className="min-w-[160px] bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 disabled:opacity-50"
                        >
                            {saving ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Save Changes
                                </>
                            )}
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default CommissionManage;
