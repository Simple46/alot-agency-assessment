"use client";

import { useAuth } from "@/context/AuthContext";
import DashboardLayout from "@/components/dashboard/DashboardLayout";


export default function DashboardPage() {
  const { user } = useAuth();

  // Mock data – replace with real API later
  const timeLogData = [5, 4, 3, 2, 1, 0];
  const performanceData = {
    classWork: 25,
    total: 100,
    overallHours: "10h",
    spentTime: "06h 56m",
  };

  const notifications = [
    {
      title: "Upcoming Class",
      desc: "Mathematics | Miss Akinbola ↑",
      unread: false,
    },
    {
      title: "Message from Admin",
      desc: "Hello, David. We got a feedb...",
      unread: true,
    },
    {
      title: "Message from Miss Hanna",
      desc: "Hello, David Smith. You are yet...",
      unread: true,
    },
    {
      title: "Message from Admin",
      desc: "Hello, David. We got a feedb...",
      unread: true,
    },
  ];

  const transactions = [
    {
      type: "Stripe",
      amount: "$50,000",
      status: "Processed",
      date: "30 Nov 2023 03:08 pm",
      detail: "Transfer to D-Lz Tutor",
    },
    {
      type: "PayStack",
      amount: "N50,000",
      status: "Failed",
      date: "31 Oct 2023 03:08 pm",
      detail: "Transfer to D-L Tutor",
    },
  ];

  return (
    <DashboardLayout>
      {/* Greeting and CTA */}

      <div className="flex w-full">
        <div className="mb-6 w-xl bg-blue-900 text-white rounded-lg flex justify-between items-center">
          <div className="flex flex-col gap-4 p-4">
            <p className="w-3xl">
              Enjoy personalized learning in all subjects, topics and skills.
            </p>
            <button className="bg-white text-blue-600 px-5 py-2 rounded-md text-sm font-semibold w-40  ">
              Find a Tutor
            </button>
                  </div>
            
              </div>
              
        <div>notification</div>
      </div>
    
    </DashboardLayout>
  );
}