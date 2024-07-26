import React from "react";
import {
  CalendarDays,
  CalendarRange,
  CalendarClock,
  Mail,
  SplitSquareVertical,
  TextCursor,
  FileDigit,
  Hash,
  FileUp,
  Link,
  Group,
  CheckSquare,
  Square,
} from "lucide-react";

export const defaultIcons = {
  date: <CalendarDays />,
  datetime: <CalendarClock />,
  daterange: <CalendarRange />,
  text: <TextCursor />,
  integer: <FileDigit />,
  float: <Hash />,
  email: <Mail />,
  file: <FileUp />,
  pagebreak: <SplitSquareVertical />,
  url: <Link />,
  group: <Group />,
  boolean: <CheckSquare />,
  content: <Square />,
};
