"use client";
import { useMemo, useState } from "react";
import {
  Plus,
  ThumbsUp,
  ThumbsDown,
  Calendar,
  BookOpen,
  MessageSquare,
  GraduationCap,
  LayoutGrid,
  Pencil,
  Trash2,
} from "lucide-react";
import { type User } from "../../context/AuthContext";
import {
  type Feedback,
  type GroupFilter,
  type SortOption,
  FEEDBACK_TAGS,
  type VoteValue,
} from "../../../constants/feedbacktypes";
import { voteFeedback, deleteFeedback } from "../../services/feedbackapi";
import AddFeedbackModal from "./Addfeedback";
import ConfirmDialog from "./ConfirmDialog";
import { useAuth } from "../../hooks/useAuth";
import api from "../../services/api";

interface CommunityFeedbackProps {
  currentUser: User;
}

const GROUPS: { value: GroupFilter; label: string; icon: typeof Calendar }[] = [
  { value: "all", label: "All Advice", icon: LayoutGrid },
  { value: "semester", label: "Semester Advice", icon: Calendar },
  { value: "course", label: "Course Advice", icon: BookOpen },
  { value: "general", label: "General Advice", icon: MessageSquare },
];

const SORTS: { value: SortOption; label: string }[] = [
  { value: "newest", label: "Newest" },
  { value: "mostHelpful", label: "Most Helpful" },
  { value: "mostLiked", label: "Most Liked" },
];

