import { SimpleNav } from "@/components/simple-nav";

export default function UserProfile({params}: any) {
    return (
    <div className="min-h-screen px-6 py-6 text-slate-900 sm:px-8">
      <div className="mx-auto w-full max-w-3xl border border-slate-200 p-5">
      <SimpleNav />
      <h1 className="mt-2 text-3xl font-semibold">Profile record</h1>
      <div className="mt-6 break-all border-t border-slate-200 pt-4 text-sm text-slate-700">{params.id}</div>
      </div>
      </div>
    )
}