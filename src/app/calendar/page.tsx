"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  CheckCircle2,
  Trash2,
  Edit2,
  AlertCircle,
  ExternalLink,
  Calendar as CalendarIcon,
} from "lucide-react";
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  parseISO,
  isToday,
} from "date-fns";
import { AppLayout } from "@/components/layout/app-layout";
import { useAuth } from "@/context/auth-context";
import {
  getCalendarPosts,
  schedulePost,
  updateCalendarPost,
  deleteCalendarPost,
  getUserContent,
} from "@/lib/data/content-store";
import { CalendarPost, ContentItem } from "@/types/database";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { formatDate } from "@/lib/utils";

export default function CalendarPage() {
  const { user } = useAuth();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [calendarPosts, setCalendarPosts] = useState<CalendarPost[]>([]);
  const [libraryItems, setLibraryItems] = useState<ContentItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Scheduling Modal State
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [selectedContentId, setSelectedContentId] = useState("");
  const [scheduleDateStr, setScheduleDateStr] = useState(
    format(new Date(), "yyyy-MM-dd'T'10:00")
  );

  // Post Detail / Reschedule Modal State
  const [activePost, setActivePost] = useState<CalendarPost | null>(null);
  const [editDateStr, setEditDateStr] = useState("");
  const [editStatus, setEditStatus] = useState<"scheduled" | "published" | "missed">("scheduled");

  // Load calendar posts and library content
  const loadCalendarData = async () => {
    setIsLoading(true);
    try {
      const [posts, content] = await Promise.all([
        getCalendarPosts(user?.id),
        getUserContent(user?.id),
      ]);
      setCalendarPosts(posts);
      setLibraryItems(content);
      if (content.length > 0 && !selectedContentId) {
        setSelectedContentId(content[0].id);
      }
    } catch (err) {
      console.error("Error loading calendar posts:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadCalendarData();
  }, [user]);

  // Calendar Days Calculation
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days = [];
    let day = startDate;

    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }
    return days;
  }, [currentMonth]);

  const handlePrevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const handleNextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const handleToday = () => setCurrentMonth(new Date());

  const handleOpenScheduleForDay = (date: Date) => {
    setScheduleDateStr(format(date, "yyyy-MM-dd'T'10:00"));
    setIsScheduleModalOpen(true);
  };

  const handleCreateSchedule = async () => {
    if (!selectedContentId || !user?.id) {
      toast.warning("Please select a content item from your library");
      return;
    }

    try {
      const newPost = await schedulePost(
        user.id,
        selectedContentId,
        new Date(scheduleDateStr).toISOString()
      );
      setCalendarPosts((prev) => [...prev, newPost]);
      setIsScheduleModalOpen(false);
      toast.success("Content scheduled", format(new Date(scheduleDateStr), "MMM d, h:mm a"));
    } catch (err) {
      toast.error("Failed to schedule content");
    }
  };

  const handleOpenPostDetails = (post: CalendarPost) => {
    setActivePost(post);
    setEditDateStr(format(new Date(post.scheduled_date), "yyyy-MM-dd'T'HH:mm"));
    setEditStatus(post.status);
  };

  const handleUpdateSchedule = async () => {
    if (!activePost) return;
    try {
      const updated = await updateCalendarPost(activePost.id, {
        scheduled_date: new Date(editDateStr).toISOString(),
        status: editStatus,
      });

      if (updated) {
        setCalendarPosts((prev) =>
          prev.map((p) => (p.id === activePost.id ? updated : p))
        );
        toast.success("Schedule updated");
        setActivePost(null);
      }
    } catch {
      toast.error("Failed to update schedule");
    }
  };

  const handleDeleteSchedule = async () => {
    if (!activePost) return;
    if (confirm("Remove this post from the calendar?")) {
      await deleteCalendarPost(activePost.id);
      setCalendarPosts((prev) => prev.filter((p) => p.id !== activePost.id));
      toast.info("Removed from calendar");
      setActivePost(null);
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-3 border-b border-slate-800/80">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-indigo-400" />
            Content Calendar
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Plan, organize, and track your upcoming publishing schedule across channels.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="primary" size="md" onClick={() => setIsScheduleModalOpen(true)}>
            <Plus className="w-4 h-4 mr-1.5" />
            Schedule Post
          </Button>
        </div>
      </div>

      {/* Calendar Controls & Month Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#0F172A]/80 border border-slate-800">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-bold text-white tracking-tight">
            {format(currentMonth, "MMMM yyyy")}
          </h2>
          <Button variant="ghost" size="sm" onClick={handleToday} className="text-xs">
            Today
          </Button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handlePrevMonth}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNextMonth}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Monthly Grid */}
      <div className="rounded-2xl bg-[#0F172A]/70 border border-slate-800 overflow-hidden shadow-2xl">
        {/* Days of Week Header */}
        <div className="grid grid-cols-7 border-b border-slate-800 bg-slate-950/60 text-center py-2.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((dayName) => (
            <div key={dayName}>{dayName}</div>
          ))}
        </div>

        {/* Days Cells */}
        <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-slate-800/60">
          {calendarDays.map((day, idx) => {
            const isCurrentMonth = isSameMonth(day, currentMonth);
            const isDayToday = isToday(day);

            // Filter posts for this day
            const postsForDay = calendarPosts.filter((p) => {
              try {
                return isSameDay(parseISO(p.scheduled_date), day);
              } catch {
                return false;
              }
            });

            return (
              <div
                key={idx}
                onClick={() => handleOpenScheduleForDay(day)}
                className={`min-h-[110px] p-2 flex flex-col justify-between transition-colors group cursor-pointer ${
                  isCurrentMonth ? "bg-transparent" : "bg-slate-950/30 opacity-40"
                } hover:bg-slate-850/50`}
              >
                {/* Cell Header: Date Number */}
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs font-semibold w-6 h-6 rounded-full flex items-center justify-center ${
                      isDayToday
                        ? "bg-indigo-600 text-white font-bold shadow-md shadow-indigo-500/30"
                        : isCurrentMonth
                        ? "text-slate-300"
                        : "text-slate-600"
                    }`}
                  >
                    {format(day, "d")}
                  </span>

                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-indigo-400">
                    <Plus className="w-3.5 h-3.5" />
                  </span>
                </div>

                {/* Posts inside cell */}
                <div className="space-y-1.5 mt-1.5 flex-1">
                  {postsForDay.slice(0, 2).map((post) => (
                    <div
                      key={post.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenPostDetails(post);
                      }}
                      className="p-1.5 rounded-lg bg-slate-900/90 border border-slate-800 hover:border-indigo-500/50 text-[11px] text-slate-200 transition-all flex items-center justify-between gap-1 shadow-sm"
                    >
                      <div className="flex items-center gap-1 min-w-0">
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            post.content?.platform === "Instagram"
                              ? "bg-pink-400"
                              : post.content?.platform === "LinkedIn"
                              ? "bg-sky-400"
                              : post.content?.platform === "YouTube"
                              ? "bg-red-400"
                              : "bg-slate-400"
                          }`}
                        />
                        <span className="truncate font-medium">
                          {post.content?.title || "Scheduled Post"}
                        </span>
                      </div>
                      <span className="text-[9px] text-slate-400 shrink-0">
                        {format(parseISO(post.scheduled_date), "h:mma")}
                      </span>
                    </div>
                  ))}

                  {postsForDay.length > 2 && (
                    <div className="text-[10px] text-indigo-400 font-medium pl-1">
                      +{postsForDay.length - 2} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Disclaimers & Notes */}
      <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-400 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-300 font-semibold">Content Planning Calendar:</strong>{" "}
          This workspace helps creators schedule and organize drafts. Automatic direct-to-social publishing will be available in future API updates.
        </div>
      </div>

      {/* Schedule Post Modal */}
      <Modal
        isOpen={isScheduleModalOpen}
        onClose={() => setIsScheduleModalOpen(false)}
        title="Schedule Content"
        description="Select a post from your library and set its publishing target date"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Select Saved Content Piece
            </label>
            {libraryItems.length === 0 ? (
              <p className="text-xs text-slate-400 py-3">
                No content in library yet. Please generate a piece first.
              </p>
            ) : (
              <select
                value={selectedContentId}
                onChange={(e) => setSelectedContentId(e.target.value)}
                className="w-full rounded-xl bg-slate-900/90 px-3 py-2.5 text-xs text-slate-100 border border-slate-800 focus:outline-none focus:border-indigo-500"
              >
                {libraryItems.map((item) => (
                  <option key={item.id} value={item.id} className="bg-slate-900 text-white">
                    [{item.platform}] {item.title}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <Input
              label="Scheduled Date and Time"
              type="datetime-local"
              value={scheduleDateStr}
              onChange={(e) => setScheduleDateStr(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-4 border-t border-slate-800">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsScheduleModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={handleCreateSchedule}
              disabled={libraryItems.length === 0}
            >
              <CalendarIcon className="w-4 h-4 mr-1.5" />
              Schedule Post
            </Button>
          </div>
        </div>
      </Modal>

      {/* Post Detail / Reschedule Modal */}
      {activePost && (
        <Modal
          isOpen={Boolean(activePost)}
          onClose={() => setActivePost(null)}
          title="Scheduled Post Details"
          description={`Planned for ${formatDate(activePost.scheduled_date)}`}
          size="lg"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {activePost.content?.platform && (
                <Badge variant="platform" platform={activePost.content.platform}>
                  {activePost.content.platform}
                </Badge>
              )}
              {activePost.content?.content_type && (
                <Badge variant="secondary">{activePost.content.content_type}</Badge>
              )}
              <Badge
                variant={
                  activePost.status === "published"
                    ? "success"
                    : activePost.status === "scheduled"
                    ? "purple"
                    : "danger"
                }
              >
                {activePost.status}
              </Badge>
            </div>

            <div>
              <h3 className="text-base font-bold text-white">
                {activePost.content?.title || "Untitled Post"}
              </h3>
              {activePost.content?.hook && (
                <p className="text-xs text-indigo-300 italic mt-1">
                  &ldquo;{activePost.content.hook}&rdquo;
                </p>
              )}
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 max-h-48 overflow-y-auto whitespace-pre-wrap">
              {activePost.content?.content}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <Input
                label="Reschedule Target Time"
                type="datetime-local"
                value={editDateStr}
                onChange={(e) => setEditDateStr(e.target.value)}
              />

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Publishing Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as any)}
                  className="w-full rounded-xl bg-slate-900 px-3 py-2.5 text-xs text-slate-100 border border-slate-800 focus:outline-none focus:border-indigo-500"
                >
                  <option value="scheduled" className="bg-slate-900">Scheduled</option>
                  <option value="published" className="bg-slate-900">Mark as Published</option>
                  <option value="missed" className="bg-slate-900">Missed / Postponed</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <Button variant="danger" size="sm" onClick={handleDeleteSchedule}>
                <Trash2 className="w-3.5 h-3.5 mr-1" />
                Remove from Calendar
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActivePost(null)}
                >
                  Close
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleUpdateSchedule}
                >
                  Save Schedule Changes
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