function formatRelativeTime(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime();
  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

function catalogStamp(item: Feedback): string {
  if (item.type === "semester") return `SEM ${item.semester ?? "—"}`;
  if (item.type === "course") return item.courseCode ?? "COURSE";
  return "GENERAL";
}

export default function CommunityFeedback({
  currentUser,
}: CommunityFeedbackProps) {
  const { feedbacks, setFeedbacks } = useAuth();
  const [group, setGroup] = useState<GroupFilter>("all");
  const [sort, setSort] = useState<SortOption>("newest");
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const [isAddOpen, setIsAddOpen] = useState(false);

  const [editingFeedback, setEditingFeedback] = useState<Feedback | null>(null);
  const [deletingFeedback, setDeletingFeedback] = useState<Feedback | null>(
    null,
  );
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const isAdviser = currentUser.role === "ADVISER";
  const isAdmin = currentUser.role === "ADMIN";

  function toggleTag(tag: string) {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  }

  const visibleFeedbacks = useMemo(() => {
    let list = feedbacks;

    if (group !== "all") {
      list = list.filter((f) => f.type === group);
    }
    if (activeTags.size > 0) {
      list = list.filter((f) => f.tags.some((t) => activeTags.has(t)));
    }

    const sorted = [...list];
    if (sort === "newest") {
      sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    } else if (sort === "mostLiked") {
      sorted.sort((a, b) => b.likes - a.likes);
    } else if (sort === "mostHelpful") {
      sorted.sort((a, b) => b.likes - b.dislikes - (a.likes - a.dislikes));
    }
    return sorted;
  }, [feedbacks, group, activeTags, sort]);

  function handleVote(id: string, value: Exclude<VoteValue, null>) {
    let nextVoteForApi: VoteValue = value;

    setFeedbacks((prev) =>
      prev.map((f) => {
        if (f._id !== id) return f;
        const prevVote = f.myVote ?? null;
        let likes = f.likes;
        let dislikes = f.dislikes;
        let nextVote: VoteValue = value;

        if (prevVote === value) {
          nextVote = null;
          if (value === "like") likes -= 1;
          else dislikes -= 1;
        } else {
          if (prevVote === "like") likes -= 1;
          if (prevVote === "dislike") dislikes -= 1;
          if (value === "like") likes += 1;
          else dislikes += 1;
        }

        nextVoteForApi = nextVote;
        return { ...f, likes, dislikes, myVote: nextVote };
      }),
    );

    voteFeedback(id, nextVoteForApi).catch(() => {});
  }

  async function handleSaved() {
    const feedbackRes = await api.get("/feedback");
    setFeedbacks(feedbackRes.data);
    setIsAddOpen(false);
    setEditingFeedback(null);
  }

  function handleEditClick(item: Feedback) {
    setEditingFeedback(item);
  }

  function handleDeleteClick(item: Feedback) {
    setDeleteError(null);
    setDeletingFeedback(item);
  }

  function handleCancelDelete() {
    setDeletingFeedback(null);
    setDeleteError(null);
  }

  async function handleConfirmDelete() {
    if (!deletingFeedback) return;
    setIsDeleting(true);
    setDeleteError(null);
    try {
      await deleteFeedback(deletingFeedback._id);
      setFeedbacks((prev) =>
        prev.filter((f) => f._id !== deletingFeedback._id),
      );
      setDeletingFeedback(null);
    } catch {
      setDeleteError("Couldn't delete this advice. Try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="flex h-fit w-full md:w-auto flex-col border border-gray-400 bg-[#ffffff11] rounded-2xl m-2">
      <div className="flex items-center justify-between border-b border-gray-400 bg-blue-700 px-6 py-4 rounded-t-2xl">
        <div>
          <h2 className="font-serif text-xl font-semibold text-white">
            Community Feedback
          </h2>
        </div>
        {isAdviser && (
          <button
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-1.5  bg-blue-500 px-3 py-2 rounded-2xl text-sm font-medium text-white shadow-sm transition hover:bg-amber-400">
            <Plus className="h-4 w-4" />
            Add Advice
          </button>
        )}
      </div>

      <div className="flex gap-1 overflow-x-auto overflow-hidden border-b border-stone-400  px-4 pt-3">
        {GROUPS.map((g) => {
          const Icon = g.icon;
          const isActive = group === g.value;
          return (
            <button
              key={g.value}
              onClick={() => setGroup(g.value)}
              className={`-mb-px flex shrink-0 items-center gap-1.5 rounded-t-lg px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "z-10 bg-white text-blue-700 shadow-sm"
                  : " hover:text-stone-700 hover:bg-blue-300"
              }`}>
              <Icon className="h-3.5 w-3.5" />
              {g.label}
            </button>
          );
        })}
      </div>
      <div className="space-y-3 border-b border-stone-400 px-4 py-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wide ">
            Sort
          </span>
          <div className="flex gap-1 overflow-x-auto">
            {SORTS.map((s) => (
              <button
                key={s.value}
                onClick={() => setSort(s.value)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                  sort === s.value
                    ? "bg-blue-600 text-white"
                    : "bg-stone-100 text-black  hover:bg-blue-200"
                }`}>
                {s.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-medium uppercase tracking-wide ">
            Tags
          </span>
          <div className="flex gap-1 overflow-x-auto">
            {FEEDBACK_TAGS.map((tag) => {
              const isActive = activeTags.has(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`rounded-full border px-2.5 py-1 font-mono text-xs transition ${
                    isActive
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-stone-400  hover:border-blue-300"
                  }`}>
                  #{tag}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto  px-4 py-4">
        {visibleFeedbacks.length === 0 && (
          <p className="py-10 text-center text-sm ">
            No advice matches these filters yet.
          </p>
        )}
        <div className="space-y-3">
          {visibleFeedbacks.map((item) => {
            const isAuthor = String(item.user._id) === String(currentUser._id);
            const canEdit = isAuthor;
            const canDelete = isAuthor || isAdmin;

            return (
              <article
                key={item._id}
                className="rounded-xl border border-stone-200 bg-[#ffffff11] p-4 shadow-sm">
                <div className="mb-2 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-serif text-base font-semibold ">
                      {item.title}
                    </h3>
                    <div className="mt-1 flex items-center gap-2 text-xs">
                      <GraduationCap className="h-3.5 w-3.5 text-blue-500" />
                      <span>{item.user.name}</span>
                      <span>·</span>
                      <span className="bg-amber-300 rounded-2xl px-2 border border-white text-black">
                        {item.user.details?.branch}
                      </span>
                      <span>{formatRelativeTime(item.createdAt)}</span>
                    </div>
                  </div>
                  <span className="shrink-0 rounded border border-amber-200 bg-amber-50 px-2 py-1 font-mono text-xs uppercase tracking-wide text-amber-700">
                    {catalogStamp(item)}
                  </span>
                </div>

                <p className="mb-3 text-sm leading-relaxed">{item.content}</p>

                <div className="mb-3 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-stone-100 text-black px-2 py-0.5 font-mono text-xs">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 border-t border-stone-100 pt-3">
                  <button
                    onClick={() => handleVote(item._id, "like")}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium transition ${
                      item.myVote === "like"
                        ? "bg-emerald-50 text-emerald-700"
                        : "hover:bg-stone-100 hover:text-black"
                    }`}>
                    <ThumbsUp className="h-4 w-4" />
                    {item.likes}
                  </button>
                  <button
                    onClick={() => handleVote(item._id, "dislike")}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium transition ${
                      item.myVote === "dislike"
                        ? "bg-rose-50 text-rose-700"
                        : " hover:bg-stone-100 hover:text-black"
                    }`}>
                    <ThumbsDown className="h-4 w-4" />
                    {item.dislikes}
                  </button>

                  {(canEdit || canDelete) && (
                    <div className="ml-auto flex items-center gap-1">
                      {canEdit && (
                        <button
                          onClick={() => handleEditClick(item)}
                          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium hover:bg-stone-100 hover:text-black">
                          <Pencil className="h-4 w-4" />
                        </button>
                      )}
                      {canDelete && (
                        <button
                          onClick={() => handleDeleteClick(item)}
                          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-rose-600 hover:bg-rose-50">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>

      <AddFeedbackModal
        isOpen={isAddOpen || Boolean(editingFeedback)}
        currentUser={currentUser}
        existingFeedback={editingFeedback}
        onClose={() => {
          setIsAddOpen(false);
          setEditingFeedback(null);
        }}
        onSaved={handleSaved}
      />

      <ConfirmDialog
        isOpen={Boolean(deletingFeedback)}
        title="Delete this advice?"
        description={
          deletingFeedback
            ? `"${deletingFeedback.title}" will be removed for everyone. This can't be undone.`
            : ""
        }
        confirmLabel="Delete"
        isConfirming={isDeleting}
        error={deleteError}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
