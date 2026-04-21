"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Submission {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  message: string;
  status: string;
  created_at: string;
  admin_notes?: string;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, []);

  async function fetchSubmissions() {
    try {
      setLoading(true);
      const token = localStorage.getItem("adminToken");

      if (!token) {
        router.push("/admin/login");
        return;
      }

      const res = await fetch("/api/admin/submissions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 401) {
        localStorage.removeItem("adminToken");
        router.push("/admin/login");
        return;
      }

      if (!res.ok) {
        throw new Error("Failed to fetch submissions");
      }

      const data = await res.json();
      setSubmissions(data.submissions || []);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load submissions"
      );
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("adminToken");
    router.push("/admin/login");
  }

  function handleExport() {
    const csv = [
      ["Full Name", "Email", "Phone", "Message", "Date", "Status"],
      ...submissions.map((s) => [
        s.full_name,
        s.email,
        s.phone || "",
        s.message.replace(/"/g, '""'), // Escape quotes
        new Date(s.created_at).toLocaleString(),
        s.status,
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `contact-submissions-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">Contact Submissions</h1>
          <button
            onClick={handleLogout}
            className="bg-white text-primary px-4 py-2 rounded font-medium hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats and Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm font-medium">Total Submissions</h3>
            <p className="text-3xl font-bold text-primary mt-2">{submissions.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm font-medium">Pending Review</h3>
            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {submissions.filter((s) => s.status === "pending").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-gray-600 text-sm font-medium">Contacted</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {submissions.filter((s) => s.status === "contacted").length}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={fetchSubmissions}
            className="bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-secondary transition"
          >
            Refresh
          </button>
          <button
            onClick={handleExport}
            disabled={submissions.length === 0}
            className="bg-accent text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
          >
            Export CSV
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading submissions...</p>
          </div>
        )}

        {/* Submissions Table */}
        {!loading && submissions.length > 0 && (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Email
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Phone
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {submissions.map((submission) => (
                    <tr key={submission.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                        {submission.full_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        <a
                          href={`mailto:${submission.email}`}
                          className="text-primary hover:underline"
                        >
                          {submission.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {submission.phone ? (
                          <a
                            href={`tel:${submission.phone}`}
                            className="text-primary hover:underline"
                          >
                            {submission.phone}
                          </a>
                        ) : (
                          "-"
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {new Date(submission.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            submission.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : submission.status === "contacted"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {submission.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <button
                          onClick={() => setSelectedId(
                            selectedId === submission.id ? null : submission.id
                          )}
                          className="text-primary hover:underline font-medium"
                        >
                          {selectedId === submission.id ? "Hide" : "View"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && submissions.length === 0 && !error && (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No submissions yet.</p>
            <Link
              href="/"
              className="text-primary hover:underline font-medium"
            >
              Back to Home
            </Link>
          </div>
        )}

        {/* Detail View */}
        {selectedId && (
          <div className="mt-8 bg-white rounded-lg shadow p-8">
            {submissions
              .filter((s) => s.id === selectedId)
              .map((submission) => (
                <div key={submission.id} className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Full Message
                    </h3>
                    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {submission.message}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Submitted</p>
                      <p className="text-gray-900 font-medium">
                        {new Date(submission.created_at).toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Status</p>
                      <p className="text-gray-900 font-medium capitalize">
                        {submission.status}
                      </p>
                    </div>
                  </div>

                  <div className="pt-6 border-t">
                    <button
                      onClick={() => setSelectedId(null)}
                      className="text-gray-600 hover:text-gray-900 font-medium"
                    >
                      ← Back to List
                    </button>
                  </div>
                </div>
              ))}
          </div>
        )}
      </main>
    </div>
  );
}
