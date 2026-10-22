/**
 * Project Comments & Ideas Component
 * Features:
 * - Tabbed navigation: Discussion | Ideas & Suggestions
 * - Unauthenticated visitors can read approved submissions
 * - Authenticated users can post comments, reply, post ideas, delete their own, or report
 * - Pending moderation safety workflow with clear author indicators
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Lightbulb,
  Send,
  Reply,
  Trash2,
  Flag,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertCircle,
  CornerDownRight,
  User,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import {
  fetchProjectComments,
  addProjectComment,
  deleteProjectComment,
  reportComment,
  type ProjectComment,
} from '../../services/comments';
import {
  fetchProjectIdeas,
  addProjectIdea,
  deleteProjectIdea,
  type ProjectIdea,
} from '../../services/ideas';
import { AuthModal } from '../auth/AuthModal';

interface CommentSectionProps {
  projectId: string;
  projectTitle: string;
}

export const CommentSection: React.FC<CommentSectionProps> = ({ projectId, projectTitle }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'discussion' | 'ideas'>('discussion');

  // Comments state
  const [comments, setComments] = useState<ProjectComment[]>([]);
  const [loadingComments, setLoadingComments] = useState(true);
  const [newCommentText, setNewCommentText] = useState('');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Ideas state
  const [ideas, setIdeas] = useState<ProjectIdea[]>([]);
  const [loadingIdeas, setLoadingIdeas] = useState(true);
  const [ideaTitle, setIdeaTitle] = useState('');
  const [ideaBody, setIdeaBody] = useState('');

  // UI state
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authReason, setAuthReason] = useState('');
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [reportingCommentId, setReportingCommentId] = useState<string | null>(null);
  const [reportReason, setReportReason] = useState('');

  useEffect(() => {
    loadComments();
    loadIdeas();
  }, [projectId, user?.uid]);

  const loadComments = async () => {
    setLoadingComments(true);
    try {
      const data = await fetchProjectComments(projectId, user?.uid);
      setComments(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingComments(false);
    }
  };

  const loadIdeas = async () => {
    setLoadingIdeas(true);
    try {
      const data = await fetchProjectIdeas(projectId, user?.uid);
      setIdeas(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingIdeas(false);
    }
  };

  const notify = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 4000);
  };

  // Submit Comment
  const handleCommentSubmit = async (e: React.FormEvent, parentId: string | null = null) => {
    e.preventDefault();
    if (!user) {
      setAuthReason('Sign in to leave a comment or reply to this project.');
      setAuthModalOpen(true);
      return;
    }

    const textToSubmit = parentId ? replyText.trim() : newCommentText.trim();
    if (!textToSubmit) return;

    try {
      const created = await addProjectComment({
        projectId,
        userId: user.uid,
        displayName: user.displayName || 'Engineer',
        photoURL: user.photoURL || undefined,
        body: textToSubmit,
        parentId,
      });

      setComments((prev) => [...prev, created]);
      if (parentId) {
        setReplyingToId(null);
        setReplyText('');
      } else {
        setNewCommentText('');
      }
      notify(
        created.status === 'pending'
          ? 'Comment submitted for moderation review. It will appear publicly once verified!'
          : 'Comment posted successfully!'
      );
    } catch (err: unknown) {
      const errorObj = err as { message?: string };
      alert(errorObj.message || 'Failed to submit comment');
    }
  };

  // Delete Comment
  const handleDeleteComment = async (commentId: string) => {
    if (!user) return;
    if (!window.confirm('Are you sure you want to delete this comment?')) return;

    try {
      await deleteProjectComment(commentId, user.uid);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      notify('Comment removed.');
    } catch (err) {
      console.error(err);
    }
  };

  // Submit Report
  const handleReportSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !reportingCommentId) return;

    try {
      await reportComment(reportingCommentId, user.uid, reportReason || 'Inappropriate content');
      setReportingCommentId(null);
      setReportReason('');
      notify('Thank you. The comment has been flagged for moderator review.');
    } catch (err) {
      console.error(err);
    }
  };

  // Submit Idea
  const handleIdeaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setAuthReason('Sign in to share an engineering idea or technical suggestion.');
      setAuthModalOpen(true);
      return;
    }

    try {
      const created = await addProjectIdea({
        projectId,
        userId: user.uid,
        displayName: user.displayName || 'Engineer',
        photoURL: user.photoURL || undefined,
        title: ideaTitle,
        body: ideaBody,
      });

      setIdeas((prev) => [created, ...prev]);
      setIdeaTitle('');
      setIdeaBody('');
      notify('Engineering idea submitted! Thank you for collaborating.');
    } catch (err: unknown) {
      const errorObj = err as { message?: string };
      alert(errorObj.message || 'Failed to submit idea');
    }
  };

  // Delete Idea
  const handleDeleteIdea = async (ideaId: string) => {
    if (!user) return;
    if (!window.confirm('Delete this idea suggestion?')) return;

    try {
      await deleteProjectIdea(ideaId, user.uid);
      setIdeas((prev) => prev.filter((i) => i.id !== ideaId));
      notify('Idea removed.');
    } catch (err) {
      console.error(err);
    }
  };

  // Group comments into root comments and replies
  const rootComments = comments.filter((c) => !c.parentId);
  const getReplies = (parentId: string) => comments.filter((c) => c.parentId === parentId);

  return (
    <div className="mt-16 pt-10 border-t border-[#E2D9CC] dark:border-[#294F47]">
      {/* Header and Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="text-2xl font-black text-[#184E46] dark:text-[#E9F6F1] flex items-center gap-2">
            <span>Community Collaboration</span>
            <Sparkles className="w-5 h-5 text-[#F6C85F]" />
          </h3>
          <p className="text-xs text-[#486962] dark:text-[#B9D6CD] mt-0.5">
            Share technical feedback, ask about circuit implementations, or propose next-gen features.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex p-1 rounded-2xl bg-[#E8F4EC] dark:bg-[#152E2A] border border-[#A7D7B7]/40">
          <button
            onClick={() => setActiveTab('discussion')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'discussion'
                ? 'bg-white dark:bg-[#1D3F39] text-[#184E46] dark:text-[#4DD0B6] shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#184E46]'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Discussion ({comments.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('ideas')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'ideas'
                ? 'bg-white dark:bg-[#1D3F39] text-[#184E46] dark:text-[#4DD0B6] shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-[#184E46]'
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Ideas &amp; Suggestions ({ideas.length})</span>
          </button>
        </div>
      </div>

      {/* Floating Action / Notification Banner */}
      <AnimatePresence>
        {actionMessage && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-xs font-bold text-emerald-800 dark:text-emerald-300 flex items-center gap-2 shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{actionMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* TAB 1: DISCUSSION */}
      {activeTab === 'discussion' && (
        <div className="space-y-6">
          {/* Post New Comment Box */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#17342F] border border-[#E2D9CC] dark:border-[#294F47] shadow-sm">
            <form onSubmit={(e) => handleCommentSubmit(e, null)}>
              <label htmlFor="comment-input" className="block text-xs font-bold text-[#184E46] dark:text-[#E9F6F1] mb-2">
                Join the Discussion
              </label>
              <textarea
                id="comment-input"
                rows={3}
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                placeholder={
                  user
                    ? `Posting as ${user.displayName}... Ask a question or share engineering thoughts!`
                    : 'Click here or sign in to join the discussion...'
                }
                onFocus={() => {
                  if (!user) {
                    setAuthReason('Sign in with Google to post your comment.');
                    setAuthModalOpen(true);
                  }
                }}
                className="w-full p-3 rounded-2xl border border-[#E2D9CC] dark:border-[#294F47] bg-[#F5EDE2]/40 dark:bg-[#112320] text-xs sm:text-sm text-[#184E46] dark:text-[#E9F6F1] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4DD0B6]"
                maxLength={1000}
              />
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-[11px] text-gray-500">
                  {newCommentText.length}/1000 characters
                </span>
                <button
                  type="submit"
                  disabled={!newCommentText.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#184E46] text-white font-bold hover:bg-[#123B35] disabled:opacity-50 transition-all text-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Comment</span>
                </button>
              </div>
            </form>
          </div>

          {/* Comments List */}
          {loadingComments ? (
            <div className="text-center py-10 text-xs text-gray-500">
              Loading discussion messages...
            </div>
          ) : rootComments.length === 0 ? (
            <div className="text-center py-10 p-6 rounded-3xl bg-gray-50 dark:bg-[#17342F]/40 border border-dashed border-[#E2D9CC] dark:border-[#294F47]">
              <MessageSquare className="w-8 h-8 text-[#A7D7B7] mx-auto mb-2" />
              <p className="text-xs font-bold text-[#184E46] dark:text-[#E9F6F1]">
                No comments yet. Be the first to start the discussion!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {rootComments.map((comment) => {
                const replies = getReplies(comment.id);
                const isAuthor = user?.uid === comment.userId;

                return (
                  <div
                    key={comment.id}
                    className="p-5 rounded-3xl bg-white dark:bg-[#17342F] border border-[#E2D9CC] dark:border-[#294F47] shadow-sm space-y-3"
                  >
                    {/* Header: User & Status */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        {comment.photoURL ? (
                          <img
                            src={comment.photoURL}
                            alt={comment.displayName}
                            className="w-7 h-7 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-7 h-7 rounded-full bg-[#184E46] text-white flex items-center justify-center text-xs font-bold">
                            {comment.displayName[0] || 'U'}
                          </div>
                        )}
                        <div>
                          <div className="text-xs font-extrabold text-[#184E46] dark:text-[#E9F6F1] flex items-center gap-2">
                            <span>{comment.displayName}</span>
                            {comment.status === 'pending' && (
                              <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-semibold flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                Pending Review
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-gray-400">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Actions: Delete or Report */}
                      <div className="flex items-center gap-1">
                        {isAuthor && (
                          <button
                            onClick={() => handleDeleteComment(comment.id)}
                            className="p-1.5 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500"
                            title="Delete your comment"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if (!user) {
                              setAuthReason('Sign in to report inappropriate content.');
                              setAuthModalOpen(true);
                            } else {
                              setReportingCommentId(comment.id);
                            }
                          }}
                          className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400 hover:text-gray-600"
                          title="Report comment"
                        >
                          <Flag className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* Message Body */}
                    <p className="text-xs sm:text-sm text-[#486962] dark:text-[#B9D6CD] leading-relaxed">
                      {comment.body}
                    </p>

                    {/* Reply button */}
                    <div className="pt-2 flex items-center gap-4 text-xs font-bold text-[#184E46] dark:text-[#4DD0B6]">
                      <button
                        onClick={() => {
                          if (!user) {
                            setAuthReason('Sign in to reply to this comment.');
                            setAuthModalOpen(true);
                          } else {
                            setReplyingToId(replyingToId === comment.id ? null : comment.id);
                          }
                        }}
                        className="flex items-center gap-1 hover:underline"
                      >
                        <Reply className="w-3.5 h-3.5" />
                        <span>Reply</span>
                      </button>
                    </div>

                    {/* Reply Input Form */}
                    {replyingToId === comment.id && (
                      <form
                        onSubmit={(e) => handleCommentSubmit(e, comment.id)}
                        className="mt-3 pl-4 border-l-2 border-[#A7D7B7] space-y-2"
                      >
                        <textarea
                          rows={2}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          placeholder={`Reply to ${comment.displayName}...`}
                          className="w-full p-2.5 rounded-xl border border-[#E2D9CC] dark:border-[#294F47] bg-[#F5EDE2]/40 dark:bg-[#112320] text-xs text-[#184E46] dark:text-[#E9F6F1] focus:outline-none focus:ring-1 focus:ring-[#4DD0B6]"
                          maxLength={1000}
                        />
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setReplyingToId(null)}
                            className="px-3 py-1 rounded-full text-xs font-bold text-gray-500"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            disabled={!replyText.trim()}
                            className="px-3 py-1 rounded-full bg-[#184E46] text-white text-xs font-bold hover:bg-[#123B35] disabled:opacity-50"
                          >
                            Post Reply
                          </button>
                        </div>
                      </form>
                    )}

                    {/* Nested Replies */}
                    {replies.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 space-y-3 pl-4 sm:pl-6 border-l-2 border-[#A7D7B7]/40">
                        {replies.map((reply) => {
                          const isReplyAuthor = user?.uid === reply.userId;
                          return (
                            <div key={reply.id} className="space-y-1">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <div className="w-5 h-5 rounded-full bg-[#184E46] text-white flex items-center justify-center text-[10px] font-bold">
                                    {reply.displayName[0] || 'U'}
                                  </div>
                                  <span className="text-xs font-bold text-[#184E46] dark:text-[#E9F6F1]">
                                    {reply.displayName}
                                  </span>
                                  {reply.status === 'pending' && (
                                    <span className="px-1.5 py-0.5 rounded text-[9px] bg-amber-100 text-amber-800">
                                      Pending
                                    </span>
                                  )}
                                  <span className="text-[10px] text-gray-400">
                                    {new Date(reply.createdAt).toLocaleDateString()}
                                  </span>
                                </div>
                                {isReplyAuthor && (
                                  <button
                                    onClick={() => handleDeleteComment(reply.id)}
                                    className="p-1 text-gray-400 hover:text-red-500"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                )}
                              </div>
                              <p className="text-xs text-[#486962] dark:text-[#B9D6CD]">
                                {reply.body}
                              </p>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: IDEAS & SUGGESTIONS */}
      {activeTab === 'ideas' && (
        <div className="space-y-6">
          {/* Submit Idea Box */}
          <div className="p-5 rounded-3xl bg-white dark:bg-[#17342F] border border-[#E2D9CC] dark:border-[#294F47] shadow-sm">
            <form onSubmit={handleIdeaSubmit} className="space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[#184E46] dark:text-[#E9F6F1]">
                <Lightbulb className="w-4 h-4 text-[#F6C85F]" />
                <span>Propose an Engineering Idea or Improvement</span>
              </div>
              <input
                type="text"
                value={ideaTitle}
                onChange={(e) => setIdeaTitle(e.target.value)}
                placeholder="Idea Title (e.g. Add CAN Bus transceiver for multi-node telemetry)"
                onFocus={() => {
                  if (!user) {
                    setAuthReason('Sign in to submit an engineering suggestion.');
                    setAuthModalOpen(true);
                  }
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#E2D9CC] dark:border-[#294F47] bg-[#F5EDE2]/40 dark:bg-[#112320] text-xs sm:text-sm text-[#184E46] dark:text-[#E9F6F1] focus:outline-none focus:ring-2 focus:ring-[#4DD0B6]"
                maxLength={120}
              />
              <textarea
                rows={3}
                value={ideaBody}
                onChange={(e) => setIdeaBody(e.target.value)}
                placeholder="Explain the technical concept, components, or schematic benefits..."
                className="w-full p-3 rounded-2xl border border-[#E2D9CC] dark:border-[#294F47] bg-[#F5EDE2]/40 dark:bg-[#112320] text-xs sm:text-sm text-[#184E46] dark:text-[#E9F6F1] focus:outline-none focus:ring-2 focus:ring-[#4DD0B6]"
                maxLength={2000}
              />
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="text-[11px] text-gray-500">
                  {ideaBody.length}/2000 characters
                </span>
                <button
                  type="submit"
                  disabled={!ideaTitle.trim() || !ideaBody.trim()}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#184E46] text-white font-bold hover:bg-[#123B35] disabled:opacity-50 transition-all text-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Idea</span>
                </button>
              </div>
            </form>
          </div>

          {/* Ideas List */}
          {loadingIdeas ? (
            <div className="text-center py-10 text-xs text-gray-500">
              Loading ideas...
            </div>
          ) : ideas.length === 0 ? (
            <div className="text-center py-10 p-6 rounded-3xl bg-gray-50 dark:bg-[#17342F]/40 border border-dashed border-[#E2D9CC] dark:border-[#294F47]">
              <Lightbulb className="w-8 h-8 text-[#F6C85F] mx-auto mb-2" />
              <p className="text-xs font-bold text-[#184E46] dark:text-[#E9F6F1]">
                No suggestions yet. Have an idea for this build?
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ideas.map((idea) => {
                const isAuthor = user?.uid === idea.userId;
                return (
                  <div
                    key={idea.id}
                    className="p-5 rounded-3xl bg-white dark:bg-[#17342F] border border-[#E2D9CC] dark:border-[#294F47] shadow-sm flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#F6C85F]/20 text-[#B45309] dark:text-[#F6C85F] flex items-center gap-1">
                          <Lightbulb className="w-3 h-3" />
                          <span>Suggestion</span>
                        </span>
                        {isAuthor && (
                          <button
                            onClick={() => handleDeleteIdea(idea.id)}
                            className="p-1 text-gray-400 hover:text-red-500"
                            title="Delete your suggestion"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>

                      <h4 className="font-extrabold text-sm sm:text-base text-[#184E46] dark:text-[#E9F6F1]">
                        {idea.title}
                      </h4>

                      <p className="mt-2 text-xs text-[#486962] dark:text-[#B9D6CD] leading-relaxed">
                        {idea.body}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-[11px] text-gray-400">
                      <span>By {idea.displayName}</span>
                      <span>{new Date(idea.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Report Modal */}
      {reportingCommentId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white dark:bg-[#152E2A] p-6 rounded-3xl max-w-sm w-full space-y-4 border border-[#A7D7B7]">
            <h4 className="font-bold text-sm text-[#184E46] dark:text-[#E9F6F1]">
              Report Inappropriate Comment
            </h4>
            <select
              value={reportReason}
              onChange={(e) => setReportReason(e.target.value)}
              className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-700 text-xs"
            >
              <option value="">Select a reason...</option>
              <option value="Spam or advertising">Spam or advertising</option>
              <option value="Inappropriate language">Inappropriate language</option>
              <option value="Harassment or abuse">Harassment or abuse</option>
              <option value="Off-topic">Off-topic</option>
            </select>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setReportingCommentId(null)}
                className="px-3 py-1.5 rounded-xl text-xs font-bold text-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleReportSubmit}
                className="px-4 py-1.5 rounded-xl bg-red-600 text-white text-xs font-bold"
              >
                Submit Report
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Auth Modal Trigger */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        reason={authReason}
      />
    </div>
  );
};
