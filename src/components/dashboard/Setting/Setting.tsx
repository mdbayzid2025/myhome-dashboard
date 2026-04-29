// pages/settings/SettingsPage.tsx
import { DollarSign, FileText, Globe, Shield } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import AboutUs from "./AboutUs";
import CommissionManage from "./CommissionManage";
import PersonnalInformation from "./PersonnalInformation";
import PrivacyPolicy from "./PrivacyPolicy";
import TermsCondition from "./TermsCondition";
import ChangePassword from "./ChangePassword";
import FAQ from "./FAQ";

const TABS = [
    { value: "general", label: "Information", icon: Globe, animate: "fade-up-right", delay: 100 },
    { value: "pricing", label: "Commission", icon: DollarSign, animate: "fade-up-right", delay: 200 },
    { value: "security", label: "Security", icon: Shield, animate: "fade-up-right", delay: 300 },
    { value: "faq", label: "FAQ", icon: FileText, animate: "fade-up-right", delay: 400 },
    { value: "about", label: "About Us", icon: FileText, animate: "fade-up-right", delay: 400 },
    { value: "terms", label: "Terms", icon: FileText, animate: "fade-up-right", delay: 500 },
    { value: "privacy", label: "Privacy Policy", icon: FileText, animate: "fade-up-right", delay: 600 },
];

export default function Setting() {


    return (
        <div className="p-5">
            <Tabs defaultValue="general" className="w-full ">
                <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm border ">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Setting</h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Manage application settings and administrative preferences.
                        </p>
                    </div>
                    <TabsList className="grid w-full h-16! bg-primary/20 grid-cols-7 gap-3 p-2 mt-5">
                        {TABS.map(({ value, label, icon: Icon, animate, delay }) => (
                            <TabsTrigger
                                key={value}
                                data-aos={animate}
                                data-aos-anchor-placement="center-bottom"
                                data-aos-delay={delay}
                                className="bg-gray-300 text-gray-600 
                                data-[state=active]:bg-primary! 
                                data-[state=active]:text-white!                                                             
                            data-[state=active]:hover:border-none!
                                    data-[state=active]:focus:outline-none!
                                    data-[state=active]:focus-visible::outline-none! 
                                data-[state=active]:shadow-md 
                                transition-all"
                                value={value}
                            >
                                <Icon className="h-4 w-4 " />
                                {label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </div>

                <TabsContent value="general">
                    <PersonnalInformation />
                </TabsContent>


                <TabsContent value="pricing">
                    <CommissionManage />
                </TabsContent>

                <TabsContent value="security">
                    <ChangePassword />
                </TabsContent>

                <TabsContent value="terms">
                    <TermsCondition />
                </TabsContent>
                <TabsContent value="faq">
                    <FAQ />
                </TabsContent>
                <TabsContent value="about">
                    <AboutUs />
                </TabsContent>

                <TabsContent value="privacy">
                    <PrivacyPolicy />
                </TabsContent>
            </Tabs>
        </div>
    );
}
