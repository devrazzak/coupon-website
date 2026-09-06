'use client';

import { AxiosError } from 'axios';
import { Mail, MessageSquareText } from 'lucide-react';
import { useState } from 'react';

import {
    AdminPageHeader,
    EmptyState,
    FilterSelect,
    TableWrapper,
} from '@/components/admin/admin-shared';
import { Button } from '@/components/ui/button';
import { DataTableSkeleton } from '@/components/ui/data-table-skeleton';
import { useGetAdminContactRequests } from '@/utils/hooks/contact';

const PAGE_SIZE = 20;

type ReplyFilter = 'all' | 'false' | 'true';

function formatDate(value: string) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short',
    });
}

export default function AdminContactPage() {
    const [page, setPage] = useState(1);
    const [replyFilter, setReplyFilter] = useState<ReplyFilter>('all');
    const isReply = replyFilter === 'all' ? undefined : replyFilter === 'true';
    const {
        data: response,
        isLoading,
        isFetching,
        error,
    } = useGetAdminContactRequests(page, PAGE_SIZE, isReply);
    const payload = response?.data;
    const contacts = payload?.data ?? [];
    const totalCount = payload?.meta?.totalCount ?? 0;
    const totalPages = Math.max(1, payload?.meta?.totalPages ?? Math.ceil(totalCount / PAGE_SIZE));
    const errorMessage =
        error instanceof AxiosError
            ? error.response?.data?.message
            : error?.message || 'Unable to load contact requests.';

    const handleFilterChange = (value: string) => {
        setReplyFilter(value as ReplyFilter);
        setPage(1);
    };

    return (
        <>
            <AdminPageHeader
                title="Contact Requests"
                subtitle="Review questions, feedback, and support requests submitted by shoppers."
                breadcrumb={['Dashboard', 'Contact Requests']}
            />

            <div className="rounded-3xl border border-border bg-card p-4 shadow-soft">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="text-[13px] font-semibold text-foreground">Inbox</p>
                        <p className="mt-1 text-[12px] text-muted-foreground">
                            {totalCount} {totalCount === 1 ? 'request' : 'requests'} total
                        </p>
                    </div>
                    <FilterSelect
                        value={replyFilter}
                        onChange={handleFilterChange}
                        options={[
                            { value: 'all', label: 'All requests' },
                            { value: 'false', label: 'Unreplied' },
                            { value: 'true', label: 'Replied' },
                        ]}
                    />
                </div>
            </div>

            <div className="mt-6">
                {isLoading ? (
                    <TableWrapper>
                        <DataTableSkeleton columns={5} rows={6} />
                    </TableWrapper>
                ) : error ? (
                    <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-center text-sm text-rose-700">
                        {errorMessage}
                    </div>
                ) : contacts.length === 0 ? (
                    <EmptyState
                        title="No contact requests found"
                        description={
                            replyFilter === 'all'
                                ? 'New contact requests will appear here.'
                                : 'There are no requests matching this reply status.'
                        }
                    />
                ) : (
                    <TableWrapper>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-left">
                                <thead className="bg-surface text-[12px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                                    <tr>
                                        <th className="px-4 py-3">Requester</th>
                                        <th className="px-4 py-3">Subject</th>
                                        <th className="px-4 py-3">Message</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Received</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {contacts.map(contact => (
                                        <tr
                                            key={contact.id}
                                            className="border-t border-border align-top text-[14px] text-foreground"
                                        >
                                            <td className="min-w-52 px-4 py-4">
                                                <div className="flex items-start gap-3">
                                                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-light text-primary">
                                                        <MessageSquareText className="h-4 w-4" />
                                                    </span>
                                                    <div className="min-w-0">
                                                        <p className="font-semibold">
                                                            {contact.name}
                                                        </p>
                                                        <a
                                                            href={`mailto:${contact.email}`}
                                                            className="mt-1 inline-flex items-center gap-1 text-[12px] text-muted-foreground hover:text-primary"
                                                        >
                                                            <Mail className="h-3 w-3" />
                                                            {contact.email}
                                                        </a>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="min-w-44 px-4 py-4 font-semibold">
                                                {contact.subject}
                                            </td>
                                            <td className="max-w-sm min-w-64 px-4 py-4 text-[13px] leading-6 text-muted-foreground">
                                                <p className="line-clamp-3 whitespace-pre-wrap">
                                                    {contact.message}
                                                </p>
                                            </td>
                                            <td className="px-4 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.08em] ${
                                                        contact.is_reply
                                                            ? 'border border-emerald-200 bg-emerald-50 text-emerald-700'
                                                            : 'border border-amber-200 bg-amber-50 text-amber-700'
                                                    }`}
                                                >
                                                    {contact.is_reply ? 'Replied' : 'Unreplied'}
                                                </span>
                                            </td>
                                            <td className="whitespace-nowrap px-4 py-4 text-[12px] text-muted-foreground">
                                                {formatDate(contact.created_at)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </TableWrapper>
                )}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[13px] text-muted-foreground">
                    Showing {contacts.length} of {totalCount} requests
                </p>
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(current => Math.max(1, current - 1))}
                        disabled={page === 1 || isFetching}
                    >
                        Previous
                    </Button>
                    <span className="text-[13px] font-medium text-foreground">
                        Page {page} / {totalPages}
                    </span>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setPage(current => Math.min(totalPages, current + 1))}
                        disabled={page >= totalPages || isFetching}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </>
    );
}
