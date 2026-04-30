import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../../ui/select';

interface AddAdminFormProps {
    onSubmit?: (formData: FormData) => void;
    onCancel?: () => void;
}

const PERMISSIONS = [
    { id: 'overview', label: 'Overview' },
    { id: 'users_management', label: 'Users Management' },
    { id: 'agents_management', label: 'Agents Management' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'revenue', label: 'Revenue' },
    { id: 'content_management', label: 'Content Management' },
    { id: 'banner_ads', label: 'Banner Ads' },
    { id: 'push_notifications', label: 'Push Notifications' },
    { id: 'feed_monitor', label: 'Feed Monitor' },
];

export default function AddAdminForm({ onSubmit, onCancel }: AddAdminFormProps) {
    const [role, setRole] = useState('ADMIN');
    const [showPassword, setShowPassword] = useState(false);
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

    const togglePermission = (id: string) => {
        setSelectedPermissions((prev) =>
            prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
        );
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        formData.set('role', role);
        // Append permissions
        selectedPermissions.forEach((p) => formData.append('permissions', p));
        onSubmit?.(formData);
    };

    // Pair permissions into rows of 2
    const rows: typeof PERMISSIONS[] = [];
    for (let i = 0; i < PERMISSIONS.length; i += 2) {
        rows.push(PERMISSIONS.slice(i, i + 2) as typeof PERMISSIONS);
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-5 mt-1">
            {/* Full Name + Email */}
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="Enter full name"
                        className="h-11"
                        required
                    />
                </div>
                <div className="space-y-1.5">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="admin@myhome.com"
                        className="h-11"
                        required
                    />
                </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                    <Input
                        id="password"
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter secure password"
                        className="h-11 pr-10"
                        required
                        minLength={6}
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        tabIndex={-1}
                    >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>
            </div>

            {/* Role */}
            <div className="space-y-1.5">
                <Label>Role</Label>
                <Select value={role} onValueChange={setRole}>
                    <SelectTrigger className="h-11 w-full">
                        <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                        <SelectItem value="MODERATOR">Moderator</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Permissions */}
            <div className="space-y-3">
                <Label>Permissions</Label>
                <div className="space-y-2">
                    {rows.map((row, ri) => (
                        <div key={ri} className="grid grid-cols-2 gap-2">
                            {row.map((perm) => {
                                const checked = selectedPermissions.includes(perm.id);
                                return (
                                    <button
                                        key={perm.id}
                                        type="button"
                                        onClick={() => togglePermission(perm.id)}
                                        className={`flex items-center gap-2.5 px-4 py-3 rounded-lg border text-sm text-left transition-colors ${
                                            checked
                                                ? 'border-blue-400 bg-blue-50 text-blue-800'
                                                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                                        }`}
                                    >
                                        <span
                                            className={`w-4 h-4 rounded flex items-center justify-center border shrink-0 ${
                                                checked
                                                    ? 'bg-blue-600 border-blue-600'
                                                    : 'border-gray-300 bg-white'
                                            }`}
                                        >
                                            {checked && (
                                                <svg viewBox="0 0 10 8" fill="none" className="w-2.5 h-2.5">
                                                    <path d="M1 4l3 3 5-6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            )}
                                        </span>
                                        {perm.label}
                                    </button>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" className="gap-2 bg-blue-900 hover:bg-blue-800 text-white">
                    <UserPlus size={15} />
                    Add Administrator
                </Button>
            </div>
        </form>
    );
}