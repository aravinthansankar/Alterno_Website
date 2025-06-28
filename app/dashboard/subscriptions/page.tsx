"use client";

import { useState, useEffect } from "react";
import ProtectedRoute from "@/components/protected-route";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, 
  CheckCircle, 
  XCircle, 
  Star, 
  Zap, 
  Crown,
  Calendar,
  DollarSign,
  ArrowRight,
  Loader2
} from "lucide-react";
import { useAppSelector } from "@/lib/store/hooks";

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  popular?: boolean;
  stripePriceId: string;
}

interface CurrentSubscription {
  id: string;
  status: 'active' | 'canceled' | 'past_due' | 'unpaid';
  planId: string;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}

export default function SubscriptionsPage() {
  const { user } = useAppSelector((state) => state.auth);
  const [currentSubscription, setCurrentSubscription] = useState<CurrentSubscription | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const plans: SubscriptionPlan[] = [
    {
      id: 'basic',
      name: 'Basic',
      price: 29,
      interval: 'month',
      features: [
        'Up to 1,000 AI interactions per month',
        'Basic integrations (Square, Facebook)',
        'Email support',
        'Standard analytics',
        'Mobile app access'
      ],
      stripePriceId: 'price_basic_monthly'
    },
    {
      id: 'pro',
      name: 'Professional',
      price: 79,
      interval: 'month',
      features: [
        'Up to 10,000 AI interactions per month',
        'All integrations (Square, Facebook, Instagram, WhatsApp)',
        'Priority support',
        'Advanced analytics & reporting',
        'Custom AI training',
        'API access',
        'White-label options'
      ],
      popular: true,
      stripePriceId: 'price_pro_monthly'
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: 199,
      interval: 'month',
      features: [
        'Unlimited AI interactions',
        'All integrations + custom integrations',
        '24/7 dedicated support',
        'Advanced analytics & custom reports',
        'Custom AI model training',
        'Full API access',
        'White-label solution',
        'Dedicated account manager',
        'Custom SLA'
      ],
      stripePriceId: 'price_enterprise_monthly'
    }
  ];

  const yearlyPlans = plans.map(plan => ({
    ...plan,
    price: Math.round(plan.price * 10), // 2 months free
    interval: 'year' as const,
    stripePriceId: plan.stripePriceId.replace('monthly', 'yearly')
  }));

  const [selectedInterval, setSelectedInterval] = useState<'month' | 'year'>('month');
  const displayPlans = selectedInterval === 'month' ? plans : yearlyPlans;

  useEffect(() => {
    fetchCurrentSubscription();
  }, []);

  const fetchCurrentSubscription = async () => {
    if (!user?.uid) return;
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/subscriptions/current', {
        headers: {
          'Authorization': `Bearer ${await user.getIdToken()}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setCurrentSubscription(data.subscription);
      }
    } catch (error) {
      console.error('Error fetching subscription:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubscribe = async (planId: string) => {
    if (!user?.uid) return;
    
    setIsProcessing(true);
    try {
      const plan = displayPlans.find(p => p.id === planId);
      if (!plan) return;

      const response = await fetch('/api/subscriptions/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await user.getIdToken()}`
        },
        body: JSON.stringify({
          priceId: plan.stripePriceId,
          planId: plan.id,
          interval: selectedInterval
        })
      });

      if (response.ok) {
        const { sessionUrl } = await response.json();
        window.location.href = sessionUrl;
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to start subscription process. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!currentSubscription) return;
    
    if (confirm('Are you sure you want to cancel your subscription? You will lose access to premium features at the end of your current billing period.')) {
      setIsProcessing(true);
      try {
        const response = await fetch('/api/subscriptions/cancel', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await user.getIdToken()}`
          },
          body: JSON.stringify({
            subscriptionId: currentSubscription.id
          })
        });

        if (response.ok) {
          await fetchCurrentSubscription();
        } else {
          throw new Error('Failed to cancel subscription');
        }
      } catch (error) {
        console.error('Error canceling subscription:', error);
        alert('Failed to cancel subscription. Please try again.');
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case 'basic': return <Star className="h-5 w-5" />;
      case 'pro': return <Zap className="h-5 w-5" />;
      case 'enterprise': return <Crown className="h-5 w-5" />;
      default: return <Star className="h-5 w-5" />;
    }
  };

  const getPlanColor = (planId: string) => {
    switch (planId) {
      case 'basic': return 'from-blue-500 to-blue-600';
      case 'pro': return 'from-purple-500 to-purple-600';
      case 'enterprise': return 'from-amber-500 to-amber-600';
      default: return 'from-blue-500 to-blue-600';
    }
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="flex items-center justify-center min-h-screen">
          <Loader2 className="h-8 w-8 animate-spin text-purple-500" />
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Subscriptions</h1>
          <p className="text-slate-400 mt-2">Manage your subscription and billing</p>
        </div>

        {/* Current Subscription */}
        {currentSubscription && (
          <Card className="border-0 shadow-lg bg-slate-900 border border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Current Subscription
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-slate-800 rounded-lg border border-slate-600">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${getPlanColor(currentSubscription.planId)}`}>
                    {getPlanIcon(currentSubscription.planId)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white capitalize">
                      {currentSubscription.planId} Plan
                    </h3>
                    <p className="text-sm text-slate-400">
                      {currentSubscription.cancelAtPeriodEnd 
                        ? 'Cancels on ' + currentSubscription.currentPeriodEnd.toLocaleDateString()
                        : 'Next billing: ' + currentSubscription.currentPeriodEnd.toLocaleDateString()
                      }
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className={
                    currentSubscription.status === 'active' 
                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                      : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
                  }>
                    {currentSubscription.status === 'active' ? (
                      <>
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Active
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3 w-3 mr-1" />
                        {currentSubscription.status}
                      </>
                    )}
                  </Badge>
                  {currentSubscription.status === 'active' && !currentSubscription.cancelAtPeriodEnd && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCancelSubscription}
                      disabled={isProcessing}
                      className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white"
                    >
                      {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Cancel'}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Subscription Plans */}
        <Card className="border-0 shadow-lg bg-slate-900 border border-slate-700">
          <CardHeader>
            <CardTitle className="text-white">Choose Your Plan</CardTitle>
            <CardDescription className="text-slate-400">
              Select the plan that best fits your business needs
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Billing Interval Toggle */}
            <div className="flex justify-center mb-8">
              <div className="bg-slate-800 rounded-lg p-1 flex">
                <button
                  onClick={() => setSelectedInterval('month')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedInterval === 'month'
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Monthly
                </button>
                <button
                  onClick={() => setSelectedInterval('year')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedInterval === 'year'
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Yearly
                  <Badge className="ml-2 bg-green-600 text-white text-xs">Save 17%</Badge>
                </button>
              </div>
            </div>

            {/* Plans Grid */}
            <div className="grid gap-6 md:grid-cols-3">
              {displayPlans.map((plan) => (
                <Card 
                  key={plan.id} 
                  className={`relative border-0 shadow-lg bg-slate-800 border border-slate-600 transition-all hover:scale-105 ${
                    plan.popular ? 'ring-2 ring-purple-500' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-purple-600 text-white">Most Popular</Badge>
                    </div>
                  )}
                  
                  <CardHeader className="text-center pb-4">
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${getPlanColor(plan.id)} mb-4`}>
                      {getPlanIcon(plan.id)}
                    </div>
                    <CardTitle className="text-white">{plan.name}</CardTitle>
                    <div className="flex items-baseline justify-center gap-1">
                      <span className="text-3xl font-bold text-white">${plan.price}</span>
                      <span className="text-slate-400">/{selectedInterval}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-slate-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Separator className="my-4" />
                    
                    <Button
                      onClick={() => handleSubscribe(plan.id)}
                      disabled={isProcessing || (currentSubscription?.planId === plan.id && currentSubscription?.status === 'active')}
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800'
                          : 'bg-gradient-to-r from-slate-600 to-slate-700 hover:from-slate-700 hover:to-slate-800'
                      }`}
                    >
                      {isProcessing ? (
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      ) : (
                        <ArrowRight className="h-4 w-4 mr-2" />
                      )}
                      {currentSubscription?.planId === plan.id && currentSubscription?.status === 'active'
                        ? 'Current Plan'
                        : 'Subscribe Now'
                      }
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
} 