"use client";

import CommentsTab from "@/components/asap/comments/CommentsTab";
import { useAppDemo } from "@/context/AppDemoContext";

export default function CommentsPage() {
  const { lang, comments, setComments, generateCommentReply } = useAppDemo();

  return (
    <CommentsTab
      comments={comments}
      setComments={setComments}
      onGenerateAIReply={generateCommentReply}
      lang={lang}
    />
  );
}
