"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Briefcase, Clock, MapPin, Sparkles, Users } from "lucide-react";
import { getPublicCareers } from "../admin/adminData";

const CareerPage = () => {
  const [openings, setOpenings] = useState([]);

  useEffect(() => {
    getPublicCareers().then(setOpenings).catch(() => setOpenings([]));
  }, []);

  return (
    <main className="bg-white">
      <section className="bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950 text-white px-4 py-24 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/15 px-4 py-2 text-sm font-medium text-blue-200">
            <Sparkles className="h-4 w-4" />
            Careers
          </div>
          <h1 className="mt-6 max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Build digital products with a team that values craft.
          </h1>
          <p className="mt-5 max-w-2xl text-blue-100">
            Join DigitalCrowdTech and work on websites, apps, and growth platforms for ambitious Indian businesses.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
          >
            Apply Now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center gap-3">
            <Briefcase className="h-6 w-6 text-blue-600" />
            <h2 className="text-3xl font-bold text-gray-900">Open Roles</h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {openings.map((job) => (
              <article key={job.title} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                <div className="mt-5 space-y-3 text-sm text-gray-600">
                  <p className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    {job.type} - {job.experience}
                  </p>
                  <p className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    {job.location}
                  </p>
                  <p className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-600" />
                    Collaborative product team
                  </p>
                </div>
                {job.description && <p className="mt-4 text-sm text-gray-500">{job.description}</p>}
                <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
                  Apply for this role <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default CareerPage;
