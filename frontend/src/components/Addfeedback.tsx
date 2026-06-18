"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { X, Calendar, BookOpen, MessageSquare } from "lucide-react";
import {
  type Feedback,
  type FeedbackType,
  FEEDBACK_TAGS,
} from "../../constants/feedbacktypes";
import { createFeedback, updateFeedback } from "../services/feedbackapi";
import { type User } from "../context/AuthContext";

interface AddFeedbackModalProps {
  isOpen: boolean;
  currentUser: User;
  existingFeedback?: Feedback | null;
  onClose: () => void;
  onSaved: () => void;
}

interface FormValues {
  type: FeedbackType;
  semester: string;
  courseCode: string;
  title: string;
  content: string;
  tags: string[];
}

const TYPE_OPTIONS: {
  value: FeedbackType;
  label: string;
  icon: typeof Calendar;
}[] = [
  { value: "semester", label: "Semester", icon: Calendar },
  { value: "course", label: "Course", icon: BookOpen },
  { value: "general", label: "General", icon: MessageSquare },
];

const DEFAULT_VALUES: FormValues = {
  type: "general",
  semester: "",
  courseCode: "",
  title: "",
  content: "",
  tags: [],
};

export default function AddFeedbackModal({
  isOpen,
  currentUser,
  existingFeedback = null,
  onClose,
  onSaved,
}: AddFeedbackModalProps) {
  const isEditMode = Boolean(existingFeedback);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ defaultValues: DEFAULT_VALUES, mode: "onSubmit" });

  // Re-fill the form whenever the modal opens — either with the feedback
  // being edited, or a clean slate for a brand new entry.
  useEffect(() => {
    if (!isOpen) return;
    if (existingFeedback) {
      reset({
        type: existingFeedback.type,
        semester: existingFeedback.semester
          ? String(existingFeedback.semester)
          : "",
        courseCode: existingFeedback.courseCode ?? "",
        title: existingFeedback.title,
        content: existingFeedback.content,
        tags: existingFeedback.tags,
      });
    } else {
      reset(DEFAULT_VALUES);
    }
  }, [isOpen, existingFeedback, reset]);

  if (!isOpen) return null;
  if (currentUser.role !== "ADVISER") return null; // belt-and-suspenders role guard

  const type = watch("type");
  const tags = watch("tags");

  function handleClose() {
    reset(DEFAULT_VALUES);
    onClose();
  }

  function selectType(next: FeedbackType) {
    setValue("type", next, { shouldValidate: false });
    if (next !== "semester") setValue("semester", "");
    if (next !== "course") setValue("courseCode", "");
    clearErrors(["semester", "courseCode"]);
  }

  function toggleTag(tag: string) {
    const current = getValues("tags");
    setValue(
      "tags",
      current.includes(tag)
        ? current.filter((t) => t !== tag)
        : [...current, tag],
    );
  }

  async function onSubmit(values: FormValues) {
    clearErrors("root");

    if (values.type === "semester" && !values.semester) {
      setError("semester", {
        type: "required",
        message: "Pick a semester number for this advice.",
      });
      return;
    }
    if (values.type === "course" && !values.courseCode.trim()) {
      setError("courseCode", {
        type: "required",
        message: "Add the course code this advice is for.",
      });
      return;
    }

    const payload = {
      type: values.type,
      semester:
        values.type === "semester" ? Number(values.semester) : undefined,
      courseCode:
        values.type === "course" ? values.courseCode.trim() : undefined,
      title: values.title.trim(),
      content: values.content.trim(),
      tags: values.tags,
    };

    try {
      if (isEditMode) {
        await updateFeedback(existingFeedback!._id, payload);
      } else {
        await createFeedback(payload);
      }
      onSaved();
      reset(DEFAULT_VALUES);
    } catch {
      setError("root", {
        type: "manual",
        message: isEditMode
          ? "Couldn't save your changes. Try again."
          : "Couldn't post this advice. Try again.",
      });
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-stone-200 px-6 py-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-indigo-500">
              {isEditMode ? "Edit Entry" : "New Entry"}
            </p>
            <h3 className="font-serif text-lg font-semibold text-stone-800">
              {isEditMode ? "Edit Your Advice" : "Share Your Advice"}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="rounded-lg p-1.5 text-stone-400 hover:bg-stone-100 hover:text-stone-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-6 py-5">
          {/* Type selector */}
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-stone-400">
              Advice type
            </label>
            <div className="flex gap-2">
              {TYPE_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isActive = type === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => selectType(opt.value)}
                    className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition ${
                      isActive
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                        : "border-stone-200 text-stone-500 hover:border-stone-300"
                    }`}>
                    <Icon className="h-4 w-4" />
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Conditional field based on type */}
          {type === "semester" && (
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-stone-400">
                Semester
              </label>
              <input
                type="number"
                min={1}
                max={8}
                placeholder="e.g. 3"
                {...register("semester")}
                className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              {errors.semester && (
                <p className="mt-1 text-xs text-rose-600">
                  {errors.semester.message}
                </p>
              )}
            </div>
          )}
          {type === "course" && (
            <div>
              <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-stone-400">
                Course code
              </label>
              <input
                type="text"
                placeholder="e.g. ES113"
                {...register("courseCode")}
                className="w-full rounded-lg border border-stone-200 px-3 py-2 font-mono text-sm text-stone-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              {errors.courseCode && (
                <p className="mt-1 text-xs text-rose-600">
                  {errors.courseCode.message}
                </p>
              )}
            </div>
          )}

          {/* Title */}
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-stone-400">
              Title
            </label>
            <input
              type="text"
              placeholder="Start the project early"
              {...register("title", {
                required: "Give your advice a short title.",
              })}
              className="w-full rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            {errors.title && (
              <p className="mt-1 text-xs text-rose-600">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-stone-400">
              Advice
            </label>
            <textarea
              rows={4}
              placeholder="Write the advice you wish someone had told you…"
              {...register("content", {
                required: "Write out the advice itself.",
              })}
              className="w-full resize-none rounded-lg border border-stone-200 px-3 py-2 text-sm text-stone-700 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            {errors.content && (
              <p className="mt-1 text-xs text-rose-600">
                {errors.content.message}
              </p>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-stone-400">
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {FEEDBACK_TAGS.map((tag) => {
                const isActive = tags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tag)}
                    className={`rounded-full border px-2.5 py-1 font-mono text-xs transition ${
                      isActive
                        ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                        : "border-stone-200 text-stone-500 hover:border-stone-300"
                    }`}>
                    #{tag}
                  </button>
                );
              })}
            </div>
          </div>

          {errors.root && (
            <p className="text-sm text-rose-600">{errors.root.message}</p>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg px-4 py-2 text-sm font-medium text-stone-500 hover:bg-stone-100">
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-50">
              {isSubmitting
                ? isEditMode
                  ? "Saving…"
                  : "Posting…"
                : isEditMode
                  ? "Save Changes"
                  : "Post Advice"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
