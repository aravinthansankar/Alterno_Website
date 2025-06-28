"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/protected-route";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  AlertTriangle, 
  Trash2, 
  Key, 
  Unlink, 
  User, 
  Shield, 
  CreditCard,
  CheckCircle,
  X
} from "lucide-react";
import { useAppSelector } from "@/lib/store/hooks";
import { useGetSquareLocationsQuery } from "@/lib/store/services/squareApi";
import { ClientSessionManager } from "@/lib/square/clientSessionManager";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function SettingsPage() {
  const { user } = useAppSelector((state) => state.auth);
  const { data: squareData } = useGetSquareLocationsQuery();
  
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [showDisconnectWarning, setShowDisconnectWarning] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSquareConnected, setIsSquareConnected] = useState(false);

  // Check Square connection status
  useEffect(() => {
    const checkSquareConnection = () => {
      const connection = ClientSessionManager.getSquareConnection();
      const hasSquareData = squareData?.location || squareData?.locations?.length > 0;
      setIsSquareConnected(connection?.isConnected === true || hasSquareData);
    };

    checkSquareConnection();
  }, [squareData]);

  const handleDeleteAccount = () => {
    if (deleteConfirmation === 'DELETE') {
      // TODO: Implement account deletion
      console.log('Account deletion requested');
      setShowDeleteWarning(false);
      setDeleteConfirmation('');
    }
  };

  const handleResetPassword = () => {
    if (newPassword && newPassword === confirmPassword) {
      // TODO: Implement password reset
      console.log('Password reset requested');
      setNewPassword('');
      setConfirmPassword('');
    }
  };

  const handleDisconnectSquare = () => {
    // TODO: Implement Square disconnection
    console.log('Square disconnection requested');
    ClientSessionManager.clearSquareConnection();
    setIsSquareConnected(false);
    setShowDisconnectWarning(false);
  };

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-slate-400 mt-2">Manage your account and integrations</p>
        </div>

        <div className="grid gap-6">
          {/* Account Information */}
          <Card className="border-0 shadow-lg bg-slate-900 border border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <User className="h-5 w-5" />
                Account Information
              </CardTitle>
              <CardDescription className="text-slate-400">
                Your account details and preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-slate-300">Display Name</Label>
                  <Input 
                    value={user?.displayName || 'Not set'} 
                    disabled 
                    className="bg-slate-800 border-slate-600 text-slate-300"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Email</Label>
                  <Input 
                    value={user?.email || 'Not set'} 
                    disabled 
                    className="bg-slate-800 border-slate-600 text-slate-300"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Password Reset */}
          <Card className="border-0 shadow-lg bg-slate-900 border border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Key className="h-5 w-5" />
                Reset Password
              </CardTitle>
              <CardDescription className="text-slate-400">
                Change your account password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="newPassword" className="text-slate-300">New Password</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword" className="text-slate-300">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                </div>
              </div>
              <Button
                onClick={handleResetPassword}
                disabled={!newPassword || !confirmPassword || newPassword !== confirmPassword}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
              >
                Reset Password
              </Button>
            </CardContent>
          </Card>

          {/* Integrations */}
          <Card className="border-0 shadow-lg bg-slate-900 border border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Integrations
              </CardTitle>
              <CardDescription className="text-slate-400">
                Manage your connected services
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg border border-slate-600">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <CreditCard className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">Square POS</h3>
                    <p className="text-sm text-slate-400">Payment processing and inventory</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={isSquareConnected ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300" : "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"}>
                    {isSquareConnected ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Connected
                      </>
                    ) : (
                      <>
                        <X className="h-3 w-3 mr-1" />
                        Disconnected
                      </>
                    )}
                  </Badge>
                  {isSquareConnected && (
                    <AlertDialog open={showDisconnectWarning} onOpenChange={setShowDisconnectWarning}>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                          <Unlink className="h-4 w-4 mr-2" />
                          Disconnect
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-slate-900 border border-slate-700">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-white flex items-center gap-2">
                            <AlertTriangle className="h-5 w-5 text-red-400" />
                            Disconnect Square POS?
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-slate-400">
                            By disconnecting Square POS, your AI agent will not be able to place bookings or process payments. 
                            This will affect your business operations. Are you sure you want to continue?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="border-slate-600 text-slate-300 hover:bg-slate-800">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDisconnectSquare}
                            className="bg-red-600 hover:bg-red-700 text-white"
                          >
                            Disconnect Square
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-0 shadow-lg bg-slate-900 border border-red-600">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Danger Zone
              </CardTitle>
              <CardDescription className="text-slate-400">
                Irreversible and destructive actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-red-900/20 border border-red-600 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-red-400">Delete Account</h3>
                    <p className="text-sm text-slate-400 mt-1">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                  </div>
                  <AlertDialog open={showDeleteWarning} onOpenChange={setShowDeleteWarning}>
                    <AlertDialogTrigger asChild>
                      <Button variant="outline" size="sm" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Account
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-slate-900 border border-slate-700">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-white flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-red-400" />
                          Delete Account?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-slate-400">
                          This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <div className="space-y-3">
                        <Label htmlFor="deleteConfirmation" className="text-slate-300">
                          Type "DELETE" to confirm
                        </Label>
                        <Input
                          id="deleteConfirmation"
                          value={deleteConfirmation}
                          onChange={(e) => setDeleteConfirmation(e.target.value)}
                          placeholder="DELETE"
                          className="bg-slate-800 border-slate-600 text-white"
                        />
                      </div>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="border-slate-600 text-slate-300 hover:bg-slate-800">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={handleDeleteAccount}
                          disabled={deleteConfirmation !== 'DELETE'}
                          className="bg-red-600 hover:bg-red-700 text-white disabled:bg-red-600/50 disabled:cursor-not-allowed"
                        >
                          Delete Account
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
} 