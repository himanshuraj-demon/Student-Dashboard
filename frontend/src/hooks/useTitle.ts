import { useEffect } from "react";

export function useTitle(title: string) {
  useEffect(() => {
    document.title = `SmartOS IIT Gandhinagar - ${title}`;
  }, [title]);
}