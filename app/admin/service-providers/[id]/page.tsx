"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";

type Provider = {
  id: string;
  name: string | null;
  email: string;
  status: "ACTIVE" | "PENDING" | "SUSPENDED";
  createdAt: string;
};

export default function AdminServiceProviderDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const [loading, setLoading] = useState(true);
  const [provider, setProvider] = useState<Provider | null>(null);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [events, setEvents] = useState<any[]>([]);
  const [treks, setTreks] = useState<any[]>([]);

  useEffect(() => {
    fetchProvider();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedParams.id]);

  const fetchProvider = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/admin/service-providers/${resolvedParams.id}`
      );
      if (res.ok) {
        const data = await res.json();
        setProvider(data.user);
        setDestinations(data.destinations);
        setEvents(data.events);
        setTreks(data.treks);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (!provider) {
    return <div className="text-gray-300">Service provider not found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          {provider.name || provider.email}
        </h1>
        <p className="text-gray-300">{provider.email}</p>
        <div className="mt-2">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              provider.status === "ACTIVE"
                ? "bg-green-100 text-green-800"
                : provider.status === "PENDING"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {provider.status}
          </span>
        </div>
      </div>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Destinations</h2>
          <Link
            href={`/sp/destinations`}
            className="text-sm text-orange-500 hover:text-orange-400"
          >
            Open SP view
          </Link>
        </div>
        {destinations.length === 0 ? (
          <div className="text-gray-400">No destinations.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {destinations.map((d) => (
              <div
                key={d.id}
                className="bg-gray-900 rounded-lg shadow border border-gray-700 overflow-hidden"
              >
                <img
                  src={d.image}
                  alt={d.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold">{d.name}</h3>
                    <span className="text-orange-500 font-medium">
                      {d.price}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm line-clamp-2 mt-2">
                    {d.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Events</h2>
        </div>
        {events.length === 0 ? (
          <div className="text-gray-400">No events.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((e) => (
              <div
                key={e.id}
                className="bg-gray-900 rounded-lg shadow border border-gray-700 overflow-hidden"
              >
                <img
                  src={e.image}
                  alt={e.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold">{e.name}</h3>
                    <span className="text-orange-500 font-medium">
                      {e.price}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm line-clamp-2 mt-2">
                    {e.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-white">Treks</h2>
        </div>
        {treks.length === 0 ? (
          <div className="text-gray-400">No treks.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treks.map((t) => (
              <div
                key={t.id}
                className="bg-gray-900 rounded-lg shadow border border-gray-700 overflow-hidden"
              >
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold">{t.name}</h3>
                    <span className="text-orange-500 font-medium">
                      {t.price}
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm line-clamp-2 mt-2">
                    {t.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
