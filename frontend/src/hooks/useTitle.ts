import { useEffect } from "react";

export function useTitle(title: string) {
  useEffect(() => {
    document.title = `SmartTrack IIT Gandhinagar - ${title}`;
  }, [title]);
}